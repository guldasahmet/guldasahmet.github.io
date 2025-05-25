# AI.md

## 🎮 Oyun Geliştirme Sürecinde AI Destekli Soru-Cevaplar

Bu belge, Wild West Rollout oyununun geliştirilmesi sırasında AI'dan alınan destek ve yanıtları içermektedir.

### 🤖 Prompt ve Cevaplar

Oyunumuzda iki farklı düşman tipi bulunmaktadır:

#### 🌵 Kaktüs Adam AI
- **Hareket Sistemi**: Belirli bir alan içinde sağa-sola devriye gezme
- **Saldırı Mekanizması**: Oyuncuya yakın mesafede her 5 saniyede bir can kaybettirme
- **Spawn Limiti**: Maksimum 5 kaktüs adam eş zamanlı olarak oyunda bulunabilir

#### 🐍 Yılan AI
- **Hareket Sistemi**: Oyuncuyu takip etme ve süzülerek ilerleme
- **Saldırı Mekanizması**: Durduğu konumda her 5 saniyede bir can kaybettirme
- **Özel Davranış**: Hızlı hareket ve oyuncuya doğru yönelme

### AI Durum Yönetimi
Her iki düşman tipi için durum-bazlı (state-based) AI sistemi kullanılmaktadır:
1. **Hareket Durumu**: Düşmanın normal hareket paterni
2. **Saldırı Durumu**: Oyuncuya zarar verme durumu
3. **Bekleme Durumu**: Yeni hareket için hazırlanma

## 💻 Yapay Zekâ Geliştirme Süreci

Bu proje kapsamında OpenAI ChatGPT (GPT-4) yapay zekâ aracından faydalanılmıştır. Aşağıda, proje sürecinde kullanılan yapay zekâ prompt'ları ve yanıtları paylaşılmıştır.

---

### 🔸 Prompt 1:
Wild West temalı bir 2D atış oyunu geliştirmek istiyorum. Temel özellikleri ve yapılacaklar listesini hazırlar mısın?

### 🔹 Cevap 1:
İşte Wild West temalı 2D atış oyunu için temel özellikler ve yapılacaklar listesi:

1. **Temel Oyun Mekanikleri**
   - Fare ile nişan alma sistemi
   - Hassas hedef tespiti
   - Mermi yönetimi (maksimum 7 mermi)
   - Can sistemi (3 can)
   - Skor sistemi

2. **Düşman Tipleri**
   - Kaktüs Adam (20 puan)
   - Yılan (10 puan)

3. **Teknik Gereksinimler**
   - HTML5 Canvas
   - Vanilla JavaScript
   - Responsive tasarım
   - Ses sistemi

4. **Görsel ve Ses Öğeleri**
   - Karakter görselleri
   - Düşman görselleri
   - Arka plan müziği
   - Efekt sesleri

### 🔸 Prompt 2:
Oyunda iki farklı düşman tipi olacak. Bunların davranış sistemlerini nasıl tasarlamalıyım?

### 🔹 Cevap 2:
İşte her iki düşman tipi için önerilen davranış sistemleri:

**Kaktüs Adam:**
- Sağa-sola devriye gezme hareketi
- Her 5 saniyede bir can kaybettirme
- Maksimum 5 adet eş zamanlı spawn
- Daha yüksek puan değeri (20 puan)
- Sürekli hareket ettiği için zor hedef

**Yılan:**
- Oyuncuyu takip etme ve süzülme hareketi
- Durduğu konumda her 5 saniyede can kaybettirme
- Hızlı hareket ve oyuncuya yönelme
- Daha düşük puan değeri (10 puan)
- Öngörülebilir hareket paterni

### 🔸 Prompt 3:
Canvas boyutlandırma ve responsive tasarım için en iyi yaklaşım ne olmalı?

### 🔹 Cevap 3:
Canvas'ı responsive yapmak için şu yaklaşımı kullanabilirsiniz:

```javascript
const ORJ_WIDTH = 1500;
const ORJ_HEIGHT = 1080;

function boyutlandir() {
    const oran = Math.min(
        window.innerWidth / ORJ_WIDTH,
        window.innerHeight / ORJ_HEIGHT
    );
    
    canvas.width = ORJ_WIDTH;
    canvas.height = ORJ_HEIGHT;
    
    canvas.style.width = ORJ_WIDTH * oran + "px";
    canvas.style.height = ORJ_HEIGHT * oran + "px";
}

window.addEventListener("resize", boyutlandir);
boyutlandir();
```

---

### 🔸 Prompt 4:
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



### 🔸 Prompt 5: 
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



### 🔸 Prompt 6: 
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

### 🔸 Prompt 4:
Oyunda ses sistemini nasıl yönetmeliyim? Arka plan müziği ve efekt sesleri için öneriler neler?

### 🔹 Cevap 4:
Ses sistemi için önerilen yaklaşım:

```javascript
const sesler = {
    arkaPlan: new Audio('assets/oyun_sesi1.mp3'),
    silah: new Audio('assets/silah_sesi_dolu.mp3'),
    efekt: new Audio('assets/oyun_sesi2.mp3')
};

// Arka plan müziği için loop ve ses seviyesi
sesler.arkaPlan.loop = true;
sesler.arkaPlan.volume = 0.5;

// Efekt sesleri için
function efektCal(ses) {
    ses.currentTime = 0;
    ses.play();
}
```

### 🔸 Prompt 5:
Oyunda mermi ve can sistemini nasıl tasarlayabilirim?

