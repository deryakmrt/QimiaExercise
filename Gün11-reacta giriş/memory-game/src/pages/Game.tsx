//başlangıçta kapalı
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { difficultySettings, type CardType, type Difficulty } from '../types/game'

interface GameProps {
	difficulty: Difficulty
	onBackToHome: () => void
}

const icons = ['🍎', '🚀', '🌈', '🐳', '🎸', '🍕', '🌻', '🦊', '⚽', '🎨', '🧩', '🌙', '🍩', '🚲', '🐼', '🎯', '🪁', '🍉']

//pairCount ne kadar çift gerekir onu tutar
function createDeck(pairCount: number): CardType[] {
	//slice zorluk derecesine göre ne kadar çift gerekliyse ayırır
	return icons.slice(0, pairCount).flatMap((icon, pairId) => [  
		//her emoji için 2 kart üretir sadece id farklı, pairid aynı
		{ id: pairId * 2, pairId, icon, isFlipped: false, isMatched: false },
		{ id: pairId * 2 + 1, pairId, icon, isFlipped: false, isMatched: false },
	]).sort(() => Math.random() - 0.5) //üretilen kartları random karıştırır
}

function Game({ difficulty, onBackToHome }: GameProps) {
	// seçili zorluk seviyesine göre oyun ayarlarını al
	const settings = difficultySettings[difficulty]

	// oyun kartlarını oluştur
	const [cards, setCards] = useState(() => createDeck(settings.pairCount))

	// kullanıcının açtığı kartların ID'lerini tut
	// en fazla 2 kart açık olabilir.
	const [selectedCardIds, setSelectedCardIds] = useState<number[]>([])

	// kullanıcının toplam hamle sayısı
	const [moves, setMoves] = useState(0)

	// 3, 2, 1 şeklinde geri sayım
	const [countdown, setCountdown] = useState<number | null>(3)

	// oyun başladığında true olur
	const [gameStarted, setGameStarted] = useState(false)

	// oyun içinde geçen süre
	const [elapsedTime, setElapsedTime] = useState(0)

	// yeniden oyun başlatma için tur sayacı.
	const [gameRound, setGameRound] = useState(0)

	// iki kart açıksa eşleşme kontrolü yapılıyor demektir.
	const isChecking = selectedCardIds.length === 2

	// bütün kartlar eşlenmişse oyun biter
	const isFinished = cards.length > 0 && cards.every((card) => card.isMatched)

	// oyun açılınca 3-2-1 geri sayım başlar.
	// sayaç 0 olduğunda oyun başlar ve kartlar tıklanabilir hale gelir
	useEffect(() => {
		const timer = window.setInterval(() => {
			setCountdown((current) => {
				if (current === null || current <= 1) {
					window.clearInterval(timer)
					setGameStarted(true)
					return null
				}
				return current - 1
			})
		}, 1000)
		return () => window.clearInterval(timer)
	}, [gameRound])

	// oyun başladığında süre başlar.
	// oyun bitince süre durur.
	useEffect(() => {
		if (!gameStarted || isFinished) return
		const timer = window.setInterval(() => setElapsedTime((current) => current + 1), 1000)
		return () => window.clearInterval(timer)
	}, [gameStarted, isFinished])

	// kullanıcı iki kart açtığında eşleşme kontrolü yapılır
	// eşleşirse kartlar açık kalır, değilse kısa süre sonra tekrar kapatılır
	useEffect(() => {
		if (selectedCardIds.length !== 2) return

		const [firstId, secondId] = selectedCardIds
		const firstCard = cards.find((card) => card.id === firstId)
		const secondCard = cards.find((card) => card.id === secondId)
		const isMatch = firstCard?.pairId === secondCard?.pairId
		const timer = window.setTimeout(() => {
			setCards((currentCards) => currentCards.map((card) => {
				if (card.id !== firstId && card.id !== secondId) return card
				return { ...card, isFlipped: isMatch, isMatched: isMatch }
			}))
			setSelectedCardIds([])
		}, isMatch ? 350 : 800)

		return () => window.clearTimeout(timer)
	}, [cards, selectedCardIds])

	// bir kartın üzerine tıklanınca yapılacak işlemler
	// geri sayım bitmemişse, iki kart açılmıyorsa veya kart zaten açık/eşleşmişse işlem yapmaz
	function handleCardClick(cardId: number) {
		if (!gameStarted || isChecking || selectedCardIds.includes(cardId)) return
		const card = cards.find((currentCard) => currentCard.id === cardId)
		if (!card || card.isMatched || card.isFlipped) return

		setCards((currentCards) => currentCards.map((currentCard) => (
			currentCard.id === cardId ? { ...currentCard, isFlipped: true } : currentCard
		)))
		const nextSelectedIds = [...selectedCardIds, cardId]
		setSelectedCardIds(nextSelectedIds)
		if (nextSelectedIds.length === 2) setMoves((currentMoves) => currentMoves + 1)
	}

	// yeni oyun başlatır
	// kartları yeniden oluşturur, sayaçları sıfırlar ve geri sayımı yeniden başlatır
	function restartGame() {
		setCards(createDeck(settings.pairCount))
		setSelectedCardIds([])
		setMoves(0)
		setElapsedTime(0)
		setCountdown(3)
		setGameStarted(false)
		setGameRound((currentRound) => currentRound + 1)
	}

	// Süreyi dakika:saniye formatında gösterir
	function formatTime(seconds: number) {
		const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
		const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
		return `${minutes}:${remainingSeconds}`
	}

	return (
		<main className="min-h-screen px-4 py-6 sm:px-8">
			<div className="mx-auto max-w-5xl">
				<header className="mb-6 flex flex-wrap items-center justify-between gap-4">
					<div>
						<p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">{settings.label} seviye</p>
						<h1 className="text-3xl font-black text-slate-900">Memory Game</h1>
					</div>
					<div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-600">
						<span className="rounded-full bg-white px-4 py-2 shadow-sm">Süre: {formatTime(elapsedTime)}</span>
						<span className="rounded-full bg-white px-4 py-2 shadow-sm">Hamle: {moves}</span>
						<button type="button" onClick={onBackToHome} className="rounded-full border border-slate-300 px-4 py-2 hover:bg-slate-100">Ana sayfa</button>
					</div>
				</header>

				<section className="relative mx-auto w-full max-w-2xl rounded-3xl bg-slate-200/70 p-2 shadow-inner sm:p-4">
					{countdown !== null && <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-slate-900/80 text-8xl font-black text-white">{countdown}</div>}
					<div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: `repeat(${settings.columns}, minmax(0, 1fr))` }}>
						{cards.map((card) => <Card key={card.id} card={card} disabled={!gameStarted || isChecking} onClick={() => handleCardClick(card.id)} />)}
					</div>
				</section>

				{isFinished && (
					<div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/60 px-5">
						<section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
							<p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-amber-600">Tamamlandı</p>
							<h2 className="mb-6 text-4xl font-black text-slate-900">Harika iş!</h2>
							<div className="mb-8 grid grid-cols-2 gap-3">
								<div className="rounded-2xl bg-slate-100 p-4"><span className="block text-sm text-slate-500">Süre</span><strong className="text-2xl">{formatTime(elapsedTime)}</strong></div>
								<div className="rounded-2xl bg-slate-100 p-4"><span className="block text-sm text-slate-500">Hamle</span><strong className="text-2xl">{moves}</strong></div>
							</div>
							<div className="flex flex-col gap-3 sm:flex-row">
								<button type="button" onClick={restartGame} className="flex-1 rounded-xl bg-amber-500 px-5 py-3 font-bold text-slate-950 hover:bg-amber-400">Yeni oyun</button>
								<button type="button" onClick={onBackToHome} className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-100">Ana sayfa</button>
							</div>
						</section>
					</div>
				)}
			</div>
		</main>
	)
}

export default Game