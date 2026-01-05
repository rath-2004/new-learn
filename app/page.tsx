'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [nameComplete, setNameComplete] = useState(false);

  const name = 'Ratheesh R S';
  const roles = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
  ];

  // Typewriter for name (runs once)
  useEffect(() => {
    if (displayedName.length < name.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(name.slice(0, displayedName.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    } else {
      setNameComplete(true);
    }
  }, [displayedName]);

  // Typewriter for roles (loops)
  useEffect(() => {
    if (!nameComplete) return;

    const currentText = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole, roles, nameComplete]);

  useEffect(() => {

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current?.observe(el));

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i === j) return;
          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none z-0"></div>

      <div className="relative z-10">
        <header className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">RRS</div>
            <nav className="flex gap-8">
              <a href="#home" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</a>
              <a href="#work" className="text-gray-400 hover:text-cyan-400 transition-colors">Experience</a>
              <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent"></div>
          <div className="max-w-5xl text-center relative z-10">
            <div className="mb-6 animate-[fadeInUp_0.6s_ease-out]">
              <span className="text-cyan-400 text-sm uppercase tracking-widest">Hi there, I'm</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {displayedName}
                  {!nameComplete && <span className="animate-[blink_1s_step-end_infinite]">|</span>}
                </span>
              </span>
            </h1>
            <div className="h-16 md:h-20 mb-6 flex items-center justify-center">
              <p className="text-xl md:text-2xl font-semibold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {displayedText}
                  <span className="animate-[blink_1s_step-end_infinite]">|</span>
                </span>
              </p>
            </div>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10 animate-[fadeInUp_1s_ease-out]">
              Part-time Software Engineer building desktop applications with <span className="text-cyan-400">C++, Qt & AWS</span> while pursuing a Master of Computer Applications. Currently leading the redesign of GASCCK's institutional website and passionate about creating scalable, cloud-integrated solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-[fadeInUp_1.2s_ease-out]">
              <a href="#work" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                View Experience
              </a>
              <a href="tel:9360476203" className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300">
                📞 9360476203
              </a>
              <a href="mailto:ratheesh5005432@gmail.com" className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300">
                📧 Contact Me
              </a>
            </div>
          </div>
        </section>

        <section id="work" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Experience</span></h2>
              <p className="text-gray-400">Building innovative solutions</p>
            </div>
            
            <div className="space-y-8">
              {[
                { 
                  title: 'Software Engineer (Part-time)', 
                  period: '2024 - Present',
                  company: 'Startup',
                  location: 'Remote',
                  desc: 'Building advanced desktop applications using C++ and Qt framework, creating robust cross-platform Windows software with seamless AWS cloud integration. Architecting scalable solutions leveraging Lambda functions, S3 storage, and API Gateway for serverless backend infrastructure.',
                  tech: ['C++', 'Qt Framework', 'AWS', 'Lambda', 'S3', 'API Gateway']
                },
                { 
                  title: 'Project Manager - College Website Redesign', 
                  period: '2024 - 2025',
                  company: 'GASCCK (gascck.org.in)',
                  location: 'On-site',
                  desc: 'Spearheading a comprehensive redesign of the Government Arts & Science College website, transforming the digital presence through modern web technologies and user-centered design. Managing cross-functional teams to deliver a responsive, accessible platform.',
                  tech: ['Project Management', 'Web Development', 'Team Leadership', 'UX/UI', 'Responsive Design', 'Content Strategy']
                },
                { 
                  title: 'Cybersecurity Intern', 
                  period: 'Mar 2024 - June 2024',
                  company: 'TCS-iON',
                  location: 'Remote',
                  desc: 'Implemented a CAPTCHA using reCAPTCHA on a project\'s login page to improve security. Also conducted vulnerability assessments and developed incident response plans.',
                  tech: ['Cybersecurity', 'reCAPTCHA', 'Security Assessment', 'Penetration Testing']
                },
              ].map((exp, i) => (
                <div
                  key={i}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 scroll-animate opacity-0 translate-y-10"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{exp.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">🏢 {exp.company}</span>
                        <span className="flex items-center gap-1">📍 {exp.location}</span>
                      </div>
                    </div>
                    <span className="text-cyan-400 text-sm font-medium whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-gray-400 mb-4 leading-relaxed">{exp.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span></h2>
              <p className="text-gray-400">Innovative solutions & creative builds</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'College Website Redesign', desc: 'Comprehensive redesign and modernization of GASCCK\'s institutional website, implementing responsive design, accessibility standards (WCAG 2.1), and intuitive navigation.', tech: ['Web Design', 'Responsive', 'CMS', 'Accessibility', 'React'] },
                { title: 'Desktop Application Suite', desc: 'Production-grade desktop application built with C++ and Qt framework for cross-platform Windows environments with seamless AWS cloud integration.', tech: ['C++', 'Qt', 'AWS Lambda', 'S3', 'Desktop App'] },
                { title: 'Enterprise Authentication System', desc: 'Production-grade authentication with reCAPTCHA v3, JWT sessions, RBAC, rate limiting, and MFA support.', tech: ['Security', 'reCAPTCHA', 'JWT', 'Auth'] },
                { title: 'YouTube Video Downloader', desc: 'Full-stack media processing app with React frontend and Node.js backend using ytdl-core and FFmpeg for real-time conversion up to 4K.', tech: ['React', 'Node.js', 'FFmpeg', 'Video'] },
                { title: 'Movie Discovery Platform', desc: 'Intelligent cinema companion powered by TMDb API with advanced search filters, personalized recommendations, and watchlist functionality.', tech: ['JavaScript', 'REST API', 'TMDb'] },
                { title: 'Speech to Text Converter', desc: 'Real-time speech transcription using Web Speech API with multi-language support, continuous listening, and text export (TXT, PDF).', tech: ['Web Speech API', 'Real-time', 'NLP'] },
              ].map((project, i) => (
                <div
                  key={i}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 scroll-animate opacity-0 translate-y-10"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-800/50 to-gray-900/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 border-2 border-cyan-400/30 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technologies</span></h2>
              <p className="text-gray-400">A comprehensive toolkit built through hands-on experience and continuous learning</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: 'Languages & Frameworks', skills: ['C++', 'JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'React', 'Node.js', 'Qt Framework'], icon: '💻' },
                { category: 'Cloud & Backend', skills: ['AWS Lambda', 'S3', 'API Gateway', 'REST API', 'JWT', 'Express.js', 'Database Management'], icon: '☁️' },
                { category: 'Tools & Technologies', skills: ['Git', 'GitHub', 'FFmpeg', 'Web Speech API', 'reCAPTCHA', 'Responsive Design', 'WCAG 2.1'], icon: '🛠️' },
                { category: 'Professional Skills', skills: ['Project Management', 'Team Leadership', 'Problem Solving', 'Critical Thinking', 'Communication', 'Time Management', 'Quick Learning', 'Adaptability'], icon: '🎯' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 scroll-animate opacity-0 translate-y-10"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">{item.category}</h3>
                  <ul className="space-y-2">
                    {item.skills.map((skill, idx) => (
                      <li key={idx} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications & <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Recognition</span></h2>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20 scroll-animate opacity-0 translate-y-10">
              <div className="flex items-start gap-4">
                <div className="text-5xl">🎓</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-cyan-400">Cybersecurity Internship</h3>
                  <p className="text-gray-400 text-sm mb-3">🏢 TCS-iON (Remote) • Mar 2024 - June 2024</p>
                  <p className="text-gray-400 leading-relaxed">
                    Completed comprehensive remote internship focusing on cybersecurity best practices, gaining hands-on experience in protecting digital assets, implementing security protocols, and securing IT infrastructures against modern threats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="scroll-animate opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Work <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Together</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12">
                Have a project in mind? Let's create something amazing together.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Email', value: 'ratheesh5005432@gmail.com', icon: '📧', link: 'mailto:ratheesh5005432@gmail.com' },
                { label: 'Phone', value: '9360476203', icon: '📞', link: 'tel:9360476203' },
                { label: 'LinkedIn', value: 'ratheesh-r-s', icon: '💼', link: 'https://www.linkedin.com/in/ratheesh-r-s-6237442b9/' },
                { label: 'GitHub', value: '@rath-2004', icon: '💻', link: 'https://github.com/rath-2004' },
              ].map((contact, i) => (
                <a
                  key={i}
                  href={contact.link}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 scroll-animate opacity-0 translate-y-10 block"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl mb-3">{contact.icon}</div>
                  <div className="text-sm text-gray-500 mb-1">{contact.label}</div>
                  <div className="text-cyan-400 font-medium break-all text-sm">{contact.value}</div>
                </a>
              ))}
            </div>

            <div className="scroll-animate opacity-0 translate-y-10 transition-all duration-700">
              <a
                href="mailto:ratheesh5005432@gmail.com"
                className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-lg font-semibold"
              >
                Send Me a Message
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 px-6 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2024 Ratheesh R S. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/ratheesh-r-s-6237442b9/" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href="https://github.com/rath-2004" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="mailto:ratheesh5005432@gmail.com" className="hover:text-cyan-400 transition-colors">Email</a>
              <a href="tel:9360476203" className="hover:text-cyan-400 transition-colors">Phone</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
