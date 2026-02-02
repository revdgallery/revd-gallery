import { Suspense } from 'react';
import { client, Exhibition } from '@/lib/sanity';
import { activeExhibitionQuery } from '@/lib/queries';
import GalleryViewer from '@/components/GalleryViewer';
import GalleryLoading from '@/components/GalleryLoading';

async function getActiveExhibition() {
  try {
    const exhibition = await client.fetch<Exhibition>(activeExhibitionQuery);
    return exhibition;
  } catch (error) {
    console.error('Error fetching exhibition:', error);
    return null;
  }
}

export default async function GalleryPage() {
  const exhibition = await getActiveExhibition();

  if (!exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gallery-light">
        <div className="text-center px-4">
          <h1 className="font-display text-3xl text-gallery-charcoal mb-4">
            No Active Exhibition
          </h1>
          <p className="text-gallery-mid max-w-md">
            There is no active exhibition at the moment. Please check back later or 
            browse our archive for past exhibitions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gallery-charcoal">
      {/* Exhibition Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-gallery-charcoal/80 to-transparent">
        <h1 className="font-display text-2xl text-gallery-white">
          {exhibition.title}
        </h1>
        <p className="text-sm text-gallery-gray mt-1">
          {new Date(exhibition.startDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })} — {new Date(exhibition.endDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* 3D Gallery Viewer */}
      <Suspense fallback={<GalleryLoading />}>
        <GalleryViewer exhibition={exhibition} />
      </Suspense>
    </div>
  );
}
