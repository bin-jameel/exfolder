/////////////////////////////////////////////////     BIG BANNER START       ///////////////////////////////////////////////////////////////////
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation()




// Initialize Owl Carousel
$(document).ready(function () {
    $(".testimonial-carousel").owlCarousel({
        loop: true, // يجعل التمرير مستمرًا
        margin: 30, // المسافة بين البطاقات
        nav: false, // إظهار/إخفاء الأسهم
        dots: true, // إظهار النقاط في الأسفل
        autoplay: true, // التمرير التلقائي
        autoplayTimeout: 3000, // الوقت بين الانتقالات
        autoplayHoverPause: true, // إيقاف التشغيل التلقائي عند التمرير فوق الكرت
        responsive: {
            0: {
                items: 1 // عرض بطاقة واحدة للشاشات الصغيرة
            },
            768: {
                items: 2 // عرض بطاقتين للشاشات المتوسطة
            },
            1024: {
                items: 3 // عرض ثلاث بطاقات للشاشات الكبيرة
            }
        }
    });
});





//////////////////////////////////////////////////////////     BIG BANNER   END   ///////////////////////////////////////////////////////////////////










/////////////////////////////////////////////////////// counter number /////////////////////////////////////////////////////////////////

// تحديد البطاقات
const cards = document.querySelectorAll('.card');

// دالة لإضافة تأثير عند رؤية البطاقات
const options = {
    root: null, // يعتمد على نافذة المتصفح
    rootMargin: "0px",
    threshold: 0.3 // تشغيل التأثير عند ظهور 30% من البطاقة
};

// دالة المراقبة عند التمرير
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
};

// إنشاء مراقب التمرير
const observer = new IntersectionObserver(callback, options);

// مراقبة البطاقات
cards.forEach(card => {
    observer.observe(card);
});




document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const speed = 200;
        const increment = target / speed;

        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
});

