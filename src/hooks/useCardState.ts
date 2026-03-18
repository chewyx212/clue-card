import { useState, useCallback } from 'react';
import { cards } from '../data/cards';

export function useCardState() {
  const [unlockedCards, setUnlockedCards] = useState<Set<number>>(new Set());
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [passwordError, setPasswordError] = useState(false);

  const handleCardClick = useCallback((cardId: number) => {
    if (unlockedCards.has(cardId)) return;
    setActiveModal(cardId);
    setPasswordError(false);
  }, [unlockedCards]);

  const handlePasswordSubmit = useCallback((cardId: number, password: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card && password.toLowerCase().trim() === card.password.toLowerCase()) {
      setUnlockedCards(prev => new Set(prev).add(cardId));
      setActiveModal(null);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setActiveModal(null);
    setPasswordError(false);
  }, []);

  return {
    unlockedCards,
    activeModal,
    passwordError,
    handleCardClick,
    handlePasswordSubmit,
    handleModalClose,
  };
}
