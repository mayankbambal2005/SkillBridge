export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  tokens: number;
  rating: number;
  totalReviews: number;
  skillsOffered: Skill[];
  skillsWanted: Skill[];
  completedSessions: number;
  badges: Badge[];
  isOnline: boolean;
  matchScore?: number;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verified: boolean;
  endorsements: number;
}

export type SkillCategory =
  | 'Programming'
  | 'Design'
  | 'Music'
  | 'Language'
  | 'Business'
  | 'Marketing'
  | 'Data Science'
  | 'Photography'
  | 'Cooking'
  | 'Fitness'
  | 'Writing'
  | 'Finance';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Session {
  id: string;
  teacherId: string;
  learnerId: string;
  skill: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  tokensExchanged: number;
  rating?: number;
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'system';
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Assessment {
  id: string;
  skillId: string;
  skillName: string;
  questions: Question[];
  timeLimit: number; // minutes
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TokenTransaction {
  id: string;
  type: 'earned' | 'spent' | 'bonus' | 'refund';
  amount: number;
  description: string;
  date: string;
  fromTo?: string;
}

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

export const CURRENT_USER: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  bio: 'Full-stack developer passionate about teaching web technologies. Currently learning Spanish and UI/UX design.',
  location: 'San Francisco, CA',
  joinedDate: '2024-01-15',
  tokens: 24,
  rating: 4.8,
  totalReviews: 32,
  completedSessions: 38,
  isOnline: true,
  skillsOffered: [
    { id: 's1', name: 'React.js', category: 'Programming', level: 'Expert', verified: true, endorsements: 28 },
    { id: 's2', name: 'Node.js', category: 'Programming', level: 'Advanced', verified: true, endorsements: 19 },
    { id: 's3', name: 'TypeScript', category: 'Programming', level: 'Advanced', verified: false, endorsements: 12 },
    { id: 's4', name: 'Python', category: 'Programming', level: 'Intermediate', verified: true, endorsements: 8 },
  ],
  skillsWanted: [
    { id: 's5', name: 'UI/UX Design', category: 'Design', level: 'Beginner', verified: false, endorsements: 0 },
    { id: 's6', name: 'Spanish', category: 'Language', level: 'Beginner', verified: false, endorsements: 0 },
    { id: 's7', name: 'Machine Learning', category: 'Data Science', level: 'Beginner', verified: false, endorsements: 0 },
  ],
  badges: [
    { id: 'b1', name: 'Top Teacher', icon: '🏆', description: 'Completed 25+ teaching sessions', color: '#f59e0b' },
    { id: 'b2', name: 'Quick Learner', icon: '⚡', description: 'Learned 3 new skills in a month', color: '#6366f1' },
    { id: 'b3', name: 'Community Star', icon: '⭐', description: '4.8+ rating with 30+ reviews', color: '#06b6d4' },
  ],
};

export const MOCK_USERS: User[] = [
  {
    id: 'user-2',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'UX Designer at Figma. Love crafting beautiful experiences. Learning React to bridge the design-dev gap.',
    location: 'New York, NY',
    joinedDate: '2024-02-20',
    tokens: 18,
    rating: 4.9,
    totalReviews: 24,
    completedSessions: 29,
    isOnline: true,
    matchScore: 96,
    skillsOffered: [
      { id: 's8', name: 'UI/UX Design', category: 'Design', level: 'Expert', verified: true, endorsements: 34 },
      { id: 's9', name: 'Figma', category: 'Design', level: 'Expert', verified: true, endorsements: 28 },
      { id: 's10', name: 'Adobe XD', category: 'Design', level: 'Advanced', verified: true, endorsements: 15 },
    ],
    skillsWanted: [
      { id: 's11', name: 'React.js', category: 'Programming', level: 'Beginner', verified: false, endorsements: 0 },
      { id: 's12', name: 'JavaScript', category: 'Programming', level: 'Intermediate', verified: false, endorsements: 0 },
    ],
    badges: [
      { id: 'b4', name: 'Design Guru', icon: '🎨', description: 'Expert in 3+ design tools', color: '#ec4899' },
      { id: 'b5', name: 'Verified Pro', icon: '✅', description: 'All skills verified', color: '#10b981' },
    ],
  },
  {
    id: 'user-3',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Data scientist & ML engineer. Bilingual (English/Spanish). Teaching data science, learning guitar.',
    location: 'Austin, TX',
    joinedDate: '2024-01-08',
    tokens: 31,
    rating: 4.7,
    totalReviews: 18,
    completedSessions: 22,
    isOnline: false,
    matchScore: 91,
    skillsOffered: [
      { id: 's13', name: 'Machine Learning', category: 'Data Science', level: 'Expert', verified: true, endorsements: 22 },
      { id: 's14', name: 'Python', category: 'Programming', level: 'Expert', verified: true, endorsements: 19 },
      { id: 's15', name: 'Spanish', category: 'Language', level: 'Expert', verified: true, endorsements: 16 },
    ],
    skillsWanted: [
      { id: 's16', name: 'Guitar', category: 'Music', level: 'Beginner', verified: false, endorsements: 0 },
      { id: 's17', name: 'React.js', category: 'Programming', level: 'Intermediate', verified: false, endorsements: 0 },
    ],
    badges: [
      { id: 'b6', name: 'Data Wizard', icon: '🧙', description: 'ML expert with 20+ sessions', color: '#8b5cf6' },
    ],
  },
  {
    id: 'user-4',
    name: 'Priya Patel',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Digital marketing strategist and content creator. Offering marketing expertise, learning web development.',
    location: 'Chicago, IL',
    joinedDate: '2024-03-10',
    tokens: 12,
    rating: 4.6,
    totalReviews: 11,
    completedSessions: 14,
    isOnline: true,
    matchScore: 84,
    skillsOffered: [
      { id: 's18', name: 'Digital Marketing', category: 'Marketing', level: 'Advanced', verified: true, endorsements: 14 },
      { id: 's19', name: 'SEO', category: 'Marketing', level: 'Advanced', verified: true, endorsements: 10 },
      { id: 's20', name: 'Content Writing', category: 'Writing', level: 'Expert', verified: false, endorsements: 8 },
    ],
    skillsWanted: [
      { id: 's21', name: 'React.js', category: 'Programming', level: 'Beginner', verified: false, endorsements: 0 },
      { id: 's22', name: 'Python', category: 'Programming', level: 'Beginner', verified: false, endorsements: 0 },
    ],
    badges: [
      { id: 'b7', name: 'Marketing Ace', icon: '📈', description: 'Expert digital marketer', color: '#f59e0b' },
    ],
  },
  {
    id: 'user-5',
    name: 'James Kim',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Professional musician and audio producer. Also a fitness coach. Learning programming for music apps.',
    location: 'Los Angeles, CA',
    joinedDate: '2024-02-01',
    tokens: 27,
    rating: 4.9,
    totalReviews: 42,
    completedSessions: 48,
    isOnline: true,
    matchScore: 78,
    skillsOffered: [
      { id: 's23', name: 'Guitar', category: 'Music', level: 'Expert', verified: true, endorsements: 36 },
      { id: 's24', name: 'Music Production', category: 'Music', level: 'Expert', verified: true, endorsements: 29 },
      { id: 's25', name: 'Fitness Training', category: 'Fitness', level: 'Advanced', verified: true, endorsements: 18 },
    ],
    skillsWanted: [
      { id: 's26', name: 'Python', category: 'Programming', level: 'Beginner', verified: false, endorsements: 0 },
      { id: 's27', name: 'Node.js', category: 'Programming', level: 'Beginner', verified: false, endorsements: 0 },
    ],
    badges: [
      { id: 'b8', name: 'Music Master', icon: '🎸', description: 'Top-rated music instructor', color: '#ec4899' },
      { id: 'b9', name: 'Super Tutor', icon: '🎯', description: '40+ sessions completed', color: '#10b981' },
    ],
  },
  {
    id: 'user-6',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    bio: 'Freelance photographer and video editor. Fluent in French and German. Learning finance & investment.',
    location: 'Seattle, WA',
    joinedDate: '2024-01-22',
    tokens: 9,
    rating: 4.5,
    totalReviews: 16,
    completedSessions: 19,
    isOnline: false,
    matchScore: 72,
    skillsOffered: [
      { id: 's28', name: 'Photography', category: 'Photography', level: 'Expert', verified: true, endorsements: 21 },
      { id: 's29', name: 'French', category: 'Language', level: 'Expert', verified: true, endorsements: 13 },
      { id: 's30', name: 'German', category: 'Language', level: 'Advanced', verified: true, endorsements: 9 },
    ],
    skillsWanted: [
      { id: 's31', name: 'Finance', category: 'Finance', level: 'Beginner', verified: false, endorsements: 0 },
      { id: 's32', name: 'Python', category: 'Programming', level: 'Beginner', verified: false, endorsements: 0 },
    ],
    badges: [
      { id: 'b10', name: 'Visual Artist', icon: '📸', description: 'Expert photographer', color: '#06b6d4' },
    ],
  },
];

export const MOCK_SESSIONS: Session[] = [
  {
    id: 'sess-1',
    teacherId: 'user-1',
    learnerId: 'user-2',
    skill: 'React.js',
    date: '2025-07-28',
    time: '10:00 AM',
    duration: 60,
    status: 'upcoming',
    tokensExchanged: 1,
  },
  {
    id: 'sess-2',
    teacherId: 'user-3',
    learnerId: 'user-1',
    skill: 'Machine Learning',
    date: '2025-07-29',
    time: '2:00 PM',
    duration: 60,
    status: 'upcoming',
    tokensExchanged: 1,
  },
  {
    id: 'sess-3',
    teacherId: 'user-2',
    learnerId: 'user-1',
    skill: 'UI/UX Design',
    date: '2025-07-25',
    time: '11:00 AM',
    duration: 90,
    status: 'completed',
    tokensExchanged: 1,
    rating: 5,
    notes: 'Amazing session! Sarah explained design principles so clearly.',
  },
  {
    id: 'sess-4',
    teacherId: 'user-1',
    learnerId: 'user-4',
    skill: 'Node.js',
    date: '2025-07-24',
    time: '3:00 PM',
    duration: 60,
    status: 'completed',
    tokensExchanged: 1,
    rating: 5,
  },
  {
    id: 'sess-5',
    teacherId: 'user-5',
    learnerId: 'user-1',
    skill: 'Spanish',
    date: '2025-07-30',
    time: '5:00 PM',
    duration: 60,
    status: 'upcoming',
    tokensExchanged: 1,
  },
];

export const MOCK_MESSAGES: { [conversationId: string]: Message[] } = {
  'conv-1': [
    { id: 'm1', senderId: 'user-2', receiverId: 'user-1', content: 'Hey Alex! I saw your profile and I think we could do a great skill exchange 😊', timestamp: '2025-07-26T10:00:00Z', type: 'text', read: true },
    { id: 'm2', senderId: 'user-1', receiverId: 'user-2', content: 'Hi Sarah! That sounds perfect! I need UI/UX help and you need React skills 🎉', timestamp: '2025-07-26T10:05:00Z', type: 'text', read: true },
    { id: 'm3', senderId: 'user-2', receiverId: 'user-1', content: 'Exactly! When are you available for our first session?', timestamp: '2025-07-26T10:07:00Z', type: 'text', read: true },
    { id: 'm4', senderId: 'user-1', receiverId: 'user-2', content: 'How about Monday at 10 AM? We can start with the React fundamentals.', timestamp: '2025-07-26T10:10:00Z', type: 'text', read: true },
    { id: 'm5', senderId: 'user-2', receiverId: 'user-1', content: 'Perfect! Looking forward to it. I have scheduled the session ✅', timestamp: '2025-07-26T10:12:00Z', type: 'text', read: false },
    { id: 'm6', senderId: 'user-2', receiverId: 'user-1', content: 'Also, could you share any pre-reading materials?', timestamp: '2025-07-26T10:15:00Z', type: 'text', read: false },
  ],
  'conv-2': [
    { id: 'm7', senderId: 'user-3', receiverId: 'user-1', content: 'Hi! I noticed you want to learn ML. I can teach you! 🧙', timestamp: '2025-07-25T14:00:00Z', type: 'text', read: true },
    { id: 'm8', senderId: 'user-1', receiverId: 'user-3', content: 'That would be amazing Marcus! And I can help you with React in return', timestamp: '2025-07-25T14:30:00Z', type: 'text', read: true },
    { id: 'm9', senderId: 'user-3', receiverId: 'user-1', content: 'Deal! Let us start with Python basics then move to ML algorithms 📊', timestamp: '2025-07-25T14:35:00Z', type: 'text', read: true },
  ],
};

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['user-1', 'user-2'],
    lastMessage: MOCK_MESSAGES['conv-1'][5],
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    participants: ['user-1', 'user-3'],
    lastMessage: MOCK_MESSAGES['conv-2'][2],
    unreadCount: 0,
  },
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 'assess-1',
    skillId: 's1',
    skillName: 'React.js',
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        text: 'What is the correct way to update state in a React functional component?',
        options: ['this.setState()', 'useState hook setter function', 'Directly mutating the state variable', 'Using Redux only'],
        correctAnswer: 1,
        explanation: 'In functional components, you use the setter function returned by useState() to update state.',
      },
      {
        id: 'q2',
        text: 'What does useEffect with an empty dependency array [] do?',
        options: ['Runs on every render', 'Runs only on component unmount', 'Runs only once after the initial render', 'Never runs'],
        correctAnswer: 2,
        explanation: 'An empty dependency array means the effect runs once after the initial render, similar to componentDidMount.',
      },
      {
        id: 'q3',
        text: 'Which of the following is NOT a React Hook?',
        options: ['useContext', 'useReducer', 'useComponent', 'useCallback'],
        correctAnswer: 2,
        explanation: 'useComponent is not a real React Hook. The others are all valid built-in React Hooks.',
      },
      {
        id: 'q4',
        text: 'What is the Virtual DOM in React?',
        options: [
          'A direct copy of the browser DOM',
          'A lightweight JavaScript representation of the real DOM',
          'A database for storing component states',
          'A CSS framework for React',
        ],
        correctAnswer: 1,
        explanation: 'The Virtual DOM is a lightweight JS object representation of the real DOM, used for efficient diffing and updates.',
      },
      {
        id: 'q5',
        text: 'How do you pass data from parent to child component in React?',
        options: ['Through global variables', 'Through props', 'Through the DOM', 'Through HTTP requests'],
        correctAnswer: 1,
        explanation: 'Props (short for properties) are how parent components pass data down to child components in React.',
      },
    ],
  },
  {
    id: 'assess-2',
    skillId: 's8',
    skillName: 'UI/UX Design',
    timeLimit: 12,
    passingScore: 70,
    questions: [
      {
        id: 'q6',
        text: 'What does UX stand for in the context of design?',
        options: ['Unified Experience', 'User Experience', 'Ultra Experience', 'Universal Exchange'],
        correctAnswer: 1,
        explanation: 'UX stands for User Experience — the overall experience a person has when interacting with a product.',
      },
      {
        id: 'q7',
        text: 'What is a wireframe in UI/UX design?',
        options: [
          'A final high-fidelity design',
          'A basic structural layout showing where elements will be placed',
          'A CSS framework',
          'A user testing method',
        ],
        correctAnswer: 1,
        explanation: 'Wireframes are basic structural layouts that show the placement of elements without detailed design.',
      },
      {
        id: 'q8',
        text: 'Which design principle ensures users can predict what will happen when they interact with an element?',
        options: ['Contrast', 'Consistency', 'Proximity', 'Alignment'],
        correctAnswer: 1,
        explanation: 'Consistency ensures that similar elements behave similarly, making the interface predictable and learnable.',
      },
    ],
  },
  {
    id: 'assess-3',
    skillId: 's13',
    skillName: 'Machine Learning',
    timeLimit: 15,
    passingScore: 70,
    questions: [
      {
        id: 'q9',
        text: 'What is supervised learning?',
        options: [
          'Learning without labeled data',
          'Learning with labeled training data where the desired output is known',
          'Learning through reinforcement rewards',
          'Learning from clustering similar data',
        ],
        correctAnswer: 1,
        explanation: 'Supervised learning uses labeled training data, where the algorithm learns to map inputs to known outputs.',
      },
      {
        id: 'q10',
        text: 'What is overfitting in machine learning?',
        options: [
          'When a model performs well on training data but poorly on new data',
          'When a model is too simple to capture patterns',
          'When training takes too long',
          'When data is not normalized',
        ],
        correctAnswer: 0,
        explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize.',
      },
      {
        id: 'q11',
        text: 'Which algorithm is commonly used for classification problems?',
        options: ['Linear Regression', 'K-Means Clustering', 'Random Forest', 'Principal Component Analysis'],
        correctAnswer: 2,
        explanation: 'Random Forest is an ensemble method widely used for classification (and regression) problems.',
      },
    ],
  },
];

