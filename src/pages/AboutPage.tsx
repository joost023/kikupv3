import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Brain, Users, Target, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { saveContactMessage } from '@/lib/contact';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await saveContactMessage(formData);
      
      toast({
        title: "Bericht verzonden! 🎉",
        description: "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Too many message attempts. Please try again later.') {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-center mb-4">
                Over <span className="text-[#38F8AC]">KIKUP</span>
              </h1>
              <p className="text-gray-400 text-center mb-16">
                KIKUP is opgericht met één doel: het combineren van cognitieve uitdagingen 
                met fysieke beweging voor een complete brain-body workout.
              </p>

              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#38F8AC]">Een vader-zoon avontuur aan de keukentafel</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Het begon met een simpel idee en een lege tafel. Joost (43) en zijn zoon Roef (10) wilden samen iets maken. 
                    Roef had zin om te bouwen, maar wat precies? "Iets met beweging," stelde Joost voor, "en hersenkrakers!" 
                    Het moest niet alleen leuk zijn, maar ook uitdagend. Zo ontstond het plan voor KIKUP.nl.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#38F8AC]">Tech, creativiteit en een flinke dosis lol</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Van brainstorm tot lancering: ze deden alles samen. Joost bracht zijn ervaring in technologie en ondernemen mee, 
                    terwijl Roef de frisse ideeën leverde. "Wat als we spellen maken waar je slim én actief voor moet zijn?" stelde 
                    Roef voor. Samen gebruikten ze AI om een logo te ontwerpen, bouwden ze een platform en testten ze elk spel. 
                    Het werd een mix van lol en leermomenten.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-[#38F8AC]">Het resultaat: een website vol actie en uitdaging</h2>
                  <p className="text-gray-300 leading-relaxed">
                    KIKUP.nl werd een plek waar breinbrekers en fysieke uitdagingen elkaar ontmoeten. Van spellen om je hersenen 
                    te laten kraken tot activiteiten die je in beweging brengen—alles ontworpen met een speelse twist. Het platform 
                    is simpel, toegankelijk en gemaakt voor jong en oud.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="bg-[#1C1C1E] p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-[#38F8AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-[#38F8AC]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cognitieve Training</h3>
                  <p className="text-gray-400">
                    Onze spellen zijn ontworpen om je mentale scherpte te verbeteren
                    en je hersenen actief te houden.
                  </p>
                </div>

                <div className="bg-[#1C1C1E] p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-[#38F8AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-[#38F8AC]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Voor Iedereen</h3>
                  <p className="text-gray-400">
                    Of je nu jong of oud bent, onze spellen zijn toegankelijk
                    en uitdagend voor alle leeftijden.
                  </p>
                </div>

                <div className="bg-[#1C1C1E] p-6 rounded-xl text-center">
                  <div className="w-12 h-12 bg-[#38F8AC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-[#38F8AC]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Doelgericht</h3>
                  <p className="text-gray-400">
                    Elke oefening is zorgvuldig ontwikkeld om specifieke
                    vaardigheden te verbeteren.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-[#1C1C1E]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <MessageSquare className="w-8 h-8 text-[#38F8AC]" />
                <h2 className="text-3xl font-bold">Contact</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Naam
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#2C2C2E] border-gray-700 text-white"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-[#2C2C2E] border-gray-700 text-white"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Onderwerp
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-[#2C2C2E] border-gray-700 text-white"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Bericht
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-[#2C2C2E] border-gray-700 text-white min-h-[150px]"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d] font-medium py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Verstuur Bericht'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}