import { client, urlFor, Bulletin } from '@/lib/sanity';
import { publishedBulletinsQuery } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

async function getBulletins() {
  try {
    const bulletins = await client.fetch<Bulletin[]>(publishedBulletinsQuery);
    return bulletins || [];
  } catch (error) {
    console.error('Error fetching bulletins:', error);
    return [];
  }
}

export default async function BulletinPage() {
  const bulletins = await getBulletins();

  if (bulletins.length === 0) {
    return (
      <div className="min-h-screen bg-gallery-light py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl text-gallery-charcoal mb-8">
            Bulletin
          </h1>
          <div className="text-center py-16">
            <p className="text-gallery-mid">
              No bulletins published yet. Check back soon for updates.
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
            Bulletin
          </h1>
          <p className="text-gallery-dark max-w-2xl">
            Stay updated with our latest announcements, events, and news from REVD Gallery.
          </p>
        </div>

        {/* Featured Bulletin */}
        {bulletins.length > 0 && (
          <div className="mb-16">
            <Link href={`/bulletin/${bulletins[0].slug.current}`} className="group">
              <div className="grid md:grid-cols-2 gap-8 bg-gallery-white rounded-lg overflow-hidden 
                            shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Poster */}
                <div className="relative aspect-[3/4] md:aspect-auto">
                  {bulletins[0].poster && (
                    <Image
                      src={urlFor(bulletins[0].poster).width(600).height(800).url()}
                      alt={bulletins[0].title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-wider text-gallery-mid mb-2">
                    Latest
                  </span>
                  <h2 className="font-display text-3xl text-gallery-charcoal mb-4 
                               group-hover:text-gallery-dark transition-colors">
                    {bulletins[0].title}
                  </h2>
                  <div className="flex items-center gap-2 text-gallery-mid text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(bulletins[0].publishDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {bulletins[0].description && (
                    <p className="text-gallery-dark line-clamp-3">
                      {bulletins[0].description}
                    </p>
                  )}
                  <span className="mt-6 text-gallery-charcoal font-medium 
                                 group-hover:text-gallery-dark transition-colors">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* All Bulletins Grid */}
        {bulletins.length > 1 && (
          <div>
            <h2 className="font-display text-2xl text-gallery-charcoal mb-6">
              All Bulletins
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bulletins.slice(1).map((bulletin) => (
                <Link
                  key={bulletin._id}
                  href={`/bulletin/${bulletin.slug.current}`}
                  className="group bg-gallery-white rounded-lg overflow-hidden shadow-sm 
                           hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Poster */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {bulletin.poster && (
                      <Image
                        src={urlFor(bulletin.poster).width(400).height(533).url()}
                        alt={bulletin.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gallery-charcoal group-hover:text-gallery-dark 
                                 transition-colors line-clamp-2">
                      {bulletin.title}
                    </h3>
                    <p className="text-xs text-gallery-mid mt-2">
                      {new Date(bulletin.publishDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
