import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Server, Radio, Factory } from 'lucide-react';
import datacenterImage from '../../public/usecase_datacenter.jpg';
import telecomImage from '../../public/usecase_telecom.jpg';
import industrialImage from '../../public/usecase_industrial.jpg';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: Server,
    title: 'Data Centers',
    description: 'Targeted suppression that protects servers from fire and water damage.',
    image: datacenterImage,
  },
  {
    icon: Radio,
    title: 'Telecom & Utilities',
    description: '24/7 monitoring for remote shelters and power rooms.',
    image: telecomImage,
  },
  {
    icon: Factory,
    title: 'Industrial Plants',
    description: 'Rugged detection that adapts to dust, vibration, and variable lighting.',
    image: industrialImage,
  },
];

const UseCasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 45%',
              scrub: 1,
            },
          }
        );

        // Parallax on image
        const img = card.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { y: -12 },
            {
              y: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="usecases"
      className="relative bg-ngfs-bg py-[10vh] lg:py-[12vh] px-6 lg:px-[6vw]"
    >
      {/* Header */}
      <div ref={headerRef} className="max-w-[44vw] mb-12 lg:mb-16">
        <h2 className="font-display font-bold text-[clamp(28px,3vw,48px)] text-ngfs-text leading-tight tracking-[-0.02em] mb-4">
          Built for critical environments
        </h2>
        <p className="text-sm lg:text-base text-ngfs-text-secondary leading-relaxed">
          Data centers, telecom shelters, and industrial plants share one thing: downtime is
          expensive. Our system is built to protect high-density, high-value spaces.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {useCases.map((useCase, i) => (
          <div
            key={useCase.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="group relative bg-ngfs-bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-ngfs-accent/30 transition-colors duration-300"
          >
            {/* Image */}
            <div className="relative h-[200px] lg:h-[240px] overflow-hidden">
              <img
                src={useCase.image}
                alt={useCase.title}
                className="w-full h-full object-cover image-cinematic transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ngfs-bg-secondary via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-ngfs-accent/10 flex items-center justify-center">
                  <useCase.icon className="w-5 h-5 text-ngfs-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-ngfs-text">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-sm text-ngfs-text-secondary leading-relaxed">
                {useCase.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 lg:mt-12">
        <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm">
          Discuss your environment
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default UseCasesSection;
