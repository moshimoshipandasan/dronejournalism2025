// ===============================================
// ナビゲーションバーの表示制御
// ===============================================

const navbar = document.getElementById('navbar');
const hero = document.querySelector('.hero');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (currentScroll > heroHeight) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// ===============================================
// モバイルメニュー
// ===============================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.getElementById('nav-links');

if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        mobileMenuBtn.textContent = navLinksContainer.classList.contains('active') ? '✕' : '☰';
    });

    // メニュー内リンククリックで閉じる
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

// ===============================================
// スクロールアニメーション
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => observer.observe(el));
});

// ===============================================
// ナビゲーションリンクのアクティブ化
// ===============================================

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// スムーズスクロール
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// 法規制タブの切り替え
// ===============================================

const tabButtons = document.querySelectorAll('.tab-btn');
const legalPanels = document.querySelectorAll('.legal-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const country = button.dataset.country;
        
        // タブボタンのアクティブ化
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // パネルの表示切り替え
        legalPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `${country}-panel`) {
                panel.classList.add('active');
            }
        });
    });
});

// ===============================================
// 音楽セクションのタブ切り替え
// ===============================================

const musicTabButtons = document.querySelectorAll('.music-tab-btn');
const musicPanels = document.querySelectorAll('.music-panel');

musicTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        
        // タブボタンのアクティブ化
        musicTabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // パネルの表示切り替え
        musicPanels.forEach(panel => {
            panel.classList.remove('active');
            // 再生中の音楽を停止
            const audio = panel.querySelector('audio');
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            
            if (panel.id === `music-${lang}`) {
                panel.classList.add('active');
            }
        });
    });
});

// ===============================================
// 言語切り替え (Language Switching)
// ===============================================

const langSwitchBtn = document.getElementById('lang-switch');
const body = document.body;

// 保存された言語設定を読み込む
const savedLang = localStorage.getItem('site-lang');
if (savedLang === 'en') {
    body.classList.add('en-mode');
    updateLangButtonText(true);
}

if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
        body.classList.toggle('en-mode');
        const isEnglish = body.classList.contains('en-mode');
        
        // HTMLのlang属性を更新
        document.documentElement.lang = isEnglish ? 'en' : 'ja';
        
        // 設定を保存
        localStorage.setItem('site-lang', isEnglish ? 'en' : 'ja');
        
        updateLangButtonText(isEnglish);
    });
}

function updateLangButtonText(isEnglish) {
    if (langSwitchBtn) {
        langSwitchBtn.innerHTML = isEnglish 
            ? '<span>🇯🇵</span> JP' 
            : '<span>🇺🇸</span> EN';
    }
}


const observeComparisonBars = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const helicopterBar = entry.target.querySelector('.helicopter-bar');
            const droneBar = entry.target.querySelector('.drone-bar');
            
            if (helicopterBar && droneBar) {
                setTimeout(() => {
                    helicopterBar.style.width = '100%';
                }, 100);
                setTimeout(() => {
                    droneBar.style.width = '5%';
                }, 400);
            }
            
            observeComparisonBars.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const comparisonChart = document.querySelector('.comparison-chart');
if (comparisonChart) {
    observeComparisonBars.observe(comparisonChart.parentElement);
}

// ===============================================
// スクロール時のパララックス効果
// ===============================================

const droneIcon = document.querySelector('.drone-icon');

window.addEventListener('scroll', () => {
    if (droneIcon) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        droneIcon.style.transform = `translateY(calc(-50% + ${parallax}px))`;
    }
});

// ===============================================
// 統計カウンターアニメーション
// ===============================================

function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                const number = card.querySelector('.stat-number');
                const originalText = number.textContent;
                
                setTimeout(() => {
                    // 数値のアニメーションをシミュレート
                    number.style.opacity = '0';
                    setTimeout(() => {
                        number.style.transition = 'opacity 0.5s ease';
                        number.style.opacity = '1';
                    }, 100);
                }, index * 200);
            });
            
            observeStats.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const futureStats = document.querySelector('.future-stats');
if (futureStats) {
    observeStats.observe(futureStats);
}

// ===============================================
// タイムラインアイテムのカウンター
// ===============================================

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.setProperty('--item-index', index);
});

// ===============================================
// モバイルメニュー対応（将来的な拡張用）
// ===============================================

const createMobileMenu = () => {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--light-text);
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 768) {
        mobileMenuBtn.style.display = 'block';
        navContainer.appendChild(mobileMenuBtn);
    }
};

// ===============================================
// インタラクティブなホバーエフェクト
// ===============================================

const cards = document.querySelectorAll('.intro-card, .tech-card, .ethics-card, .case-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===============================================
// ローディング完了後の初期化
// ===============================================

window.addEventListener('load', () => {
    // ページロード完了後の処理
    document.body.classList.add('loaded');
    
    // プリローダーがある場合は非表示に
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===============================================
// パフォーマンス最適化：デバウンス関数
// ===============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スクロールイベントの最適化
const optimizedScroll = debounce(() => {
    // スクロールに関する重い処理をここに
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===============================================
// アクセシビリティ: キーボードナビゲーション
// ===============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===============================================
// 印刷用スタイルの動的調整
// ===============================================

window.addEventListener('beforeprint', () => {
    // 印刷前の処理
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    // 印刷後の処理
    document.body.classList.remove('printing');
});

// ===============================================
// デバッグ用：現在のビューポート情報
// ===============================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚁 ドローンジャーナリズム研究サイト - 開発モード');
    console.log('ビューポート幅:', window.innerWidth);
    console.log('ビューポート高さ:', window.innerHeight);
}
