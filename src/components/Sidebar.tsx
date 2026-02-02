'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, Archive, FileText, Mail } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Gallery', href: '/gallery', icon: Image },
  { name: 'Archive', href: '/archive', icon: Archive },
  { name: 'Bulletin', href: '/bulletin', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gallery-white border-r border-gallery-gray z-50">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-gallery-gray">
        <Link href="/" className="block">
          <h1 className="font-display text-2xl font-semibold text-gallery-charcoal tracking-wide">
            REVD
          </h1>
          <span className="text-xs uppercase tracking-[0.3em] text-gallery-mid mt-1 block">
            Gallery
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="py-8">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-6 py-3 text-sm
                    transition-all duration-200 border-l-2
                    ${isActive 
                      ? 'text-gallery-charcoal bg-gallery-gray/50 border-gallery-charcoal font-medium' 
                      : 'text-gallery-dark border-transparent hover:text-gallery-charcoal hover:bg-gallery-gray/30 hover:border-gallery-mid'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gallery-gray">
        <div className="flex items-center gap-2 text-gallery-mid text-xs">
          <Mail className="w-3 h-3" />
          <span>revdgallery@gmail.com</span>
        </div>
        <p className="text-[10px] text-gallery-mid mt-2">
          © {new Date().getFullYear()} REVD Gallery
        </p>
      </div>
    </aside>
  );
}
