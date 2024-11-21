import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Navigation() {
  return (
    <nav className="border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-[#38F8AC] text-2xl font-bold">
            <Logo className="w-24 sm:w-32" />
          </Link>
          <div className="flex gap-4 sm:gap-8 text-sm sm:text-base">
            <Link to="/spellen" className="text-gray-300 hover:text-[#38F8AC] whitespace-nowrap">
              Spellen
            </Link>
            <Link to="/blog" className="text-gray-300 hover:text-[#38F8AC] whitespace-nowrap">
              Blog
            </Link>
            <Link to="/winkel" className="text-gray-300 hover:text-[#38F8AC] whitespace-nowrap">
              Winkel
            </Link>
            <Link to="/over-ons" className="hidden sm:block text-gray-300 hover:text-[#38F8AC] whitespace-nowrap">
              Over ons
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}