import type { Difficulty } from '../types/game'

interface HomeProps {
    onSelectedDifficulty: (difficulty: Difficulty) => void
}

function Home({ onSelectedDifficulty }: HomeProps) {
    const difficulties: Array<{ value: Difficulty; label: string; detail: string }> = [
        { value: 'easy', label: 'Kolay', detail: '4 x 4 grid' },
        { value: 'medium', label: 'Orta', detail: '5 x 5 grid' },
        { value: 'hard', label: 'Zor', detail: '6 x 6 grid' },
    ]

    return (
        //ana sayfa tasarımı
        <main className="flex min-h-screen items-center justify-center px-5 py-12">
            <section className="w-full max-w-3xl text-center">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-amber-600">Memory game</p>
                <h1 className="mb-4 text-5xl font-black tracking-tight text-slate-900 sm:text-7xl">Eşlerini bul.</h1>
                <p className="mx-auto mb-10 max-w-lg text-lg text-slate-600">Bir zorluk seçin.</p>
                <div className="grid gap-4 sm:grid-cols-3">
                    {difficulties.map((difficulty) => (
                        <button
                            key={difficulty.value}
                            type="button"
                            onClick={() => onSelectedDifficulty(difficulty.value)}
                            className="rounded-2xl border-2 border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-200"
                        >
                            <span className="block text-2xl font-black text-slate-900">{difficulty.label}</span>
                            <span className="mt-2 block text-sm text-slate-500">{difficulty.detail}</span>
                        </button>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Home