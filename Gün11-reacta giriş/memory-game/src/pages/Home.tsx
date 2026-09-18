function Home() {
  //component UI üretir
  const difficultyOptions = {
    easy: { label: "Kolay", detail: "4x4" },
    medium: { label: "Orta", detail: "5x5" },
    hard: { label: "Zor", detail: "6x6" },
  };
  return (
    <>
      <h1>Memory Game Oyunu</h1>
      <div>
        {/* difficultyOptions nesnesini key-value çiftlerine çevirir.
            value: easy, medium, hard
            difficulty: ilgili label ve detail bilgileri */}
        {Object.entries(difficultyOptions).map(([value, difficulty]) => (
          <button key={value}>
            <span>{difficulty.label}</span>
            <small>{difficulty.detail}</small>
          </button>
        ))}
      </div>
    </>
  );
}
export default Home;