### 🔹 Cevap 5:
İşte mermi ve can sistemi için önerilen yapı:

```javascript
const oyuncu = {
    can: 3,
    mermi: 7,
    maksimumMermi: 7
};

function canKaybi() {
    oyuncu.can--;
    if(oyuncu.can <= 0) {
        oyunBitti();
    }
}

function mermiTopla(bonus) {
    oyuncu.mermi = Math.min(oyuncu.mermi + bonus, oyuncu.maksimumMermi);
}

function atesEt() {
    if(oyuncu.mermi > 0) {
        oyuncu.mermi--;
        return true;
    }
    return false;
}
```

### 🔸 Prompt 6:
Çarpışma tespiti (collision detection) sistemini nasıl kurabilirim?

### 🔹 Cevap 6:
Çarpışma tespiti için basit ve etkili bir yaklaşım:

```javascript
function carpismaTespiti(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 &&
           x1 + w1 > x2 &&
           y1 < y2 + h2 &&
           y1 + h1 > y2;
}

function hedefTespiti(fareX, fareY, hedef) {
    return carpismaTespiti(
        fareX - 5, fareY - 5, 10, 10,
        hedef.x, hedef.y, hedef.genislik, hedef.yukseklik
    );
}
```

### 🔸 Prompt 7:
Animasyon sistemini nasıl kurabilirim? Özellikle karakter ve düşman animasyonları için öneriler neler?

### 🔹 Cevap 7:
Kare-bazlı animasyon sistemi için önerilen yapı:

```javascript
class Sprite {
    constructor(img, frameWidth, frameHeight) {
        this.img = img;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.currentFrame = 0;
        this.frameSayisi = img.width / frameWidth;
        this.frameHizi = 5;
        this.sayac = 0;
    }
    
    guncelle() {
        this.sayac++;
        if(this.sayac >= this.frameHizi) {
            this.currentFrame = (this.currentFrame + 1) % this.frameSayisi;
            this.sayac = 0;
        }
    }
    
    ciz(ctx, x, y) {
        ctx.drawImage(
            this.img,
            this.currentFrame * this.frameWidth, 0,
            this.frameWidth, this.frameHeight,
            x, y,
            this.frameWidth, this.frameHeight
        );
    }
}
```

### 🔸 Prompt 8:
Skor sistemini ve en yüksek skor kaydını nasıl yapabilirim?

### 🔹 Cevap 8:
Skor sistemi ve yerel depolama kullanımı:

```javascript
const skorSistemi = {
    mevcutSkor: 0,
    enYuksekSkor: localStorage.getItem('enYuksekSkor') || 0,
    
    skorEkle(dusmanTipi) {
        const puanlar = {
            'kaktus': 20,
            'yilan': 10
        };
        this.mevcutSkor += puanlar[dusmanTipi];
        
        if(this.mevcutSkor > this.enYuksekSkor) {
            this.enYuksekSkor = this.mevcutSkor;
            localStorage.setItem('enYuksekSkor', this.enYuksekSkor);
        }
    },
    
    skorGoster(ctx) {
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Skor: ${this.mevcutSkor}`, 10, 30);
        ctx.fillText(`En Yüksek: ${this.enYuksekSkor}`, 10, 60);
    }
};
```

### 🔸 Prompt 9:
Oyunu durdurup devam ettirme (pause/resume) sistemini nasıl ekleyebilirim?

### 🔹 Cevap 9:
Pause sistemi implementasyonu:

```javascript
const oyunDurumu = {
    durduruldu: false,
    
    duraklatToggle() {
        this.durduruldu = !this.durduruldu;
        if(this.durduruldu) {
            sesler.arkaPlan.pause();
            this.duraklayiGoster();
        } else {
            sesler.arkaPlan.play();
            oyunDongusu();
        }
    },
    
    duraklayiGoster() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "48px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("OYUN DURAKLATILDI", canvas.width/2 - 200, canvas.height/2);
    }
};

document.addEventListener('keydown', (e) => {
    if(e.key === 'p' || e.key === 'P') {
        oyunDurumu.duraklatToggle();
    }
});
```

### 🔸 Prompt 10:
Oyun başlangıç ekranı ve oyun sonu ekranını nasıl tasarlayabilirim?

### 🔹 Cevap 10:
Menü ekranları için önerilen yapı:

```javascript
const menuler = {
    baslangic: {
        goster() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = "48px Western";
            ctx.fillStyle = "white";
            ctx.fillText("WILD WEST ROLLOUT", canvas.width/2 - 240, canvas.height/2 - 50);
            
            ctx.font = "24px Arial";
            ctx.fillText("Başlamak için tıklayın", canvas.width/2 - 100, canvas.height/2 + 50);
        },
        tiklandiginda() {
            oyunuBaslat();
        }
    },
    
    oyunSonu: {
        goster() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = "48px Western";
            ctx.fillStyle = "white";
            ctx.fillText("OYUN BİTTİ", canvas.width/2 - 140, canvas.height/2 - 50);
            
            ctx.font = "24px Arial";
            ctx.fillText(`Skorunuz: ${skorSistemi.mevcutSkor}`, canvas.width/2 - 80, canvas.height/2 + 20);
            ctx.fillText("Tekrar oynamak için tıklayın", canvas.width/2 - 120, canvas.height/2 + 70);
        },
        tiklandiginda() {
            oyunuSifirla();
            oyunuBaslat();
        }
    }
};
```


