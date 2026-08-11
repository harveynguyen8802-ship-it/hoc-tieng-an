'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loading, EmptyState } from '@/components/States';
import { Brain, Search, Star, Volume2, ChevronLeft, ChevronRight, RotateCcw, X, Check, Sparkles } from 'lucide-react';
import { cn, shuffle } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Vocab {
  id: string;
  word: string;
  ipa: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  exampleVi: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  topic: string;
  level: string;
  reviews: { isFavorite: boolean; wrongCount: number; correctCount: number; nextReviewAt: string }[];
}

const MODES = {
  LIST: 'list',
  FLASHCARD: 'flashcard',
  REVIEW: 'review'
} as const;

type Mode = typeof MODES[keyof typeof MODES];

export default function VocabularyPage() {
  const [vocabList, setVocabList] = useState<Vocab[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('all');
  const [level, setLevel] = useState('all');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [mode, setMode] = useState<Mode>(MODES.LIST);

  const fetchVocab = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (topic !== 'all') params.set('topic', topic);
    if (level !== 'all') params.set('level', level);
    if (favoriteOnly) params.set('favorite', 'true');
    fetch(`/api/vocabulary?${params}`)
      .then((r) => r.json())
      .then((data) => { setVocabList(data.vocabulary || []); setTopics(data.topics || []); })
      .finally(() => setLoading(false));
  };

  useEffect(fetchVocab, [topic, level, favoriteOnly]);

  const toggleFavorite = async (v: Vocab) => {
    const isFav = v.reviews[0]?.isFavorite || false;
    await fetch('/api/vocabulary/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vocabularyId: v.id, isFavorite: !isFav })
    });
    fetchVocab();
    toast.success(!isFav ? VI.vocab.addFavorite : VI.vocab.removeFavorite);
  };

  if (mode === MODES.FLASHCARD && vocabList.length > 0) {
    return <FlashcardView vocabList={vocabList} onExit={() => setMode(MODES.LIST)} onReview={fetchVocab} />;
  }

  if (mode === MODES.REVIEW && vocabList.length > 0) {
    return <ReviewView vocabList={vocabList.filter((v) => v.reviews[0]?.nextReviewAt && new Date(v.reviews[0].nextReviewAt) <= new Date())} onExit={() => setMode(MODES.LIST)} onReview={fetchVocab} />;
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary-500" /> {VI.vocab.title}
            </h1>
            <p className="text-slate-500 mt-1">Học từ vựng với Spaced Repetition - tự động ôn từ bạn hay sai</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMode(MODES.REVIEW)} className="btn-secondary">
              <RotateCcw className="w-4 h-4" /> {VI.vocab.review}
            </button>
            <button onClick={() => setMode(MODES.FLASHCARD)} className="btn-primary">
              <Sparkles className="w-4 h-4" /> {VI.vocab.flashcard}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="grid md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchVocab()}
                placeholder={VI.search + ' từ vựng...'}
                className="input pl-10"
              />
            </div>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input">
              <option value="all">Tất cả chủ đề</option>
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="input">
              <option value="all">Tất cả trình độ</option>
              <option value="A1">A1</option><option value="A2">A2</option>
              <option value="B1">B1</option><option value="B2">B2</option>
            </select>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button onClick={() => setFavoriteOnly(!favoriteOnly)} className={cn("btn-ghost text-sm", favoriteOnly && "bg-yellow-50 text-yellow-700")}>
              <Star className={cn("w-4 h-4", favoriteOnly && "fill-yellow-500")} /> {VI.vocab.favorite}
            </button>
          </div>
        </div>

        {loading ? <Loading /> : vocabList.length === 0 ? (
          <EmptyState icon={Brain} title="Chưa có từ vựng" description="Thử thay đổi bộ lọc hoặc quay lại sau." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocabList.map((v) => (
              <div key={v.id} className="card relative group">
                <button onClick={() => toggleFavorite(v)} className="absolute top-3 right-3 text-slate-300 hover:text-yellow-500">
                  <Star className={cn("w-5 h-5", v.reviews[0]?.isFavorite && "fill-yellow-500 text-yellow-500")} />
                </button>
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">{v.word}</h3>
                  <span className="text-sm text-slate-500">{v.ipa}</span>
                </div>
                <div className="text-sm text-slate-600 mb-1">
                  <span className="badge bg-slate-100">{v.partOfSpeech}</span>
                  <span className="badge bg-primary-50 text-primary-700 ml-1">{v.level}</span>
                </div>
                <div className="font-medium text-slate-900 mt-2">{v.meaning}</div>
                <div className="mt-3 p-3 rounded-xl bg-slate-50 text-sm">
                  <div className="text-slate-700">{v.example}</div>
                  <div className="text-slate-500 text-xs mt-1">{v.exampleVi}</div>
                </div>
                {v.synonyms && v.synonyms.length > 0 && (
                  <div className="mt-3 text-xs text-slate-500">
                    <span className="font-semibold">{VI.vocab.synonyms}:</span> {v.synonyms.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function FlashcardView({ vocabList, onExit, onReview }: { vocabList: Vocab[]; onExit: () => void; onReview: () => void }) {
  const [idx, setIdx] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [shuffled] = useState(() => shuffle(vocabList));

  const v = shuffled[idx];

  const handleReview = async (quality: number) => {
    await fetch('/api/vocabulary/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vocabularyId: v.id, quality })
    });
    setShowMeaning(false);
    if (idx < shuffled.length - 1) {
      setIdx(idx + 1);
    } else {
      toast.success(VI.vocab.completedToday);
      onExit();
      onReview();
    }
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(v.word);
      u.lang = 'en-US';
      speechSynthesis.speak(u);
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onExit} className="btn-ghost">
            <ChevronLeft className="w-4 h-4" /> {VI.back}
          </button>
          <div className="text-sm text-slate-600">{idx + 1} / {shuffled.length}</div>
        </div>

        <div className="card min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer" onClick={() => setShowMeaning(!showMeaning)}>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="badge bg-primary-50 text-primary-700">{v.level}</span>
            <span className="badge bg-slate-100">{v.topic}</span>
          </div>
          <div className="absolute top-4 right-4 text-xs text-slate-400">
            {showMeaning ? 'Click để ẩn' : 'Click để hiện'}
          </div>

          <div className="text-5xl font-bold gradient-text mb-3">{v.word}</div>
          <div className="text-xl text-slate-500 mb-4">{v.ipa}</div>

          {showMeaning ? (
            <div className="animate-fade-in space-y-4">
              <div className="text-2xl font-semibold text-slate-900">{v.meaning}</div>
              <div className="badge bg-slate-100">{v.partOfSpeech}</div>
              <div className="p-4 rounded-xl bg-slate-50 max-w-md">
                <div className="text-slate-700">{v.example}</div>
                <div className="text-slate-500 text-sm mt-2">{v.exampleVi}</div>
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-sm">
              {VI.vocab.showMeaning}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button onClick={speak} className="btn-secondary">
            <Volume2 className="w-4 h-4" /> {VI.vocab.hearAgain}
          </button>
        </div>

        {showMeaning && (
          <div className="grid grid-cols-4 gap-2 mt-4 animate-fade-in">
            <button onClick={() => handleReview(1)} className="btn-danger flex-col py-3">
              <X className="w-4 h-4" /><span className="text-xs">Quên</span>
            </button>
            <button onClick={() => handleReview(3)} className="btn-secondary flex-col py-3">
              <RotateCcw className="w-4 h-4" /><span className="text-xs">Khó</span>
            </button>
            <button onClick={() => handleReview(4)} className="btn-secondary flex-col py-3 bg-blue-100">
              <Check className="w-4 h-4" /><span className="text-xs">Tốt</span>
            </button>
            <button onClick={() => handleReview(5)} className="btn-primary flex-col py-3">
              <Check className="w-4 h-4" /><span className="text-xs">Dễ</span>
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function ReviewView({ vocabList, onExit, onReview }: { vocabList: Vocab[]; onExit: () => void; onReview: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');

  if (vocabList.length === 0) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto">
          <button onClick={onExit} className="btn-ghost mb-4">
            <ChevronLeft className="w-4 h-4" /> {VI.back}
          </button>
          <EmptyState icon={Check} title={VI.vocab.completedToday} description="Bạn đã hoàn thành phần ôn tập hôm nay. Quay lại vào ngày mai!" />
        </div>
      </AppShell>
    );
  }

  const v = vocabList[idx];

  const check = () => {
    if (answer.trim().toLowerCase() === v.word.toLowerCase()) {
      toast.success(VI.vocab.correct);
      handleReview(5);
    } else {
      toast.error(VI.vocab.incorrect);
      handleReview(1);
    }
  };

  const handleReview = async (quality: number) => {
    await fetch('/api/vocabulary/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vocabularyId: v.id, quality })
    });
    setAnswer('');
    if (idx < vocabList.length - 1) {
      setIdx(idx + 1);
    } else {
      toast.success(VI.vocab.completedToday);
      onExit();
      onReview();
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onExit} className="btn-ghost">
            <ChevronLeft className="w-4 h-4" /> {VI.back}
          </button>
          <div className="text-sm text-slate-600">{VI.vocab.review}: {idx + 1} / {vocabList.length}</div>
        </div>

        <div className="card text-center">
          <div className="text-xs text-slate-500 mb-2">Nghĩa của từ này là gì?</div>
          <div className="text-4xl font-bold text-slate-900 mb-6">{v.meaning}</div>
          <div className="badge bg-slate-100 mb-6">{v.partOfSpeech}</div>

          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            placeholder="Gõ từ tiếng Anh..."
            className="input text-center text-2xl mb-4"
            autoFocus
          />

          <button onClick={check} disabled={!answer.trim()} className="btn-primary w-full">
            Kiểm tra
          </button>

          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => handleReview(0)} className="text-sm text-slate-500 hover:text-red-500">Quên hoàn toàn</button>
            <button onClick={() => handleReview(2)} className="text-sm text-slate-500 hover:text-orange-500">Khó nhớ</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}