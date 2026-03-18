import { useState, useEffect, useRef } from 'react';
import styles from './PasswordModal.module.css';

interface PasswordModalProps {
  cardId: number | null;
  error: boolean;
  onSubmit: (cardId: number, password: string) => void;
  onClose: () => void;
}

export function PasswordModal({ cardId, error, onSubmit, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cardId !== null) {
      setPassword('');
      setShaking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [cardId]);

  useEffect(() => {
    if (error) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 400);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (cardId === null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardId, password);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className={styles.title}>Enter the Passphrase</h2>
        <div className={styles.divider} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={`${styles.input} ${shaking ? styles.shake : ''}`}
            placeholder="Speak the word..."
            autoComplete="off"
          />
          {error && <p className={styles.error}>The passphrase is incorrect</p>}
          <button type="submit" className={styles.submit}>
            Unveil
          </button>
        </form>
      </div>
    </div>
  );
}
