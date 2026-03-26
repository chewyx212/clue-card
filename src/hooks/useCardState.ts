import { useState, useCallback } from 'react';

export function useCardState() {
  const [unlockedCards, setUnlockedCards] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem('unlockedCards');
      return stored ? new Set<number>(JSON.parse(stored)) : new Set<number>();
    } catch {
      return new Set<number>();
    }
  });

  const handleCardClick = useCallback((cardId: number) => {
    setUnlockedCards(prev => {
      if (prev.has(cardId)) return prev;
      const next = new Set(prev).add(cardId);
      localStorage.setItem('unlockedCards', JSON.stringify([...next]));
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    localStorage.removeItem('unlockedCards');
    setUnlockedCards(new Set());
  }, []);

  return {
    unlockedCards,
    handleCardClick,
    handleReset,
  };
}
