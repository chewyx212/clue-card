import { cards } from './data/cards';
import { useCardState } from './hooks/useCardState';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Background } from './components/Background/Background';
import { CardGrid } from './components/CardGrid/CardGrid';
import { CardSwiper } from './components/CardSwiper/CardSwiper';
import styles from './App.module.css';

function App() {
  const {
    unlockedCards,
    handleCardClick,
    handleReset,
  } = useCardState();

  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={styles.app}>
      <Background />
      <button className={styles.resetBtn} onClick={handleReset} title="Reset all cards">
        ↺
      </button>
      <main>
        {isMobile ? (
          <CardSwiper
            cards={cards}
            unlockedCards={unlockedCards}
            onCardClick={handleCardClick}
          />
        ) : (
          <CardGrid
            cards={cards}
            unlockedCards={unlockedCards}
            onCardClick={handleCardClick}
          />
        )}
      </main>
    </div>
  );
}

export default App;
