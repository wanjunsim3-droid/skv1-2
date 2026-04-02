// AOS 애니메이션 초기화
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic',
    });
});

// 스크롤 시 네비게이션 바 스타일 변경
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('scrolled');
        if (window.scrollY <= 50) {
             navbar.classList.remove('scrolled');
        }
    }
});

// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// 스무스 스크롤 (앵커 링크)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 폼 제출 이벤트
const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = inquiryForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerText;
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const inquiryType = document.getElementById('inquiryType').value;

        // 구글 폼 Endpoint
        const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeM4F73MyiIaWtKjzEYvkrcP4WObBxyti9vg0SUr3P5PW-ldg/formResponse";

        // 데이터 조립
        const formData = new FormData();
        formData.append('entry.918255295', name);
        formData.append('entry.381030079', phone);
        formData.append('entry.1997573890', inquiryType);

        // 버튼 비활성화 (중복 클릭 방지)
        submitBtn.disabled = true;
        submitBtn.innerText = "전송 중...";

        // Fetch API를 사용한 전송 (CORS 이슈로 opaque 모드 사용 가능)
        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
        .then(() => {
            // 성공 처리 (no-cors 모드에서는 항상 이쪽으로 옵니다)
            alert(`${name}님, 상담 예약이 정상적으로 접수되었습니다.\n확인 후 빠르게 연락드리겠습니다.`);
            inquiryForm.reset();
        })
        .catch((error) => {
            console.error('Submission Error:', error);
            alert("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        });
    });
}

// 층별안내 탭 로직
const floorTabs = document.querySelectorAll('.floor-tab');
const floorContents = document.querySelectorAll('.floor-content');

floorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        floorTabs.forEach(t => t.classList.remove('active'));
        floorContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});


// 입지여건 이미지 슬라이더 (Swiper.js)
if (document.querySelector('.location-swiper')) {
    const locationSwiper = new Swiper('.location-swiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// 프리미엄 이미지 슬라이더 (Swiper.js)
if (document.querySelector('.premium-swiper')) {
    const premiumSwiper = new Swiper('.premium-swiper', {
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.premium-swiper .swiper-button-next',
            prevEl: '.premium-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.premium-swiper .swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// 사업개요 이미지 슬라이더 (Swiper.js)
if (document.querySelector('.about-swiper')) {
    const aboutSwiper = new Swiper('.about-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.about-swiper .swiper-button-next',
            prevEl: '.about-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.about-swiper .swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}