export const TOKEN_TRANSACTIONS: TokenTransaction[] = [
  { id: 't1', type: 'earned', amount: 1, description: 'Taught React.js to Priya', date: '2025-07-24', fromTo: 'Priya Patel' },
  { id: 't2', type: 'spent', amount: 1, description: 'Learned UI/UX Design from Sarah', date: '2025-07-25', fromTo: 'Sarah Chen' },
  { id: 't3', type: 'earned', amount: 1, description: 'Taught Node.js to Marcus', date: '2025-07-23', fromTo: 'Marcus Rodriguez' },
  { id: 't4', type: 'bonus', amount: 3, description: 'Welcome bonus tokens 🎉', date: '2025-01-15', fromTo: 'SkillBridge' },
  { id: 't5', type: 'earned', amount: 1, description: 'Taught TypeScript to Emma', date: '2025-07-22', fromTo: 'Emma Wilson' },
  { id: 't6', type: 'spent', amount: 1, description: 'Learned Spanish from James', date: '2025-07-20', fromTo: 'James Kim' },
  { id: 't7', type: 'earned', amount: 1, description: 'Taught Python to Sarah', date: '2025-07-18', fromTo: 'Sarah Chen' },
  { id: 't8', type: 'bonus', amount: 2, description: 'Top Teacher badge reward', date: '2025-07-15', fromTo: 'SkillBridge' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Programming', 'Design', 'Music', 'Language', 'Business',
  'Marketing', 'Data Science', 'Photography', 'Cooking', 'Fitness', 'Writing', 'Finance',
];

export const POPULAR_SKILLS = [
  'React.js', 'Python', 'UI/UX Design', 'JavaScript', 'Machine Learning',
  'Spanish', 'Photography', 'Guitar', 'Digital Marketing', 'Data Analysis',
  'Node.js', 'Figma', 'French', 'Video Editing', 'TypeScript',
];

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  Programming: 'bg-blue-100 text-blue-700',
  Design: 'bg-pink-100 text-pink-700',
  Music: 'bg-purple-100 text-purple-700',
  Language: 'bg-green-100 text-green-700',
  Business: 'bg-amber-100 text-amber-700',
  Marketing: 'bg-orange-100 text-orange-700',
  'Data Science': 'bg-indigo-100 text-indigo-700',
  Photography: 'bg-cyan-100 text-cyan-700',
  Cooking: 'bg-red-100 text-red-700',
  Fitness: 'bg-emerald-100 text-emerald-700',
  Writing: 'bg-teal-100 text-teal-700',
  Finance: 'bg-yellow-100 text-yellow-700',
};
