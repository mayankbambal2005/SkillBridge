import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Award, ChevronRight, RotateCcw, Zap } from 'lucide-react';
import { MOCK_ASSESSMENTS, Assessment, Question } from '../data/mockData';

interface AssessmentPageProps {
  setCurrentPage: (page: string) => void;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({ setCurrentPage: _setCurrentPage }) => {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (started && !submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (started && timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [started, timeLeft, submitted]);

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQ(0);
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
    setShowExplanation(false);
    setTimeLeft(assessment.timeLimit * 60);
  };

  const handleAnswer = (questionId: string, answerIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answerIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setStarted(false);
  };

  const getScore = () => {
    if (!selectedAssessment) return 0;
    let correct = 0;
    selectedAssessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return Math.round((correct / selectedAssessment.questions.length) * 100);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const question: Question | undefined = selectedAssessment?.questions[currentQ];
  const score = submitted ? getScore() : 0;
  const passed = score >= (selectedAssessment?.passingScore || 70);

  // ─── ASSESSMENT LIST ──────────────────────────────────────────────────────
  if (!selectedAssessment) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-display text-4xl font-bold text-white mb-2">Skill Assessments</h1>
            <p className="text-pink-100">Verify your skills and earn trusted badges for your profile</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Info Banner */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
            <Zap className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-indigo-800 mb-1">Why Take Assessments?</h3>
              <p className="text-indigo-700 text-sm leading-relaxed">
                Verified skills build trust with potential skill-exchange partners. Pass an assessment to:
                <strong> earn a ✅ Verified badge, gain 1 bonus token, and rank higher in match results.</strong>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_ASSESSMENTS.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-slate-800 text-xl mb-1">{assessment.skillName}</h3>
                    <p className="text-slate-500 text-sm">{assessment.questions.length} questions • {assessment.timeLimit} minutes</p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-600 font-bold text-sm px-3 py-1.5 rounded-xl">
                    +1 🪙
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  {[
                    { icon: '⏱️', text: `${assessment.timeLimit} minute time limit` },
                    { icon: '📝', text: `${assessment.questions.length} multiple choice questions` },
                    { icon: '🎯', text: `${assessment.passingScore}% score required to pass` },
                    { icon: '✅', text: 'Earn Verified badge on your profile' },
                    { icon: '🪙', text: 'Bonus token for passing' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-slate-600">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => startAssessment(assessment)}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3.5 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Start Assessment <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULTS SCREEN ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
            {/* Result Icon */}
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
              {passed ? '🏆' : '😔'}
            </div>

            <h2 className="font-display text-3xl font-bold text-slate-800 mb-2">
              {passed ? 'Congratulations! You Passed!' : 'Better Luck Next Time!'}
            </h2>
            <p className="text-slate-500 mb-8">
              {passed
                ? `You've earned the ${selectedAssessment.skillName} verified badge!`
                : `You need ${selectedAssessment.passingScore}% to pass. Keep practicing!`}
            </p>

            {/* Score */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={passed ? '#10b981' : '#ef4444'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 339.3} 339.3`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-bold text-slate-800">{score}%</span>
                <span className="text-slate-400 text-sm">Score</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Correct', value: `${selectedAssessment.questions.filter((q) => answers[q.id] === q.correctAnswer).length}/${selectedAssessment.questions.length}` },
                { label: 'Pass Mark', value: `${selectedAssessment.passingScore}%` },
                { label: 'Status', value: passed ? '✅ Passed' : '❌ Failed' },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 rounded-2xl p-3">
                  <p className="text-slate-400 text-xs mb-1">{s.label}</p>
                  <p className="font-bold text-slate-800">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Rewards */}
            {passed && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-amber-800">Rewards Earned!</p>
                  <p className="text-amber-700 text-sm">✅ Verified badge on {selectedAssessment.skillName} • 🪙 +1 bonus token</p>
                </div>
              </div>
            )}

            {/* Review Answers */}
            <div className="text-left mb-6">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-indigo-600 font-medium text-sm hover:underline"
              >
                {showExplanation ? 'Hide' : 'Review'} Answers & Explanations
              </button>
              {showExplanation && (
                <div className="mt-4 space-y-4">
                  {selectedAssessment.questions.map((q, i) => {
                    const userAnswer = answers[q.id];
                    const isCorrect = userAnswer === q.correctAnswer;
                    return (
                      <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="font-medium text-slate-800 text-sm mb-2">Q{i + 1}: {q.text}</p>
                        <div className="flex items-start gap-2 mb-2">
                          {isCorrect ? <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />}
                          <div>
                            <p className="text-sm"><span className="font-medium">Your answer:</span> {q.options[userAnswer ?? -1] || 'Not answered'}</p>
                            {!isCorrect && <p className="text-sm text-green-700"><span className="font-medium">Correct:</span> {q.options[q.correctAnswer]}</p>}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 italic">{q.explanation}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => startAssessment(selectedAssessment)}
                className="flex-1 flex items-center justify-center gap-2 border border-indigo-200 text-indigo-600 font-semibold py-3 rounded-2xl hover:bg-indigo-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retry
              </button>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-2xl hover:opacity-90 transition-opacity"
              >
                More Assessments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── ACTIVE ASSESSMENT ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Assessment Header */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-slate-800">{selectedAssessment.skillName} Assessment</h2>
              <p className="text-slate-500 text-sm">Question {currentQ + 1} of {selectedAssessment.questions.length}</p>
            </div>
            <div className={`flex items-center gap-2 font-bold text-lg px-4 py-2 rounded-xl ${timeLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 progress-bar">
            <div className="progress-fill" style={{ width: `${((currentQ + 1) / selectedAssessment.questions.length) * 100}%` }}></div>
          </div>

          {/* Question dots */}
          <div className="flex gap-1.5 mt-3">
            {selectedAssessment.questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentQ(i)}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                  i === currentQ
                    ? 'bg-indigo-600 text-white'
                    : answers[q.id] !== undefined
                    ? 'bg-green-400 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        {question && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-slate-800 text-lg mb-6 leading-relaxed">{question.text}</h3>

            <div className="space-y-3">
              {question.options.map((opt, idx) => {
                const isSelected = answers[question.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(question.id, idx)}
                    className={`w-full text-left assessment-option ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-indigo-800 font-medium' : 'text-slate-700'}`}>
                        {opt}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ((q) => q - 1)}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors"
            >
              ← Previous
            </button>
          )}
          {currentQ < selectedAssessment.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ((q) => q + 1)}
              disabled={answers[question?.id || ''] === undefined}
              className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              Next Question <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" /> Submit Assessment
            </button>
          )}
        </div>

        <button
          onClick={() => { setSelectedAssessment(null); setStarted(false); }}
          className="w-full mt-3 text-center text-slate-400 text-sm hover:text-slate-600 transition-colors"
        >
          Exit Assessment (progress will be lost)
        </button>
      </div>
    </div>
  );
};

export default AssessmentPage;
