import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Zap, Users, SlidersHorizontal } from 'lucide-react';
import { MOCK_USERS, SKILL_CATEGORIES, CATEGORY_COLORS, POPULAR_SKILLS, User } from '../data/mockData';

interface DiscoverPageProps {
  setCurrentPage: (page: string) => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ setCurrentPage }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const allCategories = ['All', ...SKILL_CATEGORIES];

  const filtered = MOCK_USERS.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.skillsOffered.some((s) => s.name.toLowerCase().includes(q)) ||
      u.skillsWanted.some((s) => s.name.toLowerCase().includes(q)) ||
      u.bio.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategory === 'All' ||
      u.skillsOffered.some((s) => s.category === selectedCategory);

    const matchesRating = u.rating >= minRating;

    return matchesSearch && matchesCategory && matchesRating;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'sessions') return b.completedSessions - a.completedSessions;
    if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold text-white mb-2">Discover Skill Partners</h1>
          <p className="text-indigo-100 mb-8">Find the perfect person to exchange skills with</p>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills, people, or topics..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-0 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-lg text-base"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg ${showFilters ? 'bg-white text-indigo-600' : 'bg-indigo-700 text-white hover:bg-indigo-800'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-2xl p-6 shadow-xl">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option value="match">Best Match</option>
                    <option value="rating">Highest Rating</option>
                    <option value="sessions">Most Sessions</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Min Rating: {minRating > 0 ? `${minRating}+ ⭐` : 'Any'}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Popular Skills */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Popular Skills</h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SKILLS.slice(0, 12).map((skill) => (
              <button
                key={skill}
                onClick={() => setSearch(skill)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  search === skill
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            Found <strong>{sorted.length}</strong> skill partners
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Filter className="w-4 h-4" />
            {sortBy === 'match' ? 'Best Match' : sortBy === 'rating' ? 'Top Rated' : 'Most Active'}
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sorted.map((user) => (
            <UserCard key={user.id} user={user} setCurrentPage={setCurrentPage} />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-slate-700 text-xl mb-2">No results found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setMinRating(0); }}
              className="mt-4 text-indigo-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: User; setCurrentPage: (p: string) => void }> = ({ user, setCurrentPage }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover overflow-hidden">
      {/* Match Score Banner */}
      {user.matchScore && (
        <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 flex items-center justify-between">
          <span className="text-white text-xs font-medium flex items-center gap-1">
            <Zap className="w-3 h-3" /> AI Match Score
          </span>
          <span className="text-white font-bold text-sm">{user.matchScore}%</span>
        </div>
      )}

      <div className="p-6">
        {/* Profile */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-2xl object-cover" />
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${user.isOnline ? 'bg-green-400' : 'bg-slate-300'}`}></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-slate-800 text-lg leading-tight">{user.name}</h3>
            <div className="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold text-slate-700">{user.rating}</span>
                <span className="text-xs text-slate-400">({user.totalReviews})</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Users className="w-3 h-3" />
                <span>{user.completedSessions} sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{user.bio}</p>

        {/* Skills Offered */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Can Teach</p>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsOffered.slice(0, 3).map((skill) => (
              <span key={skill.id} className={`skill-badge text-xs ${CATEGORY_COLORS[skill.category]}`}>
                {skill.verified && <span className="mr-0.5">✓</span>}
                {skill.name}
              </span>
            ))}
            {user.skillsOffered.length > 3 && (
              <span className="skill-badge text-xs bg-slate-100 text-slate-500">+{user.skillsOffered.length - 3}</span>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Wants to Learn</p>
          <div className="flex flex-wrap gap-1.5">
            {user.skillsWanted.map((skill) => (
              <span key={skill.id} className="skill-badge text-xs bg-slate-50 text-slate-500 border border-slate-200">
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Badges */}
        {user.badges.length > 0 && (
          <div className="flex gap-1 mb-4 flex-wrap">
            {user.badges.map((badge) => (
              <span key={badge.id} title={badge.description} className="text-base cursor-help">
                {badge.icon}
              </span>
            ))}
          </div>
        )}

        {/* Token Info */}
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 rounded-xl px-3 py-2 mb-4">
          <span>🪙</span>
          <span className="font-medium">{user.tokens} tokens available</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setCurrentPage('chat')}
            className="flex-1 border border-indigo-200 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-sm"
          >
            Message
          </button>
          <button
            onClick={() => setCurrentPage('sessions')}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            Exchange Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
