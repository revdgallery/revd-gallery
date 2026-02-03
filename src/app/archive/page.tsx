import { client, urlFor, ArchiveItem } from '@/lib/sanity';
import { archiveItemsQuery } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Download, ExternalLink } from 'lucide-react';

async function getArchiveItems() {
  try {
    const items = await client.fetch<ArchiveItem[]>(archiveItemsQuery);
    return items || [];
  } catch (error) {
    console.error('Error fetching archive:', error);
    return [];
  }
}

export default async function ArchivePage() {
  const archiveItems = await getArchiveItems();

  if (archiveItems.length === 0) {
    return (
      <div className="min-h-screen bg-gallery-light py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl text-gallery-charcoal mb-8">
            Archive
          </h1>
          <div className="text-center py-16">
            <p className="text-gallery-mid">
              No archived exhibitions yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gallery-light py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl text-gallery-charcoal mb-4">
            Archive
          </h1>
          <p className="text-gallery-dark max-w-2xl">
            Explore our past exhibitions. Each archived exhibition is preserved as a digital 
            catalog featuring all exhibited artworks and documentation.
          </p>
        </div>

        {/* Archive Grid - Booklet Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archiveItems.map((item) => (
            <Link 
              key={item._id}
              href={`/archive/${item._id}`}
              className="booklet group"
            >
              <div className="bg-gallery-white rounded-lg overflow-hidden shadow-md 
                            hover:shadow-xl transition-all duration-300">
                {/* Cover Image - Booklet Style */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {item.coverImage && (
                    <Image
                      src={urlFor(item.coverImage).width(400).height(533).url()}
                      alt={item.exhibition?.title || 'Exhibition'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Booklet spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r 
                                from-gallery-charcoal/20 to-transparent" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gallery-charcoal/60 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Artwork count badge */}
                  {item.exhibition?.artworks && (
                    <div className="absolute top-4 right-4 bg-gallery-white/90 px-3 py-1 
                                  rounded-full text-xs text-gallery-charcoal font-medium">
                      {item.exhibition.artworks.length} Artworks
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="p-5">
                  <h2 className="font-display text-lg text-gallery-charcoal mb-2 
                               group-hover:text-gallery-dark transition-colors">
                    {item.exhibition?.title || 'Untitled Exhibition'}
                  </h2>
                  
                  {item.exhibition && (
                    <div className="flex items-center gap-2 text-gallery-mid text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(item.exhibition.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })} — {new Date(item.exhibition.endDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}

                  {item.exhibition?.description && (
                    <p className="text-gallery-dark text-sm line-clamp-2">
                      {item.exhibition.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gallery-gray">
                    <span className="text-sm text-gallery-charcoal font-medium 
                                   group-hover:text-gallery-dark flex items-center gap-1">
                      View Catalog
                      <ExternalLink className="w-3 h-3" />
                    </span>
               {item.catalogPdf?.asset?.url && (

                      <span className="text-sm text-gallery-mid flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        PDF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
