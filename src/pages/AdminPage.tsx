import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getNewsletterSubscriptions, deleteNewsletterSubscription } from '@/lib/newsletter';
import { getContactMessages, deleteContactMessage } from '@/lib/contact';
import { Download, Search, X, Mail, Users, Key, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { verifyPassword, changePassword } from '@/lib/auth';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState(getNewsletterSubscriptions());
  const [messages, setMessages] = useState(getContactMessages());
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (verifyPassword(username || 'admin', password)) {
        setIsAuthenticated(true);
        setPassword('');
        toast({
          title: "Login succesvol",
          description: "Welkom in het admin dashboard",
        });
      } else {
        toast({
          title: "Login mislukt",
          description: "Controleer je gebruikersnaam en wachtwoord",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later nog eens",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (newPassword !== confirmPassword) {
        toast({
          title: "Wachtwoorden komen niet overeen",
          description: "Controleer of je hetzelfde wachtwoord hebt ingevoerd",
          variant: "destructive"
        });
        return;
      }

      if (newPassword.length < 8) {
        toast({
          title: "Wachtwoord te kort",
          description: "Het wachtwoord moet minimaal 8 tekens lang zijn",
          variant: "destructive"
        });
        return;
      }

      if (changePassword(username || 'admin', newPassword)) {
        toast({
          title: "Wachtwoord gewijzigd",
          description: "Je wachtwoord is succesvol gewijzigd",
        });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: "Fout bij wijzigen",
          description: "Er ging iets mis bij het wijzigen van het wachtwoord",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubscription = (email: string) => {
    deleteNewsletterSubscription(email);
    setSubscriptions(getNewsletterSubscriptions());
    toast({
      title: "Inschrijving verwijderd",
      description: `${email} is verwijderd uit de nieuwsbrief`,
    });
  };

  const handleDeleteMessage = (email: string, date: string) => {
    deleteContactMessage(email, date);
    setMessages(getContactMessages());
    toast({
      title: "Bericht verwijderd",
      description: `Bericht van ${email} is verwijderd`,
    });
  };

  const filteredSubscriptions = subscriptions.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(msg =>
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-[#1C1C1E] rounded-xl">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="text"
                placeholder="Gebruikersnaam"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#2C2C2E] border-gray-700 text-white"
                disabled={isLoading}
              />
              <Input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2C2C2E] border-gray-700 text-white"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Inloggen'
                )}
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-[#1C1C1E] rounded-xl p-6">
          <Tabs defaultValue="subscriptions">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-[#2C2C2E]">
                <TabsTrigger value="subscriptions" className="data-[state=active]:bg-[#38F8AC] data-[state=active]:text-black">
                  <Mail className="w-4 h-4 mr-2" />
                  Nieuwsbrief
                </TabsTrigger>
                <TabsTrigger value="messages" className="data-[state=active]:bg-[#38F8AC] data-[state=active]:text-black">
                  <Users className="w-4 h-4 mr-2" />
                  Berichten
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-[#38F8AC] data-[state=active]:text-black">
                  <Key className="w-4 h-4 mr-2" />
                  Instellingen
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Zoeken..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#2C2C2E] border-gray-700 text-white"
                />
              </div>
            </div>

            <TabsContent value="subscriptions">
              <div className="space-y-4">
                {filteredSubscriptions.map((sub, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-[#2C2C2E] rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{sub.email}</p>
                      <p className="text-sm text-gray-400">
                        Aangemeld op: {new Date(sub.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-400">
                        Via: {sub.source === 'homepage' ? 'Homepage' : 'Winkel'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSubscription(sub.email)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="space-y-4">
                {filteredMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-[#2C2C2E] rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{msg.subject}</h3>
                        <p className="text-sm text-gray-400">
                          Van: {msg.name} ({msg.email})
                        </p>
                        <p className="text-sm text-gray-400">
                          Datum: {new Date(msg.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMessage(msg.email, msg.date)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-6">Wijzig Wachtwoord</h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Nieuw wachtwoord
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-[#2C2C2E] border-gray-700 text-white"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Bevestig wachtwoord
                    </label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-[#2C2C2E] border-gray-700 text-white"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Wachtwoord Wijzigen'
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}