import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const environmentTypes = [
  'Data Center',
  'Telecom Facility',
  'Industrial Plant',
  'Server Room',
  'Other',
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    environment: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        leftRef.current,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 34, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Demo request submitted! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      company: '',
      environment: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ngfs-bg py-[10vh] lg:py-[12vh] px-6 lg:px-[6vw]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left content */}
        <div ref={leftRef}>
          <h2 className="font-display font-bold text-[clamp(28px,3vw,48px)] text-ngfs-text leading-tight tracking-[-0.02em] mb-4">
            Ready to protect your facility?
          </h2>
          <p className="text-sm lg:text-base text-ngfs-text-secondary leading-relaxed mb-8">
            Tell us about your environment. We will recommend coverage, placement, and integration.
          </p>

          {/* Contact info */}
          <div className="space-y-4">
            <a
              href="mailto:sales@nextgenfiresafety.com"
              className="flex items-center gap-3 text-ngfs-text hover:text-ngfs-accent transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-ngfs-bg-secondary border border-white/10 flex items-center justify-center group-hover:border-ngfs-accent/30 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm">sales@nextgenfiresafety.com</span>
            </a>
            <a
              href="tel:+15550142200"
              className="flex items-center gap-3 text-ngfs-text hover:text-ngfs-accent transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-ngfs-bg-secondary border border-white/10 flex items-center justify-center group-hover:border-ngfs-accent/30 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-sm">+1 (555) 014-2200</span>
            </a>
          </div>

          {/* YouTube link */}
          <div className="mt-8">
            <a
              href="https://www.youtube.com/@NextGen-FireSafety"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ngfs-text-secondary hover:text-ngfs-accent transition-colors"
            >
              Watch more on YouTube
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="bg-ngfs-bg-secondary border border-white/10 rounded-xl p-6 lg:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs text-ngfs-text-secondary tracking-wide mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-ngfs-text-secondary tracking-wide mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-xs text-ngfs-text-secondary tracking-wide mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-ngfs-text-secondary tracking-wide mb-2">
                  Environment type
                </label>
                <select
                  name="environment"
                  value={formData.environment}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none cursor-pointer"
                >
                  <option value="">Select environment</option>
                  {environmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-ngfs-text-secondary tracking-wide mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your facility and requirements..."
                rows={4}
                className="w-full resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-ngfs-bg border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Request a demo
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
