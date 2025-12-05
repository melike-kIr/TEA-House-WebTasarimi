
    // Global değişkenler
    let allDuyurular = []; 

    /* --- MANUEL OLARAK EKLEDİĞİNİZ DUYURULAR (Kalıcı Veri) --- */
    const manualDuyurular = [
      { 
        "id": 101, 
        "baslik": "Kış İndirimleri Başladı! ❄️", 
        "icerik": "Tüm siyah çay çeşitlerinde %20 indirim fırsatını kaçırmayın. Kampanya stoklarla sınırlıdır ve 15 Aralık'a kadar geçerlidir.", 
        "tarih": "01.12.2025", 
        "url": "store.html" 
      },
      { 
        "id": 102, 
        "baslik": "Yeni Mağazamız Açıldı 🎉", 
        "icerik": "Ankara şubemiz hizmete girmiştir. İlk 100 müşterimize özel hediyelerimiz var! Adresimiz için iletişim sayfasına bakınız.", 
        "tarih": "25.11.2025", 
        "url": "contact.html" 
      },
      {
        "id": 103,
        "baslik": "🌱 Tea House Organik Sertifikasını Yeniledi!",
        "icerik": "Tea House olarak doğaya olan bağlılığımızı sürdürmeye devam ediyoruz! <br> Bu yıl yapılan denetimlerde tüm üretim ve tedarik süreçlerimiz başarıyla değerlendirilmiş ve Uluslararası Organik Tarım Sertifikamız resmî olarak yenilenmiştir. 🍃<br> Bu sertifika; <br> • Çay yapraklarımızın tamamen doğal yöntemlerle yetiştirildiğini, <br> • Kimyasal katkı maddesi kullanılmadığını, <br> • Çevre dostu üretim standartlarına uyulduğunu, <br> • Sürdürülebilir tarım prensiplerinin benimsendiğini <br> belgelemektedir. 🌿✨ <br> Tea House ailesi olarak sizlere her zaman en saf, en doğal ve en kaliteli çayları sunmak için çalışmaya devam edeceğiz. ☕💛",
        "tarih": "10.06.2024",
        "url": ""
      },
    {
        "id": 104,
        "baslik": "🌿 Bitki ve Meyve Çaylarında Kaçırılmayacak Fırsatlar!",
        "icerik": "Tea House'un en sevilen bitki ve meyve çayları, bu hafta boyunca özel indirimlerle sizleri bekliyor! 🥳 <br> Doğal bitki karışımlarından ferahlatıcı meyve aromalarına kadar tüm ürünlerde sepette büyük avantajlar sizi karşılıyor. 🌠 <br> • Bağışıklığı destekleyen doğal karışımlar <br> • Kış aylarına özel sıcak ve aromatik çaylar <br> • %100 doğal içerikler, taze harmanlar <br> • Sadece kampanya süresince geçerli özel fiyatlar <br> Sağlıklı yaşam rutininize lezzet katmak için tam zamanı! ☕ <br> Sevdiğiniz çayları keşfedin, stoklarla sınırlı bu fırsatları kaçırmayın.",
        "tarih": "05.05.2025",
        "url": "store.html?category=herbal-and-fruit-teas"
        },
      {
        "id": 105,
        "baslik": "📦🚚 Ücretsiz Kargo Kampanyası Başladı!",
        "icerik": "Tea House olarak Aralık ayı boyunca ☃️❄️ 250 TL ve üzeri tüm siparişlerde **kargo ücretsiz**! 🛍️✨ <br> Kampanya yalnızca yurt içi gönderiler için geçerlidir. Kaçırmayın! 💛✨",
        "tarih": "20.03.2026",
        "url": ""
      }
    ];

    /* --- YARDIMCI FONKSIYON: Local Storage'dan Çekme --- */
    function getDuyurular() {
        const json = localStorage.getItem("duyurular");
        return json ? JSON.parse(json) : [];
    }
    

    /* --- ANA FONKSIYON: Duyuruları Yükle ve Göster (loadAnnouncementsCarousel'un yeni versiyonu) --- */
    function loadAnnouncementsCarousel() {
        const container = document.getElementById("announcement-carousel");
        
        let duyurular = getDuyurular();

        // Eğer Local Storage BOŞ ise, manuel verileri kullan ve kaydet
        if (!duyurular.length) {
            localStorage.setItem("duyurular", JSON.stringify(manualDuyurular));
            duyurular = manualDuyurular;
        }
        
        allDuyurular = duyurular;

        if (!container) { return; }

        if (allDuyurular.length === 0) {
            container.innerHTML = `<div class="p-4 text-center text-muted">Şu anda güncel duyuru bulunmamaktadır.</div>`;
            return;
        }

        let html = "";
        
        // Duyuruları karusel yapısına dönüştür
        allDuyurular.forEach(item => {
            // Karoselde gösterilecek metni temizle (HTML ve fazla boşlukları kaldır)
            const plainTextContent = item.icerik
                .replace(/<br\s*\/?>/gi, ' ') // <br> etiketlerini boşlukla değiştir
                .replace(/<\/?b>/gi, '')   // Bold etiketlerini kaldır
                .replace(/<[^>]*>?/gm, ''); // Diğer tüm HTML etiketlerini kaldır
            
            // Metni güvenli bir şekilde kes
            const shortContent = plainTextContent.substring(0, 100) + (plainTextContent.length > 100 ? '...' : '');

            // ID bazlı onclick kullanıldı (FIX 1 & 2)
            html += `
                <div class="announcement-card rounded shadow-sm bg-white p-4 text-center">
                    <h4 class="text-primary mb-2">${item.baslik}</h4>
                    <p class="text-body mb-3">${shortContent}</p> 
                    <small class="text-muted d-block mb-3">${item.tarih}</small>

                    <button class="btn btn-primary rounded-pill px-4 py-2"
                        onclick="openAnnouncementById(${item.id})"> 
                        Detay
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
        container.classList.add('owl-carousel');

        // Carousel'i başlat
        $("#announcement-carousel").owlCarousel({
            autoplay: true, // Otomatik oynatma eklendi
            smartSpeed: 1200,
            dots: false,
            loop: true,
            margin: 20, 
            nav: true, // Navigasyon düğmeleri eklendi
            navText : [
                '<i class="fa fa-arrow-left"></i>',
                '<i class="fa fa-arrow-right"></i>'
            ],
            responsive: { 
                0:{ items:1 },
                768:{ items:2 },
                992:{ items:3 }
            }
        });
        
        // Özel navigasyon düğmeleri (prevAnnouncement/nextAnnouncement) kaldırıldı, Owl Carousel'in kendi navigasyonu kullanılıyor.
        // Eğer nav:true kullanmak istemezseniz, bu kısmı silip, aşağıdaki buton atamalarını tekrar ekleyebilirsiniz:
        /*
        const prevBtn = document.getElementById("prevAnnouncement");
        const nextBtn = document.getElementById("nextAnnouncement");
        if (prevBtn) {
            prevBtn.onclick = () => $("#announcement-carousel").trigger("prev.owl.carousel");
        }
        if (nextBtn) {
            nextBtn.onclick = () => $("#announcement-carousel").trigger("next.owl.carousel");
        }
        */
    }

    /* --- ID İLE DUYURU BULMA VE MODALI AÇMA FONKSİYONU --- */
    function openAnnouncementById(id) {
        // ID ile duyuruyu allDuyurular dizisinde bul
        const data = allDuyurular.find(d => d.id == id);

        if (!data) {
            console.error("Duyuru bulunamadı:", id);
            return;
        }
        
        // Modalı açan fonksiyonu çağır (index.html'deki basit modal yapısını kullanır)
        openAnnouncement(data);
    }
    
    // openAnnouncementById'nin global olarak erişilebilir olmasını sağla
    window.openAnnouncementById = openAnnouncementById;
    
    
    /* --- MODAL AÇMA FONKSİYONU (index.html'deki mevcut basit yapıyla uyumlu) --- */
    function openAnnouncement(data) {
        document.getElementById("modalBaslik").innerText = data.baslik;
        document.getElementById("modalIcerik").innerHTML = data.icerik;
        document.getElementById("modalTarih").innerText = "Tarih: " + data.tarih;

        const urlBtn = document.getElementById("modalUrlBtn");
        
        if (data.url && data.url.trim() !== "") {
            urlBtn.classList.remove("d-none");
            urlBtn.href = data.url;
        } else {
            urlBtn.classList.add("d-none");
        }

        // Modalı göster
        const modal = new bootstrap.Modal(document.getElementById('duyuruModal'));
        modal.show();
    }


    document.addEventListener('DOMContentLoaded', function () {
        // jQuery hazır olduğunda karoseli yükle
        $(document).ready(function() {
            loadAnnouncementsCarousel();
        });
    });
