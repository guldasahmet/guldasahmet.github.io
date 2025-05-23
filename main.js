

// canvas elementi
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// fotograflar 

var kovboy_on = new Image();
var kovboy_arka = new Image();
var arkaplan  = new Image();
var dusman_kaktus_adam  = new Image();
var dusman_yilan  = new Image();
var bos_kalp = new Image();
var dolu_kalp = new Image();
var bonus_kursun = new Image();
var buyuk_kursun = new Image();
var nisan_gostergesi = new Image();

kovboy_on.src = "assets/kovboy_on.png";
kovboy_arka.src = "assets/kovboy_arka.png";
arkaplan.src = "assets/arkaplan.png";
dusman_kaktus_adam.src = "assets/dusman_kaktus_adam.png";
dusman_yilan.src = "assets/dusman_yilan.png";
bos_kalp.src = "assets/bos_kalp.png";
dolu_kalp.src = "assets/dolu_kalp.png";
bonus_kursun.src = "assets/bonus_kursun.png";
buyuk_kursun.src = "assets/buyuk_kursun.png";
nisan_gostergesi.src = "assets/nisan_gostergesi.png";

// ses dosyalari 

var oyun_sesi1 = new Audio();
var oyun_sesi2 = new Audio();
var silah_sesi_dolu = new Audio();

oyun_sesi1.src = "assets/oyun_sesi1.mp3";
oyun_sesi2.src = "assets/oyun_sesi2.mp3";
silah_sesi_dolu.src = "assets/silah_sesi_dolu.mp3";


// farkli ekranlar icin boyutlandirma islemleri
const ORJ_WIDTH = 1500;
const ORJ_HEIGHT = 1080;

let oyunBasladi = false;
let oyunDurdu = false;
let canSayisi = 3;
let kursunSayisi = 7;

function oyunuBaslat() {
    oyunBasladi = true;
    oyunDurdu = false;
    canSayisi = 3;
    kursunSayisi = 7;
    dusmanlar = []; // düşman listesini sıfırla
    dusmanOlustur(); // ilk düşmanları oluştur (böyle bir fonksiyon varsa)
    ciz(); // oyunu çizmeye başla
}

function oyunuYenidenBaslat() {
    oyunuBaslat();
}

function oyunuDuraklat() {
    oyunDurdu = true;
}

function oyunuDevamEttir() {
    oyunDurdu = false;
    ciz(); // tekrar çizmeye devam et
}


// farkli ekranlar icin boyutlandirma fonksiyonu 
function boyutlandir() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}


// dusmanlar dizisi(yilan ve kaktus adam)
let dusmanlar = [];

// can sayisi 

const MAX_DUSMAN = 50;
const DUSMAN_OLUSMA_ARALIGI = 2000; // 0.7 saniyede bir dene

// dusman olusturma 
function Dusman(tur) {
    this.tur = tur;
    // ternary operator kullanimiyla dusman kaktus ise hizi random 0 ile 0.5 araligina, degilse(yilansa) hizi 0.2'ye atama
    this.hiz = tur === "kaktus" ?  (Math.random() * 0.3)  :  0.2; 
    this.resim = tur === "kaktus" ? dusman_kaktus_adam : dusman_yilan; // ternary operator ile dusman kim kontrolu 

    // olceklendirme
    const scale = canvas.width / ORJ_WIDTH * 0.2;
    this.genislik = this.resim.width * scale;
    this.yukseklik = this.resim.height * scale;

    // kaktus konum ayarlari     // NOT: kaktus_adam ekranda kaldigi her 5 saniyede 1 can alir 
    if (tur === "kaktus") {
        if (!this.olusturmaZamani) {
            this.olusturmaZamani = Date.now();  // sadece bir kere atanacak
            this.canAldiMi = false;
        }

        // Kaktusun konum ayarları
        const minY = 0;
        const maxY = canvas.height / 1.5 - this.yukseklik ;
        this.y = minY + Math.random() * (maxY - minY);

        const merkez = canvas.width / 2;
        const aralik = canvas.width * 0.4;
        this.hareketMerkeziX = merkez - aralik / 2 + Math.random() * aralik;

        this.hareketMesafesi = 200;
        this.x = this.hareketMerkeziX;
    }

    // yilan konum ayarlari
    else {
        this.x = Math.random() * (canvas.width - this.genislik);
        this.y = canvas.height / 3;
        this.durdu = false; // yilanin durmasini kontrol eden flag
        this.canAldiMi = false; // 5 saniyede 1 can alma için flag
        this.durmaZamani = null; // durduktan sonra zaman tutmak için
    }
}

