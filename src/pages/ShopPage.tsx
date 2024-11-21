import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Gamepad2, Box, Bell, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { saveNewsletterSubscription } from '@/lib/newsletter';
import { useState } from 'react';

export default function ShopPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsLoading(true);

    try {
      saveNewsletterSubscription(email, 'shop');
      
      toast({
        title: "Bedankt voor je interesse! 🎉",
        description: "We laten je weten wanneer onze winkel opent.",
      });

      setEmail('');
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already subscribed') {
        toast({
          title: "Al ingeschreven",
          description: "Dit e-mailadres is al ingeschreven voor de nieuwsbrief",
          variant: "destructive"
        });
      } else if (error instanceof Error && error.message === 'Too many subscription attempts. Please try again later.') {
        toast({
          title: "Te veel pogingen",
          description: "Probeer het later nog eens",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Er ging iets mis",
          description: "Probeer het later nog eens",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 bg-[#38F8AC]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShoppingBag className="w-10 h-10 text-[#38F8AC]" />
                </div>

                <h1 className="text-4xl font-bold mb-6">
                  Onze winkel opent binnenkort!
                </h1>
                
                <p className="text-gray-400 text-lg mb-12">
                  We zijn hard bezig met het ontwikkelen van onze webwinkel. 
                  Binnenkort kun je hier terecht voor zowel fysieke als digitale spellen.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-[#1C1C1E] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#38F8AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gamepad2 className="w-6 h-6 text-[#38F8AC]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Digitale Spellen</h3>
                    <p className="text-gray-400">
                      Download en speel onze educatieve games direct op je apparaat
                    </p>
                  </div>

                  <div className="bg-[#1C1C1E] p-6 rounded-xl">
                    <div className="w-12 h-12 bg-[#38F8AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Box className="w-6 h-6 text-[#38F8AC]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Fysieke Spellen</h3>
                    <p className="text-gray-400">
                      Ontdek onze collectie interactieve spellen en leermaterialen
                    </p>
                  </div>
                </div>

                <div className="bg-[#1C1C1E] p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                    <Bell className="w-5 h-5 text-[#38F8AC]" />
                    Blijf op de hoogte
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Wil je als eerste weten wanneer onze winkel opent? 
                    Laat je e-mailadres achter en we houden je op de hoogte!
                  </p>
                  <form className="flex gap-4" onSubmit={handleSubmit}>
                    <Input
                      type="email"
                      placeholder="Je e-mailadres"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-[#2C2C2E] border-gray-700 text-white focus:border-[#38F8AC]"
                      required
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit"
                      className="bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Aanmelden'
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}