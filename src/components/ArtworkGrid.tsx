'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor, Artwork } from '@/lib/sanity';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ArtworkGridProps {
  artworks: Artwork[];
}

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <button
            key={artwork._id}
            onClick={() => setSelectedArtwork(artwork)}
            className="group text-left"
          >
            <div className="relative aspect-square bg-gallery-gray overflow-hidden rounded-lg 
                          shadow-sm hover:shadow-md transition-shadow duration-300">
              {artwork.image && (
                <Image
                  src={urlFor(artwork.image).width(400).height(400).url()}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gallery-charcoal/0 group-hover:bg-gallery-charcoal/30 
                            transition-colors duration-300 flex items-center justify-center">
                <span className="text-gallery-white opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300 text-sm font-medium">
                  View Details
                </span>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="font-medium text-gallery-charcoal text-sm truncate">
                {artwork.title}
              </h3>
              <p className="text-gallery-mid text-xs mt-1">
                {artwork.artist}, {artwork.year}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gallery-charcoal/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gallery-white rounded-lg overflow-hidden max-w-4xl w-full 
                        flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-gallery-charcoal/80 text-gallery-white 
                         rounded-full hover:bg-gallery-charcoal transition-colors md:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative w-full md:w-2/3 aspect-square md:aspect-auto bg-gallery-light">
                {selectedArtwork.image && (
                  <Image
                    src={urlFor(selectedArtwork.image).width(1200).height(1200).url()}
                    alt={selectedArtwork.title}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              {/* Details */}
              <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto">
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 p-2 text-gallery-mid hover:text-gallery-charcoal 
                           transition-colors hidden md:block"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="font-display text-2xl text-gallery-charcoal mb-6">
                  {selectedArtwork.title}
                </h2>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-gallery-mid">Artist</dt>
                    <dd className="text-gallery-charcoal font-medium mt-1">
                      {selectedArtwork.artist}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-gallery-mid">Year</dt>
                    <dd className="text-gallery-charcoal mt-1">
                      {selectedArtwork.year}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-gallery-mid">Medium</dt>
                    <dd className="text-gallery-charcoal mt-1">
                      {selectedArtwork.medium}
                    </dd>
                  </div>
                </dl>

                {selectedArtwork.description && (
                  <div className="mt-6 pt-6 border-t border-gallery-gray">
                    <p className="text-gallery-dark text-sm leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
