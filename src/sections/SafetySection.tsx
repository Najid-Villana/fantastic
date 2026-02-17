import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import safetyImage from '../../public/safety_helmet.jpg';
import { ArrowRight, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SafetySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0%-30%)
      // Image panel from left (stronger distance)
      scrollTl.fromTo(
        imageRef.current,
        { x: '-70vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Divider line
      scrollTl.fromTo(
        dividerRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none' },
        0
      );

      // Label
      scrollTl.fromTo(
        labelRef.current,
        { x: '22vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Headline
      scrollTl.fromTo(
        textRef.current,
        { x: '22vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Body
      scrollTl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // CTAs
      scrollTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, bodyRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        dividerRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-ngfs-bg flex items-center justify-center"
    >
      <div className="relative w-full h-full px-6 lg:px-[6vw] flex items-center">
        {/* Left image panel */}
        <div
          ref={imageRef}
          className="absolute left-[6vw] top-[14vh] w-[90vw] lg:w-[44vw] h-[35vh] lg:h-[72vh] rounded-2xl overflow-hidden"
        >
          <img
            src={safetyImage}
            alt="Safety first"
            className="w-full h-full object-cover image-cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ngfs-bg/40 to-transparent" />
        </div>

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="hidden lg:block absolute left-[53vw] top-[14vh] w-[1px] h-[72vh] bg-white/25"
          style={{ transformOrigin: 'top center' }}
        />

        {/* Right content */}
        <div className="absolute left-[6vw] lg:left-[56vw] top-auto bottom-[8vh] lg:top-[12vh] lg:bottom-auto w-[90vw] lg:w-[38vw]">
          {/* Micro label */}
          <div ref={labelRef} className="mb-4 lg:mb-6">
            <span className="font-mono text-[11px] lg:text-xs text-ngfs-accent tracking-[0.12em] uppercase">
              Protection Strategy
            </span>
          </div>

          {/* Headline */}
          <div ref={textRef} className="mb-4 lg:mb-6">
            <h2 className="font-display font-bold text-[clamp(28px,3.5vw,56px)] text-ngfs-text leading-[1.1] tracking-[-0.02em] uppercase">
              Safety
              <br />
              First.
            </h2>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="mb-6 lg:mb-8">
            <p className="text-sm lg:text-base text-ngfs-text-secondary leading-relaxed">
              We design for the moment before the alarm: earlier detection, precise targeting, and
              clean suppression that protects people, equipment, and continuity.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 lg:gap-4">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm">
              Explore protection principles
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-secondary inline-flex items-center gap-2 text-sm">
              <Shield size={16} />
              Compliance & certifications
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
