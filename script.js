/**
 * ドローンジャーナリズム研究 - インタラクティブ機能
 * 学術研究用インフォグラフィックWebサイト
 */

document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーション
    initScrollAnimations();
    
    // 統計アニメーション
    initStatsAnimations();
    
    // ナビゲーションスムーススクロール
    initSmoothScroll();
    
    // スクロールインジケーター
    initScrollIndicator();
});

/**
 * スクロールアニメーションの初期化
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 統計要素のアニメーションをトリガー
                if (entry.target.classList.contains('stats-section')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    const animatedElements = document.querySelectorAll(
        '.application-card, .timeline-item, .tech-card, .ethics-card, ' +
        '.education-card, .future-card, .reference-item, .stats-section'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * 統計アニメーションの初期化
 */
function initStatsAnimations() {
    // 導入率バーのアニメーション
    const rateFills = document.querySelectorAll('.rate-fill');
    rateFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        fill.dataset.targetWidth = width;
    });
}

/**
 * 統計アニメーションの実行
 */
function animateStats(section) {
    // 導入率バーのアニメーション
    const rateFills = section.querySelectorAll('.rate-fill');
    rateFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.width = fill.dataset.targetWidth || fill.style.width;
        }, index * 200);
    });
    
    // 棒グラフのアニメーション
    const chartBars = section.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
        bar.style.opacity = '0';
        bar.style.transform = 'scaleY(0)';
        bar.style.transformOrigin = 'bottom';
        
        setTimeout(() => {
            bar.style.transition = 'opacity 0.5s ease, transform 0.8s ease';
            bar.style.opacity = '1';
            bar.style.transform = 'scaleY(1)';
        }, index * 150);
    });
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * スクロールインジケーターの初期化
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstSection = document.querySelector('#overview');
            if (firstSection) {
                firstSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        scrollIndicator.style.cursor = 'pointer';
    }
    
    // スクロール時にインジケーターを非表示
    window.addEventListener('scroll', () => {
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
}

/**
 * 要素の可視化
 */
document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('[style*="opacity: 0"]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !el.classList.contains('visible')) {
            el.classList.add('visible');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

/**
 * カウントアップアニメーション（オプション）
 */
function countUp(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * 印刷機能
 */
function printInfographic() {
    window.print();
}

// グローバルに公開
window.printInfographic = printInfographic;
