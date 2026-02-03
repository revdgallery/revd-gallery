import { client, urlFor, Bulletin } from '@/lib/sanity';
import { bulletinBySlugQuery, publishedBulletinsQuery } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';

interface BulletinDetailPageProps {
  params: { slug: string };
}

async function getBulletin(slug: string) {
  try {
    const bulletin = await client.fetch<Bulletin & { 
      eventDate?: string; 
      eventTime?: string; 
      location?: string;
      content?: any[];
    }>(bulletinBySlugQuery, { slug });
    return bulletin;
  } catch (error) {
    console.error('Error fetching bulletin:', error);
    return null;
  }
}

async function getOtherBulletins(currentSlug: string) {
  try {
    const bulletins = await client.fetch<Bulletin[]>(publishedBulletinsQuery);
    return bulletins?.filter(b => b.slug.current !== currentSlug).slice(0, 3) || [];
  } catch (error) {
    return [];
  }
}

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="my-8 relative">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'Image'}
          width={800}
          height={600}
          className="w-full rounded-lg"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children: any }) => (
      <h2 className="font-display text-2xl text-gallery-charcoal mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: any }) => (
      <h3 className="font-display text-xl text-gallery-charcoal mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children: any }) => (
      <p className="text-gallery-dark leading-relaxed mb-4">{children}</p>
    ),
  },
};

export default async function BulletinDetailPage({ params }: BulletinDetailPageProps) {
  const bulletin = await getBulletin(params.slug);
  const otherBulletins = await getOtherBulletins(params.slug);

  if (!bulletin) {
    return (
      <div className="min-h-screen bg-gallery-light py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/bulletin"
            className="inline-flex items-center gap-2 text-gallery-dark hover:text-gallery-charcoal 
                     transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bulletin
          </Link>
          <h1 className="font-display text-3xl text-gallery-charcoal">
            Bulletin Not Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gallery-light">
      {/* Header */}
      <div className="bg-gallery-white border-b border-gallery-gray">
        <div className="max-w-4xl mx-auto py-8 px-8">
          <Link 
            href="/bulletin"
            className="inline-flex items-center gap-2 text-gallery-dark hover:text-gallery-charcoal 
                     transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Bulletin
          </Link>
          <h1 className="font-display text-4xl text-gallery-charcoal mb-4">
            {bulletin.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gallery-mid">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(bulletin.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            {bulletin.eventDate && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  Event: {new Date(bulletin.eventDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  {bulletin.eventTime && ` at ${bulletin.eventTime}`}
                </span>
              </div>
            )}
            {bulletin.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{bulletin.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Poster */}
            {bulletin.poster && (
              <div className="relative aspect-[3/4] mb-8 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={urlFor(bulletin.poster).width(800).height(1067).url()}
                  alt={bulletin.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Description */}
            {bulletin.description && (
              <p className="text-lg text-gallery-dark leading-relaxed mb-8">
                {bulletin.description}
              </p>
            )}

            {/* Rich Content */}
            {bulletin.content && (
              <div className="prose max-w-none">
                <PortableText 
                  value={bulletin.content} 
                 components={portableTextComponents as any}

                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {otherBulletins.length > 0 && (
              <div className="sticky top-8">
                <h3 className="font-display text-lg text-gallery-charcoal mb-4">
                  More Bulletins
                </h3>
                <div className="space-y-4">
                  {otherBulletins.map((item) => (
                    <Link
                      key={item._id}
                      href={`/bulletin/${item.slug.current}`}
                      className="group flex gap-4 p-3 bg-gallery-white rounded-lg 
                               hover:shadow-md transition-shadow"
                    >
                      {item.poster && (
                        <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={urlFor(item.poster).width(64).height(80).url()}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-sm text-gallery-charcoal 
                                     group-hover:text-gallery-dark transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gallery-mid mt-1">
                          {new Date(item.publishDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
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
      </div>
    </div>
  );
}
