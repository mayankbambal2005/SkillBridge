import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, CheckCircle, Zap, Code2, Database, Globe, Server } from 'lucide-react';

interface GuidePageProps {
  setCurrentPage: (page: string) => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ setCurrentPage }) => {
  const [openSection, setOpenSection] = useState<string | null>('overview');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggle = (id: string, setter: React.Dispatch<React.SetStateAction<string | null>>, current: string | null) => {
    setter(current === id ? null : id);
  };

  const steps = [
    {
      id: 'overview',
      number: '01',
      title: 'Project Overview & Architecture',
      icon: '🏗️',
      color: 'from-indigo-500 to-purple-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed">
            SkillBridge is a full-stack, enterprise-grade skill-bartering platform built with a microservices-friendly architecture. It connects learners and teachers through AI-powered matching, real-time communication, and a fair token economy.
          </p>

          {/* Architecture Diagram */}
          <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400 whitespace-pre">{`┌─────────────────────────────────────────────────────┐
│                   CLIENT LAYER                       │
│  React 18 + TypeScript + Tailwind CSS + Vite        │
│  • Pages: Home, Discover, Matches, Sessions, Chat   │
│  • State: React Query + Zustand                     │
└──────────────────────────┬──────────────────────────┘
                           │ HTTPS / WSS
┌──────────────────────────▼──────────────────────────┐
│                  API GATEWAY                         │
│  Spring Cloud Gateway + JWT Auth + Rate Limiting    │
└──┬─────────────┬──────────────┬───────────────┬─────┘
   │             │              │               │
┌──▼──┐    ┌────▼───┐    ┌─────▼──┐    ┌──────▼──┐
│User │    │Matching│    │Session │    │Token    │
│Svc  │    │Svc (AI)│    │Svc     │    │Wallet   │
│     │    │Python  │    │Spring  │    │Svc      │
└──┬──┘    └────┬───┘    └─────┬──┘    └──────┬──┘
   │             │              │               │
┌──▼─────────────▼──────────────▼───────────────▼──┐
│             DATA LAYER                             │
│  MySQL (Users, Sessions) • MongoDB (Chat, Logs)   │
│  Redis (Cache, Sessions) • MinIO (Files)          │
└───────────────────────────────────────────────────┘`}</pre>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Code2 className="w-5 h-5" />, title: 'Frontend Stack', items: ['React 18 + TypeScript', 'Tailwind CSS v4', 'Vite Build Tool', 'React Query (API)', 'Zustand (State)', 'Framer Motion'] },
              { icon: <Server className="w-5 h-5" />, title: 'Backend Stack', items: ['Spring Boot 3.x', 'Spring Security + JWT', 'Spring WebSocket', 'Spring Cloud Gateway', 'Python (ML Service)', 'Redis Cache'] },
              { icon: <Database className="w-5 h-5" />, title: 'Databases', items: ['MySQL 8 (Users, Sessions)', 'MongoDB (Chat, Logs)', 'Redis (Cache, Pub/Sub)', 'Elasticsearch (Search)', 'MinIO (File Storage)'] },
              { icon: <Globe className="w-5 h-5" />, title: 'Infrastructure', items: ['Docker + Docker Compose', 'NGINX Reverse Proxy', 'TURN/STUN (WebRTC)', 'Firebase (Notifications)', 'CI/CD via GitHub Actions'] },
            ].map((stack) => (
              <div key={stack.title} className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 text-indigo-600">{stack.icon} {stack.title}</h4>
                <ul className="space-y-1.5">
                  {stack.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'backend',
      number: '02',
      title: 'Spring Boot Backend Setup',
      icon: '⚙️',
      color: 'from-cyan-500 to-blue-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">Start by creating the Spring Boot project with all required dependencies.</p>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Step 1: Initialize Spring Boot Project</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">{`# Using Spring Initializr CLI or start.spring.io
# Dependencies to include:
- Spring Web
- Spring Security
- Spring Data JPA
- Spring Data MongoDB
- Spring WebSocket
- Spring Boot Actuator
- Lombok
- MySQL Driver
- Spring Cache (Redis)
- Spring Cloud Gateway

# Project structure:
skillbridge-backend/
├── src/main/java/com/skillbridge/
│   ├── config/         # Security, WebSocket, CORS configs
│   ├── controller/     # REST API endpoints
│   ├── service/        # Business logic
│   ├── repository/     # Data access layer
│   ├── model/          # JPA/MongoDB entities
│   ├── dto/            # Data Transfer Objects
│   ├── security/       # JWT filter, UserDetailsService
│   └── websocket/      # WebSocket handlers`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Step 2: Application Configuration</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-yellow-300">{`# application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/skillbridge
    username: \${DB_USER}
    password: \${DB_PASS}
  data:
    mongodb:
      uri: mongodb://localhost:27017/skillbridge_chat
  redis:
    host: localhost
    port: 6379
  
skillbridge:
  jwt:
    secret: \${JWT_SECRET}
    expiration: 86400000   # 24 hours
  tokens:
    welcome-bonus: 3
    hourly-rate: 1
  webrtc:
    turn-server: turn:your-turn-server.com
    turn-username: \${TURN_USER}
    turn-credential: \${TURN_PASS}`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Step 3: User Entity & JWT Auth</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-blue-300">{`@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String name, bio, location, avatarUrl;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status; // ACTIVE, SUSPENDED
    
    private Integer tokenBalance = 3; // Welcome bonus
    private Double rating = 0.0;
    private Integer totalSessions = 0;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Skill> skillsOffered;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WantedSkill> skillsWanted;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Step 4: REST API Endpoints</h4>
            <div className="bg-slate-50 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 font-semibold text-slate-700">Method</th>
                    <th className="text-left py-2 font-semibold text-slate-700">Endpoint</th>
                    <th className="text-left py-2 font-semibold text-slate-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['POST', '/api/auth/register', 'Register new user'],
                    ['POST', '/api/auth/login', 'Login & get JWT'],
                    ['GET', '/api/users/profile', 'Get user profile'],
                    ['PUT', '/api/users/skills', 'Update skills list'],
                    ['GET', '/api/matches', 'Get AI-matched users'],
                    ['POST', '/api/sessions', 'Schedule a session'],
                    ['GET', '/api/sessions/{id}', 'Get session details'],
                    ['POST', '/api/sessions/{id}/complete', 'Complete & transfer tokens'],
                    ['GET', '/api/wallet/balance', 'Get token balance'],
                    ['GET', '/api/wallet/transactions', 'Get transaction history'],
                    ['GET', '/api/assessments/{skillId}', 'Get assessment questions'],
                    ['POST', '/api/assessments/submit', 'Submit assessment'],
                  ].map(([method, endpoint, desc]) => (
                    <tr key={endpoint}>
                      <td className={`py-2 font-mono text-xs font-bold ${method === 'GET' ? 'text-green-600' : method === 'POST' ? 'text-blue-600' : 'text-amber-600'}`}>{method}</td>
                      <td className="py-2 font-mono text-xs text-slate-600">{endpoint}</td>
                      <td className="py-2 text-slate-500">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'matching',
      number: '03',
      title: 'AI Matching Algorithm',
      icon: '🤖',
      color: 'from-emerald-500 to-teal-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">The matching engine is the core innovation of SkillBridge. It's implemented as a Python microservice with a REST API that the Spring Boot backend calls.</p>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Matching Score Formula</h4>
            <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 rounded-xl p-5">
              <code className="text-indigo-800 font-mono text-sm leading-relaxed block">
                {`score = (
  skill_overlap_score    × 0.40 +
  rating_score           × 0.25 +
  activity_score         × 0.20 +
  schedule_compat        × 0.10 +
  location_proximity     × 0.05
) × 100`}
              </code>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Python Matching Service (FastAPI)</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">{`# matching_service.py (FastAPI)
from fastapi import FastAPI
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

SKILL_CATEGORIES = [
  "Programming", "Design", "Music", "Language",
  "Business", "Marketing", "Data Science"
]

def skill_to_vector(skills: list) -> np.array:
    """Convert skill list to category frequency vector"""
    vector = np.zeros(len(SKILL_CATEGORIES))
    for skill in skills:
        if skill['category'] in SKILL_CATEGORIES:
            idx = SKILL_CATEGORIES.index(skill['category'])
            level_weight = {"Beginner":0.25,"Intermediate":0.5,"Advanced":0.75,"Expert":1.0}
            vector[idx] += level_weight.get(skill['level'], 0.5)
    return vector

def compute_match_score(user_a: dict, user_b: dict) -> float:
    # Bidirectional skill overlap
    a_offered = skill_to_vector(user_a['skillsOffered'])
    a_wanted  = skill_to_vector(user_a['skillsWanted'])
    b_offered = skill_to_vector(user_b['skillsOffered'])
    b_wanted  = skill_to_vector(user_b['skillsWanted'])
    
    # A can teach what B wants
    teach_score = cosine_similarity([a_offered], [b_wanted])[0][0]
    # B can teach what A wants  
    learn_score = cosine_similarity([b_offered], [a_wanted])[0][0]
    
    skill_score = (teach_score + learn_score) / 2
    rating_score = user_b['rating'] / 5.0
    activity_score = min(user_b['totalSessions'] / 100, 1.0)
    
    return (skill_score * 0.40 + rating_score * 0.25 +
            activity_score * 0.20) * 100

@app.get("/matches/{user_id}")
async def get_matches(user_id: str, limit: int = 10):
    users = fetch_all_users_except(user_id)
    current_user = fetch_user(user_id)
    
    scored = [(u, compute_match_score(current_user, u)) for u in users]
    scored.sort(key=lambda x: x[1], reverse=True)
    
    return [{"user": u, "score": round(s, 1)} for u, s in scored[:limit]]`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Spring Boot Integration</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-blue-300">{`@Service
public class MatchingService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("\${matching.service.url}")
    private String matchingServiceUrl;
    
    @Cacheable(value = "matches", key = "#userId")
    public List<MatchResult> getMatches(String userId) {
        String url = matchingServiceUrl + "/matches/" + userId;
        MatchResult[] results = restTemplate.getForObject(url, MatchResult[].class);
        return Arrays.asList(results);
    }
    
    @CacheEvict(value = "matches", key = "#userId")
    public void refreshMatches(String userId) {
        // Called when user updates their skills
    }
}`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'websocket',
      number: '04',
      title: 'Real-time Chat (WebSocket)',
      icon: '💬',
      color: 'from-pink-500 to-rose-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">Real-time messaging is powered by Spring WebSocket with STOMP protocol and SockJS fallback. Messages are stored in MongoDB for persistence.</p>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">WebSocket Configuration</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-blue-300">{`@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}

// Chat Controller
@Controller
public class ChatController {
    
    @MessageMapping("/chat.send")
    public void handleMessage(@Payload ChatMessage message,
                               Principal principal) {
        message.setSenderId(principal.getName());
        message.setTimestamp(Instant.now());
        
        // Save to MongoDB
        chatMessageRepository.save(message);
        
        // Deliver to recipient
        messagingTemplate.convertAndSendToUser(
            message.getReceiverId(),
            "/queue/messages",
            message
        );
    }
    
    @MessageMapping("/chat.typing")
    public void handleTyping(@Payload TypingIndicator indicator,
                              Principal principal) {
        messagingTemplate.convertAndSendToUser(
            indicator.getReceiverId(),
            "/queue/typing",
            new TypingEvent(principal.getName(), indicator.isTyping())
        );
    }
}`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">React Frontend WebSocket Hook</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-yellow-300">{`// hooks/useWebSocket.ts
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useChat = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const clientRef = useRef<Client>();
  
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('/ws'),
      connectHeaders: {
        Authorization: \`Bearer \${getToken()}\`
      },
      onConnect: () => {
        // Subscribe to personal message queue
        client.subscribe('/user/queue/messages', (frame) => {
          const msg = JSON.parse(frame.body) as Message;
          setMessages(prev => [...prev, msg]);
        });
      }
    });
    
    client.activate();
    clientRef.current = client;
    
    return () => { client.deactivate(); };
  }, []);
  
  const sendMessage = (content: string) => {
    clientRef.current?.publish({
      destination: '/app/chat.send',
      body: JSON.stringify({ content, conversationId })
    });
  };
  
  return { messages, sendMessage };
};`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'webrtc',
      number: '05',
      title: 'Video Calls (WebRTC)',
      icon: '📹',
      color: 'from-violet-500 to-purple-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">WebRTC enables peer-to-peer, encrypted video/audio calls directly in the browser. The Spring Boot backend provides signaling via WebSocket.</p>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">WebRTC Flow Diagram</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm">
              <pre className="text-green-400">{`User A                  Signal Server              User B
  |                        |                          |
  |------ offer SDP ------>|                          |
  |                        |------ forward offer ---->|
  |                        |<----- answer SDP --------|
  |<----- forward answer --|                          |
  |                        |                          |
  |<======== ICE Candidates Exchange ================>|
  |                                                   |
  |<========= Direct P2P Video Stream ===============>|
  |              (DTLS-SRTP Encrypted)                |`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">React WebRTC Hook</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-yellow-300">{`// hooks/useWebRTC.ts
export const useWebRTC = (sessionId: string) => {
  const peerRef = useRef<RTCPeerConnection>();
  const localStreamRef = useRef<MediaStream>();
  
  const ICE_SERVERS = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { 
        urls: 'turn:your-turn-server.com',
        username: TURN_USER,
        credential: TURN_PASS
      }
    ]
  };
  
  const startCall = async () => {
    // Get user media
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720 },
      audio: { echoCancellation: true, noiseSuppression: true }
    });
    localStreamRef.current = stream;
    
    // Create peer connection
    const peer = new RTCPeerConnection(ICE_SERVERS);
    peerRef.current = peer;
    
    // Add tracks
    stream.getTracks().forEach(track => {
      peer.addTrack(track, stream);
    });
    
    // Handle ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        signalServer.send({
          type: 'ice-candidate',
          candidate: event.candidate,
          sessionId
        });
      }
    };
    
    // Create offer
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    signalServer.send({ type: 'offer', sdp: offer, sessionId });
  };
  
  return { startCall, localStream: localStreamRef.current };
};`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'token',
      number: '06',
      title: 'Token Economy System',
      icon: '🪙',
      color: 'from-amber-500 to-orange-500',
      content: (
        <div className="space-y-6">
          <p className="text-slate-600">The token system ensures fair, balanced exchanges. All token operations are transactional to prevent race conditions or double-spending.</p>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Token Service (Spring Boot)</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-blue-300">{`@Service
@Transactional
public class TokenService {
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private TokenTransactionRepository txnRepo;
    
    public void completeSession(Session session) {
        User teacher = userRepo.findById(session.getTeacherId())
                                .orElseThrow();
        User learner = userRepo.findById(session.getLearnerId())
                                .orElseThrow();
        
        int tokensRequired = calculateTokens(session.getDurationMinutes());
        
        // Validate learner has enough tokens
        if (learner.getTokenBalance() < tokensRequired) {
            throw new InsufficientTokensException();
        }
        
        // Atomic token transfer
        learner.setTokenBalance(learner.getTokenBalance() - tokensRequired);
        teacher.setTokenBalance(teacher.getTokenBalance() + tokensRequired);
        
        userRepo.save(learner);
        userRepo.save(teacher);
        
        // Record transactions
        txnRepo.save(new TokenTransaction(
            teacher.getId(), "earned", tokensRequired,
            "Taught " + session.getSkill() + " to " + learner.getName()
        ));
        txnRepo.save(new TokenTransaction(
            learner.getId(), "spent", tokensRequired,
            "Learned " + session.getSkill() + " from " + teacher.getName()
        ));
        
        // Check for bonus rewards
        checkAndAwardBonuses(teacher);
    }
    
    private int calculateTokens(int minutes) {
        // 60 min = 1 token, 90+ min = 2 tokens
        return minutes >= 90 ? 2 : 1;
    }
}`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Token Economy Rules</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { rule: 'Earn 1 token per 60-min teaching session', type: 'earn' },
                { rule: 'Earn 2 tokens for 90+ min sessions', type: 'earn' },
                { rule: 'New users get 3 welcome bonus tokens', type: 'bonus' },
                { rule: 'Pass assessment = +1 bonus token', type: 'bonus' },
                { rule: 'Spend 1 token per learning session', type: 'spend' },
                { rule: 'Minimum 1 token to book any session', type: 'spend' },
                { rule: 'Cancelled sessions within 24h = 0.5 token penalty', type: 'penalty' },
                { rule: 'Tokens never expire — no time pressure', type: 'info' },
              ].map((item) => (
                <div key={item.rule} className={`p-3 rounded-xl text-sm flex items-start gap-2 ${
                  item.type === 'earn' ? 'bg-green-50 text-green-800' :
                  item.type === 'bonus' ? 'bg-amber-50 text-amber-800' :
                  item.type === 'spend' ? 'bg-red-50 text-red-800' :
                  item.type === 'penalty' ? 'bg-orange-50 text-orange-800' :
                  'bg-blue-50 text-blue-800'
                }`}>
                  <span>{item.type === 'earn' ? '➕' : item.type === 'bonus' ? '🎁' : item.type === 'spend' ? '➖' : item.type === 'penalty' ? '⚠️' : 'ℹ️'}</span>
                  {item.rule}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'database',
      number: '07',
      title: 'Database Schema (MySQL + MongoDB)',
      icon: '🗄️',
      color: 'from-slate-500 to-slate-700',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">MySQL Schema (Relational Data)</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">{`-- Core Tables
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100), bio TEXT, location VARCHAR(100),
    avatar_url VARCHAR(500), token_balance INT DEFAULT 3,
    rating DECIMAL(3,2) DEFAULT 0.0, total_sessions INT DEFAULT 0,
    is_online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    name VARCHAR(100), category VARCHAR(50),
    level ENUM('Beginner','Intermediate','Advanced','Expert'),
    is_verified BOOLEAN DEFAULT FALSE,
    endorsements INT DEFAULT 0,
    skill_type ENUM('offered','wanted')
);

CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY,
    teacher_id VARCHAR(36) REFERENCES users(id),
    learner_id VARCHAR(36) REFERENCES users(id),
    skill_name VARCHAR(100), scheduled_at TIMESTAMP,
    duration_minutes INT DEFAULT 60,
    status ENUM('pending','confirmed','active','completed','cancelled'),
    tokens_exchanged INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE token_transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    type ENUM('earned','spent','bonus','penalty','refund'),
    amount INT, description TEXT, related_user_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE session_ratings (
    id VARCHAR(36) PRIMARY KEY,
    session_id VARCHAR(36) REFERENCES sessions(id),
    rater_id VARCHAR(36) REFERENCES users(id),
    rated_id VARCHAR(36) REFERENCES users(id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">MongoDB Collections (Unstructured Data)</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-yellow-300">{`// messages collection
{
  "_id": "ObjectId",
  "conversationId": "conv-123",
  "senderId": "user-1",
  "receiverId": "user-2", 
  "content": "Hey, ready for our session?",
  "type": "text",         // text | image | file | system
  "mediaUrl": null,
  "read": false,
  "timestamp": "ISODate"
}

// assessment_results collection  
{
  "_id": "ObjectId",
  "userId": "user-1",
  "assessmentId": "assess-1",
  "skillId": "s1",
  "answers": {"q1": 1, "q2": 2, "q3": 0},
  "score": 80,
  "passed": true,
  "timeTaken": 420,      // seconds
  "completedAt": "ISODate"
}

// activity_logs collection (for AI training)
{
  "userId": "user-1",
  "action": "session_completed",
  "metadata": { "skill": "React.js", "rating": 5, "duration": 60 },
  "timestamp": "ISODate"
}`}</pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'deployment',
      number: '08',
      title: 'Docker & Deployment',
      icon: '🚀',
      color: 'from-red-500 to-pink-500',
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Docker Compose Setup</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">{`# docker-compose.yml
version: '3.8'

services:
  # React Frontend
  frontend:
    build: ./frontend
    ports: ["3000:80"]
    environment:
      - VITE_API_URL=http://localhost:8080
      - VITE_WS_URL=ws://localhost:8080/ws
    depends_on: [api-gateway]

  # Spring Boot API Gateway
  api-gateway:
    build: ./backend/gateway
    ports: ["8080:8080"]
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - JWT_SECRET=\${JWT_SECRET}
    depends_on: [mysql, mongodb, redis]

  # Python Matching Service
  matching-service:
    build: ./matching-service
    ports: ["5000:5000"]
    environment:
      - DB_URL=mysql://...\${DB_PASS}@mysql/skillbridge

  # MySQL
  mysql:
    image: mysql:8
    volumes: [mysql-data:/var/lib/mysql]
    environment:
      MYSQL_DATABASE: skillbridge
      MYSQL_ROOT_PASSWORD: \${DB_PASS}
    ports: ["3306:3306"]

  # MongoDB
  mongodb:
    image: mongo:7
    volumes: [mongo-data:/data/db]
    ports: ["27017:27017"]

  # Redis
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    command: redis-server --appendonly yes

  # NGINX
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on: [frontend, api-gateway]

volumes:
  mysql-data:
  mongo-data:`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Deployment Commands</h4>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-cyan-400">{`# 1. Clone and setup
git clone https://github.com/your-org/skillbridge.git
cd skillbridge
cp .env.example .env    # Configure your secrets

# 2. Build all services
docker-compose build

# 3. Run database migrations
docker-compose run api-gateway migrate

# 4. Start all services
docker-compose up -d

# 5. Check logs
docker-compose logs -f api-gateway

# 6. Access the application
# Frontend: http://localhost:3000
# API:      http://localhost:8080/api
# Swagger:  http://localhost:8080/swagger-ui.html`}</pre>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const faqs = [
    { q: 'How does the AI matching actually work?', a: 'The matching service uses cosine similarity on skill category vectors. Each user\'s skills are encoded as weighted feature vectors based on category and proficiency level. The algorithm finds users where your offered skills align with their wanted skills and vice versa — true bidirectional matching.' },
    { q: 'How is the token system prevented from being gamed?', a: 'Sessions must be confirmed by both parties after completion. We detect suspicious patterns (same-user exchanges, instant completions) and flag accounts. Future versions will use smart contract-based verification on a blockchain.' },
    { q: 'How does WebRTC work without a server for video?', a: 'WebRTC uses STUN servers to discover public IP addresses and TURN servers as relay fallback when direct P2P is blocked by firewalls. Only signaling (SDP, ICE candidates) passes through our server — the actual video/audio is P2P encrypted.' },
    { q: 'Can I add a payment system for premium tokens?', a: 'Yes! You can integrate Stripe for a "earn tokens fast" premium tier. However, the core philosophy is skill-barter only — bought tokens should only unlock priority matching, not replace earned ones.' },
    { q: 'How do skill verifications prevent fake claims?', a: 'Multi-layer verification: (1) Auto-graded MCQ assessments, (2) Peer endorsements from students you\'ve taught, (3) Session completion rate (can\'t claim Expert if students rate you poorly), (4) Optional portfolio/GitHub link verification.' },
    { q: 'What happens if a session is cancelled?', a: 'Cancellations 24+ hours ahead: no penalty. Within 24 hours: 0.5 token penalty to the canceller. No-shows: full token refund to the affected party + warning strike. Three strikes = account review.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-white">SkillBridge Developer Guide</h1>
              <p className="text-slate-400 mt-1">Complete step-by-step implementation guide</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {['Spring Boot', 'React', 'WebSocket', 'WebRTC', 'MySQL', 'MongoDB', 'Docker', 'Python ML'].map((tech) => (
              <span key={tech} className="bg-white/10 text-slate-300 text-sm px-3 py-1.5 rounded-full">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Step Sections */}
        <div className="space-y-4 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(step.id, setOpenSection, openSection)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 mb-0.5">STEP {step.number}</div>
                  <h3 className="font-display font-bold text-slate-800 text-lg">{step.title}</h3>
                </div>
                {openSection === step.id ? (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>

              {openSection === step.id && (
                <div className="px-6 pb-6 border-t border-slate-50">
                  <div className="pt-4">{step.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggle(`faq-${i}`, setOpenFaq, openFaq)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800">{faq.q}</span>
                  {openFaq === `faq-${i}` ? (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === `faq-${i}` && (
                  <div className="px-5 pb-5 border-t border-slate-50">
                    <p className="text-slate-600 text-sm leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-100 rounded-2xl p-6">
          <h3 className="font-display font-bold text-indigo-800 mb-4">📚 Useful Resources</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'Spring Boot Documentation', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/', desc: 'Official Spring Boot docs' },
              { name: 'React Query', url: 'https://tanstack.com/query/latest', desc: 'Data fetching & caching' },
              { name: 'STOMP.js', url: 'https://stomp-js.github.io/', desc: 'WebSocket client for React' },
              { name: 'WebRTC API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API', desc: 'MDN WebRTC reference' },
              { name: 'scikit-learn', url: 'https://scikit-learn.org/stable/', desc: 'ML for the matching service' },
              { name: 'Docker Compose', url: 'https://docs.docker.com/compose/', desc: 'Container orchestration' },
            ].map((res) => (
              <a
                key={res.name}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-xl p-3 hover:shadow-md transition-shadow border border-indigo-100 group"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{res.name}</p>
                  <p className="text-slate-400 text-xs">{res.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg"
          >
            <Zap className="w-5 h-5" /> Explore the Platform
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
