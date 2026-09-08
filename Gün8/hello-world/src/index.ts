const dersListesi = document.getElementById("ders-listesi");
const secilenDersler = document.getElementById("secilen-dersler");
const secilenDersSayisi = document.getElementById("secilen-ders-sayisi");
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

const dersler: Ders[] = [
	new Ders(1, "Matematik", new Ogretmen("Ahmet")),
	new Ders(2, "Fizik", new Ogretmen("Mehmet")),
	new Ders(3, "Kimya", new Ogretmen("Ayşe")),
	new Ders(4, "Biyoloji", new Ogretmen("Fatma")),
	new Ders(5, "Tarih", new Ogretmen("Ali")),
];

let secilmisDersler: Ders[] = dersler.slice(0, 2);// Başlangıçta ilk iki dersi seçili

function render(): void {
	if (!dersListesi || !secilenDersler || !dersKarti) return;

	dersListesi.replaceChildren(...dersler.map((ders) => dersKartiOlustur(dersKarti, ders, false)));// Tüm dersleri map ile listele
	secilenDersler.replaceChildren(...secilmisDersler.map((ders) => dersKartiOlustur(dersKarti, ders, true)));// Sadece seçilen dersleri listele

	if (secilenDersSayisi) {
		secilenDersSayisi.textContent = String(secilmisDersler.length);
	}
}

function dersKartiOlustur(template: HTMLTemplateElement, ders: Ders, secilenListe: boolean): DocumentFragment {// Ders kartını oluşturmak için template kullan
	const card = template.content.cloneNode(true) as DocumentFragment;
	const article = card.querySelector("article");
	const dersAdi = card.querySelector(".ders-adi");
	const dersOgretmeni = card.querySelector(".ders-ogretmeni");
	const islemButonu = card.querySelector<HTMLButtonElement>(".islem-butonu");
	const sohbetButonu = card.querySelector<HTMLButtonElement>("[data-action='konus']");
	const dersZatenSecili = secilmisDersler.some((secilmisDers) => secilmisDers.id === ders.id);

	if (article) article.dataset.dersId = String(ders.id);
	if (dersAdi) dersAdi.textContent = ders.ad;
	if (dersOgretmeni) dersOgretmeni.textContent = `🧑🏻‍🏫Öğretmen: ${ders.ogretmen.ad}`;
	if (secilenListe && islemButonu) {// Eğer ders seçilen listede ise butonun işlevini değiştir
		islemButonu.dataset.action = "cikar";
		islemButonu.textContent = "-";
		islemButonu.title = "Dersi çıkar";
		islemButonu.ariaLabel = "Dersi çıkar";
		islemButonu.classList.replace("bg-indigo-600", "bg-red-600");
		islemButonu.classList.replace("hover:bg-indigo-700", "hover:bg-red-700");
	} else if (dersZatenSecili && islemButonu) {// Eğer ders zaten seçili ise butonu devre dışı bırak
		islemButonu.disabled = true;
		islemButonu.classList.add("cursor-not-allowed", "opacity-40");
	}
	sohbetButonu?.addEventListener("click", () => dersIsleminiYonet(ders, "konus"));
	islemButonu?.addEventListener("click", () => dersIsleminiYonet(ders, secilenListe ? "cikar" : "ekle"));

	return card;
}

function dersIsleminiYonet(ders: Ders, islem: string): void {
	if (islem === "konus") {
		if (ogretmenMesaji) ogretmenMesaji.textContent = ders.ogretmen.konus();
		return;
	}

	if (islem === "ekle") {
		if (secilmisDersler.some((secilmisDers) => secilmisDers.id === ders.id)) return;
		secilmisDersler = [...secilmisDersler, ders];
	} else if (islem === "cikar") {
		secilmisDersler = secilmisDersler.filter((secilmisDers) => secilmisDers.id !== ders.id);//seçilmiş dersin id'si ile eşleşmeyen dersleri filtrele
	}

	if (ogretmenMesaji) {
		ogretmenMesaji.textContent = "Öğretmenle konuşmak için sohbet balonuna tıklayın.";
	}

	render();
}

render();