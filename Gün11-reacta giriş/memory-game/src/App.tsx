/*önce home gösterilir daha sonra zorluk seçilip bir değişkende tut
bu değişkene göre grid yapısı oluştur. bunu game e gönder */
import { useState } from 'react'
import type { Difficulty } from './types/game'
import Game from './pages/Game'
import Home from './pages/Home'

function App() {
  // kullanıcının seçtiği zorluk seviyesini tutar.
  // başlangıçta henüz bir seçim yapılmadığı için null kullanıyoruz.
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)

  function handleDifficultySelect(difficulty: Difficulty) {
    setSelectedDifficulty(difficulty)
  }

  if (selectedDifficulty === null) {
    return <Home onSelectedDifficulty={handleDifficultySelect} />
  }

  return (
    <Game
      difficulty={selectedDifficulty}
      onBackToHome={() => setSelectedDifficulty(null)}
    />
  )
}

export default App