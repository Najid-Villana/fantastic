import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '< 2', unit: 'sec', label: 'Detection to suppression' },
  { value: '99.7', unit: '%', label: 'Fire classification accuracy' },
  { value: '24/7', unit: '', label: 'Autonomous monitoring' },
];

const specs = [
  { label: 'Detection range', value: 'Up to 12 meters' },
  { label: 'Response', value: 'Pan-tilt aim + valve release' },
  { label: 'Connectivity', value: 'Ethernet + IoT cloud' },
  { label: 'Power', value: '220–240V AC / battery backup' },
];

const compliance = ['NFPA 72', 'NFPA 75', 'NFPA 76', 'NFPA 2001'];

const SpecsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const specsRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);

  const [countedValues, setCountedValues] = useState<number[]>([0, 0, 0]);

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

      // Stats animation with count-up
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
              onEnter: () => {
                // Trigger count-up
                if (i === 0) {
                  animateCount(0, 2, 500, (val) => updateCount(0, val));
                } else if (i === 1) {
                  animateCount(0, 99.7, 800, (val) => updateCount(1, val));
                }
              },
            },
          }
        );
      });

      // Specs list animation
      gsap.fromTo(
        specsRef.current?.querySelectorAll('.spec-item') || [],
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: specsRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Compliance badges animation
      gsap.fromTo(
        complianceRef.current?.querySelectorAll('.compliance-badge') || [],
        { scale: 0.98, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: complianceRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateCount = (
    start: number,
    end: number,
    duration: number,
    callback: (val: number) => void
  ) => {
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = start + (end - start) * easeProgress;
      callback(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const updateCount = (index: number, value: number) => {
    setCountedValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative bg-ngfs-bg py-[10vh] lg:py-[12vh] px-6 lg:px-[6vw]"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-12 lg:mb-16">
        <h2 className="font-display font-bold text-[clamp(28px,3vw,48px)] text-ngfs-text leading-tight tracking-[-0.02em]">
          Performance you can measure
        </h2>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Big stats */}
        <div className="space-y-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="border-b border-white/10 pb-6"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display font-bold text-[clamp(48px,6vw,96px)] text-ngfs-text leading-none tracking-[-0.03em]">
                  {i === 0 && '< '}
                  {i === 2 ? stat.value : countedValues[i].toFixed(i === 1 ? 1 : 0)}
                </span>
                {stat.unit && (
                  <span className="font-display font-semibold text-2xl lg:text-3xl text-ngfs-accent">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="text-sm lg:text-base text-ngfs-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Right: Specs + Compliance */}
        <div>
          {/* Specs list */}
          <div ref={specsRef} className="mb-10">
            <h3 className="font-mono text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase mb-6">
              Technical Specifications
            </h3>
            <div className="space-y-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="spec-item flex justify-between items-center py-3 border-b border-white/5"
                >
                  <span className="text-sm text-ngfs-text-secondary">{spec.label}</span>
                  <span className="text-sm text-ngfs-text font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div ref={complianceRef}>
            <h3 className="font-mono text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase mb-6">
              Compliance
            </h3>
            <div className="flex flex-wrap gap-3">
              {compliance.map((item) => (
                <div
                  key={item}
                  className="compliance-badge flex items-center gap-2 bg-ngfs-bg-secondary border border-white/10 rounded-lg px-4 py-2"
                >
                  <Check className="w-4 h-4 text-ngfs-accent" />
                  <span className="font-mono text-xs text-ngfs-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
