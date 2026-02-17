import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Technology', href: '#technology' },
    { label: 'Use Cases', href: '#usecases' },
    { label: 'Support', href: '#support' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'bg-ngfs-bg/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="font-mono text-sm lg:text-base text-ngfs-text tracking-wider">
            NEXGENFIRESAFETY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-ngfs-text-secondary hover:text-ngfs-text transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="font-mono text-xs text-ngfs-text hover:text-ngfs-accent transition-colors tracking-wide"
            >
              Contact
            </a>
            <a
              href="#contact"
              className="font-mono text-xs text-ngfs-accent border border-ngfs-accent/55 px-4 py-2 rounded-[10px] hover:bg-ngfs-accent/10 transition-colors tracking-wide"
            >
              Request demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-ngfs-text p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ngfs-bg/95 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block font-mono text-sm text-ngfs-text-secondary hover:text-ngfs-text transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <a
                href="#contact"
                className="block font-mono text-sm text-ngfs-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a
                href="#contact"
                className="inline-block font-mono text-sm text-ngfs-accent border border-ngfs-accent/55 px-4 py-2 rounded-[10px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request demo
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
