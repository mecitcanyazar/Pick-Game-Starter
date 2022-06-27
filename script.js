'use strict';
// Elementleri Seçmek
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.getElementById("score--0")  // get kullanmak querySelector'dan daha hızlı çalışıyor.
const score1El = document.getElementById("score--1")
const diceEl = document.querySelector(".dice")


const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

// Başlangıç Şartları
let scores,currentScore,activePlayer,playing   
// Clear kod yazmak adına tekrar eden elementleri init fonksiyonu içine aldım ve bunların değişken adlarını globalde tanımladım.

const init = function (){
    scores = [0,0]     // Total skorları player0 ve player1 için buraya atacağız.
    currentScore = 0
    activePlayer = 0     
    playing = true       // Biri kazanınca roll dice butonu artık üstüne eklemesin diye en basta playing diye bir değişken tanımladım ve aşağıdaki roll butonunun çalışma prensibini playing= true olacak şekilde oluşturdum.
    
    // Başlangıç skorlarını sıfırlıyorum ve zarı gizliyorum.
    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0
    current1El.textContent = 0
    diceEl.classList.add("hidden")
    
    player0El.classList.remove("player--winner")       // Başlangıçta kazanan olmadığı için player-winner class'larını gizledim.
    player1El.classList.remove("player--winner")
    player0El.classList.add("player--active")          // Oyuna player0'ın başlaması active player class'ını buraya ekledim.
    player1El.classList.remove("player--active")
    
}

init();         // Fonksiyon içinde yazdığım kodların geçerli olması için fonksiyonu çağırdım.

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0         
    activePlayer = activePlayer === 0  ? 1 : 0
    currentScore = 0                                 // Sıra değiştiğinde skor sıfırlansın.
    player0El.classList.toggle("player--active")     // add ve remove ekleme,çıkarma yaparken toggle değiştirme işlemi yapıyor.toggle orada class yoksa bir class ekleyecek,ya da ekleyeceğimiz class ordaysa kaldıracak.
    player1El.classList.toggle("player--active")  
}
// Zar Atma İşlevi

btnRoll.addEventListener("click",function(){
    if(playing){ 
        // 1.Rastgele zar oluştur
        const dice = Math.trunc(Math.random() * 6 ) + 1
        // console.log(dice);
        
        // 2.Zarları göster
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`          // Gelen zar 1 ile 6 arasında bir değer alacak ve bu değer 1'den 6'ya kadar olan image dosyalarını çağıracak.
       
        // 3.Zarda 1'i kontrol et.
        if(dice !== 1) {
            // Zarı mevcut skora ekle
            currentScore += dice 
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
            // current0El.textContent = currentScore  // --- Sonra değiştir
        }else{
            // Eğer 1 geldiyse diğer oyuncuya geç
            switchPlayer()
        }
    }
})

btnHold.addEventListener("click",function(){
        if(playing){ 
        // console.log("hold butonu");             // Hata var mı diye kontrol etmek amacıyla ekledik.
        
        // 1. Aktif oyuncunun puanına mevcut puanı eklemek
        scores[activePlayer] += currentScore      //    scores[1] = scores [1] + currentScore
        // console.log(scores[activePlayer]);     //    atamadan sonra puan doğru mu hesaplanıyor kontrol ettik
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
       
        // 2. Puanın 100 olup olmadığının kontrolü
        if(scores[activePlayer] >= 100 ){
        document.querySelector(`.player--${activePlayer }`).classList.add("player--winner")
        document.querySelector(`.player--${activePlayer }`).classList.remove("player--active")
       
        // 2.a 100'se oyunu bitir.
        playing = false              // 100'e ulaşınca oyunun sona ermesi için roll ve hold butonlarının çalışma prensibini playing:true ilkesine bağlamıştım ve şimdi playing'i false yaparak bu butonun atkifliğini kaldıırıyorum.
        diceEl.classList.add("hidden")
        } else{
        // 2.b Daha düşük bir değerse diğer oyuncuya geç 
        switchPlayer()

        }
    }
   
})

btnNew.addEventListener("click",init)




