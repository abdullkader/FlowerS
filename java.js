import { butterfliesBackground } from 'https://unpkg.com/threejs-toys@0.0.7/build/threejs-toys.module.cdn.min.js'

const pc = butterfliesBackground({
	el: document.getElementById('app'),
	eventsEl: document.body,
  gpgpuSize: 42,
	background: 0xfad0c4,
	material: 'basic',
	materialParams: { transparent: true, alphaTest: 0.5 },
	texture: 'https://assets.codepen.io/33787/butterflies.png',
	textureCount: 4,
	wingsScale: [1, 1, 1],
	wingsWidthSegments: 8,
	wingsHeightSegments: 8,
	wingsSpeed: 0.75,
	wingsDisplacementScale: 1.25,
	noiseCoordScale: 0.01,
	noiseTimeCoef: 0.0005,
	noiseIntensity: 0.0025,
	attractionRadius1: 100,
	attractionRadius2: 150,
	maxVelocity: 0.1,
});
// إنشاء البتلات
const flower = document.querySelector('.flower');
const petalCount = 18;

for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    const rotate = i * (360 / petalCount);
    petal.style.setProperty('--rotate', `${rotate}deg`);
    petal.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(0.1)`;
    flower.insertBefore(petal, flower.firstChild);
}

// إنشاء التألق
for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 4}s`;
    flower.appendChild(sparkle);
}

// فتح الوردة
function bloomFlower() {
    const petals = document.querySelectorAll('.petal');
    const sparkles = document.querySelectorAll('.sparkle');
    
    petals.forEach((petal, index) => {
        setTimeout(() => {
            petal.style.animation = `bloom 2s ease-out forwards`;
            petal.style.opacity = "1";
        }, index * 120);
    });
    
    sparkles.forEach(sparkle => {
        sparkle.style.animation = `sparkle 3s ease-in-out infinite`;
    });
}

// إضافة تأثير الطفو للوردة
flower.classList.add('float');

// فتح الوردة تلقائيًا عند تحميل الصفحة
window.addEventListener('load', () => {
    setTimeout(bloomFlower, 500);
});

// تأثيرات إضافية عند التحويم
const center = document.querySelector('.center');
center.addEventListener('mouseover', () => {
    center.style.transform = 'scale(1.15)';
});

center.addEventListener('mouseout', () => {
    center.style.transform = 'scale(1)';
});
const explosionContainer = document.getElementById("hearts-explosion");
// تأثير الانفجار والبالونات عند النقر أو اللمس
document.addEventListener("pointerdown", (e) => {
    strongExplosion(e.clientX, e.clientY);
    spawnBalloon(e.clientX, e.clientY);
});

const video = document.getElementById("bgVideo");

function enableSound() {
  video.muted = false;
  video.volume = 1.0;

  // محاولة تشغيل الفيديو بالصوت بعد التفاعل
  video.play().catch(() => {});

  // بعد نجاح أول تفاعل، احذف المستمعين
  document.removeEventListener("click", enableSound);
  document.removeEventListener("touchstart", enableSound);
}

document.addEventListener("click", enableSound);
document.addEventListener("touchstart", enableSound);


function explodeHearts() {
    // عدد القلوب في الانفجار الواحد (عدّل الرقم للتكثيف)
    const amount = 25; 
    word = ["❤️","I love you","❤️","My everything","❤️", "My eyes","❤️","My angel","❤️","My sweet","❤️","S ❤️ A","❤️","My sweetheart","❤️","My moon","❤️","My sun","❤️","My honey","❤️","My life","❤️","My soul","❤️","My mistress","❤️","My princess","❤️"][Math.floor(Math.random()*24)];
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart-explode");
        heart.textContent = word;

        // مكان ظهور القلب (عشوائي)
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        heart.style.left = startX + "px";
        heart.style.top = startY + "px";

        // اتجاه انتشار القلب (انفجاري)
        const randomX = (Math.random() - 0.5) * 800;
        const randomY = (Math.random() - 0.5) * 800;

        heart.style.setProperty("--x", randomX + "px");
        heart.style.setProperty("--y", randomY + "px");

        explosionContainer.appendChild(heart);

        // تنظيف بعد انتهاء الانيميشن
        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
}

// سرعة الانفجار (كل 0.15 ثانية انفجار جديد)
setInterval(explodeHearts, 500);
