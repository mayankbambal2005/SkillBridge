import React, { useState } from 'react';
import { Bell, MessageCircle, Zap, Menu, X, Search, User, Settings, LogOut, BookOpen } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'matches', label: 'Matches' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'chat', label: 'Messages' },
    { id: 'wallet', label: 'Wallet' },
    { id: 'assessment', label: '🎯 Assessments' },
    { id: 'guide', label: '📖 Guide' },
  ];

  const notifications = [
    { id: 1, text: 'Sarah Chen wants to exchange skills with you!', time: '2m ago', type: 'match', unread: true },
    { id: 2, text: 'Your React.js session with Priya starts in 30 mins', time: '28m ago', type: 'session', unread: true },
    { id: 3, text: 'You earned 1 token from completed session', time: '2h ago', type: 'token', unread: false },
    { id: 4, text: 'Marcus Rodriguez rated your session ⭐⭐⭐⭐⭐', time: '1d ago', type: 'rating', unread: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-indigo-200 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-800">
              Skill<span className="gradient-text">Bridge</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Token Balance */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
              <span className="text-base">🪙</span>
              <span className="text-sm font-bold text-amber-700">{CURRENT_USER.tokens}</span>
            </div>

            {/* Search */}
            <button
              onClick={() => setCurrentPage('discover')}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Messages */}
            <button
              onClick={() => setCurrentPage('chat')}
              className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="font-display font-bold text-slate-800">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${notif.unread ? 'bg-indigo-50/50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xl mt-0.5">
                            {notif.type === 'match' ? '🤝' : notif.type === 'session' ? '📅' : notif.type === 'token' ? '🪙' : '⭐'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 leading-snug">{notif.text}</p>
                            <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                          </div>
                          {notif.unread && <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-sm text-indigo-600 font-medium hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="relative">
                  <img
                    src={CURRENT_USER.avatar}
                    alt={CURRENT_USER.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-100">
                    <p className="font-semibold text-slate-800">{CURRENT_USER.name}</p>
                    <p className="text-xs text-slate-500">alex@skillbridge.io</p>
                  </div>
                  {[
                    { icon: User, label: 'Profile', page: 'profile' },
                    { icon: BookOpen, label: 'My Sessions', page: 'sessions' },
                    { icon: Settings, label: 'Settings', page: 'home' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { setCurrentPage(item.page); setProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
              className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                currentPage === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="px-6 py-3 border-t border-slate-100 flex items-center gap-2">
            <span className="text-base">🪙</span>
            <span className="text-sm font-bold text-amber-700">{CURRENT_USER.tokens} tokens</span>
          </div>
        </div>
      )}

      {/* Close dropdowns on outside click */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setNotifOpen(false); setProfileOpen(false); }}
        />
      )}
    </nav>
  );
};

export default Navbar;
