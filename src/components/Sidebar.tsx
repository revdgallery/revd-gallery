'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image as ImageIcon, Archive, FileText, Mail } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Archive', href: '/archive', icon: Archive },
  { name: 'Bulletin', href: '/bulletin', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 z-50">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-800">
        <Link href="/" className="block">
          <h1 className="text-white text-xl font-bold">REV-D</h1>
          <span className="text-gray-400 text-xs">GALLERY</span>
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
                      ? 'text-white bg-gray-800/50 border-white font-medium' 
                      : 'text-gray-300 border-transparent hover:text-white hover:bg-gray-800/30 hover:border-gray-500'
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
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Mail className="w-3 h-3" />
          <span>revdgallery@gmail.com</span>
        </div>
        <Link 
          href="/terms" 
          className="block text-[10px] text-gray-400 mt-2 hover:text-white transition-colors"
        >
          Terms & Conditions / Legal Disclaimer
        </Link>
        <p className="text-[10px] text-gray-400 mt-1">
          © {new Date().getFullYear()} REV-D Gallery
        </p>
      </div>
    </aside>
  );
}