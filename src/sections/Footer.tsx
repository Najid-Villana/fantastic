import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  product: [
    { label: 'Products', href: '#products' },
    { label: 'Technology', href: '#technology' },
    { label: 'Use Cases', href: '#usecases' },
  ],
  company: [
    { label: 'Support', href: '#support' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

const socialLinks = [
  { icon: Youtube, href: 'https://www.youtube.com/@NextGen-FireSafety', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-ngfs-bg border-t border-white/5 py-10 lg:py-12 px-6 lg:px-[6vw]"
    >
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Logo and tagline */}
        <div className="max-w-sm">
          <a href="#" className="font-mono text-lg text-ngfs-text tracking-wider mb-4 block">
            NEXGENFIRESAFETY
          </a>
          <p className="text-sm text-ngfs-text-secondary leading-relaxed">
            Autonomous fire suppression systems for critical infrastructure. AI-powered detection,
            precise targeting, instant response.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-12 lg:gap-16">
          <div>
            <h4 className="font-mono text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ngfs-text hover:text-ngfs-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ngfs-text hover:text-ngfs-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div>
          <h4 className="font-mono text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase mb-4">
            Follow us
          </h4>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-ngfs-bg-secondary border border-white/10 flex items-center justify-center text-ngfs-text-secondary hover:text-ngfs-accent hover:border-ngfs-accent/30 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-ngfs-text-secondary">
          © 2026 NextGenFireSafety. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-ngfs-text-secondary/60">
          Incubated at FAST National University of Computer and Emerging Sciences
        </p>
      </div>
    </footer>
  );
};

export default Footer;
