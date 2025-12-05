
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


function spawnBalloon(x, y) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = x + "px";
    balloon.style.top = y + "px";

    // لون عشوائي
    const colors = ["#ff3b8d", "#ff6bcb", "#ffae00", "#00d1ff", "#7dff7a", "#b84bff"];
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById("touch-effects").appendChild(balloon);
    setTimeout(() => balloon.remove(), 2000);
}


function strongExplosion(x, y) {
    const amount = 25; // عدد الشرارات
    const radius = 150; // قوة الانفجار (كلما كبر زاد الانتشار)

    for (let i = 0; i < amount; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";

        // زاوية كل شرارة (360 درجة)
        const angle = (i / amount) * 2 * Math.PI;

        // الاتجاه الدائري
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        spark.style.left = x + "px";
        spark.style.top = y + "px";

        // تمرير الحركة للـ CSS
        spark.style.setProperty("--x", dx + "px");
        spark.style.setProperty("--y", dy + "px");

        // لون عشوائي للمفرقعات
        const colors = ["yellow", "orange", "#ffdd00", "#ff1e00", "white"];
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];

        document.getElementById("touch-effects").appendChild(spark);

        setTimeout(() => spark.remove(), 800);
    }
}


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
