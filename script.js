```javascript
/* ===================================
   🌈 Minik Kaşif v1.0
   script.js
=================================== */

// ----------------------
// Ses Sistemi
// ----------------------

let audioContext = null;

function getAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// ----------------------
// Buton Sesi
// ----------------------

function playClickSound() {

    const audio = getAudio();

    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = "triangle";
    osc.frequency.value = 700;

    osc.connect(gain);
    gain.connect(audio.destination);

    gain.gain.value = 0.15;

    osc.start();

    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        audio.currentTime + 0.15
    );

    osc.stop(audio.currentTime + 0.15);

}

// ----------------------
// Sayfa Aç
// ----------------------

function openPage(page){

    playClickSound();

    document.body.style.opacity="0.3";

    setTimeout(()=>{

        location.href = page;

    },300);

}

// ----------------------
// Türkçe Seslendirme
// ----------------------

function speak(text){

    if(!("speechSynthesis" in window))
        return;

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "tr-TR";

    msg.rate = 0.95;

    speechSynthesis.speak(msg);

}

// ----------------------
// Hoşgeldin
// ----------------------

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

    setTimeout(()=>{

        speak("Minik Kaşif'e hoş geldin.");

    },700);

});

// ----------------------
// Buton Efekti
// ----------------------

document.querySelectorAll(".menuButton").forEach(btn=>{

    btn.addEventListener("click",()=>{

        playClickSound();

    });

});

// ----------------------
// Uçan Yıldızlar
// ----------------------

function createStar(){

    const star=document.createElement("div");

    star.innerHTML="⭐";

    star.style.position="fixed";
    star.style.left=Math.random()*100+"vw";
    star.style.top="-30px";
    star.style.fontSize=(20+Math.random()*20)+"px";
    star.style.pointerEvents="none";
    star.style.zIndex="1";

    document.body.appendChild(star);

    let y=-30;

    const timer=setInterval(()=>{

        y+=3;

        star.style.top=y+"px";

        if(y>window.innerHeight){

            clearInterval(timer);

            star.remove();

        }

    },25);

}

// Her 4 saniyede bir yıldız oluştur
setInterval(createStar,4000);
```
