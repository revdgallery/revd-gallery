import { client, urlFor, HomepageContent, Exhibition, Bulletin } from '@/lib/sanity';
import { homepageQuery, activeExhibitionQuery, publishedBulletinsQuery } from '@/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

async function getHomepageData() {
  try {
    const [homepage, activeExhibition, bulletins] = await Promise.all([
      client.fetch<HomepageContent>(homepageQuery),
      client.fetch<Exhibition>(activeExhibitionQuery),
      client.fetch<Bulletin[]>(publishedBulletinsQuery),
    ]);
    return { homepage, activeExhibition, bulletins };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return { homepage: null, activeExhibition: null, bulletins: [] };
  }
}

export default async function HomePage() {
  const { homepage, activeExhibition, bulletins } = await getHomepageData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gallery-charcoal overflow-hidden">
        {homepage?.heroImage ? (
          <Image
            src={urlFor(homepage.heroImage).width(1920).height(1080).url()}
            alt="REVD Gallery"
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gallery-charcoal to-gallery-black" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gallery-white px-4">
            <h1 className="font-display text-5xl md:text-7xl font-semibold mb-4">
              {homepage?.heroTitle || 'REVD Gallery'}
            </h1>
            <p className="text-lg md:text-xl text-gallery-gray max-w-2xl mx-auto">
              {homepage?.heroSubtitle || 'Contemporary Art Space'}
            </p>
            {activeExhibition && (
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gallery-white text-gallery-charcoal 
                         hover:bg-gallery-light transition-colors duration-300"
              >
                Enter Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Current Exhibition */}
      {activeExhibition && (
        <section className="py-16 px-8 bg-gallery-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl text-gallery-charcoal mb-8">
              Current Exhibition
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {activeExhibition.coverImage && (
                <div className="relative aspect-[4/3] bg-gallery-light overflow-hidden">
                  <Image
                    src={urlFor(activeExhibition.coverImage).width(800).height(600).url()}
                    alt={activeExhibition.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="font-display text-2xl text-gallery-charcoal mb-4">
                  {activeExhibition.title}
                </h3>
                <div className="flex items-center gap-2 text-gallery-mid text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(activeExhibition.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                    })} — {new Date(activeExhibition.endDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                {activeExhibition.description && (
                  <p className="text-gallery-dark leading-relaxed mb-6">
                    {activeExhibition.description}
                  </p>
                )}
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 text-gallery-charcoal hover:text-gallery-dark 
                           transition-colors duration-200 font-medium"
                >
                  View Exhibition
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Active Exhibition */}
      {!activeExhibition && (
        <section className="py-16 px-8 bg-gallery-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-display text-3xl text-gallery-charcoal mb-4">
              Gallery
            </h2>
            <p className="text-gallery-mid">
              No active exhibition at the moment. Check our archive for past exhibitions.
            </p>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 mt-6 text-gallery-charcoal hover:text-gallery-dark 
                       transition-colors duration-200 font-medium"
            >
              Browse Archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Latest Bulletins */}
      {bulletins && bulletins.length > 0 && (
        <section className="py-16 px-8 bg-gallery-light">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-3xl text-gallery-charcoal">
                Bulletin
              </h2>
              <Link
                href="/bulletin"
                className="text-sm text-gallery-dark hover:text-gallery-charcoal transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {bulletins.slice(0, 3).map((bulletin) => (
                <Link
                  key={bulletin._id}
                  href={`/bulletin/${bulletin.slug.current}`}
                  className="group bg-gallery-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {bulletin.poster && (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={urlFor(bulletin.poster).width(400).height(533).url()}
                        alt={bulletin.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-medium text-gallery-charcoal group-hover:text-gallery-dark transition-colors">
                      {bulletin.title}
                    </h3>
                    <p className="text-xs text-gallery-mid mt-1">
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
        </section>
      )}

      {/* About Section */}
      <section className="py-16 px-8 bg-gallery-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-gallery-charcoal mb-6">
            About
          </h2>
          <p className="text-gallery-dark leading-relaxed">
            REVD Gallery is a contemporary art space dedicated to showcasing innovative works 
            from emerging and established artists. Our virtual gallery allows visitors to 
            experience art in an immersive 3D environment.
          </p>
        </div>
      </section>
    </div>
  );
}
