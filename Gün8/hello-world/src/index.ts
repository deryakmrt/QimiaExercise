const dersListesi = document.getElementById("ders-listesi");
const secilenDersler = document.getElementById("secilen-dersler");
const secilenDersSayisi = document.getElementById("secilen-ders-sayisi");
const tumDersSayisi = document.getElementById("tum-ders-sayisi"); // HTML'de span'e bu id'yi vereceğiz
const ogretmenMesaji = document.getElementById("ogretmen-mesaji");
const dersKarti = document.getElementById("ders-karti") as HTMLTemplateElement | null;

class Ogretmen {
	constructor(public ad: string) {}
	konus(): string {
		return `Merhaba, benim adım ${this.ad}.`;
	}
}
class Ders {
	constructor(public id: number, public ad: string, public ogretmen: Ogretmen) {}
}
// Tüm ders + seçili ders state'ini ve bu state'i değiştiren davranışları
// tek bir yerde topluyoruz. Dışarıdan kimse secilmisDersler dizisine
// doğrudan erişip değiştiremiyor — sadece bu sınıfın metodları üzerinden.
class DersYoneticisi {
	private secilmisDersler: Ders[];

	constructor(private readonly tumDersler: Ders[], baslangicSayisi: number = 2) {
		this.secilmisDersler = tumDersler.slice(0, baslangicSayisi);
	}

	getTumDersler(): Ders[] {
		return this.tumDersler;
	}

	getSecilmisDersler(): Ders[] {
		return this.secilmisDersler;
	}

	dersSecilmiMi(id: number): boolean {
		return this.secilmisDersler.some((ders) => ders.id === id);
	}

	dersEkle(ders: Ders): void {
		if (this.dersSecilmiMi(ders.id)) return;
		this.secilmisDersler = [...this.secilmisDersler, ders];
	}

	dersCikar(id: number): void {
		this.secilmisDersler = this.secilmisDersler.filter((ders) => ders.id !== id);
	}
}

const dersler: Ders[] = [
	new Ders(1, "Matematik", new Ogretmen("Ahmet")),
	new Ders(2, "Fizik", new Ogretmen("Mehmet")),
	new Ders(3, "Kimya", new Ogretmen("Ayşe")),
	new Ders(4, "Biyoloji", new Ogretmen("Fatma")),
	new Ders(5, "Tarih", new Ogretmen("Ali")),
];

const dersYoneticisi = new DersYoneticisi(dersler, 2); // Başlangıçta ilk iki ders seçili

function metinAta(el: Element | null, metin: string): void {
	if (el) el.textContent = metin;
}

function render(): void {
	if (!dersListesi || !secilenDersler || !dersKarti) return;

	const tumu = dersYoneticisi.getTumDersler();
	const secilmisler = dersYoneticisi.getSecilmisDersler();

	dersListesi.replaceChildren(...tumu.map((ders) => dersKartiOlustur(dersKarti, ders, false)));
	secilenDersler.replaceChildren(...secilmisler.map((ders) => dersKartiOlustur(dersKarti, ders, true)));

	metinAta(secilenDersSayisi, String(secilmisler.length));
	metinAta(tumDersSayisi, `${tumu.length} ders`);
}

function dersKartiOlustur(template: HTMLTemplateElement, ders: Ders, secilenListe: boolean): DocumentFragment {
	const card = template.content.cloneNode(true) as DocumentFragment;
	const article = card.querySelector("article");
	const dersAdi = card.querySelector(".ders-adi");
	const dersOgretmeni = card.querySelector(".ders-ogretmeni");
	const islemButonu = card.querySelector<HTMLButtonElement>(".islem-butonu");
	const sohbetButonu = card.querySelector<HTMLButtonElement>("[data-action='konus']");

	if (article) article.dataset.dersId = String(ders.id);
	metinAta(dersAdi, ders.ad);
	metinAta(dersOgretmeni, `🧑🏻‍🏫Öğretmen: ${ders.ogretmen.ad}`);

	if (secilenListe && islemButonu) {
		islemButonu.dataset.action = "cikar";
		islemButonu.textContent = "-";
		islemButonu.title = "Dersi çıkar";
		islemButonu.ariaLabel = "Dersi çıkar";
		islemButonu.classList.replace("bg-indigo-600", "bg-red-600");
		islemButonu.classList.replace("hover:bg-indigo-700", "hover:bg-red-700");
	} else if (dersYoneticisi.dersSecilmiMi(ders.id) && islemButonu) {
		islemButonu.disabled = true;
		islemButonu.classList.add("cursor-not-allowed", "opacity-40");
	}

	sohbetButonu?.addEventListener("click", () => dersIsleminiYonet(ders, "konus"));
	islemButonu?.addEventListener("click", () => dersIsleminiYonet(ders, secilenListe ? "cikar" : "ekle"));

	return card;
}

function dersIsleminiYonet(ders: Ders, islem: string): void {
	if (islem === "konus") {
		metinAta(ogretmenMesaji, ders.ogretmen.konus());
		return;
	}

	if (islem === "ekle") {
		dersYoneticisi.dersEkle(ders);
	} else if (islem === "cikar") {
		dersYoneticisi.dersCikar(ders.id);
	}

	metinAta(ogretmenMesaji, "Öğretmenle konuşmak için sohbet balonuna tıklayın.");
	render();
}

render();