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
        "id": 105,
        "baslik": "📦🚚 Ücretsiz Kargo Kampanyası Başladı!",
        "icerik": "Tea House olarak Aralık ayı boyunca ☃️❄️ 250 TL ve üzeri tüm siparişlerde **kargo ücretsiz**! 🛍️✨ <br> Kampanya yalnızca yurt içi gönderiler için geçerlidir. Kaçırmayın! 💛✨",
        "tarih": "20.03.2026",
        "url": ""
      },
     {
        "id": 104,
        "baslik": "🌿 Bitki ve Meyve Çaylarında Kaçırılmayacak Fırsatlar!",
        "icerik": "Tea House'un en sevilen bitki ve meyve çayları, bu hafta boyunca özel indirimlerle sizleri bekliyor! 🥳 <br> Doğal bitki karışımlarından ferahlatıcı meyve aromalarına kadar tüm ürünlerde sepette büyük avantajlar sizi karşılıyor. 🌠 <br> • Bağışıklığı destekleyen doğal karışımlar <br> • Kış aylarına özel sıcak ve aromatik çaylar <br> • %100 doğal içerikler, taze harmanlar <br> • Sadece kampanya süresince geçerli özel fiyatlar <br> Sağlıklı yaşam rutininize lezzet katmak için tam zamanı! ☕ <br> Sevdiğiniz çayları keşfedin, stoklarla sınırlı bu fırsatları kaçırmayın.",
        "tarih": "05.05.2025",
        "url": "store.html?category=herbal-and-fruit-teas"
        }
      // NOT: Eksik resim/dosyaUrl alanlarını eklemek için bu objeleri genişletebilirsiniz.
    ];

    /* --- YARDIMCI FONKSIYON: Local Storage'dan Çekme --- */
    function getDuyurular() {
        const json = localStorage.getItem("duyurular");
        return json ? JSON.parse(json) : [];
    }
    
    // Tüm duyuruları (LS veya manuel) tek bir kaynaktan çekmek için yardımcı değişken
    let allDuyurular = []; 


    /* --- ANA FONKSIYON: Duyuruları Yükle ve Göster --- */
    function loadAndRenderDuyurular() {
        const container = document.getElementById("announcement-carousel");
        
        let duyurular = getDuyurular();

        // Eğer Local Storage BOŞ ise (yani ilk kez açılıyorsa veya önbellek temizse)
        if (!duyurular.length) {
            // console.log("Local Storage boş, manuel veriler Local Storage'a kaydediliyor...");
            localStorage.setItem("duyurular", JSON.stringify(manualDuyurular));
            duyurular = manualDuyurular;
        }
        
        // Tüm duyuruları global değişkene ata
        allDuyurular = duyurular;

        if (!duyurular.length) {
            container.innerHTML = "<p class='text-center text-muted'>Henüz güncel duyuru bulunmamaktadır.</p>";
            return;
        }
        
        // jQuery hazır olduğunda veya hemen sonra render et
        $(document).ready(function() {
             renderDuyurular(allDuyurular);
        });
    }


    /* --- DUYURULARI EKRANA BASMA FONKSİYONU --- */
    function renderDuyurular(duyurular) {
        const container = document.getElementById("announcement-carousel");
        let html = "";
        
        // Önceki karoseli yok et
        if (container.classList.contains('owl-loaded')) {
            $('.product-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            container.innerHTML = "";
        }
        
        // Duyuruları karusel yapısına dönüştür
        duyurular.forEach(d => {
            // Karoselde gösterilecek metni temizle (HTML ve fazla boşlukları kaldır)
            const plainTextContent = d.icerik
                .replace(/<br\s*\/?>/gi, ' ') // <br> etiketlerini boşlukla değiştir
                .replace(/<\/?b>/gi, '')   // Bold etiketlerini kaldır
                .replace(/<[^>]*>?/gm, ''); // Diğer tüm HTML etiketlerini kaldır
            
            // Metni güvenli bir şekilde kes
            const shortContent = plainTextContent.substring(0, 100) + (plainTextContent.length > 100 ? '...' : '');

            html += `
                <div class="announcement-card rounded shadow-sm bg-white p-4 text-center">
                    <h4 class="text-primary mb-2">${d.baslik}</h4>
                    <p class="text-body mb-3">${shortContent}</p>
                    <small class="text-muted d-block mb-3">${d.tarih}</small>

                    <button class="btn btn-primary rounded-pill px-4 py-2"
                        onclick="openAnnouncementById(${d.id})"> 
                        Detay
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;
        container.classList.add('owl-carousel');

        // Carousel'i başlat
        $('.product-carousel').owlCarousel({
            autoplay: true,
            smartSpeed: 1200,
            dots: false,
            loop: true,
            margin: 20, 
            nav: true,
            navText : [
                '<i class="fa fa-arrow-left"></i>',
                '<i class="fa fa-arrow-right"></i>'
            ],
            responsive: { 
                0:{ items:1 },
                576:{ items:2 },
                992:{ items:3 }
            }
        });
    }

    /* --- ID İLE DUYURU BULMA VE MODALI AÇMA FONKSİYONU --- */
    function openAnnouncementById(id) {
        // ID ile duyuruyu allDuyurular dizisinde bul
        const data = allDuyurular.find(d => d.id == id);

        if (!data) {
            console.error("Duyuru bulunamadı:", id);
            return;
        }
        
        // Güncel duyuru objesi ile modalı aç
        openAnnouncement(data);
    }
    
    
    /* --- MODAL AÇMA FONKSİYONU --- */
    function openAnnouncement(data) {
        // Statik alanları doldur
        document.getElementById("modalBaslik").innerText = data.baslik;
        document.getElementById("modalIcerik").innerHTML = data.icerik; // HTML içeriği için innerHTML kullanıldı
        document.getElementById("modalTarih").innerText = "Tarih: " + data.tarih;

        // Resim Alanını Yönetme (Önceki yanıtta eklediğimiz mantık)
        const imgContainer = document.getElementById("modalImageContainer");
        const imgElement = document.getElementById("modalImage");
        // data.resimUrl alanı duyuru objelerinde yok, bu yüzden d-none kalması normal
        if (data.resimUrl && data.resimUrl.trim() !== "") {
            imgElement.src = data.resimUrl;
            imgContainer.classList.remove("d-none");
        } else {
            imgContainer.classList.add("d-none");
        }

        // Ek Dosyalar Alanını Yönetme
        const filesContainer = document.getElementById("modalFilesContainer");
        const fileLinksDiv = document.getElementById("modalFileLinks");
        fileLinksDiv.innerHTML = ""; 
        filesContainer.classList.add("d-none"); // Varsayılan olarak gizle

        if (data.ekDosyalar && data.ekDosyalar.length > 0) {
            // Ek dosya oluşturma mantığı buraya gelir
            filesContainer.classList.remove("d-none");
        }


        // Detay Sayfası Butonunu Yönetme
        const urlBtn = document.getElementById("modalUrlBtn");
        if (data.url && data.url.trim() !== "") {
            urlBtn.classList.remove("d-none");
            urlBtn.href = data.url; 
        } else {
            urlBtn.classList.add("d-none");
        }

        // Modalı Göster
        const modal = new bootstrap.Modal(document.getElementById('duyuruModal'));
        modal.show();
    }
    
    
    /* --- DOMContentLoaded olduğunda yüklemeyi başlat --- */
    document.addEventListener("DOMContentLoaded", loadAndRenderDuyurular);