import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Gift, RefreshCw, ArrowUpRight, ArrowDownLeft, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TOKEN_TRANSACTIONS, CURRENT_USER } from '../data/mockData';

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'earn'>('overview');

  const chartData = [
    { month: 'Jan', earned: 5, spent: 2 },
    { month: 'Feb', earned: 8, spent: 4 },
    { month: 'Mar', earned: 6, spent: 3 },
    { month: 'Apr', earned: 10, spent: 5 },
    { month: 'May', earned: 7, spent: 6 },
    { month: 'Jun', earned: 12, spent: 4 },
    { month: 'Jul', earned: 9, spent: 5 },
  ];

  const totalEarned = TOKEN_TRANSACTIONS.filter((t) => t.type === 'earned' || t.type === 'bonus').reduce((s, t) => s + t.amount, 0);
  const totalSpent = TOKEN_TRANSACTIONS.filter((t) => t.type === 'spent').reduce((s, t) => s + t.amount, 0);

  const earnWays = [
    { icon: '🎓', title: 'Teach a Skill Session', tokens: '+1 per hour', desc: 'Schedule and complete a 1-hour teaching session', action: 'sessions' },
    { icon: '⭐', title: 'Get 5-Star Rating', tokens: '+0.5 bonus', desc: 'Earn a perfect rating from your student', action: null },
    { icon: '👥', title: 'Refer a Friend', tokens: '+2 per referral', desc: 'Invite someone who completes their first session', action: null },
    { icon: '✅', title: 'Pass Skill Assessment', tokens: '+1 bonus', desc: 'Complete and pass a skill verification test', action: 'profile' },
    { icon: '🏆', title: 'Earn Achievement Badge', tokens: '+1-3 bonus', desc: 'Unlock special badges by hitting milestones', action: null },
    { icon: '📅', title: 'Consecutive Sessions', tokens: '+0.5 streak', desc: 'Teach or learn 5 sessions in a row without cancelling', action: null },
  ];

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'earned': return { bg: 'bg-green-50', text: 'text-green-700', icon: <ArrowUpRight className="w-4 h-4" />, prefix: '+' };
      case 'spent': return { bg: 'bg-red-50', text: 'text-red-600', icon: <ArrowDownLeft className="w-4 h-4" />, prefix: '-' };
      case 'bonus': return { bg: 'bg-amber-50', text: 'text-amber-700', icon: <Gift className="w-4 h-4" />, prefix: '+' };
      case 'refund': return { bg: 'bg-blue-50', text: 'text-blue-600', icon: <RefreshCw className="w-4 h-4" />, prefix: '+' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-600', icon: null, prefix: '' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 relative">
          <h1 className="font-display text-4xl font-bold text-white mb-2">My Token Wallet</h1>
          <p className="text-slate-400 mb-10">Your skill exchange currency</p>

          {/* Wallet Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Main Balance */}
            <div className="sm:col-span-1 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-6 -translate-x-6"></div>
              <div className="relative">
                <p className="text-amber-100 text-sm font-medium mb-1">Available Balance</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-5xl">🪙</span>
                  <span className="font-display text-5xl font-bold text-white">{CURRENT_USER.tokens}</span>
                </div>
                <p className="text-amber-100 text-sm">SkillTokens</p>
                <div className="mt-4 bg-amber-600/40 rounded-full h-1.5">
                  <div className="bg-white/80 rounded-full h-1.5" style={{ width: `${(CURRENT_USER.tokens / 50) * 100}%` }}></div>
                </div>
                <p className="text-amber-200 text-xs mt-1">{50 - CURRENT_USER.tokens} tokens to next milestone</p>
              </div>
            </div>

            {/* Earned */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-slate-300 font-medium">Total Earned</span>
              </div>
              <p className="font-display text-4xl font-bold text-white mb-1">{totalEarned}</p>
              <p className="text-slate-400 text-sm">tokens this year</p>
              <div className="mt-4 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +23% vs last month
              </div>
            </div>

            {/* Spent */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <span className="text-slate-300 font-medium">Total Spent</span>
              </div>
              <p className="font-display text-4xl font-bold text-white mb-1">{totalSpent}</p>
              <p className="text-slate-400 text-sm">tokens this year</p>
              <div className="mt-4 bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                📚 {totalSpent} hours of learning
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'history', label: '📋 Transaction History' },
            { id: 'earn', label: '💡 Ways to Earn' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── OVERVIEW ──────────────────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-display font-bold text-slate-800 mb-6 flex items-center gap-2">
                📈 Token Activity (Last 7 Months)
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="earnedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="spentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Area type="monotone" dataKey="earned" stroke="#6366f1" strokeWidth={2} fill="url(#earnedGrad)" name="Tokens Earned" />
                  <Area type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={2} fill="url(#spentGrad)" name="Tokens Spent" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-2 justify-center text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>Earned</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>Spent</span>
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-display font-bold text-slate-800 mb-6">📊 Monthly Token Balance</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Bar dataKey="earned" fill="#6366f1" radius={[6, 6, 0, 0]} name="Earned" />
                  <Bar dataKey="spent" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Economy Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-2">How the Token Economy Works</h4>
                  <p className="text-indigo-700 text-sm leading-relaxed">
                    SkillTokens are earned by teaching and spent on learning. <strong>1 hour of teaching = 1 token = 1 hour of learning.</strong> Tokens never expire and cannot be purchased — they can only be earned through genuine skill-sharing. This ensures a fair, sustainable exchange ecosystem where every member's time is equally valued.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── HISTORY ───────────────────────────────────────────────────────── */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-800">Transaction History</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {TOKEN_TRANSACTIONS.map((txn) => {
                const style = getTypeStyle(txn.type);
                return (
                  <div key={txn.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className={`w-10 h-10 rounded-2xl ${style.bg} flex items-center justify-center ${style.text} flex-shrink-0`}>
                      {style.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-sm">{txn.description}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {txn.fromTo && <span>{txn.type === 'earned' ? 'From' : txn.type === 'spent' ? 'To' : 'By'}: {txn.fromTo} • </span>}
                        {txn.date}
                      </p>
                    </div>
                    <div className={`font-bold text-base ${style.text}`}>
                      {style.prefix}{txn.amount} 🪙
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── EARN ──────────────────────────────────────────────────────────── */}
        {activeTab === 'earn' && (
          <div>
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                <Gift className="w-5 h-5" /> Ways to Earn More SkillTokens
              </h3>
              <p className="text-amber-700 text-sm">Start teaching or completing challenges to grow your token balance</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {earnWays.map((way) => (
                <div key={way.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 card-hover">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{way.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-slate-800">{way.title}</h4>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">{way.tokens}</span>
                      </div>
                      <p className="text-slate-500 text-sm mt-1">{way.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
