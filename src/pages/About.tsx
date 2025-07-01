import React from 'react';
import { Link } from 'react-router-dom';
import Lanyard from '../components/Lanyard';

const About: React.FC = () => {
  return (
    <div className="min-h-screen w-full karsa-gradient text-white font-inter flex flex-col items-center">
      {/* Header */}
      <header className="w-full flex flex-col items-center pt-10 pb-4">
        <nav className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-lg md:text-xl font-black tracking-tight hover:text-[#1ed760] transition">
            Neeric
          </Link>
          <Link to="/" className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold px-4 md:px-6 py-2 rounded-full text-sm transition">
            Back to Home
          </Link>
        </nav>
        <h1 className="section-title premium-heading font-black text-3xl md:text-4xl mb-2 text-center">
          Meet the <span className="text-[#1ed760]">Creator</span>
        </h1>
        <p className="hero-subtitle text-neutral-300 mb-8 leading-relaxed font-medium max-w-2xl text-center">
          Hi, I'm D Sidhant Patro. I build things that actually work, not just look pretty.
        </p>
      </header>

      {/* Side-by-side layout for card and about box */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl flex-1 gap-0 lg:gap-24" style={{ minHeight: '60vh' }}>
        {/* 3D Lanyard Card - left, now much wider and premium */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-3xl px-4" style={{ aspectRatio: '2/1', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 40px 0 rgba(30,255,120,0.08)', borderRadius: '2rem', border: '1.5px solid rgba(30,255,120,0.10)', background: 'rgba(30,32,40,0.10)' }}>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
          </div>
        </div>
        {/* About box - right */}
        <div className="flex-1 flex justify-center items-center w-full h-full">
          <div className="glass-card rounded-2xl p-6 md:p-8 max-w-xl w-full mx-auto mt-12 lg:mt-0">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-[#1ed760]">A Bit About Me</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              I'm not your typical "AI-powered" founder. I'm a developer who got tired of the same problems and decided to build solutions. I believe in transparency, simplicity, and building things that people actually need.
            </p>
            <p className="text-neutral-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, reading about system design, or trying to convince people that they don't need Kubernetes for their side project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 