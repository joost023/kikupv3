import { Brain, Gamepad2, Target, Blocks, Grid, Gamepad } from 'lucide-react';

export interface Game {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: typeof Brain | typeof Gamepad2 | typeof Target | typeof Blocks | typeof Grid | typeof Gamepad;
  image: string;
  link: string;
  features: string[];
  difficulty: 'Makkelijk' | 'Gemiddeld' | 'Moeilijk';
  category: 'Geheugen' | 'Taal' | 'Reactie' | 'Logica';
  minPlayTime: number;
  recommended: boolean;
}

export const games: Game[] = [
  {
    id: 'woordspel',
    title: "Woordspel",
    description: "Test je woordkennis tegen de klok",
    longDescription: "Een uitdagend spel waarbij je woorden moet raden binnen een bepaalde tijd. Train je vocabulaire en denk strategisch na over je volgende zet.",
    icon: Gamepad2,
    link: "/kikup-woord-spel",
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Tijdsdruk voor extra uitdaging",
      "Verschillende moeilijkheidsgraden",
      "Highscore systeem",
      "Dagelijks nieuwe woorden"
    ],
    difficulty: "Gemiddeld",
    category: "Taal",
    minPlayTime: 5,
    recommended: true
  },
  {
    id: 'memory',
    title: "Memory",
    description: "Train je geheugen met dit klassieke spel",
    longDescription: "Een moderne versie van het klassieke memory spel. Vind alle paren en train je geheugen terwijl je plezier hebt.",
    icon: Brain,
    link: "/kikup-memory-spel",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Verschillende thema's",
      "Progressief moeilijker",
      "Persoonlijke statistieken",
      "Multiplayer modus"
    ],
    difficulty: "Makkelijk",
    category: "Geheugen",
    minPlayTime: 3,
    recommended: true
  },
  {
    id: 'woordzoeker',
    title: "Woordzoeker",
    description: "Zoek woorden in alle richtingen",
    longDescription: "Een dynamische woordzoeker die je uitdaagt om woorden te vinden in verschillende richtingen. Perfect voor het trainen van je observatievermogen.",
    icon: Target,
    link: "/kikup-woordzoeker-spel",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Verschillende categorieën",
      "Timer voor extra uitdaging",
      "Hints beschikbaar",
      "Leaderboard"
    ],
    difficulty: "Gemiddeld",
    category: "Taal",
    minPlayTime: 4,
    recommended: false
  },
  {
    id: 'tetris',
    title: "KIKUP Bloks",
    description: "Train je ruimtelijk inzicht",
    longDescription: "Een moderne versie van de klassieker. Verbeter je ruimtelijk inzicht en reactiesnelheid terwijl je probeert rijen te voltooien.",
    icon: Blocks,
    link: "/kikup-bloks-spel",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Progressieve moeilijkheid",
      "Score systeem",
      "Voorspelling volgende blok",
      "Highscore ranking"
    ],
    difficulty: "Gemiddeld",
    category: "Logica",
    minPlayTime: 5,
    recommended: true
  },
  {
    id: 'sudoku',
    title: "Sudoku",
    description: "Train je logisch denkvermogen",
    longDescription: "Een klassiek puzzelspel dat je logisch denkvermogen op de proef stelt. Los de puzzel op door de juiste cijfers op de juiste plek te zetten.",
    icon: Grid,
    link: "/kikup-sudoku-spel",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Verschillende moeilijkheidsgraden",
      "Timer voor extra uitdaging",
      "Automatische validatie",
      "Highscore systeem"
    ],
    difficulty: "Gemiddeld",
    category: "Logica",
    minPlayTime: 10,
    recommended: true
  },
  {
    id: 'snake',
    title: "Snake",
    description: "De klassieke mobiele game in een modern jasje",
    longDescription: "Een moderne versie van het iconische Snake spel. Bestuur de slang, verzamel voedsel en word zo lang mogelijk zonder jezelf te raken.",
    icon: Gamepad,
    link: "/kikup-snake-spel",
    image: "https://images.unsplash.com/photo-1610337673044-720471f83677?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Touch controls voor mobiel",
      "Progressieve moeilijkheid",
      "Score systeem",
      "Highscore ranking"
    ],
    difficulty: "Makkelijk",
    category: "Reactie",
    minPlayTime: 2,
    recommended: true
  }
];