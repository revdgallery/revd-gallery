import { client, urlFor, ArchiveItem } from '@/lib/sanity';
import { archiveByIdQuery } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Download, X } from 'lucide-react';
import ArtworkGrid from '@/components/ArtworkGrid';

interface ArchiveDetailPageProps {
  params: { id: string };
}

async function getArchiveItem(id: string) {
  try {
    const item = await client.fetch<ArchiveItem>(archiveByIdQuery, { id });
    return item;
  } catch (error) {
    console.error('Error fetching archive item:', error);
    return null;
  }
}

export default async function ArchiveDetailPage({ params }: ArchiveDetailPageProps) {
  const archiveItem = await getArchiveItem(params.id);

  if (!archiveItem) {
    return (
      <div className="min-h-screen bg-gallery-light py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/archive"
            className="inline-flex items-center gap-2 text-gallery-dark hover:text-gallery-charcoal 
                     transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Archive
          </Link>
          <h1 className="font-display text-3xl text-gallery-charcoal">
            Exhibition Not Found
          </h1>
        </div>
      </div>
    );
  }

  const exhibition = archiveItem.exhibition;
  const artworks = exhibition?.artworks || [];

  return (
    <div className="min-h-screen bg-gallery-light">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gallery-charcoal">
        {archiveItem.coverImage && (
          <Image
            src={urlFor(archiveItem.coverImage).width(1920).height(1080).url()}
            alt={exhibition?.title || 'Exhibition'}
            fill
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-8 bg-gradient-to-t from-gallery-charcoal via-gallery-charcoal/50 to-transparent">
            <div className="max-w-6xl mx-auto">
              <Link 
                href="/archive"
                className="inline-flex items-center gap-2 text-gallery-gray hover:text-gallery-white 
                         transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Archive
              </Link>
              <h1 className="font-display text-4xl md:text-5xl text-gallery-white mb-3">
                {exhibition?.title || 'Untitled Exhibition'}
              </h1>
              {exhibition && (
                <div className="flex items-center gap-2 text-gallery-gray">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(exhibition.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })} — {new Date(exhibition.endDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto py-12 px-8">
        {/* Description */}
        {exhibition?.description && (
          <div className="mb-12">
            <h2 className="font-display text-2xl text-gallery-charcoal mb-4">
              About the Exhibition
            </h2>
            <p className="text-gallery-dark leading-relaxed max-w-3xl">
              {exhibition.description}
            </p>
          </div>
        )}

        {/* Download Catalog */}
     {archiveItem.catalogPdf?.asset?.url && (






          <div className="mb-12 p-6 bg-gallery-white rounded-lg inline-flex items-center gap-4">
            <div>
              <h3 className="font-medium text-gallery-charcoal">Exhibition Catalog</h3>
              <p className="text-sm text-gallery-mid">Download the full catalog (PDF)</p>
            </div>
            <a
            catalogPdf?.asset?.url



              download
              className="px-4 py-2 bg-gallery-charcoal text-gallery-white rounded 
                       hover:bg-gallery-dark transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        )}

        {/* Artworks */}
        {artworks.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-2xl text-gallery-charcoal mb-6">
              Exhibited Works ({artworks.length})
            </h2>
            <ArtworkGrid artworks={artworks} />
          </div>
        )}

        {/* Exhibition Photos */}
        {archiveItem.photos && archiveItem.photos.length > 0 && (
          <div>
            <h2 className="font-display text-2xl text-gallery-charcoal mb-6">
              Exhibition Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {archiveItem.photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="relative aspect-square bg-gallery-gray overflow-hidden rounded"
                >
                  <Image
                    src={urlFor(photo).width(400).height(400).url()}
                    alt={`Exhibition photo ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
