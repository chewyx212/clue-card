import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import type { CardData } from '../../types/card';
import { ClueCard } from '../ClueCard/ClueCard';
import styles from './CardSwiper.module.css';

interface CardSwiperProps {
  cards: CardData[];
  unlockedCards: Set<number>;
  onCardClick: (cardId: number) => void;
}

export function CardSwiper({ cards, unlockedCards, onCardClick }: CardSwiperProps) {
  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1.15}
        centeredSlides={true}
        spaceBetween={16}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        className={styles.swiper}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className={styles.slide}>
            <ClueCard
              card={card}
              isUnlocked={unlockedCards.has(card.id)}
              onClick={() => onCardClick(card.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