// dusman hareketleri 
Dusman.prototype.guncelle = function() {
    if (this.tur === "kaktus") {
        this.x += this.hiz;

        const maxSaga = this.hareketMerkeziX + this.hareketMesafesi;
        const maxSola = this.hareketMerkeziX - this.hareketMesafesi;

        const ortadaX = this.x + this.genislik / 2;

        if (ortadaX < maxSola || ortadaX > maxSaga) {
            this.hiz *= -1;
        }

        // 5 saniyede 1 can azalt
        if (!this.canAldiMi && Date.now() - this.olusturmaZamani >= 5000) {
            canSayisi = Math.max(0, canSayisi - 1);
            this.canAldiMi = true;
        }
    }
    else if (this.tur === "yilan") {
        if (!this.durdu) {
            const hedefX = canvas.width / 2;
            const hedefY = canvas.height;

            const dx = hedefX - this.x;
            const dy = hedefY - this.y;
            const mesafe = Math.sqrt(dx * dx + dy * dy);

            this.x += (dx / mesafe) * this.hiz;
            this.y += (dy / mesafe) * this.hiz;

            // Eger yilan ekranın altina ulasmissa durdur
            if (this.y + this.yukseklik >= canvas.height) {
                this.durdu = true;
                this.durmaZamani = Date.now(); // durma zamanını kaydet
                this.canAldiMi = false; // can alma için flag sıfırla
            }
        } else {
            // Durduktan sonra 5 saniye geçtiyse can azalt
            if (!this.canAldiMi && Date.now() - this.durmaZamani >= 5000) {
                canSayisi = Math.max(0, canSayisi - 1);
                this.canAldiMi = true;
            }
        }
    }
};

Dusman.prototype.ciz = function() {
    ctx.drawImage(this.resim, this.x, this.y, this.genislik, this.yukseklik);
};

function dusmanOlustur() {
    if (dusmanlar.length < MAX_DUSMAN) {
        const tur = Math.random() < 0.5 ? "kaktus" : "yilan";

        // Eger kaktüs sayısı 5'ten fazlaysa yeni kaktüs üretme
        if (tur === "kaktus") {
            const kaktusSayisi = dusmanlar.filter(d => d.tur === "kaktus").length;
            if (kaktusSayisi >= 5) return;
        }

        dusmanlar.push(new Dusman(tur));
    }
}

setInterval(dusmanOlustur, DUSMAN_OLUSMA_ARALIGI);

/// 



const max_kursun = 20;
const bonus_kursun_boyut = 64;
const kenar_bosluk = 200;

let bonus_kursunlar = []; // {x, y} objeleri burada tutulur


function bonusKursunEkle() {
    if (bonus_kursunlar.length >= max_kursun) return;

    const x = Math.floor(Math.random() * (canvas.width - 2 * kenar_bosluk - bonus_kursun_boyut)) + kenar_bosluk;
    const y = Math.floor(Math.random() * (canvas.height - 2 * kenar_bosluk - bonus_kursun_boyut)) + kenar_bosluk;

    bonus_kursunlar.push({ x, y });
}




bonus_kursun.onload = () => {
    bonusKursunEkle(); // ilk kurşun
};

setInterval(() => {
    bonusKursunEkle();
}, 4000);

////////////////////////// 





let skor = 0;

