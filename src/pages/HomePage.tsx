import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Users, Shield, Star, Clock, TrendingUp, ChevronRight, Play } from 'lucide-react';
import { CURRENT_USER, MOCK_USERS, CATEGORY_COLORS } from '../data/mockData';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const [animatedTokens, setAnimatedTokens] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setAnimatedTokens(count);
        if (count >= CURRENT_USER.tokens) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { user: MOCK_USERS[0], text: "I traded my design skills for React lessons. Best decision ever! Saved $500 on courses.", skill: "UI/UX → React.js" },
    { user: MOCK_USERS[1], text: "Learned Spanish in 3 months by teaching Python. The token system is genius!", skill: "ML → Spanish" },
    { user: MOCK_USERS[2], text: "Found my perfect learning partner within hours. The AI matching is incredibly accurate.", skill: "Marketing → Python" },
  ];

  const stats = [
    { label: 'Active Learners', value: '12,400+', icon: '👥' },
    { label: 'Skills Available', value: '340+', icon: '🎯' },
    { label: 'Sessions Completed', value: '48,000+', icon: '✅' },
    { label: 'Tokens Exchanged', value: '62,000+', icon: '🪙' },
  ];

  const howItWorks = [
    { step: '01', title: 'List Your Skills', desc: 'Add skills you can teach and skills you want to learn. Our AI verifies your expertise level.', icon: '📝', color: 'from-indigo-500 to-purple-500' },
    { step: '02', title: 'Get AI-Matched', desc: 'Our smart algorithm finds your perfect learning partners based on skill compatibility and schedules.', icon: '🤖', color: 'from-cyan-500 to-blue-500' },
    { step: '03', title: 'Schedule & Connect', desc: 'Book video sessions, chat in real-time, and start your skill exchange journey today.', icon: '📅', color: 'from-emerald-500 to-teal-500' },
    { step: '04', title: 'Earn & Learn', desc: 'Teach 1 hour = Earn 1 Token. Use tokens to unlock learning sessions. Completely free!', icon: '🪙', color: 'from-amber-500 to-orange-500' },
  ];

  const features = [
    { icon: '🤖', title: 'AI Matching Engine', desc: 'Smart algorithm pairs you with the most compatible learning partners based on skill needs, schedule, and learning style.', color: 'indigo' },
    { icon: '📹', title: 'Built-in Video Calls', desc: 'WebRTC-powered HD video sessions directly in the browser. No downloads required. Share screen, whiteboard & more.', color: 'cyan' },
    { icon: '🪙', title: 'Token Economy', desc: 'Fair, transparent skill-bartering system. Teach 1 hour = 1 token = Learn 1 hour. No money involved.', color: 'amber' },
    { icon: '💬', title: 'Real-time Chat', desc: 'WebSocket-powered instant messaging with file sharing, emoji reactions, and session scheduling.', color: 'emerald' },
    { icon: '🎯', title: 'Skill Assessment', desc: 'Peer-rated mini-assessments verify your skill levels. Earn verified badges to build trust in the community.', color: 'pink' },
    { icon: '📊', title: 'Progress Tracking', desc: 'Visual dashboards track your learning journey, teaching hours, skill improvements, and token earnings.', color: 'purple' },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl float-anim"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl float-anim" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white/90">AI-Powered Skill Exchange Platform</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Learn More,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Spend Zero
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-lg">
              Trade your expertise for the skills you need. Teach React, learn Guitar.
              Teach Design, learn Python. <strong className="text-white">Zero cost. Pure value.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setCurrentPage('discover')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
              >
                Start Exchanging Skills
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('guide')}
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                How It Works
              </button>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Dashboard Card */}
          <div className="z-10 hidden lg:block">
            <div className="glass rounded-3xl p-6 shadow-2xl">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img src={CURRENT_USER.avatar} alt={CURRENT_USER.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{CURRENT_USER.name}</h3>
                  <p className="text-slate-400 text-sm">{CURRENT_USER.location}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-amber-400">🪙 {animatedTokens}</div>
                  <div className="text-slate-400 text-xs">tokens</div>
                </div>
              </div>

              {/* Skills Offered */}
              <div className="mb-4">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">I Can Teach</p>
                <div className="flex flex-wrap gap-2">
                  {CURRENT_USER.skillsOffered.slice(0, 3).map((skill) => (
                    <span key={skill.id} className={`skill-badge ${CATEGORY_COLORS[skill.category]} text-xs`}>
                      {skill.verified && '✓ '}{skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="mb-6">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">I Want to Learn</p>
                <div className="flex flex-wrap gap-2">
                  {CURRENT_USER.skillsWanted.map((skill) => (
                    <span key={skill.id} className="skill-badge bg-white/10 text-white/80 border border-white/20 text-xs">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Preview */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-slate-400 text-xs font-medium mb-3">🤖 Top AI Match</p>
                <div className="flex items-center gap-3">
                  <img src={MOCK_USERS[0].avatar} alt={MOCK_USERS[0].name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{MOCK_USERS[0].name}</p>
                    <p className="text-slate-400 text-xs">Teaches Design • Wants React</p>
                  </div>
                  <div className="bg-green-500/20 text-green-400 text-sm font-bold px-2 py-1 rounded-lg">
                    96%
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('matches')}
                  className="mt-3 w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Connect Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="font-display text-2xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">HOW IT WORKS</span>
            <h2 className="font-display text-4xl font-bold text-slate-800 mb-4">Start Exchanging in 4 Simple Steps</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">No credit cards. No subscriptions. Just pure skill-for-skill exchange powered by AI.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent z-0"></div>
                )}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-slate-400 mb-2">STEP {step.step}</div>
                  <h3 className="font-display font-bold text-slate-800 text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-cyan-50 text-cyan-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">PLATFORM FEATURES</span>
            <h2 className="font-display text-4xl font-bold text-slate-800 mb-4">Everything You Need to Learn & Teach</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Enterprise-grade features. Community-powered learning. Zero cost to you.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-slate-100 rounded-2xl p-6 card-hover shadow-sm hover:border-indigo-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-bold text-slate-800 text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                <button
                  onClick={() => setCurrentPage('guide')}
                  className="mt-4 text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Learn more <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOKEN ECONOMY ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-indigo-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">🪙 TOKEN ECONOMY</span>
              <h2 className="font-display text-4xl font-bold mb-6">The Fairest Learning Currency Ever Created</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Our token system ensures perfectly balanced exchanges. Every teacher is valued equally, regardless of skill type. One hour of your time = one token = one hour of learning.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🏫', text: 'Teach 1 hour → Earn 1 SkillToken' },
                  { icon: '📚', text: 'Spend 1 SkillToken → Learn 1 hour' },
                  { icon: '🎁', text: 'New users get 3 bonus tokens to start' },
                  { icon: '🏆', text: 'Earn bonus tokens for badges & referrals' },
                  { icon: '🔒', text: 'Tokens never expire. No hidden fees.' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage('wallet')}
                className="mt-8 flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                View My Wallet
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Token Visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full token-shine flex items-center justify-center shadow-2xl float-anim">
                  <div className="w-56 h-56 rounded-full bg-amber-400/80 flex flex-col items-center justify-center">
                    <span className="text-6xl">🪙</span>
                    <span className="text-slate-900 font-display font-bold text-2xl mt-2">SkillToken</span>
                    <span className="text-slate-800 text-sm mt-1">1 Hour of Learning</span>
                  </div>
                </div>
                {/* Orbiting badges */}
                {[
                  { label: 'Teach', value: '→ +1', pos: 'top-2 left-0 -translate-x-1/2', color: 'bg-indigo-500' },
                  { label: 'Learn', value: '← -1', pos: 'bottom-2 right-0 translate-x-1/2', color: 'bg-cyan-500' },
                  { label: 'Bonus', value: '+3 🎁', pos: 'top-1/2 left-0 -translate-x-full -translate-y-1/2', color: 'bg-emerald-500' },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className={`absolute ${badge.pos} ${badge.color} text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg`}
                  >
                    <div>{badge.label}</div>
                    <div>{badge.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block bg-emerald-50 text-emerald-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">SUCCESS STORIES</span>
            <h2 className="font-display text-4xl font-bold text-slate-800">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className={`bg-white border-2 rounded-2xl p-6 transition-all duration-500 card-hover ${activeTestimonial === i ? 'border-indigo-200 shadow-xl shadow-indigo-50' : 'border-slate-100 shadow-sm'}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={item.user.avatar} alt={item.user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.user.name}</p>
                    <p className="text-xs text-indigo-600 font-medium">{item.skill}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Your Skill Exchange Journey?
          </h2>
          <p className="text-indigo-100 text-xl mb-10">
            Join 12,400+ learners already exchanging skills. Get 3 free tokens when you sign up today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('discover')}
              className="bg-white text-indigo-600 font-bold px-10 py-4 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Started Free
            </button>
            <button
              onClick={() => setCurrentPage('matches')}
              className="border-2 border-white/40 text-white font-semibold px-10 py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Find Matches
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-indigo-200 text-sm">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> No credit card required</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> 4.9/5 average rating</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> First session in minutes</span>
            <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> 340+ skills available</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">SkillBridge</span>
            </div>
            <p className="text-sm">© 2025 SkillBridge. AI-Powered Peer-to-Peer Skill Exchange Platform.</p>
            <div className="flex gap-6 text-sm">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
