import type { CardData } from "../../types/card";
import styles from "./ClueCard.module.css";

interface ClueCardProps {
  card: CardData;
  isUnlocked: boolean;
  onClick: () => void;
}

export function ClueCard({ card, isUnlocked, onClick }: ClueCardProps) {
  return (
    <div
      className={styles.container}
      onClick={!isUnlocked ? onClick : undefined}
    >
      <div className={`${styles.inner} ${isUnlocked ? styles.flipped : ""}`}>
        <div className={styles.front}>
          <img
            src={card.backImage}
            alt="Card back"
            className={styles.backImage}
            draggable={false}
          />
          {!isUnlocked && (
            <div className={styles.lockOverlay}>
              <svg
                className={styles.lockIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="5" y="11" width="14" height="11" rx="2" />
                <path d="M8 11V7a4 4 0 1 1 8 0v4" />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.back}>
          <div className={styles.contentInner}>
            {card.title && <h2 className={styles.title}>{card.title}</h2>}
            <div className={styles.divider} />
            {card.contentType === "text" ? (
              <p className={styles.text}>{card.content}</p>
            ) : (
              <img
                src={card.content}
                alt={card.title || "Card content"}
                className={styles.contentImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
