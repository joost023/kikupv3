import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Newsletter } from '@/components/Newsletter';
import { Brain, Zap, Target, ArrowRight, Gamepad2, Star, ShoppingCart, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { games } from '@/data/games';

const reviews = [
  {
    name: "Emma de Vries",
    role: "Docent Basisschool",
    content: "Perfect voor in de klas! De leerlingen zijn super enthousiast en leren spelenderwijs.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Lucas Bakker",
    role: "Ouder",
    content: "Mijn kinderen zijn dol op de spellen. Ze bewegen meer én trainen hun hersenen!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    name: "Sophie Jansen",
    role: "Kindercoach",
    content: "Een geweldige combinatie van fysieke activiteit en cognitieve uitdaging.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
  }
];

const comingSoonProducts = [
  {
    name: "Geheim Project 1",
    price: "???",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Geheim Project 2",
    price: "???",
    image: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Geheim Project 3",
    price: "???",
    image: "https://images.unsplash.com/photo-1580501170888-80668882ca0c?q=80&w=500&auto=format&fit=crop"
  },
  {
    name: "Geheim Project 4",
    price: "???",
    image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?q=80&w=500&auto=format&fit=crop"
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-[50vh] relative flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-[#38F8AC]/10 to-transparent" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center gap-8"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-[#38F8AC]" />
                  <span className="text-gray-400">Train je brein</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[#38F8AC]" />
                  <span className="text-gray-400">Verbeter reflexen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#38F8AC]" />
                  <span className="text-gray-400">Bereik doelen</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-6xl font-bold mb-6"
              >
                Blijf mentaal en fysiek
                <span className="block text-[#38F8AC]">in beweging</span>
              </motion.h1>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-[#1C1C1E]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Een vader-zoon avontuur aan de keukentafel</h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  Het begon met een simpel idee en een lege tafel. Joost (43) en zijn zoon Roef (10) wilden samen iets maken. 
                  Roef had zin om te bouwen, maar wat precies? "Iets met beweging," stelde Joost voor, "en hersenkrakers!" 
                  Het moest niet alleen leuk zijn, maar ook uitdagend. Zo ontstond het plan voor KIKUP.nl.
                </p>
                <p>
                  Van brainstorm tot lancering: ze deden alles samen. Joost bracht zijn ervaring in technologie en ondernemen mee, 
                  terwijl Roef de frisse ideeën leverde. "Wat als we spellen maken waar je slim én actief voor moet zijn?" stelde 
                  Roef voor. Samen gebruikten ze AI om een logo te ontwerpen, bouwden ze een platform en testten ze elk spel. 
                  Het werd een mix van lol en leermomenten.
                </p>
                <p>
                  KIKUP.nl werd een plek waar breinbrekers en fysieke uitdagingen elkaar ontmoeten. Van spellen om je hersenen 
                  te laten kraken tot activiteiten die je in beweging brengen—alles ontworpen met een speelse twist. Het platform 
                  is simpel, toegankelijk en gemaakt voor jong en oud.
                </p>
              </div>
              <Link to="/over-ons">
                <Button className="mt-8 bg-[#38F8AC] text-black hover:bg-[#2ce49d]">
                  Lees meer over ons
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Onze Spellen</h2>
              <p className="text-gray-400">
                Ontdek onze collectie van uitdagende en leerzame spellen
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => {
                const Icon = game.icon;
                
                return (
                  <Link 
                    key={game.id} 
                    to={game.link}
                    className="group relative overflow-hidden rounded-xl bg-black"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity"
                      />
                    </div>
                    <div className="relative p-8 min-h-[400px] flex flex-col">
                      <div className="w-16 h-16 bg-black/50 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Icon className="w-8 h-8 text-[#38F8AC]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                      <p className="text-gray-300 mb-6">{game.description}</p>
                      <div className="space-y-4 mt-auto">
                        <div className="space-y-2">
                          {game.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                              <Star className="w-4 h-4 text-[#38F8AC]" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d]">
                          Speel nu
                        </Button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-[#1C1C1E]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Newsletter />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Wat anderen zeggen</h2>
              <p className="text-gray-400">
                Ontdek waarom onze gebruikers zo enthousiast zijn
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  className="bg-[#1C1C1E] p-8 rounded-xl relative"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <p className="text-gray-400 text-sm">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#38F8AC] text-[#38F8AC]" />
                    ))}
                  </div>
                  <p className="text-gray-300">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 bg-[#1C1C1E]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Binnenkort in onze webshop</h2>
              <p className="text-gray-400">
                Ontdek binnenkort onze collectie spellen voor een gezonde geest in een gezond lichaam
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {comingSoonProducts.map((product) => (
                <div 
                  key={product.name} 
                  className="bg-black rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform flex flex-col"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <HelpCircle className="w-16 h-16 text-[#38F8AC] opacity-50" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <p className="text-[#38F8AC] font-bold mb-4">{product.price}</p>
                    <div className="mt-auto">
                      <Button 
                        className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                        disabled
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Binnenkort beschikbaar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}