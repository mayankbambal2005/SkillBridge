import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Smile, Paperclip, ArrowLeft } from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS, CURRENT_USER, Message } from '../data/mockData';

interface ChatPageProps {
  setCurrentPage: (page: string) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ setCurrentPage }) => {
  const [selectedConv, setSelectedConv] = useState<string | null>('conv-1');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({ ...MOCK_MESSAGES });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const emojis = ['😊', '👍', '🎉', '❤️', '🔥', '💪', '🙌', '✅', '💡', '🤝', '📚', '🎯'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedConv]);

  const getUserById = (id: string) => {
    if (id === CURRENT_USER.id) return CURRENT_USER;
    return MOCK_USERS.find((u) => u.id === id) || CURRENT_USER;
  };

  const getConvPartner = (convId: string) => {
    const conv = MOCK_CONVERSATIONS.find((c) => c.id === convId);
    if (!conv) return null;
    const partnerId = conv.participants.find((p) => p !== CURRENT_USER.id);
    return partnerId ? getUserById(partnerId) : null;
  };

  const sendMessage = () => {
    if (!input.trim() || !selectedConv) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER.id,
      receiverId: getConvPartner(selectedConv)?.id || '',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      type: 'text',
      read: false,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMsg],
    }));
    setInput('');

    // Simulate reply
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replies = [
          'That sounds great! Looking forward to our session! 😊',
          'Perfect, I will be ready for the session.',
          'Great! Can you share some resources beforehand?',
          'Awesome! I am excited to start learning from you.',
          '👍 Confirmed! See you then!',
        ];
        const reply: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: getConvPartner(selectedConv!)?.id || '',
          receiverId: CURRENT_USER.id,
          content: replies[Math.floor(Math.random() * replies.length)],
          timestamp: new Date().toISOString(),
          type: 'text',
          read: false,
        };
        setMessages((prev) => ({
          ...prev,
          [selectedConv!]: [...(prev[selectedConv!] || []), reply],
        }));
      }, 2000);
    }, 500);
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const currentMsgs = selectedConv ? messages[selectedConv] || [] : [];
  const partner = selectedConv ? getConvPartner(selectedConv) : null;

  return (
    <div className="h-screen bg-slate-50 pt-16 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* ─── SIDEBAR ──────────────────────────────────────────────────────────── */}
        <div className={`w-full md:w-80 bg-white border-r border-slate-100 flex flex-col flex-shrink-0 ${mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-display font-bold text-slate-800 text-lg mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {MOCK_CONVERSATIONS.map((conv) => {
              const convPartner = getConvPartner(conv.id);
              const isSelected = selectedConv === conv.id;
              const lastMsg = messages[conv.id]?.slice(-1)[0] || conv.lastMessage;

              return (
                <button
                  key={conv.id}
                  onClick={() => { setSelectedConv(conv.id); setMobileShowChat(true); }}
                  className={`w-full text-left px-4 py-4 border-b border-slate-50 transition-colors flex items-start gap-3 ${
                    isSelected ? 'bg-indigo-50 border-l-2 border-l-indigo-500' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={convPartner?.avatar}
                      alt={convPartner?.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${convPartner?.isOnline ? 'bg-green-400' : 'bg-slate-300'}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-800 text-sm">{convPartner?.name}</p>
                      <p className="text-xs text-slate-400">{formatTime(lastMsg.timestamp)}</p>
                    </div>
                    <p className="text-sm text-slate-500 truncate mt-0.5">
                      {lastMsg.senderId === CURRENT_USER.id ? 'You: ' : ''}{lastMsg.content}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {conv.unreadCount > 0 && !isSelected && (
                        <span className="bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                      {convPartner?.skillsOffered[0] && (
                        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {convPartner.skillsOffered[0].name}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Suggested Partners */}
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Suggested Partners</p>
              {MOCK_USERS.slice(2, 4).map((user) => (
                <div key={user.id} className="flex items-center gap-3 py-2.5 hover:bg-slate-50 rounded-xl px-2 cursor-pointer transition-colors">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    {user.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700 text-sm">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.skillsOffered[0]?.name}</p>
                  </div>
                  <button className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors">
                    Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CHAT AREA ────────────────────────────────────────────────────────── */}
        {selectedConv && partner ? (
          <div className={`flex-1 flex flex-col min-w-0 ${!mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 shadow-sm">
              <button onClick={() => setMobileShowChat(false)} className="md:hidden p-1 rounded-lg hover:bg-slate-100 transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="relative">
                <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full object-cover" />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${partner.isOnline ? 'bg-green-400' : 'bg-slate-300'}`}></div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{partner.name}</p>
                <p className="text-xs text-slate-500">
                  {partner.isOnline ? '🟢 Online' : '⚪ Offline'} • {partner.skillsOffered[0]?.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage('sessions')}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                  title="Voice Call"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('sessions')}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                  title="Video Call"
                >
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Session Info Banner */}
            <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 flex items-center justify-between">
              <span className="text-indigo-700 text-sm">
                📅 Next session: <strong>React.js Lesson</strong> — Jul 28, 10:00 AM
              </span>
              <button
                onClick={() => setCurrentPage('sessions')}
                className="text-indigo-600 text-xs font-semibold hover:underline"
              >
                View Details →
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMsgs.map((msg, index) => {
                const isMe = msg.senderId === CURRENT_USER.id;
                const sender = getUserById(msg.senderId);
                const showAvatar = !isMe && (index === 0 || currentMsgs[index - 1]?.senderId !== msg.senderId);
                const showTime = index === currentMsgs.length - 1 || currentMsgs[index + 1]?.senderId !== msg.senderId;

                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                    {!isMe && (
                      <div className="w-8 flex-shrink-0">
                        {showAvatar && (
                          <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full object-cover" />
                        )}
                      </div>
                    )}
                    <div className={`max-w-xs sm:max-w-sm lg:max-w-md`}>
                      <div className={`px-4 py-3 text-sm leading-relaxed ${isMe ? 'chat-bubble-sent' : 'chat-bubble-received'}`}>
                        {msg.content}
                      </div>
                      {showTime && (
                        <p className={`text-xs text-slate-400 mt-1 ${isMe ? 'text-right' : 'text-left'} px-1`}>
                          {formatTime(msg.timestamp)}
                          {isMe && <span className="ml-1">✓✓</span>}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <img src={partner.avatar} alt={partner.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                  <div className="chat-bubble-received px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Emoji Picker */}
            {showEmoji && (
              <div className="bg-white border-t border-slate-100 px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => { setInput((prev) => prev + emoji); setShowEmoji(false); }}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white border-t border-slate-100 p-4">
              <div className="flex items-end gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={`Message ${partner.name}...`}
                    rows={1}
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none placeholder-slate-400 max-h-28 overflow-y-auto"
                    style={{ minHeight: '46px' }}
                  />
                </div>

                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-md"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-2">Press Enter to send • Shift+Enter for new line</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="font-display font-bold text-slate-700 text-xl mb-2">Select a Conversation</h3>
              <p className="text-slate-500">Choose a conversation from the left to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
