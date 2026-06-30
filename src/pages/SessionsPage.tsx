import React, { useState } from 'react';
import { Calendar, Clock, Video, Star, CheckCircle, XCircle, Plus, Mic, MicOff, VideoOff, Phone, Monitor, MessageSquare } from 'lucide-react';
import { MOCK_SESSIONS, MOCK_USERS, CURRENT_USER } from '../data/mockData';

interface SessionsPageProps {
  setCurrentPage: (page: string) => void;
}

const SessionsPage: React.FC<SessionsPageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'schedule' | 'video'>('upcoming');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [scheduleForm, setScheduleForm] = useState({ partner: '', skill: '', date: '', time: '', duration: '60', notes: '' });
  const [rating, setRating] = useState<{ [id: string]: number }>({});
  const [scheduled, setScheduled] = useState(false);

  const upcoming = MOCK_SESSIONS.filter((s) => s.status === 'upcoming');
  const completed = MOCK_SESSIONS.filter((s) => s.status === 'completed');

  const getUserById = (id: string) => [...MOCK_USERS, CURRENT_USER].find((u) => u.id === id);

  const handleSchedule = () => {
    if (scheduleForm.partner && scheduleForm.skill && scheduleForm.date && scheduleForm.time) {
      setScheduled(true);
      setTimeout(() => {
        setScheduled(false);
        setShowScheduleModal(false);
        setScheduleForm({ partner: '', skill: '', date: '', time: '', duration: '60', notes: '' });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">My Sessions</h1>
              <p className="text-emerald-100">Manage your skill exchange sessions</p>
            </div>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 bg-white text-emerald-700 font-bold px-5 py-3 rounded-2xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Schedule Session
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Upcoming', value: upcoming.length, icon: '📅' },
              { label: 'Completed', value: completed.length, icon: '✅' },
              { label: 'Tokens Earned', value: completed.length, icon: '🪙' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-emerald-200 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'upcoming', label: '📅 Upcoming', count: upcoming.length },
            { id: 'completed', label: '✅ Completed', count: completed.length },
            { id: 'video', label: '📹 Video Call Demo', count: null },
            { id: 'schedule', label: '⚙️ Schedule', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── UPCOMING SESSIONS ──────────────────────────────────────────────── */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcoming.map((session) => {
              const teacher = getUserById(session.teacherId);
              const learner = getUserById(session.learnerId);
              const partner = session.teacherId === CURRENT_USER.id ? learner : teacher;
              const isTeaching = session.teacherId === CURRENT_USER.id;

              return (
                <div key={session.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full pulse-ring"></div>
                      Upcoming Session
                    </span>
                    <span className="text-xs text-slate-500 bg-white rounded-full px-3 py-1">
                      {isTeaching ? '🎓 You\'re Teaching' : '📚 You\'re Learning'}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        {partner && (
                          <img src={partner.avatar} alt={partner.name} className="w-12 h-12 rounded-xl object-cover" />
                        )}
                        <div>
                          <h3 className="font-display font-bold text-slate-800">
                            {session.skill} {isTeaching ? 'Lesson' : 'Class'}
                          </h3>
                          <p className="text-slate-500 text-sm">with {partner?.name}</p>
                        </div>
                      </div>

                      <div className="sm:ml-auto flex flex-col sm:items-end gap-2">
                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-500" /> {session.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-500" /> {session.time}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-500" /> {session.duration} min</span>
                          <span className="flex items-center gap-1.5">🪙 {session.tokensExchanged} token</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setCurrentPage('chat')}
                            className="flex items-center gap-1.5 border border-indigo-200 text-indigo-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" /> Message
                          </button>
                          <button
                            onClick={() => setActiveTab('video')}
                            className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                          >
                            <Video className="w-4 h-4" /> Join Call
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {upcoming.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="font-display font-bold text-slate-700 text-xl mb-2">No upcoming sessions</h3>
                <p className="text-slate-500 mb-6">Schedule your first skill exchange session</p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Schedule Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* ─── COMPLETED SESSIONS ─────────────────────────────────────────────── */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            {completed.map((session) => {
              const teacher = getUserById(session.teacherId);
              const learner = getUserById(session.learnerId);
              const partner = session.teacherId === CURRENT_USER.id ? learner : teacher;
              const sessionRating = rating[session.id] || session.rating;

              return (
                <div key={session.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Completed Session
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                      🪙 +{session.tokensExchanged} token earned
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex items-center gap-4">
                        {partner && (
                          <img src={partner.avatar} alt={partner.name} className="w-12 h-12 rounded-xl object-cover" />
                        )}
                        <div>
                          <h3 className="font-display font-bold text-slate-800">{session.skill}</h3>
                          <p className="text-slate-500 text-sm">with {partner?.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                            <span>{session.date}</span>
                            <span>•</span>
                            <span>{session.duration} min</span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:ml-auto">
                        {session.notes && (
                          <p className="text-slate-600 text-sm italic bg-slate-50 rounded-xl px-4 py-3 mb-3 max-w-xs">
                            "{session.notes}"
                          </p>
                        )}
                        {/* Star Rating */}
                        <div>
                          <p className="text-xs text-slate-400 mb-1.5 font-medium">Your Rating</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setRating((prev) => ({ ...prev, [session.id]: star }))}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-6 h-6 transition-colors ${
                                    star <= (sessionRating || 0)
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-200 fill-slate-200'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── VIDEO CALL DEMO ────────────────────────────────────────────────── */}
        {activeTab === 'video' && (
          <div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <span className="text-2xl">📹</span>
              <div>
                <h3 className="font-semibold text-indigo-800">WebRTC Video Call Interface</h3>
                <p className="text-indigo-600 text-sm">This demonstrates the in-browser video calling feature. In production, this uses WebRTC for peer-to-peer connections.</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              {/* Video Grid */}
              <div className="relative aspect-video bg-slate-800">
                {/* Main Video (Remote) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <img
                      src={MOCK_USERS[0].avatar}
                      alt="Remote"
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-400"
                    />
                    <p className="text-white font-semibold">{MOCK_USERS[0].name}</p>
                    <p className="text-slate-400 text-sm">React.js Session</p>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900/40"></div>
                </div>

                {/* Self Video (Picture-in-Picture) */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-700 rounded-2xl border-2 border-slate-600 overflow-hidden shadow-xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <img src={CURRENT_USER.avatar} alt="You" className="w-full h-full object-cover" />
                  </div>
                  {!camOn && (
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <VideoOff className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white text-xs font-medium bg-black/50 px-2 py-0.5 rounded-full">You</div>
                </div>

                {/* Session Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-xl flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>LIVE • 00:24:37</span>
                </div>

                {/* Skill Topic */}
                <div className="absolute top-4 right-4 bg-indigo-600/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-xl">
                  📚 React.js Fundamentals
                </div>
              </div>

              {/* Controls */}
              <div className="bg-slate-900 px-8 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white text-sm">
                    <span className="text-slate-400">Session with </span>
                    <span className="font-semibold">{MOCK_USERS[0].name}</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 text-sm font-medium">🪙 1 token</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMicOn(!micOn)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      micOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setCamOn(!camOn)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      camOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all">
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm transition-colors">
                    <Phone className="w-4 h-4" /> End Call
                  </button>
                </div>
              </div>
            </div>

            {/* WebRTC Info */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                { icon: '🔒', title: 'End-to-End Encrypted', desc: 'All video/audio encrypted via DTLS-SRTP protocol' },
                { icon: '⚡', title: 'P2P Connection', desc: 'Direct peer-to-peer via WebRTC ICE/STUN/TURN servers' },
                { icon: '🖥️', title: 'Screen Sharing', desc: 'Share screen for code review and design walkthroughs' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                  <span className="text-2xl block mb-2">{item.icon}</span>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── SCHEDULE TAB ───────────────────────────────────────────────────── */}
        {activeTab === 'schedule' && (
          <div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-slate-800 text-xl mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" /> Schedule a New Session
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Partner</label>
                  <select
                    value={scheduleForm.partner}
                    onChange={(e) => setScheduleForm((f) => ({ ...f, partner: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option value="">Select a partner...</option>
                    {MOCK_USERS.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Skill to Exchange</label>
                  <input
                    type="text"
                    value={scheduleForm.skill}
                    onChange={(e) => setScheduleForm((f) => ({ ...f, skill: e.target.value }))}
                    placeholder="e.g., React.js, UI/UX Design..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Date</label>
                    <input
                      type="date"
                      value={scheduleForm.date}
                      onChange={(e) => setScheduleForm((f) => ({ ...f, date: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Time</label>
                    <input
                      type="time"
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm((f) => ({ ...f, time: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Duration</label>
                  <select
                    value={scheduleForm.duration}
                    onChange={(e) => setScheduleForm((f) => ({ ...f, duration: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes (1 token)</option>
                    <option value="90">90 minutes (2 tokens)</option>
                    <option value="120">120 minutes (2 tokens)</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Notes (optional)</label>
                  <textarea
                    value={scheduleForm.notes}
                    onChange={(e) => setScheduleForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Topics to cover, goals, materials needed..."
                    rows={3}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none placeholder-slate-400"
                  />
                </div>

                <button
                  onClick={handleSchedule}
                  className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {scheduled ? (
                    <><CheckCircle className="w-5 h-5" /> Session Scheduled! 🎉</>
                  ) : (
                    <><Calendar className="w-5 h-5" /> Schedule Session</>
                  )}
                </button>

                <p className="text-center text-slate-400 text-sm flex items-center justify-center gap-1">
                  🪙 This will use <strong className="text-slate-600">1 token</strong> from your wallet
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setShowScheduleModal(false)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <XCircle className="w-5 h-5 text-slate-400" />
            </button>
            <h2 className="font-display font-bold text-slate-800 text-xl mb-6">Quick Schedule</h2>
            <button
              onClick={() => { setShowScheduleModal(false); setActiveTab('schedule'); }}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Open Full Scheduler →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionsPage;
