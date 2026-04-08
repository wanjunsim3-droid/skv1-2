// AOS 애니메이션 초기화
document.addEventListener("DOMContentLoaded", function () {
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
const submitBtn = document.getElementById('submitBtn');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
        e.preventDefault(); // 기본 제출 막기

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        // 제출 버튼 상태 변경 (중복 클릭 방지)
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = '접수 중...';
        submitBtn.disabled = true;

        // 고객님의 구글 앱스 스크립트 웹앱 URL (배포 후 발급받은 URL로 교체하세요)
        const GOOGLE_APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyEbq9SoeTNaBIzTLw3upszR6WAsnsvuhBVIQuZaRSFGqgp086u33AwgX_3CEDf_j1h/exec";

        if (GOOGLE_APP_SCRIPT_URL === "여기에_구글_스크립트_URL을_입력하세요") {
            alert("구글 스프레드시트 스크립트 URL이 설정되지 않았습니다. 관리자에게 문의하세요.");
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        const formData = new FormData(inquiryForm);

        fetch(GOOGLE_APP_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
            .then(() => {
                // no-cors 모드에서는 response.ok를 확인할 수 없음 (무조건 성공으로 간주됨)
                alert(`${name}님, 상담 예약이 정상적으로 접수되었습니다.\n확인 후 빠르게 연락드리겠습니다.`);
                inquiryForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('접수 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
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
