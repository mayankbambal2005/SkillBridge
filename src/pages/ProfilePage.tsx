import React, { useState } from 'react';
import { Star, MapPin, Users, Edit3, Plus, Check, X, Award, BookOpen, TrendingUp } from 'lucide-react';
import { CURRENT_USER, SKILL_CATEGORIES, CATEGORY_COLORS, SkillCategory } from '../data/mockData';

interface ProfilePageProps {
  setCurrentPage: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'badges' | 'stats'>('profile');
  const [editBio, setEditBio] = useState(false);
  const [bioText, setBioText] = useState(CURRENT_USER.bio);
  const [addingSkill, setAddingSkill] = useState<'offered' | 'wanted' | null>(null);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Programming' as SkillCategory, level: 'Intermediate' as const });

  const statItems = [
    { label: 'Sessions Taught', value: '24', icon: '🎓', color: 'from-indigo-500 to-purple-500' },
    { label: 'Sessions Learned', value: '14', icon: '📚', color: 'from-cyan-500 to-blue-500' },
    { label: 'Total Hours', value: '38', icon: '⏱️', color: 'from-emerald-500 to-teal-500' },
    { label: 'Tokens Earned', value: '31', icon: '🪙', color: 'from-amber-500 to-orange-500' },
  ];

  const achievements = [
    { name: 'First Lesson', desc: 'Complete your first teaching session', earned: true, icon: '🌟' },
    { name: 'Top Teacher', desc: 'Maintain 4.8+ rating for 10 sessions', earned: true, icon: '🏆' },
    { name: 'Skill Collector', desc: 'Learn 5 different skill categories', earned: false, icon: '🗂️' },
    { name: 'Community Pillar', desc: 'Complete 50 sessions total', earned: false, icon: '🏛️' },
    { name: 'Quick Learner', desc: 'Learn 3 skills in a single month', earned: true, icon: '⚡' },
    { name: 'Token Millionaire', desc: 'Earn 100 tokens lifetime', earned: false, icon: '💎' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Cover / Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-40 relative">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 -mt-16 relative z-10 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-slate-800">{CURRENT_USER.name}</h1>
                <div className="flex gap-2">
                  {CURRENT_USER.badges.slice(0, 3).map((b) => (
                    <span key={b.id} title={b.description} className="text-xl cursor-help">{b.icon}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {CURRENT_USER.location}</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {CURRENT_USER.rating} ({CURRENT_USER.totalReviews} reviews)</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {CURRENT_USER.completedSessions} sessions</span>
              </div>
            </div>
            <div className="flex gap-3 sm:ml-auto">
              <div className="text-center bg-amber-50 rounded-2xl px-4 py-2">
                <div className="text-2xl font-bold text-amber-600">🪙 {CURRENT_USER.tokens}</div>
                <div className="text-xs text-amber-500 font-medium">tokens</div>
              </div>
              <button
                onClick={() => setCurrentPage('sessions')}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm"
              >
                <BookOpen className="w-4 h-4" /> Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'profile', label: '👤 Profile' },
            { id: 'skills', label: '🎯 Skills' },
            { id: 'badges', label: '🏆 Badges' },
            { id: 'stats', label: '📊 Stats' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── PROFILE TAB ─────────────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-slate-800">About Me</h3>
                <button onClick={() => setEditBio(!editBio)} className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700">
                  <Edit3 className="w-4 h-4" /> {editBio ? 'Cancel' : 'Edit'}
                </button>
              </div>
              {editBio ? (
                <div>
                  <textarea
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                  />
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setEditBio(false)} className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
                      <Check className="w-4 h-4" /> Save
                    </button>
                    <button onClick={() => { setBioText(CURRENT_USER.bio); setEditBio(false); }} className="flex items-center gap-1.5 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600 leading-relaxed">{bioText}</p>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-display font-bold text-slate-800 mb-4">Account Info</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Member Since', value: 'January 2024' },
                    { label: 'Location', value: CURRENT_USER.location },
                    { label: 'Email', value: 'alex@skillbridge.io' },
                    { label: 'Status', value: '🟢 Active' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 text-sm">{item.label}</span>
                      <span className="text-slate-700 text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-display font-bold text-slate-800 mb-4">Learning Style</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Preferred Length', value: '60 min sessions' },
                    { label: 'Availability', value: 'Weekdays, Evenings' },
                    { label: 'Languages', value: 'English, Learning Spanish' },
                    { label: 'Session Type', value: 'Video + Chat' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 text-sm">{item.label}</span>
                      <span className="text-slate-700 text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── SKILLS TAB ──────────────────────────────────────────────────────── */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Skills Offered */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-slate-800">Skills I Can Teach</h3>
                <button
                  onClick={() => setAddingSkill('offered')}
                  className="flex items-center gap-1.5 text-sm text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              <div className="space-y-4">
                {CURRENT_USER.skillsOffered.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800">{skill.name}</span>
                        {skill.verified && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> Verified</span>}
                        <span className={`skill-badge text-xs ${CATEGORY_COLORS[skill.category]}`}>{skill.category}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">Level: <strong className="text-slate-700">{skill.level}</strong></span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{skill.endorsements} endorsements</span>
                      </div>
                      <div className="progress-bar mt-2 w-full">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 75 : skill.level === 'Intermediate' ? 50 : 25}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentPage('discover')}
                      className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors font-medium whitespace-nowrap"
                    >
                      Take Test
                    </button>
                  </div>
                ))}
              </div>

              {addingSkill === 'offered' && (
                <div className="mt-4 p-4 border-2 border-dashed border-indigo-200 rounded-xl">
                  <h4 className="font-semibold text-slate-700 mb-3">Add New Skill</h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Skill name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill((s) => ({ ...s, category: e.target.value as SkillCategory }))}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                      value={newSkill.level}
                      onChange={(e) => setNewSkill((s) => ({ ...s, level: e.target.value as any }))}
                      className="border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setAddingSkill(null)} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">Add Skill</button>
                    <button onClick={() => setAddingSkill(null)} className="border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Wanted */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-bold text-slate-800">Skills I Want to Learn</h3>
                <button
                  onClick={() => setAddingSkill('wanted')}
                  className="flex items-center gap-1.5 text-sm text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {CURRENT_USER.skillsWanted.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                    <span className={`skill-badge text-xs ${CATEGORY_COLORS[skill.category]}`}>{skill.category}</span>
                    <span className="text-xs text-slate-400">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── BADGES TAB ──────────────────────────────────────────────────────── */}
        {activeTab === 'badges' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {achievements.map((ach) => (
                <div
                  key={ach.name}
                  className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${
                    ach.earned ? 'border-amber-200 card-hover' : 'border-slate-100 opacity-60 grayscale'
                  }`}
                >
                  <div className="text-4xl mb-3">{ach.icon}</div>
                  <h4 className="font-display font-bold text-slate-800 mb-1">{ach.name}</h4>
                  <p className="text-slate-500 text-sm mb-3">{ach.desc}</p>
                  {ach.earned ? (
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
                      <Award className="w-3 h-3" /> Earned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-medium px-3 py-1 rounded-full">
                      🔒 Locked
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── STATS TAB ───────────────────────────────────────────────────────── */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {statItems.map((stat) => (
                <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg`}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="font-display text-3xl font-bold">{stat.value}</div>
                  <div className="text-white/80 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skill Progress */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-display font-bold text-slate-800 mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" /> Skill Mastery Progress
              </h3>
              <div className="space-y-5">
                {CURRENT_USER.skillsOffered.map((skill) => {
                  const pct = skill.level === 'Expert' ? 100 : skill.level === 'Advanced' ? 75 : skill.level === 'Intermediate' ? 50 : 25;
                  return (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <span className="text-slate-400">{skill.level} — {pct}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rating History */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-display font-bold text-slate-800 mb-5">Recent Reviews</h3>
              <div className="space-y-4">
                {[
                  { user: 'Sarah Chen', rating: 5, comment: 'Alex is an incredible React teacher! Explained everything so clearly.', skill: 'React.js', date: '2 days ago' },
                  { user: 'Priya Patel', rating: 5, comment: 'Best Node.js lesson I have ever had. Very patient and thorough.', skill: 'Node.js', date: '5 days ago' },
                  { user: 'Marcus Rodriguez', rating: 4, comment: 'Great TypeScript session. Very knowledgeable.', skill: 'TypeScript', date: '1 week ago' },
                ].map((review, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-800">{review.user}</span>
                      <span className="text-xs text-slate-400">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{review.skill}</span>
                    </div>
                    <p className="text-slate-500 text-sm italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default ProfilePage;
