import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import './App.css';

const LandingPage: React.FC = () => (
  <div className="min-h-screen w-full karsa-gradient text-white font-inter">
    {/* Modern Floating Header */}
    <header className="md:fixed md:top-6 md:left-1/2 md:transform md:-translate-x-1/2 z-50 p-4 md:p-0">
            <nav className="floating-nav px-4 md:px-8 lg:px-12 py-3 rounded-2xl md:rounded-full flex flex-col xl:flex-row items-center gap-4 md:gap-6 lg:gap-8">
        <div className="flex items-center gap-3">
          <span className="text-lg md:text-xl font-black tracking-tight">Neeric</span>
          <span className="hidden md:block text-xs text-gray-400"></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-[#1ed760] transition flex items-center gap-2">
            <span></span>
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#1ed760] transition flex items-center gap-2">
            <span></span>
            How it Works
          </a>
          <Link to="/dashboard" className="hover:text-[#1ed760] transition flex items-center gap-2">
            <span></span>
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-[#1ed760] transition flex items-center gap-2">
            <span></span>
            About
          </Link>
          <a href="#docs" className="hover:text-[#1ed760] transition flex items-center gap-2">
            <span></span>
            Docs
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold px-4 md:px-6 py-2 rounded-full text-sm transition">
            Try Dashboard
          </Link>
        </div>
      </nav>
    </header>

      {/* Hero Section */}
    <section className="w-full px-4 md:px-8 lg:px-16 pt-20 md:pt-32 pb-16 md:pb-32">
      <div className="max-w-7xl mx-auto hero-grid grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: Hero Text */}
        <div className="flex flex-col items-start hero-content">
          <div className="flex items-center gap-3 mb-6 md:mb-8 mx-auto md:mx-0">
            <span className="px-3 md:px-4 py-1 md:py-2 rounded-full bg-[#1ed760]/10 text-[#1ed760] font-semibold text-xs md:text-sm border border-[#1ed760]/20">
              ⚡ Live Beta
            </span>
          </div>
          <h1 className="hero-title premium-heading font-black mb-6 md:mb-8 leading-tight text-balance">
            Your AWS bills are<br />
            <span className="text-[#1ed760]">too damn high</span>
            </h1>
          <p className="hero-subtitle text-neutral-200 mb-8 md:mb-12 leading-relaxed max-w-lg font-medium text-balance">
            We built Neeric because we were tired of surprise AWS bills. Find forgotten resources, clean up waste, and actually understand where your money goes.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12 w-full md:w-auto">
            <Link to="/dashboard" className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg shadow-lg transition flex items-center gap-2 justify-center">
              <span>Start scanning now</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
          {/* Coming Soon Badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full md:w-auto mobile-stack">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 glass-card rounded-xl">
              <span className="text-[#1ed760] text-sm">📊</span>
              <div className="text-xs">
                <div className="text-neutral-400">Web Dashboard</div>
                <div className="font-semibold text-[#1ed760]">Available Now</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 glass-card rounded-xl">
              <span className="text-[#1ed760] text-sm">⚙️</span>
              <div className="text-xs">
                <div className="text-neutral-400">CLI Tool</div>
                <div className="font-semibold">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Enhanced Phone Mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative phone-mockup">
            {/* Enhanced Glow effect */}
            <div className="absolute inset-0 phone-glow scale-150"></div>
            
            {/* Responsive Phone mockup */}
            <svg width="300" height="600" viewBox="0 0 340 680" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-full max-w-[280px] md:max-w-[320px] h-auto">
              {/* Phone Frame */}
              <rect width="340" height="680" rx="50" fill="url(#phoneFrameGradient)"/>
              <rect x="8" y="8" width="324" height="664" rx="45" fill="#000000"/>
              
              {/* Screen Content */}
              <rect x="20" y="60" width="300" height="560" rx="25" fill="#050a05"/>
              
              {/* Status Bar */}
              <rect x="30" y="80" width="280" height="40" rx="8" fill="#0a1f0a"/>
              <text x="50" y="105" fill="#fff" fontSize="16" fontFamily="Inter" fontWeight="700">Neeric AWS Cleaner</text>
              <circle cx="280" cy="100" r="6" fill="#1ed760"/>
              <text x="295" y="107" fill="#1ed760" fontSize="11" fontFamily="Inter" fontWeight="600">Live</text>
              
              {/* Main Dashboard */}
              <text x="40" y="140" fill="#8b949e" fontSize="12" fontFamily="Inter">This Month</text>
              <text x="40" y="165" fill="#fff" fontSize="20" fontFamily="Inter" fontWeight="700">$847 wasted</text>
              
              {/* Stats Grid */}
              <rect x="40" y="180" width="120" height="80" rx="12" fill="#0a1f0a"/>
              <text x="50" y="200" fill="#ff6b6b" fontSize="12" fontFamily="Inter" fontWeight="600">💸 Waste</text>
              <text x="50" y="225" fill="#fff" fontSize="24" fontFamily="Inter" fontWeight="900">$3,247</text>
              <text x="50" y="245" fill="#8b949e" fontSize="10" fontFamily="Inter">vs last month</text>
              
              <rect x="170" y="180" width="120" height="80" rx="12" fill="#0a1f0a"/>
              <text x="180" y="200" fill="#1ed760" fontSize="12" fontFamily="Inter" fontWeight="600">💰 Savings</text>
              <text x="180" y="225" fill="#fff" fontSize="24" fontFamily="Inter" fontWeight="900">$2,891</text>
              <text x="180" y="245" fill="#8b949e" fontSize="10" fontFamily="Inter">recoverable</text>
              
              {/* Action Buttons */}
              <rect x="40" y="280" width="250" height="45" rx="22" fill="#1ed760"/>
              <text x="165" y="307" textAnchor="middle" fill="#000" fontSize="16" fontFamily="Inter" fontWeight="800">Find waste now</text>
              
              <rect x="40" y="335" width="250" height="40" rx="20" fill="transparent" stroke="#1ed760" strokeWidth="2"/>
              <text x="165" y="359" textAnchor="middle" fill="#1ed760" fontSize="14" fontFamily="Inter" fontWeight="700">See recommendations</text>
              
              {/* Waste Sources */}
              <text x="40" y="395" fill="#fff" fontSize="16" fontFamily="Inter" fontWeight="600">Biggest wastes</text>
              
              <rect x="40" y="410" width="250" height="45" rx="8" fill="#0a1f0a"/>
              <text x="50" y="428" fill="#fff" fontSize="12" fontFamily="Inter" fontWeight="600">🔥 Forgotten EC2s</text>
              <text x="50" y="442" fill="#8b949e" fontSize="10" fontFamily="Inter">47 instances running</text>
              <text x="260" y="437" fill="#ff6b6b" fontSize="14" fontFamily="Inter" fontWeight="700">$1,247</text>
              
              <rect x="40" y="465" width="250" height="45" rx="8" fill="#0a1f0a"/>
              <text x="50" y="483" fill="#fff" fontSize="12" fontFamily="Inter" fontWeight="600">💾 Orphaned storage</text>
              <text x="50" y="497" fill="#8b949e" fontSize="10" fontFamily="Inter">23 volumes attached to nothing</text>
              <text x="270" y="492" fill="#fbbf24" fontSize="14" fontFamily="Inter" fontWeight="700">$890</text>
              
              <rect x="40" y="520" width="250" height="45" rx="8" fill="#0a1f0a"/>
              <text x="50" y="538" fill="#fff" fontSize="12" fontFamily="Inter" fontWeight="600">⚖️ Idle load balancers</text>
              <text x="50" y="552" fill="#8b949e" fontSize="10" fontFamily="Inter">12 ALBs doing nothing</text>
              <text x="275" y="547" fill="#8b5cf6" fontSize="14" fontFamily="Inter" fontWeight="700">$754</text>
              
              {/* Phone Frame Gradient */}
              <defs>
                <linearGradient id="phoneFrameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1ed760"/>
                  <stop offset="50%" stopColor="#0a1f0a"/>
                  <stop offset="100%" stopColor="#000000"/>
                </linearGradient>
              </defs>
            </svg>
            </div>
          </div>
        </div>
      </section>

    {/* How It Works */}
    <section id="how-it-works" className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-32 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="section-title premium-heading font-black mb-6 md:mb-8 leading-tight">
            How we find your <span className="text-[#1ed760]">money</span>
          </h2>
          <p className="hero-subtitle text-neutral-300 mb-8 md:mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            No fancy AI talk. Just practical tools that find waste in your AWS account and help you clean it up safely.
          </p>
        </div>
        
        <div className="step-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="glass-card rounded-2xl card-compact text-center">
            <div className="w-16 h-16 rounded-full bg-[#1ed760]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <span className="text-[#1ed760] text-xl md:text-2xl font-black">1</span>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1ed760]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Connect (safely)</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mb-4 md:mb-6 mobile-optimized">
              Give us read-only access to your AWS account. We can't change anything without your permission.
            </p>
            <div className="glass-card rounded-xl p-3 md:p-4">
              <code className="text-[#1ed760] text-xs md:text-sm font-mono">
                Enter AWS credentials
              </code>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="glass-card rounded-2xl card-compact text-center">
            <div className="w-16 h-16 rounded-full bg-[#1ed760]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <span className="text-[#1ed760] text-xl md:text-2xl font-black">2</span>
                </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1ed760]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <span className="text-2xl">🔍</span>
              </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Find waste</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mb-4 md:mb-6 mobile-optimized">
              We scan everything - EC2 instances, RDS databases, load balancers, storage. If it's costing you money for nothing, we'll find it.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="glass-card rounded px-2 py-1 text-[#1ed760]">EC2 ✓</div>
              <div className="glass-card rounded px-2 py-1 text-[#1ed760]">RDS ✓</div>
              <div className="glass-card rounded px-2 py-1 text-[#1ed760]">S3 ✓</div>
              <div className="glass-card rounded px-2 py-1 text-[#1ed760]">+ 200 more</div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="glass-card rounded-2xl card-compact text-center md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 rounded-full bg-[#1ed760]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <span className="text-[#1ed760] text-xl md:text-2xl font-black">3</span>
                  </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1ed760]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
              <span className="text-2xl">💰</span>
                </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Save money</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mb-4 md:mb-6 mobile-optimized">
              Review what we found, approve what to delete, and watch your AWS bill shrink. We'll show you exactly how much you're saving.
            </p>
            <div className="glass-card rounded-xl p-3 md:p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-300">You could save</span>
                <span className="text-[#1ed760] font-bold">$2,847/mo</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <Link to="/dashboard" className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold px-8 md:px-12 py-3 md:py-4 rounded-full text-lg md:text-xl shadow-xl transition flex items-center gap-3 mx-auto w-fit">
            <span>Start saving money</span>
            <span className="text-xl">→</span>
          </Link>
          <p className="text-neutral-400 mt-3 md:mt-4 text-sm">Free scan • No credit card • 5 minutes</p>
          </div>
        </div>
      </section>

    {/* Documentation */}
    <section id="docs" className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-32 bg-gray-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="section-title premium-heading font-black mb-6 md:mb-8 leading-tight text-balance">
            Everything you need to <span className="text-[#1ed760]">get started</span>
          </h2>
          <p className="hero-subtitle text-neutral-300 mb-8 md:mb-12 leading-relaxed font-medium max-w-3xl mx-auto text-balance">
            Comprehensive guides, tutorials, and resources to help you optimize your AWS costs like a pro.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card rounded-2xl card-compact">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">Quick Start</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mb-6 text-center">
              Get scanning in under 5 minutes with our step-by-step setup guide.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Create IAM user with read-only permissions</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Connect your AWS account securely</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Start scanning and save money instantly</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl card-compact">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔧</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">What We Scan</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mb-6 text-center">
              We analyze 8+ AWS services to find waste and optimize costs.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>🖥️</span>EC2
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>🗄️</span>RDS
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>📦</span>S3
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>⚖️</span>ELB
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>⚡</span>Lambda
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>📋</span>Config
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>🔍</span>CloudTrail
              </div>
              <div className="glass-card rounded px-3 py-2 text-[#1ed760] flex items-center gap-2">
                <span>📊</span>+More
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl card-compact">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">Security First</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mb-6 text-center">
              Enterprise-grade security with read-only access and explicit permissions.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Read-only IAM permissions</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Local credential storage</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Explicit cleanup confirmation</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Full audit logging</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/dashboard?tab=docs" className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold px-8 py-4 rounded-full text-lg shadow-xl transition inline-flex items-center gap-3">
            <span>📚</span>
            Explore Full Documentation
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>



    {/* Features */}
    <section id="features" className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="section-title premium-heading font-black mb-6 md:mb-8 leading-tight text-balance">
            We know AWS can be <span className="text-[#1ed760]">confusing</span>
          </h2>
          <p className="hero-subtitle text-neutral-300 mb-8 md:mb-12 leading-relaxed font-medium max-w-3xl mx-auto text-balance">
            That's why we built simple tools that just work. No complex dashboards, no learning curves - just clear savings.
          </p>
        </div>
        
        <div className="feature-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1ed760]/10 flex items-center justify-center mb-4 md:mb-6">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Finds real waste</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mobile-optimized">We don't just flag "idle" resources. We find actual waste - things that are definitely safe to delete.</p>
          </div>
          
          <div className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1ed760]/10 flex items-center justify-center mb-4 md:mb-6">
              <span className="text-2xl">🛡️</span>
                </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Actually safe</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mobile-optimized">We're paranoid about safety. Everything is logged, reversible, and requires your approval.</p>
              </div>
          
          <div className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#1ed760]/10 flex items-center justify-center mb-4 md:mb-6">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Shows real savings</h3>
            <p className="text-neutral-400 leading-relaxed font-medium mobile-optimized">See exactly how much you're saving in dollars, not percentages or vague estimates.</p>
          </div>
          </div>
        </div>
      </section>

    {/* FAQ */}
    <section id="faq" className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title premium-heading font-black mb-12 md:mb-16 text-center text-balance">
          Frequently asked <span className="text-[#1ed760]">questions</span>
            </h2>
        <div className="space-y-4 md:space-y-6">
          <details className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all">
            <summary className="text-lg md:text-xl font-semibold cursor-pointer flex items-center justify-between">
              What is Neeric?
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transform transition-transform flex-shrink-0 md:w-6 md:h-6">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </summary>
            <p className="text-neutral-400 mt-4 md:mt-6 hero-subtitle leading-relaxed font-medium">
              Neeric is your AWS cleaning assistant. It finds, suggests, and helps you clean up cloud waste—so you save money and stay secure, without the hassle.
            </p>
          </details>
          
          <details className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all">
            <summary className="text-lg md:text-xl font-semibold cursor-pointer flex items-center justify-between">
              Is it safe to use?
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transform transition-transform flex-shrink-0 md:w-6 md:h-6">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </summary>
            <p className="text-neutral-400 mt-4 md:mt-6 hero-subtitle leading-relaxed font-medium">
              Absolutely. Neeric only suggests safe actions, and you're always in control. Every change is logged and reversible. We use read-only access by default and only make changes with explicit approval.
            </p>
          </details>
          
          <details className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all">
            <summary className="text-lg md:text-xl font-semibold cursor-pointer flex items-center justify-between">
              How much can I save?
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transform transition-transform flex-shrink-0 md:w-6 md:h-6">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </summary>
            <p className="text-neutral-400 mt-4 md:mt-6 hero-subtitle leading-relaxed font-medium">
              Most customers save 15-30% on their AWS bill in the first month. The exact amount depends on your infrastructure complexity and how long since your last cleanup.
            </p>
          </details>
          
          <details className="glass-card rounded-2xl card-compact hover:border-[#1ed760]/30 transition-all">
            <summary className="text-lg md:text-xl font-semibold cursor-pointer flex items-center justify-between">
              How do I get started?
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="transform transition-transform flex-shrink-0 md:w-6 md:h-6">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </summary>
            <p className="text-neutral-400 mt-4 md:mt-6 hero-subtitle leading-relaxed font-medium">
              Click "Try Dashboard" above to start scanning your AWS account right now. The setup takes less than 5 minutes.
            </p>
          </details>
        </div>
      </div>
    </section>

        {/* Final CTA */}
    <section id="early-access" className="w-full px-4 md:px-8 lg:px-16 py-16 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title premium-heading font-black mb-6 md:mb-8 leading-tight text-balance">
          Stop paying for <span className="text-[#1ed760]">nothing</span>
        </h2>
        <p className="hero-subtitle text-neutral-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium text-balance">
          Ready to see what you're wasting? Start your scan now and find out.
        </p>
        <div className="flex flex-col gap-4 md:gap-6 justify-center items-center">
          <Link to="/dashboard" className="bg-[#1ed760] hover:bg-[#1db954] text-black font-bold px-8 md:px-12 py-3 md:py-4 rounded-full text-lg md:text-xl shadow-xl transition flex items-center gap-3 mx-auto w-fit">
            <span>Launch Dashboard</span>
            <span className="text-xl">→</span>
          </Link>
          <div className="text-xs md:text-sm text-neutral-400">
            Free scan • No signup required • Real AWS integration
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16 border-t border-neutral-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Neeric</h3>
            <p className="text-neutral-400 mb-4 md:mb-6 max-w-md text-sm md:text-base">
              Simple AWS cleanup that actually works. Find waste, save money, sleep better.
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-neutral-800 hover:bg-[#1ed760] rounded-full flex items-center justify-center transition">
                <span className="text-lg">🐦</span>
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 bg-neutral-800 hover:bg-[#1ed760] rounded-full flex items-center justify-center transition">
                <span className="text-lg">💼</span>
              </a>
              <a href="mailto:hello@neeric.com" className="w-8 h-8 md:w-10 md:h-10 bg-neutral-800 hover:bg-[#1ed760] rounded-full flex items-center justify-center transition">
                <span className="text-lg">📧</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><a href="#features" className="hover:text-[#1ed760] transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-[#1ed760] transition">How it Works</a></li>
              <li><a href="#faq" className="hover:text-[#1ed760] transition">FAQ</a></li>
              <li><Link to="/dashboard" className="hover:text-[#1ed760] transition">Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-[#1ed760] transition">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li><a href="mailto:hello@neeric.com" className="hover:text-[#1ed760] transition">hello@neeric.com</a></li>
              <li><a href="#" className="hover:text-[#1ed760] transition">Support</a></li>
              <li><a href="#" className="hover:text-[#1ed760] transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800/50 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-neutral-400 text-xs md:text-sm">
            © 2024 Neeric. Built by people who got tired of AWS bills.
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-400">
            <span>From Y Combinator W25</span>
            <span className="text-[#1ed760]">🚀</span>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

export default App;