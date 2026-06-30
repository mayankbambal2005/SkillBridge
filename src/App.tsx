import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import SessionsPage from './pages/SessionsPage';
import ChatPage from './pages/ChatPage';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import AssessmentPage from './pages/AssessmentPage';
import GuidePage from './pages/GuidePage';

type Page =
  | 'home'
  | 'discover'
  | 'matches'
  | 'sessions'
  | 'chat'
  | 'wallet'
  | 'profile'
  | 'assessment'
  | 'guide';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navTo = (page: string) => setCurrentPage(page as Page);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={navTo} />;
      case 'discover':
        return <DiscoverPage setCurrentPage={navTo} />;
      case 'matches':
        return <MatchesPage setCurrentPage={navTo} />;
      case 'sessions':
        return <SessionsPage setCurrentPage={navTo} />;
      case 'chat':
        return <ChatPage setCurrentPage={navTo} />;
      case 'wallet':
        return <WalletPage />;
      case 'profile':
        return <ProfilePage setCurrentPage={navTo} />;
      case 'assessment':
        return <AssessmentPage setCurrentPage={navTo} />;
      case 'guide':
        return <GuidePage setCurrentPage={navTo} />;
      default:
        return <HomePage setCurrentPage={navTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar currentPage={currentPage} setCurrentPage={navTo} />
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;
