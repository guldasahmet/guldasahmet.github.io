# AI.md

## Yapay Zekâ Kullanım Bildirimi

Bu proje kapsamında OpenAI ChatGPT (GPT-4) yapay zekâ aracından faydalanılmıştır. Aşağıda, proje sürecinde kullanılan yapay zekâ prompt'u ve yanıtı aynen paylaşılmıştır.

## 📌 Not:

Bu dosya, projede yapay zekâ desteği kullanıldığını şeffaf biçimde göstermek amacıyla hazırlanmıştır.

---

### 🔸 Prompt 1:
JavaScript, CSS, HTML5 teknolojileri kullanarak ve temel mekanikleri Wild West Rollout(https://cyanine.itch.io/wild-west-rollout) adlı oyundan alarak bir oyun yapacağım. Bana kısa ve öz bir yol haritası hazırlar mısın?(Fare kullanılarak oynanacak)

### 🔹 ChatGPT Cevabı:
Elbette! İşte JavaScript, CSS ve HTML5 kullanarak, Wild West Rollout tarzında fare ile oynanan bir tarayıcı oyunu geliştirmek için kısa ve öz bir yol haritası:

🎯 1. Oyun Tasarımı ve Planlama
Oyunun temel mekaniğini belirle: (örneğin: silindiri döndür, mermi rastgele yerleşsin, düşmanı hedef al, tıkla ve ateş et).
Varlık listesi oluştur: oyuncu, düşman, silah, silindir, mermi, arka plan vs.
Ekran yapısını ve oyun akışını kaba taslak çiz (wireframe veya kağıt üzerinde).

🧱 2. HTML5 Yapısı (Canvas)
index.html dosyası oluştur.
<canvas> elemanı yerleştir (örn: 800x600).
Basit bir başlat menüsü (Start Game) hazırla.

🎨 3. CSS ile Stil Verme
Oyun ekranı (canvas) ve menüleri ortala, tema rengine uygun arka plan belirle.
Gerekirse özel fontlar ve buton stilleri uygula.

🧠 4. JavaScript ile Oyun Mekaniği
Temel Yapı:
game.js oluştur.
Canvas’ı seç ve 2D context al.
Ana oyun döngüsü (game loop) kur (örn: requestAnimationFrame ile).

Mekanikler:
Fare olaylarını dinle (mousedown, mousemove, mouseup).
Silindiri döndür ve mermiyi rastgele yerleştir.
Oyuncu tıkladığında ateş et ve sonucu hesapla.
Skor sistemi veya can sistemi kur.

🎯 5. Animasyonlar ve Ses Efektleri
Silindirin dönme animasyonu.
Ateş efekti (flash, ses).
Vurulan düşmanın düşme animasyonu.

🧪 6. Test ve Hata Ayıklama
Tüm mekanikleri sırayla test et.
Tarayıcı konsolunda hata kontrolü yap.
Fare hassasiyetini ve tıklama bölgelerini incele.

🚀 7. Son Rötuşlar ve Yayınlama
Başlangıç ekranı, oyun sonrası ekranı (skor, yeniden başlat butonu) ekle.
Mobil uyumluluğu kontrol et (gerekirse dokunmatik destek ekle).
GitHub Pages, Netlify veya itch.io gibi platformlarda yayınla.



### 🔸 Prompt 2: 
Bir HTML5 canvas oyunu geliştiriyorum. Oyun çözünürlüğü 1500x1080 piksel. Ekran boyutu bu çözünürlükten küçük olduğunda, canvas'ın oranını koruyarak otomatik olarak küçülmesini ve ekranın ortasında kalmasını istiyorum. Bu işlemi sade ve verimli bir şekilde nasıl yapabilirim?

### 🔹 ChatGPT Cevabı: 
// orijinal çözünürlük (chroma key görüntü buna göre çizilecek)
const ORJ_WIDTH = 1500;
const ORJ_HEIGHT = 1080;

// canvas boyutunu pencereye göre küçült (oran korunsun)
function boyutlandir() {
    // Oranı hesapla
    const oran = Math.min(
        window.innerWidth / ORJ_WIDTH,
        window.innerHeight / ORJ_HEIGHT
    );

    // CSS olarak ölçekle
    canvas.style.width = ORJ_WIDTH * oran + "px";
    canvas.style.height = ORJ_HEIGHT * oran + "px";
}

window.addEventListener("resize", boyutlandir);
boyutlandir();



### 🔸 Prompt 3: 
Oyundaki canvas öğesini farklı ekran boyutlarına göre nasıl ölçekleyip konumlandırabilirim?

### 🔹 ChatGPT Cevabı:  
Canvas’ın orijinal çözünürlüğüne göre pencere boyutundan bir oran hesaplanır. Bu oranla canvas’ın gerçek genişlik ve yüksekliği ayarlanır. Böylece çizimler, farklı ekranlarda aynı oranda ölçeklenir ve doğru konumlanır. Pencere yeniden boyutlandırıldığında canvas boyutları güncellenmeli ve çizim fonksiyonu çağrılmalıdır.

Örnek Kod:
const ORJ_WIDTH = 1500, ORJ_HEIGHT = 1080;

function resize() {
  const scale = Math.min(window.innerWidth / ORJ_WIDTH, window.innerHeight / ORJ_HEIGHT);
  canvas.width = ORJ_WIDTH * scale;
  canvas.height = ORJ_HEIGHT * scale;
  canvas.style.width = canvas.width + "px";
  canvas.style.height = canvas.height + "px";
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Canvas çizimleri canvas.width ve canvas.height baz alınarak yapılır
  requestAnimationFrame(draw);
}
window.addEventListener("resize", resize);
resize();
draw();

İstersen başka bir formatta da hazırlayabilirim!


