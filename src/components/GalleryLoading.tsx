'use client';

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gallery-charcoal flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="absolute inset-0 border-4 border-gallery-gray/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-gallery-white rounded-full animate-spin" />
        </div>
        <p className="text-gallery-white font-display text-xl">
          Loading Gallery
        </p>
        <p className="text-gallery-mid text-sm mt-2">
          Preparing your virtual experience...
        </p>
      </div>
    </div>
  );
}
