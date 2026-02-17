import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Entrance animation (on page load)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
      );

      // Top frame line
      tl.fromTo(
        topLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: 'left center' },
        '-=0.6'
      );

      // Headline
      tl.fromTo(
        headlineRef.current?.querySelectorAll('.headline-word') || [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
        '-=0.4'
      );

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Right card
      tl.fromTo(
        cardRef.current,
        { x: '10vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 0.7 },
        '-=0.6'
      );

      // Bottom frame line
      tl.fromTo(
        bottomLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: 'left center' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, cardRef.current], {
              opacity: 1,
              x: 0,
            });
            gsap.set([topLineRef.current, bottomLineRef.current], { opacity: 1 });
            gsap.set(bgRef.current, { y: 0, scale: 1 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - no animation (must match load end state)
      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { y: 0, scale: 1 },
        { y: '-10vh', scale: 1.06, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [topLineRef.current, bottomLineRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-ngfs-bg flex items-center justify-center"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_robot_wide.jpg"
          alt="Autonomous fire suppression robot"
          className="w-full h-full object-cover image-cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ngfs-bg/90 via-ngfs-bg/50 to-ngfs-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ngfs-bg via-transparent to-ngfs-bg/30" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full h-full px-6 lg:px-[6vw]">
        {/* Top frame line */}
        <div
          ref={topLineRef}
          className="absolute left-[6vw] top-[10vh] w-[88vw] h-[1px] bg-white/12"
          style={{ transformOrigin: 'left center' }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 red-dot" />
        </div>

        {/* Top label */}
        <div className="absolute left-[6vw] top-[12vh]">
          <span className="font-mono text-[11px] lg:text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase">
            Autonomous Suppression System
          </span>
        </div>

        {/* Headline block */}
        <div
          ref={headlineRef}
          className="absolute left-[6vw] top-[18vh] w-[90vw] lg:w-[46vw]"
        >
          <h1 className="font-display font-bold text-[clamp(36px,5.2vw,84px)] text-ngfs-text leading-[1.05] tracking-[-0.02em] uppercase">
            <span className="headline-word inline-block">Autonomous</span>
            <br />
            <span className="headline-word inline-block">Suppression</span>
          </h1>
        </div>

        {/* Subheadline + CTA */}
        <div
          ref={subheadRef}
          className="absolute left-[6vw] top-[42vh] lg:top-[48vh] w-[90vw] lg:w-[34vw]"
        >
          <p className="text-base lg:text-lg text-ngfs-text-secondary leading-relaxed">
            AI detection, precise targeting, and instant response—engineered for critical environments.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="absolute left-[6vw] top-[54vh] lg:top-[58vh] flex flex-wrap gap-4"
        >
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm">
            Request a demo
            <ArrowRight size={16} />
          </a>
          <a
            href="https://www.youtube.com/watch?v=dlzeAx23HgU"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <Play size={16} />
            Watch the film
          </a>
        </div>

        {/* Right info card */}
        <div
          ref={cardRef}
          className="absolute right-[6vw] top-auto bottom-[15vh] lg:top-[18vh] lg:bottom-auto w-[88vw] lg:w-[28vw] card-glass p-6 lg:p-8"
        >
          <h3 className="font-display font-semibold text-lg text-ngfs-text mb-4">
            Why NextGen?
          </h3>
          <ul className="space-y-3">
            {[
              'Sub-second detection & targeting',
              'Minimal collateral damage',
              '24/7 autonomous monitoring',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="red-dot mt-2 flex-shrink-0" />
                <span className="text-sm text-ngfs-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom frame line */}
        <div
          ref={bottomLineRef}
          className="absolute left-[6vw] bottom-[10vh] w-[88vw] h-[1px] bg-white/12"
          style={{ transformOrigin: 'left center' }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 red-dot" />
        </div>

        {/* Bottom label */}
        <div className="absolute left-[6vw] bottom-[7vh]">
          <span className="font-mono text-[10px] lg:text-xs text-ngfs-text-secondary tracking-[0.12em] uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
