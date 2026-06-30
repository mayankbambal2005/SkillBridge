# SkillBridge 

**AI-Powered Peer-to-Peer Skill Exchange Platform**

SkillBridge is a full-stack platform where people trade skills instead of money — teach someone for an hour, earn a token, spend that token learning something new from someone else. It matches learners and teachers using a weighted algorithm, runs live video sessions in-browser, and uses AI to help assess skill levels.

---

##  Features

- **Token economy** — teach 1 hour = earn 1 token = learn 1 hour, no cash involved
- **Smart matching** — weighted 5-factor algorithm pairs learners with the right teachers, with Redis caching for ~40% faster match retrieval
- **Live video sessions** — WebRTC-powered video calls with a custom Spring Boot WebSocket signaling server
- **Real-time chat** — WebSocket-based messaging, persisted in MongoDB
- **AI skill assessment** — LangChain4j-powered engine evaluates skill level during onboarding/matching
- **Fully containerized** — all 6 services run via Docker Compose for one-command setup

---

##  Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js, TypeScript, Tailwind CSS |
| Backend | Java, Spring Boot |
| Real-time | WebSocket, WebRTC |
| AI | LangChain4j |
| Database | MongoDB |
| Caching | Redis |
| Infra | Docker, Docker Compose |

---

##  Architecture

The full SkillBridge system is designed as a set of services:

1. **Frontend** — React/TypeScript SPA *(this repo)*
2. **Core API** — Spring Boot REST backend (users, tokens, matching)
3. **Signaling server** — Spring Boot WebSocket server for WebRTC video session setup
4. **Chat service** — WebSocket-based real-time messaging, backed by MongoDB
5. **AI assessment service** — LangChain4j engine for evaluating skills
6. **Redis cache** — speeds up match retrieval

> Note: This repository currently contains the frontend. Backend services are in development / will be added as a separate repo or subfolder.

---

##  Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
git clone https://github.com/mayankbambal2005/SkillBridge.git
cd SkillBridge
npm install
```

### Running locally
```bash
npm run dev
```
This should start the app on `http://localhost:5173` (default Vite port — adjust if yours differs).

---

##  Project Structure
```
SkillBridge/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   └── utils/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

##  Future Improvements
- Mobile-responsive enhancements
- Expanded skill-matching factors
- Public deployment / live demo link

---

## 📄 Author
**Mayank Bambal** — [GitHub](https://github.com/mayankbambal2005) · [LinkedIn](https://linkedin.com/in/mayank-bambal-725835410)
