import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Intersection Observer hook for scroll animations ── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealDiv({ className = '', children, ...props }) {
  const ref = useReveal()
  return <div ref={ref} className={`fade-up ${className}`} {...props}>{children}</div>
}

/* ── Icons ── */
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
)

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4c3 0 5.6-2.5 5.6-5.6C23 5.7 18 2 12 2zM6.5 12c-.8 0-1.5-.7-1.5-1.5S5.7 9 6.5 9 8 9.7 8 10.5 7.3 12 6.5 12zm3-4C8.7 8 8 7.3 8 6.5S8.7 5 9.5 5s1.5.7 1.5 1.5S10.3 8 9.5 8zm5 0c-.8 0-1.5-.7-1.5-1.5S13.7 5 14.5 5s1.5.7 1.5 1.5S15.3 8 14.5 8zm3 4c-.8 0-1.5-.7-1.5-1.5S16.7 9 17.5 9s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
)

/* ── Nav ── */
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-bark-50/95 backdrop-blur-md shadow-[0_2px_20px_rgba(26,46,19,0.08)]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Terrazas Lawn Care home">
          <span className="text-moss-600 transition-transform duration-300 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-9 h-9" fill="none">
              <circle cx="20" cy="14" r="10" fill="#5a9a3a" opacity="0.85"/>
              <circle cx="14" cy="16" r="7" fill="#467a2c" opacity="0.7"/>
              <circle cx="26" cy="16" r="7" fill="#7fb85e" opacity="0.6"/>
              <rect x="18.5" y="22" width="3" height="12" rx="1.5" fill="#5e4c36"/>
              <ellipse cx="20" cy="36" rx="8" ry="2" fill="#5a9a3a" opacity="0.2"/>
            </svg>
          </span>
          <div className="flex flex-col leading-none">
            <span className={`font-display font-bold text-lg tracking-tight transition-colors duration-300 ${scrolled ? 'text-moss-900' : 'text-white'}`}>Terrazas</span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${scrolled ? 'text-moss-600' : 'text-moss-200'}`}>Lawn Care</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Our Work', href: '#work' },
            { label: 'About', href: '#about' },
            { label: 'Quote', href: '#quote' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-moss-500 ${scrolled ? 'text-bark-700' : 'text-bark-100'}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:3179799956"
            className="inline-flex items-center gap-2 bg-moss-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_4px_14px_rgba(90,154,58,0.35)] hover:bg-moss-500 hover:shadow-[0_6px_20px_rgba(90,154,58,0.45)] active:scale-95 transition-all duration-200"
          >
            <PhoneIcon />
            (317) 979-9956
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-moss-800' : 'text-white'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bark-50/98 backdrop-blur-lg border-t border-bark-200/50 shadow-lg">
          <div className="px-6 py-6 flex flex-col gap-4">
            {[
              { label: 'Our Work', href: '#work' },
              { label: 'About', href: '#about' },
              { label: 'Quote', href: '#quote' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-bark-800 font-medium text-base py-2 hover:text-moss-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:3179799956"
              className="inline-flex items-center justify-center gap-2 bg-moss-600 text-white px-5 py-3 rounded-full text-sm font-semibold mt-2"
            >
              <PhoneIcon />
              (317) 979-9956
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/media/hero-stripes.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-moss-950/70 via-moss-900/50 to-moss-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-moss-950/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-2xl">
          <RevealDiv>
            <span className="inline-block text-moss-300 text-sm font-semibold uppercase tracking-[0.2em] mb-6 border border-moss-500/30 rounded-full px-4 py-1.5 bg-moss-900/30 backdrop-blur-sm">
              Professional Lawn Maintenance
            </span>
          </RevealDiv>

          <RevealDiv>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6">
              Your Lawn,{' '}
              <span className="italic text-moss-300">
                Our Pride
              </span>
            </h1>
          </RevealDiv>

          <RevealDiv>
            <p className="text-bark-200 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
              Serving Indianapolis and surrounding areas with reliable, quality lawn care. Let us keep your yard looking its best, so you can enjoy it.
            </p>
          </RevealDiv>

          <RevealDiv>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-moss-500 text-white px-8 py-4 rounded-full text-base font-semibold shadow-[0_8px_30px_rgba(90,154,58,0.4)] hover:bg-moss-400 hover:shadow-[0_12px_40px_rgba(90,154,58,0.5)] active:scale-95 transition-all duration-200"
              >
                Get a Free Quote
              </a>
              <a
                href="tel:3179799956"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all duration-200 backdrop-blur-sm"
              >
                <PhoneIcon />
                Call Now
              </a>
            </div>
          </RevealDiv>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white/60 text-xs uppercase tracking-[0.15em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}

/* ── Our Work ── */
const gallery = [
  {
    src: '/media/work-mowing.jpg',
    alt: 'Freshly mowed lawn with clean diagonal stripes beside a Terrazas Lawn Care trailer.',
    title: 'Weekly Mowing',
    meta: 'Clean stripes, every visit',
    span: 'md:col-span-2',
    position: 'object-center',
  },
  {
    src: '/media/work-mulch.jpg',
    alt: 'Freshly installed black mulch ring around a shrub bed on a manicured lawn.',
    title: 'Mulch Installation',
    meta: 'Fresh beds, neat edges',
    position: 'object-center',
  },
  {
    src: '/media/work-edging.jpg',
    alt: 'Walkway with sharp trimmed edges along a mulched bed and solar-lit path lights.',
    title: 'Trimming & Edging',
    meta: 'Crisp lines along walkways',
    position: 'object-top',
  },
  {
    src: '/media/work-beds.jpg',
    alt: 'Landscaped front yard with flowering shrubs, river rock beds, and boxwood plantings.',
    title: 'Landscape Care',
    meta: 'Beds, shrubs, and borders',
    position: 'object-center',
  },
  {
    src: '/media/work-spring.jpg',
    alt: 'Spring yard with a blooming magnolia tree, fresh mulch beds, and a freshly cut green lawn.',
    title: 'Spring Cleanup',
    meta: 'Prepped for the season',
    position: 'object-center',
  },
]

function OurWork() {
  return (
    <section id="work" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <RevealDiv className="text-center mb-16 md:mb-20">
          <span className="text-moss-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Our Work</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-moss-950 mb-4">
            Recent Jobs Around{' '}
            <span className="italic text-moss-600">Indianapolis</span>
          </h2>
          <p className="text-bark-500 text-lg max-w-xl mx-auto">
            Real photos from real properties. Clean lines, fresh mulch, and lawns we are proud to put our name on.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-4 md:gap-5 stagger">
          {gallery.map((g) => (
            <RevealDiv
              key={g.src}
              className={`group relative rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(26,46,19,0.08)] hover:shadow-[0_12px_40px_rgba(26,46,19,0.18)] transition-shadow duration-500 ${g.span || ''}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover ${g.position || 'object-center'} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950/85 via-moss-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <span className="block text-moss-200 text-[11px] font-semibold uppercase tracking-[0.18em] mb-1">
                  {g.meta}
                </span>
                <h3 className="font-display text-white text-xl md:text-2xl font-bold leading-tight">
                  {g.title}
                </h3>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv className="mt-12 md:mt-16 text-center">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-moss-600 text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-[0_8px_30px_rgba(90,154,58,0.35)] hover:bg-moss-500 hover:shadow-[0_12px_40px_rgba(90,154,58,0.5)] active:scale-95 transition-all duration-200"
          >
            Get your yard on this list
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-moss-900 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <RevealDiv className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <img
                src="/media/about-property.jpg"
                alt="Full property lawn care by Terrazas: fresh mulch beds, clean edging, and a manicured green lawn in Indianapolis."
                className="w-full h-[400px] md:h-[480px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moss-950/50 to-transparent" />
              <div className="absolute inset-0 bg-moss-600/10 mix-blend-multiply" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 md:right-8 bg-moss-500 text-white rounded-2xl px-6 py-4 shadow-[0_8px_30px_rgba(90,154,58,0.4)]">
              <span className="block text-2xl font-bold font-display">Local</span>
              <span className="text-moss-100 text-sm">&amp; Family Owned</span>
            </div>
          </RevealDiv>

          {/* Text */}
          <div>
            <RevealDiv>
              <span className="text-moss-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">About Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Honest Work,{' '}
                <span className="italic text-moss-300">Beautiful Results</span>
              </h2>
            </RevealDiv>

            <RevealDiv>
              <p className="text-bark-200 text-base leading-relaxed mb-6">
                Terrazas Lawn Care is owned and operated by Oscar Terrazas right here in Indianapolis. We treat every yard like it is our own, with the care, consistency, and attention to detail that only a local, hands-on team can deliver.
              </p>
              <p className="text-bark-200 text-base leading-relaxed mb-8">
                Whether you need weekly maintenance or a one-time cleanup, we show up on time, do the job right, and leave your property looking better than we found it. No contracts required. Just reliable service you can count on.
              </p>
            </RevealDiv>

            <RevealDiv>
              <ul className="space-y-3 mb-8">
                {['Licensed and insured', 'Serving Indianapolis and surrounding areas', 'Free estimates, no obligation', 'Flexible scheduling'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-bark-100">
                    <span className="text-moss-400"><CheckIcon /></span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </RevealDiv>

            <RevealDiv>
              <a
                href="#quote"
                className="inline-flex items-center gap-2 bg-moss-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold shadow-[0_8px_30px_rgba(90,154,58,0.35)] hover:bg-moss-400 hover:shadow-[0_12px_40px_rgba(90,154,58,0.5)] active:scale-95 transition-all duration-200"
              >
                Request Your Free Quote
              </a>
            </RevealDiv>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Quote Form ── */
function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', service: '', message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // For now, open mailto. Can be replaced with a form backend later.
    const subject = encodeURIComponent(`Quote Request from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nService: ${formData.service}\nMessage: ${formData.message}`
    )
    window.location.href = `mailto:oscarterrazas79@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClass = "w-full bg-white border border-bark-200 rounded-xl px-4 py-3.5 text-bark-800 text-sm placeholder:text-bark-300 focus:outline-none focus:border-moss-400 focus:ring-2 focus:ring-moss-400/20 transition-all duration-200"
  const labelClass = "block text-sm font-medium text-bark-700 mb-1.5"

  return (
    <section id="quote" className="relative py-24 md:py-32 bg-bark-50 grain-overlay overflow-hidden">
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-moss-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left side */}
          <div>
            <RevealDiv>
              <span className="text-moss-600 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Free Quote</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-moss-950 mb-6 leading-tight">
                Ready for a{' '}
                <span className="italic text-moss-600">Better Lawn?</span>
              </h2>
              <p className="text-bark-500 text-lg leading-relaxed mb-10">
                Fill out the form and we will get back to you within 24 hours with a free, no-obligation estimate. Or call us directly for a faster response.
              </p>
            </RevealDiv>

            <RevealDiv>
              <a
                href="tel:3179799956"
                className="inline-flex items-center gap-4 bg-moss-900 text-white rounded-2xl px-8 py-6 shadow-[0_8px_30px_rgba(26,46,19,0.15)] hover:bg-moss-800 transition-all duration-200 group mb-8"
              >
                <span className="bg-moss-500 rounded-full p-3 group-hover:scale-110 transition-transform duration-200">
                  <PhoneIcon />
                </span>
                <div className="text-left">
                  <span className="block text-bark-300 text-xs uppercase tracking-wider">Call or text anytime</span>
                  <span className="block text-xl font-bold font-display">(317) 979-9956</span>
                </div>
              </a>
            </RevealDiv>

            <RevealDiv>
              <a
                href="mailto:oscarterrazas79@gmail.com"
                className="text-moss-600 hover:text-moss-500 text-sm font-medium underline underline-offset-4 decoration-moss-300 transition-colors"
              >
                oscarterrazas79@gmail.com
              </a>
            </RevealDiv>
          </div>

          {/* Form */}
          <RevealDiv>
            {submitted ? (
              <div className="bg-white rounded-2xl p-10 shadow-[0_4px_24px_rgba(26,46,19,0.08)] border border-bark-100 text-center">
                <span className="text-5xl mb-4 block">✅</span>
                <h3 className="font-display text-2xl font-bold text-moss-900 mb-2">Request Sent!</h3>
                <p className="text-bark-500">Your email app should have opened with the quote details. Oscar will be in touch soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-moss-600 hover:text-moss-500 text-sm font-medium underline underline-offset-4 transition-colors"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_24px_rgba(26,46,19,0.08)] border border-bark-100"
              >
                <h3 className="font-display text-xl font-bold text-moss-900 mb-6">Get Your Free Estimate</h3>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input type="text" id="name" name="name" required placeholder="Your name" value={formData.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone *</label>
                    <input type="tel" id="phone" name="phone" required placeholder="(317) 555-0000" value={formData.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input type="email" id="email" name="email" placeholder="you@email.com" value={formData.email} onChange={handleChange} className={inputClass} />
                </div>

                <div className="mb-5">
                  <label htmlFor="address" className={labelClass}>Property Address *</label>
                  <input type="text" id="address" name="address" required placeholder="123 Main St, Indianapolis, IN" value={formData.address} onChange={handleChange} className={inputClass} />
                </div>

                <div className="mb-5">
                  <label htmlFor="service" className={labelClass}>Service Needed</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="Weekly Mowing">Weekly Mowing</option>
                    <option value="Bi-weekly Mowing">Bi-weekly Mowing</option>
                    <option value="One-time Mowing">One-time Mowing</option>
                    <option value="Trimming & Edging">Trimming & Edging</option>
                    <option value="Seasonal Cleanup">Seasonal Cleanup</option>
                    <option value="Fertilization">Fertilization</option>
                    <option value="Hedge Trimming">Hedge Trimming</option>
                    <option value="Mulching">Mulching</option>
                    <option value="Full Service Package">Full Service Package</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className={labelClass}>Additional Details</label>
                  <textarea id="message" name="message" rows="3" placeholder="Yard size, special requests, preferred schedule..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>

                <button
                  type="submit"
                  className="w-full bg-moss-600 text-white py-4 rounded-xl text-base font-semibold shadow-[0_4px_20px_rgba(90,154,58,0.3)] hover:bg-moss-500 hover:shadow-[0_8px_30px_rgba(90,154,58,0.45)] active:scale-[0.98] transition-all duration-200"
                >
                  Request Free Quote
                </button>

                <p className="text-center text-bark-400 text-xs mt-4">
                  No spam. No commitment. Just a quick, honest estimate.
                </p>
              </form>
            )}
          </RevealDiv>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-moss-950 text-bark-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-8 h-8" fill="none">
              <circle cx="20" cy="14" r="10" fill="#5a9a3a" opacity="0.85"/>
              <circle cx="14" cy="16" r="7" fill="#467a2c" opacity="0.7"/>
              <circle cx="26" cy="16" r="7" fill="#7fb85e" opacity="0.6"/>
              <rect x="18.5" y="22" width="3" height="12" rx="1.5" fill="#5e4c36"/>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-base">Terrazas Lawn Care</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-bark-400">Professional Lawn Maintenance</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#work" className="hover:text-moss-400 transition-colors">Our Work</a>
            <a href="#about" className="hover:text-moss-400 transition-colors">About</a>
            <a href="#quote" className="hover:text-moss-400 transition-colors">Get a Quote</a>
            <a href="tel:3179799956" className="hover:text-moss-400 transition-colors">(317) 979-9956</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-moss-800/50 flex flex-col sm:flex-row sm:justify-between gap-4 text-xs text-bark-500">
          <p>&copy; {year} Terrazas Lawn Care. All rights reserved.</p>
          <p>Indianapolis, Indiana</p>
        </div>
      </div>
    </footer>
  )
}

/* ── App ── */
function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <OurWork />
        <About />
        <QuoteForm />
      </main>
      <Footer />
    </>
  )
}

export default App
