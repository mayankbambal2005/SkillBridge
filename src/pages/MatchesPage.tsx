import React, { useState } from 'react';
import { Zap, Star, MapPin, Users, CheckCircle, X, Heart, RefreshCw, TrendingUp, Info } from 'lucide-react';
import { MOCK_USERS, CURRENT_USER, CATEGORY_COLORS } from '../data/mockData';

interface MatchesPageProps {
  setCurrentPage: (page: string) => void;
}

const MatchesPage: React.FC<MatchesPageProps> = ({ setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [declined, setDeclined] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'swipe' | 'list'>('list');

  const matches = MOCK_USERS.map((user) => {
    const offeredWanted = user.skillsOffered.filter((s) =>
      CURRENT_USER.skillsWanted.some((w) => w.name === s.name || w.category === s.category)
    );
    const wantedOffered = user.skillsWanted.filter((s) =>
      CURRENT_USER.skillsOffered.some((o) => o.name === s.name || o.category === s.category)
    );
    const matchReasons = [
      ...(offeredWanted.length ? [`Teaches ${offeredWanted.map((s) => s.name).join(', ')} — what you want to learn`] : []),
      ...(wantedOffered.length ? [`Wants to learn ${wantedOffered.map((s) => s.name).join(', ')} — what you can teach`] : []),
      ...(user.rating >= 4.7 ? ['Highly rated teacher (4.7+)'] : []),
    ];
    return { ...user, matchReasons };
  });

  const pending = matches.filter((m) => !accepted.includes(m.id) && !declined.includes(m.id));
  const current = pending[currentIndex % pending.length];

  const handleAccept = () => {
    if (current) {
      setAccepted((prev) => [...prev, current.id]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleDecline = () => {
    if (current) {
      setDeclined((prev) => [...prev, current.id]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // ─── Algorithm explanation ───────────────────────────────────────────────
  const algorithmSteps = [
    { icon: '🔄', title: 'Skill Overlap Detection', desc: 'Finds users where your offered skills match their wanted skills AND vice versa — true bidirectional matching.' },
    { icon: '📊', title: 'Weighted Scoring', desc: 'Score = (skill overlap × 40) + (rating × 30) + (activity × 20) + (schedule compatibility × 10)' },
    { icon: '🌍', title: 'Context Filtering', desc: 'Considers timezone, language preference, session length availability, and learning style.' },
    { icon: '🧠', title: 'ML Refinement', desc: 'Over time, learns from your session feedback to improve future match quality.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">AI-Powered Matches</h1>
              <p className="text-indigo-100">Matched based on skill complementarity, ratings, and availability</p>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors backdrop-blur-sm"
            >
              <Info className="w-4 h-4" />
              How Matching Works
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 mt-6">
            {[
              { label: 'Total Matches', value: matches.length },
              { label: 'Accepted', value: accepted.length, color: 'text-green-300' },
              { label: 'Pending', value: pending.length, color: 'text-amber-300' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`font-display text-2xl font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
                <div className="text-indigo-200 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Algorithm Info Panel */}
        {showDetails && (
          <div className="mb-8 bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 flex items-center justify-between">
              <h3 className="font-display font-bold text-indigo-800 flex items-center gap-2">
                <Zap className="w-5 h-5" /> How the Matching Algorithm Works
              </h3>
              <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {algorithmSteps.map((step) => (
                <div key={step.title} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">{step.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Switch */}
        <div className="flex gap-2 mb-8">
          {(['list', 'swipe'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm capitalize transition-all ${
                activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {tab === 'list' ? '📋 Browse All' : '✨ Quick Match'}
            </button>
          ))}
        </div>

        {/* ─── SWIPE VIEW ─────────────────────────────────────────────────────── */}
        {activeTab === 'swipe' && (
          <div className="flex flex-col items-center">
            {pending.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-display font-bold text-slate-700 text-xl mb-2">You've reviewed all matches!</h3>
                <p className="text-slate-500 mb-6">Check your accepted connections or refresh for new ones</p>
                <button
                  onClick={() => { setDeclined([]); setCurrentIndex(0); }}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors mx-auto"
                >
                  <RefreshCw className="w-4 h-4" /> Refresh Matches
                </button>
              </div>
            ) : current ? (
              <div className="w-full max-w-sm">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 border border-slate-100">
                  {/* Match Score */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm flex items-center gap-2">
                        <Zap className="w-4 h-4" /> AI Match Score
                      </span>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-white font-bold text-lg">{current.matchScore || 80}%</span>
                      </div>
                    </div>
                    {/* Score Bar */}
                    <div className="mt-3 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-700"
                        style={{ width: `${current.matchScore || 80}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Profile */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img src={current.avatar} alt={current.name} className="w-16 h-16 rounded-2xl object-cover" />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${current.isOnline ? 'bg-green-400' : 'bg-slate-300'}`}></div>
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-slate-800 text-xl">{current.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {current.location}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-slate-700">{current.rating}</span>
                          <span className="text-slate-400 text-sm">• {current.completedSessions} sessions</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{current.bio}</p>

                    {/* Why matched */}
                    <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                      <p className="text-indigo-800 font-semibold text-sm mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Why you're matched:
                      </p>
                      {current.matchReasons.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-indigo-700 mb-1">
                          <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-indigo-500" />
                          {r}
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Can Teach You</p>
                        <div className="flex flex-wrap gap-1.5">
                          {current.skillsOffered.slice(0, 3).map((s) => (
                            <span key={s.id} className={`skill-badge text-xs ${CATEGORY_COLORS[s.category]}`}>{s.name}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Wants to Learn</p>
                        <div className="flex flex-wrap gap-1.5">
                          {current.skillsWanted.map((s) => (
                            <span key={s.id} className="skill-badge text-xs bg-slate-50 text-slate-500 border border-slate-200">{s.name}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleDecline}
                    className="w-16 h-16 rounded-2xl bg-white border-2 border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 shadow-md transition-all flex items-center justify-center hover:scale-110"
                  >
                    <X className="w-7 h-7" />
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
                  >
                    <Heart className="w-5 h-5" /> Connect & Exchange
                  </button>
                  <button
                    onClick={handleAccept}
                    className="w-16 h-16 rounded-2xl bg-white border-2 border-green-100 text-green-400 hover:bg-green-50 hover:border-green-200 shadow-md transition-all flex items-center justify-center hover:scale-110"
                  >
                    <CheckCircle className="w-7 h-7" />
                  </button>
                </div>

                <p className="text-center text-slate-400 text-sm mt-4">
                  {pending.length} matches remaining
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* ─── LIST VIEW ──────────────────────────────────────────────────────── */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            {matches.map((user) => {
              const isAccepted = accepted.includes(user.id);
              const isDeclined = declined.includes(user.id);
              return (
                <div
                  key={user.id}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
                    isAccepted ? 'border-green-200' : isDeclined ? 'border-slate-100 opacity-50' : 'border-slate-100 hover:border-indigo-100 hover:shadow-md'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Avatar + Status */}
                      <div className="relative flex-shrink-0">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-400' : 'bg-slate-300'}`}></div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="font-display font-bold text-slate-800 text-lg">{user.name}</h3>
                          {isAccepted && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Connected</span>}
                          {user.matchScore && (
                            <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                              <Zap className="w-3 h-3" /> {user.matchScore}% match
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {user.location}</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {user.rating} ({user.totalReviews})</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {user.completedSessions} sessions</span>
                          <span>🪙 {user.tokens} tokens</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Teaches</p>
                            <div className="flex flex-wrap gap-1.5">
                              {user.skillsOffered.slice(0, 3).map((s) => (
                                <span key={s.id} className={`skill-badge text-xs ${CATEGORY_COLORS[s.category]}`}>{s.name}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Learning</p>
                            <div className="flex flex-wrap gap-1.5">
                              {user.skillsWanted.map((s) => (
                                <span key={s.id} className="skill-badge text-xs bg-slate-50 text-slate-500 border border-slate-200">{s.name}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Match Reasons */}
                        {user.matchReasons.length > 0 && (
                          <div className="mt-3 flex items-start gap-2 bg-indigo-50 rounded-xl px-3 py-2">
                            <Zap className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <p className="text-indigo-700 text-xs">{user.matchReasons[0]}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {!isDeclined && (
                        <div className="flex sm:flex-col gap-2 flex-shrink-0">
                          {isAccepted ? (
                            <>
                              <button onClick={() => setCurrentPage('chat')} className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                                💬 Message
                              </button>
                              <button onClick={() => setCurrentPage('sessions')} className="border border-indigo-200 text-indigo-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors">
                                📅 Schedule
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setAccepted((p) => [...p, user.id])}
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
                              >
                                ✅ Accept Match
                              </button>
                              <button
                                onClick={() => setDeclined((p) => [...p, user.id])}
                                className="border border-slate-200 text-slate-500 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                Skip
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
