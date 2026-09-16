// oyunun zorluk seviyeleri 
export type Difficulty = 'easy' | 'medium' | 'hard';

// hangi sayfadayız onu belirten tip
export type Page = 'home' | 'game';

// her bir kartın sahip olacağı veri yapısı
export interface CardType {
  id: number;
  type: string;        // Eşleşmeyi kontrol etmek için ikon/simge adı (örn: 'dog', 'cat')
  isFlipped: boolean;  // Kart şu an ön yüzünde mi?
  isMatched: boolean;  // Kartın eşi bulundu mu?
}
