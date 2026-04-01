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
        // 히어로 섹션에서도 배경을 보이게 하기 위해 항상 scrolled 상태 유지, 
        // 다이나믹하게 바꾸려면 else에 remove('scrolled') 하면 되지만
        // 흰색 로고가 안보일 위험이 있으니 스크롤 값에 따라 변경
        if (window.scrollY <= 50) {
             navbar.classList.remove('scrolled');
        }
    }
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
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        // 실제 운영 환경에서는 API로 데이터를 전송해야 합니다.
        // 현재는 시뮬레이션용 알럿입니다.
        if (name && phone) {
            alert(`${name}님, 성공적으로 상담 예약이 접수되었습니다.\n전문 상담사가 빠른 시일 내에 연락드리겠습니다.`);
            inquiryForm.reset();
        }
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