// ciz 
function ciz() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(arkaplan, 0, 0, canvas.width, canvas.height);

    if (!oyunBasladi) {

        const gradient = ctx.createLinearGradient(0, canvas.height / 2 - 100, 0, canvas.height / 2 + 100);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, canvas.height / 2 - 100, canvas.width, 200);

        ctx.font = "bold 56px 'Segoe UI Emoji', 'Arial'";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 8;
        ctx.fillText("🎯 Oyuna Başlamak İçin Tıkla!", canvas.width / 2, canvas.height / 2 + 20);
        ctx.shadowBlur = 0;

        return;
    }

    if (oyunDurdu) {
        oyun_sesi2.pause();

        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 42px 'Verdana'";
        ctx.textAlign = "center";
        ctx.shadowColor = "#333";
        ctx.shadowBlur = 8;
        ctx.fillText("⏸ Oyun Duraklatıldı", canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = "24px Arial";
        ctx.fillText("Devam etmek için 'P' tuşuna bas", canvas.width / 2, canvas.height / 2 + 30);
        ctx.shadowBlur = 0;

        requestAnimationFrame(ciz);
        return;
    }

    if (canSayisi <= 0) {
        bonus_kursunlar = [];
        oyun_sesi2.pause();
        oyun_sesi1.play();

        ctx.fillStyle = "#ff4d4d";
        ctx.font = "bold 48px 'Arial Black', Gadget, sans-serif";
        ctx.textAlign = "center";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;

        ctx.fillText("💀 Oyun Bitti!", canvas.width / 2, canvas.height / 2 - 60);

        ctx.font = "bold 32px Arial";
        ctx.fillStyle = "#ffd700";
        ctx.fillText("Skorun: " + skor, canvas.width / 2, canvas.height / 2);

        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Tekrar başlamak için tıkla", canvas.width / 2, canvas.height / 2 + 40);
        ctx.shadowBlur = 0;
        skor=0;
        oyun_sesi2.currentTime = 0;

        return;
    }

    // Müzik geçişi (oyun başladıysa ve müzik2 çalmıyorsa başlat)
    if (oyun_sesi1 && !oyun_sesi1.paused) oyun_sesi1.pause();
    if (oyun_sesi2 && oyun_sesi2.paused && !oyunDurdu) oyun_sesi2.play();

    const scale = (canvas.width / ORJ_WIDTH) * 0.4;
    const w = kovboy_arka.width * scale;
    const h = kovboy_arka.height * scale;
    const x = (canvas.width - w) / 2;
    const kovboyY = canvas.height - h;
    ctx.globalAlpha = 0.5;
    ctx.drawImage(kovboy_arka, x, kovboyY, w, h);
    ctx.globalAlpha = 1.0;

    for (let i = 0; i < dusmanlar.length; i++) {
        dusmanlar[i].guncelle();
        dusmanlar[i].ciz();
    }

    bonus_kursunlar.forEach(kursun => {
        ctx.drawImage(bonus_kursun, kursun.x, kursun.y, bonus_kursun_boyut, bonus_kursun_boyut);
    });

    for (let i = bonus_kursunlar.length - 1; i >= 0; i--) {
        const b = bonus_kursunlar[i];
        if (fareX >= b.x && fareX <= b.x + bonus_kursun_boyut &&
            fareY >= b.y && fareY <= b.y + bonus_kursun_boyut) {
            if (kursunSayisi < max_kursun) kursunSayisi++;
            bonus_kursunlar.splice(i, 1);
        }
    }

    const oran = canvas.width / ORJ_WIDTH;
    const nisanBoyut = 120 * oran;
    ctx.drawImage(nisan_gostergesi, fareX - nisanBoyut / 2, fareY - nisanBoyut / 2, nisanBoyut, nisanBoyut);

    const kursunBoyutu = canvas.width * 0.05;
    const kalpBoyutu = canvas.width * 0.1;
    const kursunAraligi = kursunBoyutu * 0.4;
    const kalpAraligi = kalpBoyutu * 0.4;
    const kalpBaslangicX = canvas.width * 0.2;
    const kursunBaslangicX = canvas.width * 0.6;
    const kalpY = canvas.height - kalpBoyutu * 0.8;
    const kursunY = canvas.height - kursunBoyutu - canvas.height * 0.015;

    for (let i = 0; i < 3; i++) {
        ctx.globalAlpha = (i < canSayisi) ? 1.0 : 0.2;
        ctx.drawImage(dolu_kalp, kalpBaslangicX + i * kalpAraligi, kalpY, kalpBoyutu, kalpBoyutu);
    }

    for (let i = 0; i < 7; i++) {
        ctx.globalAlpha = (i < kursunSayisi) ? 1.0 : 0.2;
        ctx.drawImage(buyuk_kursun, kursunBaslangicX + i * kursunAraligi, kursunY, kursunBoyutu, kursunBoyutu);
    }

    ctx.globalAlpha = 1.0;

    // === Skor yazısı ===
    const skorYazi = "🎯 Skor: " + skor;
    ctx.font = "bold 36px 'Segoe UI', 'Verdana', sans-serif";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 6;

    const skorGradient = ctx.createLinearGradient(0, 0, 0, 50);
    skorGradient.addColorStop(0, "#ffcc00");
    skorGradient.addColorStop(1, "#ff6600");
    ctx.fillStyle = skorGradient;

    ctx.fillText(skorYazi, canvas.width / 2, 50);
    ctx.shadowBlur = 0;

    requestAnimationFrame(ciz);
}




window.addEventListener('resize', boyutlandir);

// fare kordinatlari 
let fareX = 0;
let fareY = 0;

// Tıklama (oyun başlatma, düşman vurma)
canvas.addEventListener("click", function(e) {
    if (canSayisi <= 0) {
        oyunuYenidenBaslat();
        return;
    }

    if (!oyunBasladi) {
        oyunuBaslat();
        return;
    }

    if (oyunDurdu) return;

    if (kursunSayisi <= 0) return;

    const dikdortgen = canvas.getBoundingClientRect();
    const tiklamaX = e.clientX - dikdortgen.left;
    const tiklamaY = e.clientY - dikdortgen.top;

    for (let i = dusmanlar.length - 1; i >= 0; i--) {
    const d = dusmanlar[i];
    if (
        tiklamaX >= d.x &&
        tiklamaX <= d.x + d.genislik &&
        tiklamaY >= d.y &&
        tiklamaY <= d.y + d.yukseklik
    ) {
        silah_sesi_dolu.play();
        if (d.tur === "kaktus") {
            skor += 20;
        } else if (d.tur === "yilan") {
            skor += 10;
        }

        dusmanlar.splice(i, 1);
        kursunSayisi--;
        return;
    }
}


    
});

// P tuşu: duraklat / devam ettir
window.addEventListener("keydown", function(e) {
    if (e.key === "p" || e.key === "P") {
        if (!oyunBasladi || canSayisi <= 0) return;
        if (oyunDurdu) {
            oyunuDevamEttir();
        } else {
            oyunuDuraklat();
        }
    }
});

// Mouse koordinatlarını güncelle
canvas.addEventListener("mousemove", function(e) {
    const dikdortgen = canvas.getBoundingClientRect();
    fareX = e.clientX - dikdortgen.left;
    fareY = e.clientY - dikdortgen.top;
});

""


boyutlandir();
arkaplan.onload = function () {
    //oyun_sesi1.play(); // Menü müziği çalmaya başlasın
    ciz();
};