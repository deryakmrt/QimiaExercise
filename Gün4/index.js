      function switchTab(tabName) {
        const buttons = document.querySelectorAll(".tab-btn");// tab butonlarını seçiyoruz
        const contents = document.querySelectorAll('[id^="content-"]');// id si content- ile başlayan tüm elementleri seçiyoruz

        buttons.forEach((btn) => { // her bir buton için
          const isActive = btn.dataset.tab === tabName; // btn.dataset.tab ile butonun data-tab değerini alıyoruz ve tabName ile karşılaştırıyoruz
          const label = btn.querySelector(".tab-label");
          const underline = btn.querySelector(".tab-underline");

          label.classList.toggle("font-bold", isActive);
          label.classList.toggle("text-gray-900", isActive);
          label.classList.toggle("text-gray-400", !isActive);
          underline.classList.toggle("hidden", !isActive);
        });

        contents.forEach((section) => {
          const isMatch = section.id === "content-" + tabName; // id si content- + tabName ile eşleşiyorsa göster, değilse gizle
          section.classList.toggle("hidden", !isMatch);
        });
      }
      document.addEventListener("DOMContentLoaded", ()=> {
        document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));//btn.dataset.tab ile expertise veya how-we-work değerini alıyoruz
      }); // tab butonlarına tıklama olayını ekliyoruz ve tanımlanan tabName ile switchTab fonksiyonunu çağırıyoruz

      switchTab("expertise"); // sayfa ilk açıldığında varsayılan aktif tab

      });

      
