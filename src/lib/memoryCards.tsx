import {
  Zap,
  Brain,
  Dumbbell,
  Target,
  Trophy,
  Heart,
  Star,
  Flame,
  Sparkles,
  Lightbulb,
  Rocket,
  Crown
} from 'lucide-react';

import type { MemoryCard } from '@/types/memory';

const iconComponents = [
  { id: 1, icon: <Zap className="w-8 h-8 text-black" /> },
  { id: 2, icon: <Brain className="w-8 h-8 text-black" /> },
  { id: 3, icon: <Dumbbell className="w-8 h-8 text-black" /> },
  { id: 4, icon: <Target className="w-8 h-8 text-black" /> },
  { id: 5, icon: <Trophy className="w-8 h-8 text-black" /> },
  { id: 6, icon: <Heart className="w-8 h-8 text-black" /> },
  { id: 7, icon: <Star className="w-8 h-8 text-black" /> },
  { id: 8, icon: <Flame className="w-8 h-8 text-black" /> },
  { id: 9, icon: <Sparkles className="w-8 h-8 text-black" /> },
  { id: 10, icon: <Lightbulb className="w-8 h-8 text-black" /> },
  { id: 11, icon: <Rocket className="w-8 h-8 text-black" /> },
  { id: 12, icon: <Crown className="w-8 h-8 text-black" /> },
];

export function getMemoryCards(): MemoryCard[] {
  // Create pairs of cards
  const cardPairs = [...iconComponents, ...iconComponents];
  
  // Shuffle the cards
  return cardPairs
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({
      ...card,
      index
    }));
}