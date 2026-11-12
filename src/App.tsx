import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building2, MapPin, Search, ExternalLink, Lightbulb, Sparkles, ChevronRight, GraduationCap } from 'lucide-react';

interface SearchResult {
  search_strategy: {
    primary_keywords: string[];
    search_query: string;
    alternative_query: string;
  };
  job_links: {
    linkedin: { url: string; query_used: string };
    glints: { url: string; query_used: string };
    jobstreet: { url: string; query_used: string };
  };
  tips: string[];
}

// Particle System Component for background
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{x: number, y: number, radius: number, vx: number, vy: number, alpha: number}> = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(window.innerWidth / 15, 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p.alpha})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
};

function App() {
  const [formData, setFormData] = useState({
    targetPosition: '',
    industry: '',
    experienceLevel: '',
    location: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateLinks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.targetPosition) return;

    setLoading(true);
    setResult(null);

    // Simulate AI Generation API Call
    setTimeout(() => {
      const position = formData.targetPosition.trim();
      const encodedPos = encodeURIComponent(position);
      const encodedLoc = encodeURIComponent(formData.location);
      
      const locQuery = formData.location ? `&location=${encodedLoc}` : '';
      const jsLocQuery = formData.location ? `/in-${formData.location.toLowerCase().replace(/\s+/g, '-')}` : '';

      const mockResponse: SearchResult = {
        search_strategy: {
          primary_keywords: [position, `${position} Specialist`, `Senior ${position}`],
          search_query: position,
          alternative_query: `${position} ${formData.industry}`
        },
        job_links: {
          linkedin: {
            url: `https://www.linkedin.com/jobs/search/?keywords=${encodedPos}${locQuery}`,
            query_used: position
          },
          glints: {
            url: `https://glints.com/id/opportunities/jobs/explore?keyword=${encodedPos}${locQuery}`,
            query_used: position
          },
          jobstreet: {
            url: `https://www.jobstreet.co.id/id/job-search/${position.toLowerCase().replace(/\s+/g, '-')}-jobs${jsLocQuery}`,
            query_used: position
          }
        },
        tips: [
          "Gunakan filter pengalaman (Junior/Mid/Senior) di platform untuk akurasi.",
          "Coba gunakan alternative query jika hasil pencarian utama kurang relevan.",
          "Set up job alerts di platform ini agar mendapat notifikasi lowongan terbaru."
        ]
      };

      setResult(mockResponse);
      setLoading(false);
    }, 2500); // 2.5s artificial delay for "AI processing" effect
  };

  return (
    <>
      <ParticleCanvas />
      
      <div className="app-container">
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles style={{ display: 'inline-block', marginBottom: '1rem', color: '#818cf8' }} size={40} />
          </motion.div>
          <h1 className="title">Job Link Generator</h1>
          <p className="subtitle">
            Buat tautan pencarian LinkedIn, Glints, dan JobStreet dari posisi dan lokasi pilihanmu. Demo ini memakai template lokal, tanpa layanan AI.
          </p>
        </motion.div>

        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={generateLinks}>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">
                  <Briefcase size={16} /> Target Position
                </label>
                <input 
                  type="text" 
                  name="targetPosition"
                  className="input-field" 
                  placeholder="e.g. Frontend Developer"
                  value={formData.targetPosition}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <Building2 size={16} /> Industry
                </label>
                <input 
                  type="text" 
                  name="industry"
                  className="input-field" 
                  placeholder="e.g. Fintech, E-Commerce"
                  value={formData.industry}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <GraduationCap size={16} /> Experience Level
                </label>
                <select 
                  name="experienceLevel"
                  className="input-field"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  style={{ appearance: 'none' }}
                >
                  <option value="" disabled>Select Level...</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead/Manager">Lead/Manager</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <MapPin size={16} /> Location
                </label>
                <input 
                  type="text" 
                  name="location"
                  className="input-field" 
                  placeholder="e.g. Indonesia, Remote"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <motion.button 
              type="submit" 
              className="generate-btn"
              disabled={loading || !formData.targetPosition}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>Menganalisis Data...</>
              ) : (
                <>
                  <Search size={20} />
                  Generate Smart Links
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div 
                key="loader"
                className="loader-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="spinner"></div>
                <div className="loading-text">Menyusun Search Strategy...</div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div 
                key="result"
                className="results-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Search Strategy */}
                <div className="result-section">
                  <h3 className="section-title">
                    <Search size={20} /> Search Strategy
                  </h3>
                  
                  <div className="keywords-container">
                    {result.search_strategy.primary_keywords.map((kw, i) => (
                      <motion.span 
                        key={i} 
                        className="keyword-pill"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {kw}
                      </motion.span>
                    ))}
                  </div>

                  <div className="query-card">
                    <div className="query-label">Optimized Query</div>
                    <div className="query-value">{result.search_strategy.search_query}</div>
                  </div>
                  
                  <div className="query-card" style={{ marginBottom: 0 }}>
                    <div className="query-label">Alternative Query</div>
                    <div className="query-value" style={{ color: 'var(--text-muted)' }}>
                      {result.search_strategy.alternative_query}
                    </div>
                  </div>
                </div>

                {/* Job Links */}
                <div className="result-section">
                  <h3 className="section-title">
                    <ExternalLink size={20} /> Direct Job Links
                  </h3>
                  
                  <div className="links-grid">
                    <a 
                      href={result.job_links.linkedin.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="platform-btn btn-linkedin"
                    >
                      <div className="platform-info">
                        <span>in</span> LinkedIn
                      </div>
                      <ChevronRight size={18} />
                    </a>

                    <a 
                      href={result.job_links.glints.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="platform-btn btn-glints"
                    >
                      <div className="platform-info">
                        <span style={{ fontWeight: 800, fontSize: '1.2em' }}>g</span> Glints
                      </div>
                      <ChevronRight size={18} />
                    </a>

                    <a 
                      href={result.job_links.jobstreet.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="platform-btn btn-jobstreet"
                    >
                      <div className="platform-info">
                        <span style={{ fontStyle: 'italic', fontWeight: 800 }}>JS</span> JobStreet
                      </div>
                      <ChevronRight size={18} />
                    </a>
                  </div>
                </div>

                {/* Tips */}
                <div className="result-section">
                  <h3 className="section-title">
                    <Lightbulb size={20} /> Pro Tips
                  </h3>
                  <ul className="tips-list">
                    {result.tips.map((tip, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                      >
                        <Sparkles size={16} className="tip-icon" />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

export default App;
