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

        const formData = new FormData(inquiryForm);

        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).then(() => {
            // 메타 픽셀 Lead 이벤트 전송
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }

            // 사용자 알림 및 폼 초기화
            alert(`${name}님, 상담 예약이 정상적으로 접수되었습니다.\n확인 후 빠르게 연락드리겠습니다.`);
            inquiryForm.reset();
        }).catch((error) => {
            console.error('Error:', error);
            alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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

// AI 모달 내부 상담예약 버튼
const aiModalContactBtn = document.getElementById('aiModalContactBtn');
if (aiModalContactBtn && aiModal) {
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

// ===== 호실 검색 기능 =====
(function() {
    let roomData = [];

    const floorSelect = document.getElementById('filterFloor');
    const usageSelect = document.getElementById('filterUsage');
    const tableBody = document.getElementById('rsTableBody');
    const resultCount = document.getElementById('rsResultCount');

    if (!floorSelect || !usageSelect || !tableBody) return;

    // 금액 포맷 (억/만원 표기)
    function formatPrice(num) {
        if (!num && num !== 0) return '-';
        const eok = Math.floor(num / 100000000);
        const man = Math.round((num % 100000000) / 10000);
        if (eok > 0 && man > 0) {
            return eok + '억 ' + man.toLocaleString() + '만';
        } else if (eok > 0) {
            return eok + '억';
        } else {
            return man.toLocaleString() + '만';
        }
    }

    // 층 정렬 순서
    function floorOrder(f) {
        if (f === 'B2') return -2;
        if (f === 'B1') return -1;
        const m = f.match(/(\d+)/);
        return m ? parseInt(m[1]) : 99;
    }

    // 드롭다운 채우기
    function populateFilters(data) {
        const floors = [...new Set(data.map(d => d.floor))];
        floors.sort((a, b) => floorOrder(a) - floorOrder(b));
        floors.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f;
            opt.textContent = f;
            floorSelect.appendChild(opt);
        });

        const usages = [...new Set(data.map(d => d.usage))];
        usages.sort();
        usages.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u;
            opt.textContent = u;
            usageSelect.appendChild(opt);
        });
    }

    // 테이블 렌더링
    function renderTable(data) {
        tableBody.innerHTML = '';

        if (data.length === 0) {
            tableBody.innerHTML = '<tr class="rs-empty-row"><td colspan="9">검색 조건에 맞는 호실이 없습니다.</td></tr>';
            resultCount.innerHTML = '검색 결과: <strong>0</strong>개 호실';
            return;
        }

        resultCount.innerHTML = '검색 결과: <strong>' + data.length + '</strong>개 호실';

        data.forEach(d => {
            const tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + d.floor + '</td>' +
                '<td>' + d.unit + '</td>' +
                '<td>' + d.usage + '</td>' +
                '<td>' + (d.area_contract != null ? d.area_contract.toFixed(2) : '-') + '</td>' +
                '<td>' + (d.area_exclusive != null ? d.area_exclusive.toFixed(2) : '-') + '</td>' +
                '<td>' + formatPrice(d.price_original) + '</td>' +
                '<td>' + (d.discount_rate != null ? d.discount_rate + '%' : '-') + '</td>' +
                '<td>' + formatPrice(d.price_final) + '</td>' +
                '<td><a href="#contact" class="rs-consult-btn">상담신청</a></td>';
            tableBody.appendChild(tr);
        });
    }

    // 필터링
    function applyFilter() {
        const fFloor = floorSelect.value;
        const fUsage = usageSelect.value;

        let filtered = roomData;
        if (fFloor !== 'all') {
            filtered = filtered.filter(d => d.floor === fFloor);
        }
        if (fUsage !== 'all') {
            filtered = filtered.filter(d => d.usage === fUsage);
        }

        // 정렬: 층 → 호실
        filtered.sort((a, b) => {
            const fo = floorOrder(a.floor) - floorOrder(b.floor);
            if (fo !== 0) return fo;
            return a.unit.localeCompare(b.unit, 'ko');
        });

        renderTable(filtered);
    }

    floorSelect.addEventListener('change', applyFilter);
    usageSelect.addEventListener('change', applyFilter);

    // 데이터 로드 (캐시 방지 적용)
    fetch('assets/room_data.json?v=' + Date.now(), { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
            roomData = data;
            populateFilters(data);
            applyFilter();
        })
        .catch(err => {
            console.error('Room data load error:', err);
            tableBody.innerHTML = '<tr class="rs-empty-row"><td colspan="9">데이터를 불러올 수 없습니다.</td></tr>';
        });
})();
