import React from 'react';
import { Button } from './ui/button';
import { Logo } from './Logo';

interface HeaderProps {
  onNewGame: () => void;
}

export function Header({ onNewGame }: HeaderProps) {
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-xl font-medium">Woordspel</span>
        </div>
        <Button 
          onClick={onNewGame}
          className="bg-[#38F8AC] text-black hover:bg-[#2ce49d] font-medium"
        >
          Nieuw spel
        </Button>
      </div>
    </header>
  );
}