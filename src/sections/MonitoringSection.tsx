import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dashboardImage from '../../public/dashboard_ui.jpg';
import { ArrowRight, Wifi } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MonitoringSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statusCardRef = useRef<HTMLDivElement>(null);

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
      // Image panel from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0, scale: 0.98 },
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
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Headline
      scrollTl.fromTo(
        textRef.current,
        { x: '-18vw', opacity: 0 },
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

      // Status card
      scrollTl.fromTo(
        statusCardRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, bodyRef.current, ctaRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        statusCardRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
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
        {/* Left content */}
        <div className="absolute left-[6vw] top-auto bottom-[8vh] lg:top-[12vh] lg:bottom-auto w-[90vw] lg:w-[38vw]">
          {/* Micro label */}
          <div ref={labelRef} className="mb-4 lg:mb-6">
            <span className="font-mono text-[11px] lg:text-xs text-ngfs-accent tracking-[0.12em] uppercase">
              Real-Time Monitoring
            </span>
          </div>

          {/* Headline */}
          <div ref={textRef} className="mb-4 lg:mb-6">
            <h2 className="font-display font-bold text-[clamp(28px,3.5vw,56px)] text-ngfs-text leading-[1.1] tracking-[-0.02em] uppercase">
              Always
              <br />
              On.
            </h2>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="mb-6 lg:mb-8">
            <p className="text-sm lg:text-base text-ngfs-text-secondary leading-relaxed">
              Cloud-connected telemetry, instant alerts, and a unified dashboard so your team knows
              the status of every protected zone—anytime, anywhere.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 lg:gap-4">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm">
              See the dashboard
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-secondary inline-flex items-center gap-2 text-sm">
              <Wifi size={16} />
              Integration options
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div
          ref={dividerRef}
          className="hidden lg:block absolute left-[47vw] top-[14vh] w-[1px] h-[72vh] bg-white/25"
          style={{ transformOrigin: 'top center' }}
        />

        {/* Right image panel */}
        <div
          ref={imageRef}
          className="absolute right-[6vw] top-[14vh] w-[90vw] lg:w-[44vw] h-[35vh] lg:h-[72vh] rounded-2xl overflow-hidden"
        >
          <img
            src={dashboardImage}
            alt="Monitoring dashboard"
            className="w-full h-full object-cover image-cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ngfs-bg/40 to-transparent" />

          {/* Status card */}
          <div
            ref={statusCardRef}
            className="absolute right-[2vw] lg:right-[2vw] bottom-[4vh] card-glass px-4 py-3 lg:px-5 lg:py-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-ngfs-accent rounded-full animate-live-pulse" />
              </div>
              <div>
                <div className="font-mono text-[10px] lg:text-xs text-ngfs-accent tracking-wider uppercase">
                  Live
                </div>
                <div className="text-xs lg:text-sm text-ngfs-text-secondary">
                  System online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
