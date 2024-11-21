import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NameDialogProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export function NameDialog({ isOpen, onSubmit }: NameDialogProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-[#1C1C1E] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#38F8AC]">
            Nieuwe Topscore!
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Voer je naam in"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#2C2C2E] border-gray-700 text-white"
              autoFocus
            />
          </div>
          <Button 
            type="submit"
            className="w-full bg-[#38F8AC] text-black hover:bg-[#2ce49d]"
            disabled={!name.trim()}
          >
            Score Opslaan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}