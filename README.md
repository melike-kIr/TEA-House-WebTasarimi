# Tea House – Responsive E-Ticaret Web Sitesi
**Bu çalışma, hazır ve duyarlı bir şablon kullanılarak çay satışı sektörüne yönelik modern ve işlevsel bir e-ticaret arayüzü oluşturulmasını amaçlamıştır.**

**Projenin ana hedefi, geleneksel sunucu/veritabanı mimarisinden bağımsız bir yaklaşımla, verilerin kalıcılığını istemci tarafındaki Local Storage'a dayandıran bir Front-End İçerik Yönetim Sistemi (CMS) mantığı tasarlamaktır.**

## Kullanılan Teknolojiler
### Front-end 
<ul>
  <li>HTML5</li>
  <li>CSS</li>
  <li>Bootstrap 5</li>
  <li>JavaScript</li>
</ul>

### Veri Yönetimi
<ul>
  <li>Local Storage (tarayıcı tabanlı kalıcılık)</li>
</ul>

### Şablon
<ul>
  <li>Tea House HTML Template (Themewagon)
    (https://themewagon.com/themes/teahouse/)</li>
</ul>

## Temel Özellikller
<ol>
  <li>Responsive Tasarım: Tüm cihazlarda (masaüstü, tablet, mobil) sorunsuz çalışan duyarlı bir tasarıma sahiptir (Bootstrap 5 kullanılmıştır)</li>
  <li>Temel Veri Kaynağı: Site ilk açıldığında, ürün detay sayfaları ve mağaza listesi için temel veriler başlangıçta bir products.json dosyasından okunur.</li>
  <li>Sunucusuz İçerik Yönetimi (CMS)Sunucu tarafı kodlama ve veritabanı gerektirmeden, Tarayıcı Local Storage yapısı kullanılarak ürünler, duyurular ve abone e-postaları dinamik olarak yönetilir</li>
  <li>Google Harita Entegrasyonu: İletişim sayfası (contact.html), Google Haritalar entegrasyonu ile zenginleştirilmiştir. Kullanıcılar, işletmenin fiziksel lokasyonunu görüntüleyebili</li>
  <li>Sepet Sistemi: Ürün ekleme, miktar değiştirme, silme ve kargo/indirim kurallarına dayalı genel toplam hesaplaması dinamik olarak yapılır</li>
  <li>Modüler Yapı: Ortak arayüz bileşenleri (Navbar, Footer vb.) harici HTML dosyalarından yüklenerek modüler bir kullanıcı arayüzü (UI) oluşturulmuştur.</li>
  <li>Kullanıcı Deneyimi Odaklı Tasarım: Navigasyonun kolay, bilgilerin anlaşılır ve etkileşimlerin akıcı olduğu bir tasarım hedeflenmiştir.</li>
  <li>İster Sağlama: Ana sayfadaki otomatik slider, farklı çay 
çeşitlerini tanıtacak şekilde düzenlenmiş; duyuru alanı 
kampanya, indirim veya özel ürün bilgilendirmelerini 
gösterecek şekilde yapılandırılmıştır. Ayrıca, ürün detay 
sayfaları, hiyerarşik menü yapısı, Google Harita destekli 
iletişim sayfası ve grafiksel istatistiklerin yer aldığı chart
bölümü gibi proje isterleri tamamen çay teması üzerine 
uygulanmıştır.</li>
</ol>

## Sayfa Yapısı
| Sayfa     | Açıklama |
| ----------- | ----------- |
| index.html     |Sayfa ilk olarak 3 tane ürün tanıtımını yapan carousel ile başlar, ardından en çok satan 3 ürünü ve son olarak da dinamik olarak detayları gösterilebilen güncel duyuruları ve kampanyaları sergileyen bölümleri içerir.   |
| announcement.html  | Ana sayfadan ek olarak bütün duyuruların listelendiği sayfa    |
|store.html|Bütün ürünleri gösteren ve ürünlerin türlerine göre filtreleme yapan kısım|
|contact.html|Sayfanın temel işlevi, bir HTML formu aracılığıyla kullanıcıların doldurduğu  bilgileri toplayarak, mailto: protokolü kullanarak varsayılan e-posta uygulamasını açıp bir e-posta taslağı oluşturmaktır. Ayrıca sayfa, konum göstermek için sağ tarafta Google Haritalar iframe'ine yer verir.|
|about.html  logistics.html  vission-mission.html | Bu sayfalar genel olarak sitenin kurumsal kimliğini, işleyişini ve hedeflerini tanıtan kısımlarıdır. |
|cart.html|Local Storage içinde saklanan ürünleri çekerek her bir ürün için adet artırma/azaltma ve silme işlevlerini sağlar ve sepetin ara toplam, kargo, indirim ve genel toplam hesaplamalarını yaparak özeti günceller. |
|product-detail.html|URL'den aldığı productId'ye göre (products.json dosyasından ve localStorage'dan) ilgili ürün bilgilerini çeker, sayfaya dinamik olarak yerleştirir (isim, fiyat, açıklama, görsel, stok durumu) ve "Sepete Ekle" düğmesini stok durumuna göre ayarlar.|
|navbar.html|Site haritasını gösteren ana menüyü oluşturur. Fetch komutu ile tüm sayfalara dinamik olarak eklenerek yönetim ve sürdürelibilirlik sağlar|
|footer.html|Temel olarak, iletişim bilgilerini (adres, sosyal medya), site içindeki önemli sayfalara hızlı navigasyon bağlantılarını ve kullanıcının e-posta ile bültene abone olmasını sağlayan form|
|maneger-users.html|Footer da bulunan abonelik sitemine abone olanları local stroage'den çekip görünteleme ve silme işlevine sahip sayfa |
|manager-announcement.html|Sayfa, yöneticilerin yeni duyuruları eklemesine ve mevcut duyuruları listeleyip silmesine olanak tanır.Ayrıca duyuru eklerken bir yönlendirme gerekiyora URL ekleyerek duyurya daha efektif hale getirebilir. Tüm duyuru verileri, tarayıcının localStorage alanında depolanır ve yönetilir (Veritabanı kullanılmaz).|
|manager-product.html|Sayfa, yöneticilerin formlar aracılığıyla yeni ürün eklemesini veya mevcut ürünleri düzenlemesini sağlar, tüm ürün listesini görselleriyle birlikte kartlar halinde gösterir ve ürünleri silme işlevlerini sunar. Tüm ürün verileri, tarayıcının localStorage alanı üzerinden yönetilir.|
