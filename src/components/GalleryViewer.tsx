'use client';

import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Html, useGLTF } from '@react-three/drei';
import { Exhibition, urlFor } from '@/lib/sanity';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';

interface GalleryViewerProps {
  exhibition: Exhibition;
}

interface ArtworkModalData {
  title: string;
  artist: string;
  year: number;
  medium: string;
  description?: string;
  imageUrl: string;
}

// Blender Room Loader
function BlenderRoom({ roomNumber }: { roomNumber: number }) {
  const { scene } = useGLTF(`/models/room${roomNumber}.glb`);
  
  useEffect(() => {
    // Center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.x = -center.x;
    scene.position.z = -center.z;
    scene.position.y = -box.min.y; // Floor at y=0
  }, [scene]);
  
  return <primitive object={scene} />;
}

function ArtworkFrame({ imageUrl, title, position, rotation, onClick }: { imageUrl: string; title: string; position: [number, number, number]; rotation: [number, number, number]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(imageUrl);
  
  return (
    <group position={position} rotation={rotation}>
      <mesh 
        position={[0, 0, 0.05]} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)} 
        onClick={onClick}
      >
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {hovered && (
        <Html position={[0, -0.85, 0.1]} center>
          <div className="bg-black text-white px-4 py-2 rounded text-sm">{title}</div>
        </Html>
      )}
    </group>
  );
}

function ArtworkWithSuspense({ artwork, position, rotation, onArtworkClick }: { artwork: any; position: [number, number, number]; rotation: [number, number, number]; onArtworkClick: (a: ArtworkModalData) => void }) {
  if (!artwork || !artwork.image) {
    return null;
  }
  
  const imageUrl = urlFor(artwork.image).width(512).height(512).url();
  
  return (
    <Suspense fallback={null}>
      <ArtworkFrame
        imageUrl={imageUrl}
        title={artwork.title}
        position={position}
        rotation={rotation}
        onClick={() => onArtworkClick({
          title: artwork.title,
          artist: artwork.artist,
          year: artwork.year,
          medium: artwork.medium,
          description: artwork.description,
          imageUrl: urlFor(artwork.image).width(1200).height(1200).url()
        })}
      />
    </Suspense>
  );
}

function GalleryRoom({ artworks, onArtworkClick, roomNumber }: { artworks: any[]; onArtworkClick: (a: ArtworkModalData) => void; roomNumber: number }) {
  return (
    <group>
      {/* Blender Room */}
      <Suspense fallback={null}>
        <BlenderRoom roomNumber={roomNumber} />
      </Suspense>
      
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      <pointLight position={[0, 3, 0]} intensity={0.5} />
    </group>
  );
}

// Preload all room models
useGLTF.preload('/models/room1.glb');
useGLTF.preload('/models/room2.glb');
useGLTF.preload('/models/room3.glb');

export default function GalleryViewer({ exhibition }: GalleryViewerProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkModalData | null>(null);
  
  const artworks = exhibition.artworks || [];
  const totalRooms = 3;
  const artworksPerRoom = 7;
  
  const currentRoomArtworks = artworks.slice(
    currentRoomIndex * artworksPerRoom,
    (currentRoomIndex + 1) * artworksPerRoom
  );

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 1.6, 0.1], fov: 75, near: 0.1, far: 1000 }}>
        <color attach="background" args={['#87CEEB']} />
        <Suspense fallback={null}>
          <GalleryRoom 
            artworks={currentRoomArtworks} 
            onArtworkClick={setSelectedArtwork}
            roomNumber={currentRoomIndex + 1}
          />
        </Suspense>
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          minDistance={0.5} 
          maxDistance={30} 
          target={[0, 1.6, -2]} 
        />
      </Canvas>
      
      {/* Room Navigation */}
      <button
        onClick={() => setCurrentRoomIndex(p => p > 0 ? p - 1 : totalRooms - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentRoomIndex(p => p < totalRooms - 1 ? p + 1 : 0)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-4 py-2 rounded">
        Room {currentRoomIndex + 1} / {totalRooms}
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-6 right-6 z-20 text-white/70 text-xs">
        <p>Drag to rotate • Scroll to zoom</p>
        <p>Right-drag to pan</p>
      </div>
      
      {/* Artwork Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full mx-4 flex bg-white rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-800 text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-2/3 bg-gray-100 flex items-center justify-center p-4">
                <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} className="max-w-full max-h-[80vh] object-contain" />
              </div>
              <div className="w-1/3 p-8 flex flex-col justify-center">
                <h2 className="text-2xl text-gray-900 mb-6">{selectedArtwork.title}</h2>
                <p className="text-gray-500 text-xs">Artist</p>
                <p className="text-gray-900 mb-4">{selectedArtwork.artist}</p>
                <p className="text-gray-500 text-xs">Year</p>
                <p className="text-gray-900 mb-4">{selectedArtwork.year}</p>
                <p className="text-gray-500 text-xs">Medium</p>
                <p className="text-gray-900">{selectedArtwork.medium}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
