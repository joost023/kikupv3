import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { games, type Game } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Clock, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Difficulty = Game['difficulty'];
type Category = Game['category'];

export default function GamesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const difficulties: Difficulty[] = ['Makkelijk', 'Gemiddeld', 'Moeilijk'];
  const categories: Category[] = ['Geheugen', 'Taal', 'Reactie'];

  const filteredGames = games.filter(game => {
    if (selectedDifficulty !== 'all' && game.difficulty !== selectedDifficulty) return false;
    if (selectedCategory !== 'all' && game.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Onze Spellen
            </motion.h1>
            <motion.p 
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ontdek onze collectie van interactieve spellen die je helpen om je hersenen 
              fit te houden terwijl je plezier hebt
            </motion.p>
          </div>

          {/* Filters */}
          <div className="mb-12 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Moeilijkheidsgraad</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedDifficulty('all')}
                  variant="outline"
                  className={cn(
                    "border-[#38F8AC]",
                    selectedDifficulty === 'all' && "bg-[#38F8AC] text-black"
                  )}
                >
                  Alle
                </Button>
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    variant="outline"
                    className={cn(
                      "border-[#38F8AC]",
                      selectedDifficulty === difficulty && "bg-[#38F8AC] text-black"
                    )}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Categorie</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setSelectedCategory('all')}
                  variant="outline"
                  className={cn(
                    "border-[#38F8AC]",
                    selectedCategory === 'all' && "bg-[#38F8AC] text-black"
                  )}
                >
                  Alle
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant="outline"
                    className={cn(
                      "border-[#38F8AC]",
                      selectedCategory === category && "bg-[#38F8AC] text-black"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => {
              const Icon = game.icon;
              
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#1C1C1E] rounded-xl overflow-hidden group flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-4 left-4 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-[#38F8AC]" />
                    </div>
                    {game.recommended && (
                      <div className="absolute top-4 right-4 bg-[#38F8AC] text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        Aanbevolen
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#2C2C2E]">
                          {game.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#2C2C2E]">
                          {game.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        {game.minPlayTime}+ min
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-gray-400 mb-6">{game.longDescription}</p>

                    <div className="space-y-4 mt-auto">
                      <div className="space-y-2">
                        {game.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                            <Star className="w-4 h-4 text-[#38F8AC]" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Link to={game.link} className="block">
                        <Button className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d]">
                          Speel nu
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}