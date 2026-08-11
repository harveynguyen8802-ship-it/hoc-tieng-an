import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('vi-VN');
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('vi-VN');
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (seconds < 60) return 'vừa xong';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} tháng trước`;
  return `${Math.floor(months / 12)} năm trước`;
}

export function xpForLevel(level: number): number {
  // level n cần 100 * n XP
  return 100 * level;
}

export function calculateLevelFromXP(xp: number): { level: number; current: number; needed: number } {
  let level = 1;
  let needed = xpForLevel(1);
  let accumulated = 0;
  while (xp - accumulated >= needed) {
    accumulated += needed;
    level += 1;
    needed = xpForLevel(level);
  }
  return { level, current: xp - accumulated, needed };
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function calculateStreak(lastStudy: Date | null | undefined): { streak: number; isBroken: boolean } {
  if (!lastStudy) return { streak: 0, isBroken: false };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const last = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
  const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return {
    streak: diffDays <= 0 ? 1 : diffDays === 1 ? 1 : 0,
    isBroken: diffDays > 1
  };
}

// SM-2 Spaced Repetition
export function sm2(
  current: { ease: number; interval: number; repetitions: number },
  quality: number // 0-5
): { ease: number; interval: number; repetitions: number; nextReview: Date } {
  let { ease, interval, repetitions } = current;
  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }
  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  return { ease, interval, repetitions, nextReview };
}