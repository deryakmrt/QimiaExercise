function createCard(title, description, iconClass) 
{
    return `
    <div class="border border-gray-200 rounded-sm overflow-hidden bg-white">
      <div class="flex items-center gap-4 bg-gray-100 p-5">
        <div class="w-14 h-14 shrink-0 rounded-sm bg-linear-to-br from-amber-300 to-amber-500 flex items-center justify-center">
          <i class="bi ${iconClass} text-white text-2xl"></i>
        </div>
        <h3 class="text-lg font-bold text-gray-900">${title}</h3>
      </div>
      <p class="p-5 text-sm text-gray-600 leading-relaxed text-center">
        ${description}
      </p>
    </div>
    `;
}

const expertiseCards = [
    {
        title:"Product Design",
        description: "Creating a visual representation of your brand that can withstand the test of time, in both the physical and digital realm using state-of-the-art techniques and tools.",
        iconClass: "bi-pen"
    },
    {
        title:"AI and Data Science",
        description: "Creating a visual representation of your brand that can withstand the test of time, in both the physical and digital realm using state-of-the-art techniques and tools.",
        iconClass: "bi-database"
    },
    {
        title:"Big Data/ Data Warehousing Systems",
        description: "Creating a visual representation of your brand that can withstand the test of time, in both the physical and digital realm using state-of-the-art techniques and tools.",
        iconClass: "bi-house"
    }
]

const howWeWorkCards = [
    {
        title:"Product Design",
        description:  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat commodi excepturi delectus fuga. Nobis tenetur exercitationem, laboriosam eum quaerat reiciendis.",
        iconClass: "bi-pen"
    },
    {
        title:"Product Design2",
        description:  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat commodi excepturi delectus fuga. Nobis tenetur exercitationem, laboriosam eum quaerat reiciendis.",
        iconClass: "bi-database"
    },
    {
        title:"Product Design3",
        description:  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat commodi excepturi delectus fuga. Nobis tenetur exercitationem, laboriosam eum quaerat reiciendis.",
        iconClass: "bi-house"
    }
]

function renderCards(containerId, cardsData) 
{
    const container = document.getElementById(containerId); // id ye göre bulur seçer
    container.innerHTML = cardsData.map(card => createCard(card.title, card.description, card.iconClass)).join('');
}  //oluşturulan html metnini container içine yazar   //bir array başlatır                  //joinle araya bir şey eklemeden birleştir

document.addEventListener("DOMContentLoaded", () => {
    renderCards('content-expertise', expertiseCards);
    renderCards('content-how-we-work', howWeWorkCards);
});
