//kart gösterimi ve kuralları
//ne zaman visible ne zaman icon gösterilir vs.
import type { CardType } from '../types/game'

interface CardProps {
	card: CardType
	onClick: () => void
	disabled: boolean
}

function Card({ card, onClick, disabled }: CardProps) {
	const isVisible = card.isFlipped || card.isMatched//dönmüşse ya da eşlenmisse açık tut

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={isVisible ? `Kart ${card.icon}` : 'Kapalı kart'}
			className={`card aspect-square w-full min-w-0 rounded-xl text-4xl shadow-md transition-transform duration-300 sm:text-5xl ${
				isVisible ? 'card--flipped' : ''
			}`}
		>
			<span className="card__face card__face--front">{card.icon}</span>
			<span className="card__face card__face--back">?</span>
		</button>
	)
}

export default Card