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
        // 기본 제출 막기 (우리가 직접 제어)
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const inquiryType = document.getElementById('inquiryType').value;

        // 구글 폼 Action URL (Response)
        const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeM4F73MyiIaWtKjzEYvkrcP4WObBxyti9vg0SUr3P5PW-ldg/formResponse";

        // 숨겨진 iframe 생성 (페이지 이동 방지 및 확실한 전송)
        let iframe = document.getElementById('hidden_confirm_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.name = 'hidden_confirm_iframe';
            iframe.id = 'hidden_confirm_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }

        // 폼 설정을 구글 폼으로 변경
        inquiryForm.action = GOOGLE_FORM_URL;
        inquiryForm.method = 'POST';
        inquiryForm.target = 'hidden_confirm_iframe';

        // 실제 전송 실행
        inquiryForm.submit();

        // 메타 픽셀 Lead 이벤트 전송
        if (typeof fbq === 'function') {
            fbq('track', 'Lead');
        }

        // 사용자 알림 및 폼 초기화
        alert(`${name}님, 상담 예약이 정상적으로 접수되었습니다.\n확인 후 빠르게 연락드리겠습니다.`);
        
        // 전송 후 폼 초기화 및 속성 원상복구 (중요)
        setTimeout(() => {
            inquiryForm.reset();
            inquiryForm.action = '';
            inquiryForm.target = '';
        }, 500);
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

// 팝업 모달 공통 로직
const modals = document.querySelectorAll('.rsvp-modal');
const closeBtns = document.querySelectorAll('.close-modal');

closeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const modalToClose = this.closest('.rsvp-modal');
        if (modalToClose) {
            modalToClose.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    modals.forEach(m => {
        if (e.target === m) {
            m.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// RSVP 모달 (기존 modal 변수 유지 - 하위 호환성)
const modal = document.getElementById('rsvpModal');
const openModalBtn = document.getElementById('openModalBtn');

if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 내용 스크롤 방지
    });
}

// AI 모달 
const aiModal = document.getElementById('aiModal');
const openAiModalBtn = document.getElementById('openAiModalBtn');

if (openAiModalBtn && aiModal) {
    openAiModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        aiModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// AI 모달 내부 상당예약 버튼
const aiModalContactBtn = document.getElementById('aiModalContactBtn');
if(aiModalContactBtn && aiModal) {
    aiModalContactBtn.addEventListener('click', () => {
        aiModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        const targetElement = document.getElementById('contact');
        if (targetElement) {
            const navbar = document.getElementById('navbar');
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// 팝업 폼 전송 로직 (기존 구글 폼 URL 재사용)
const popupInquiryForm = document.getElementById('popupInquiryForm');

if (popupInquiryForm) {
    popupInquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 텔레그램 및 구글 폼에 전송할 이름 데이터 조합 (이름 + 참석여부 + 동행인원)
        const guestName = document.getElementById('guestName').value;
        const attendStatus = document.getElementById('attendStatus').value;
        const guestCount = document.getElementById('guestCount').value;
        const statusString = `[${attendStatus}] ${guestName} (동행 ${guestCount})`;
        
        // 실제 구글 폼에 전송되는 숨겨진 input 필드에 조합된 텍스트 삽입
        document.getElementById('realNameInput').value = statusString;

        const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeM4F73MyiIaWtKjzEYvkrcP4WObBxyti9vg0SUr3P5PW-ldg/formResponse";

        let iframe = document.getElementById('hidden_confirm_iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.name = 'hidden_confirm_iframe';
            iframe.id = 'hidden_confirm_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }

        popupInquiryForm.action = GOOGLE_FORM_URL;
        popupInquiryForm.method = 'POST';
        popupInquiryForm.target = 'hidden_confirm_iframe';

        popupInquiryForm.submit();

        // 메타 픽셀 Schedule 이벤트 전송
        if (typeof fbq === 'function') {
            fbq('track', 'Schedule');
        }

        alert(`정상적으로 등록되었습니다.\n참석 여부를 알려주셔서 감사합니다.`);
        
        setTimeout(() => {
            popupInquiryForm.reset();
            popupInquiryForm.action = '';
            popupInquiryForm.target = '';
            if (modal) {
                modal.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        }, 500);
    });
}
