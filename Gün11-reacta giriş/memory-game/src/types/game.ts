//kartın bilgilerini tutmak için game.ts dosyasında CardType adında bir interface oluşturuyoruz. Bu interface, her kartın benzersiz bir id'si, bir icon'u ve eşleşip eşleşmediğini belirten bir boolean değeri içerir.
export interface CardType {
  id: number
  pairId: number
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface DifficultySettings {
  label: string
  columns: number
  rows: number
  pairCount: number//kaç eş var?
}

export const difficultySettings: Record<Difficulty, DifficultySettings> = {
  easy: { label: 'Kolay', columns: 4, rows: 4, pairCount: 8 },
  medium: { label: 'Orta', columns: 5, rows: 5, pairCount: 12 },
  hard: { label: 'Zor', columns: 6, rows: 6, pairCount: 18 },
}