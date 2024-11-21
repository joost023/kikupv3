import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Bell, Loader2 } from 'lucide-react';
import { saveNewsletterSubscription } from '@/lib/newsletter';
import * as analytics from '@/lib/analytics';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ongeldig e-mailadres",
        description: "Voer een geldig e-mailadres in",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      saveNewsletterSubscription(email, 'homepage');
      analytics.trackNewsletterSignup('homepage');
      
      toast({
        title: "Succesvol ingeschreven! 🎉",
        description: "Bedankt voor je aanmelding. Je ontvangt binnenkort onze nieuwsbrief.",
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
    <div className="bg-[#1C1C1E] p-8 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="w-5 h-5 text-[#38F8AC]" />
        <h3 className="text-xl font-bold">Blijf op de hoogte</h3>
      </div>
      <p className="text-gray-400 mb-6">
        Schrijf je in voor onze nieuwsbrief en ontvang updates over nieuwe spellen en aanbiedingen!
      </p>
      <form onSubmit={handleSubmit} className="flex gap-4">
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
  );
}