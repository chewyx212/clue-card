import type { CardData } from '../../types/card';
import { ClueCard } from '../ClueCard/ClueCard';
import styles from './CardGrid.module.css';

interface CardGridProps {
  cards: CardData[];
  unlockedCards: Set<number>;
  onCardClick: (cardId: number) => void;
}

export function CardGrid({ cards, unlockedCards, onCardClick }: CardGridProps) {
  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <ClueCard
          key={card.id}
          card={card}
          isUnlocked={unlockedCards.has(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}
