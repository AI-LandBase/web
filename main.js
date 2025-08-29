/**
 * AI.LandBase Website JavaScript
 * モバイルフレンドリーなインタラクション機能を提供
 */

// DOM要素の取得
const elements = {
    header: document.querySelector('.header'),
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    backToTop: document.querySelector('.back-to-top'),
    pricingToggleBtns: document.querySelectorAll('.toggle-btn'),
    pricingContents: document.querySelectorAll('.pricing-content'),
    allSections: document.querySelectorAll('section'),
    ctaButtons: document.querySelectorAll('[href^="tel:"]')
};

// 状態管理
const state = {
    isMobileMenuOpen: false,
    isScrolled: false,
    currentPricingPlan: 'monthly'
};

/**
 * 初期化処理
 */
function initialize() {
    setupEventListeners();
    setupScrollEffects();
    setupPricingToggle();
    setupAccessibility();
    setupPhoneNumberFormatting();
    
    // ページ読み込み完了後の処理
    window.addEventListener('load', () => {
        handlePageLoad();
    });
    
    console.log('AI.LandBase website initialized successfully');
}

/**
 * イベントリスナーの設定
 */
function setupEventListeners() {
    // モバイルメニュートグル
    if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // スクロールイベント
    window.addEventListener('scroll', throttle(handleScroll, 16)); // 60fps
    
    // 戻るボタン
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', scrollToTop);
    }
    
    // 料金プラン切り替え
    elements.pricingToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => handlePricingToggle(e.target));
    });
    
    // スムーズスクロール
    setupSmoothScroll();
    
    // リサイズイベント
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // キーボードナビゲーション
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // 電話番号CTAのトラッキング
    elements.ctaButtons.forEach(btn => {
        btn.addEventListener('click', trackPhoneCall);
    });
}

/**
 * モバイルメニューの切り替え
 */
function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    
    if (elements.navMenu) {
        elements.navMenu.classList.toggle('active', state.isMobileMenuOpen);
        
        // アクセシビリティ属性の更新
        elements.mobileMenuToggle.setAttribute('aria-expanded', state.isMobileMenuOpen);
        elements.mobileMenuToggle.setAttribute(
            'aria-label', 
            state.isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'
        );
        
        // アイコンの切り替え
        const icon = elements.mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.className = state.isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        }
        
        // ボディのスクロール制御
        document.body.style.overflow = state.isMobileMenuOpen ? 'hidden' : '';
    }
}

/**
 * スクロール処理
 */
function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // ヘッダーの背景変更
    updateHeaderBackground(scrollY);
    
    // 戻るボタンの表示制御
    updateBackToTopVisibility(scrollY, windowHeight);
    
    // セクションのフェードイン効果
    updateSectionVisibility(scrollY, windowHeight);
}

/**
 * ヘッダー背景の更新
 */
function updateHeaderBackground(scrollY) {
    const threshold = 100;
    const shouldAddBackground = scrollY > threshold;
    
    if (shouldAddBackground !== state.isScrolled) {
        state.isScrolled = shouldAddBackground;
        
        if (elements.header) {
            elements.header.style.background = shouldAddBackground 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'var(--white)';
            elements.header.style.backdropFilter = shouldAddBackground 
                ? 'blur(10px)' 
                : 'none';
        }
    }
}

/**
 * 戻るボタンの表示制御
 */
function updateBackToTopVisibility(scrollY, windowHeight) {
    const threshold = windowHeight * 0.5;
    const shouldShow = scrollY > threshold;
    
    if (elements.backToTop) {
        elements.backToTop.classList.toggle('visible', shouldShow);
    }
}

/**
 * セクションの可視性チェックとアニメーション
 */
function updateSectionVisibility(scrollY, windowHeight) {
    elements.allSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible && !section.hasAttribute('data-animated')) {
            section.setAttribute('data-animated', 'true');
            section.classList.add('fade-in-up');
            
            // セクション内の子要素に順次アニメーションを適用
            const animatableElements = section.querySelectorAll(
                '.problem-card, .feature-card, .service-card, .benefit-card, .trust-item'
            );
            
            animatableElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('fade-in-up');
                }, index * 100);
            });
        }
    });
}

/**
 * トップへスクロール
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // フォーカス管理
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.focus();
    }
}

/**
 * 料金プラン切り替え処理
 */
function setupPricingToggle() {
    // 初期状態の設定
    showPricingPlan(state.currentPricingPlan);
}

function handlePricingToggle(button) {
    const planType = button.getAttribute('data-plan');
    
    if (planType && planType !== state.currentPricingPlan) {
        state.currentPricingPlan = planType;
        
        // ボタンの状態更新
        elements.pricingToggleBtns.forEach(btn => {
            btn.classList.toggle('active', btn === button);
        });
        
        // プランコンテンツの表示切り替え
        showPricingPlan(planType);
        
        // アナリティクス追跡（実装時に有効化）
        // trackEvent('pricing_toggle', { plan: planType });
    }
}

function showPricingPlan(planType) {
    elements.pricingContents.forEach(content => {
        const isTarget = content.classList.contains(`${planType}-plans`) || 
                        content.classList.contains(`${planType}-services`);
        content.classList.toggle('active', isTarget);
    });
}

/**
 * スムーズスクロールの設定
 */
function setupSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // モバイルメニューを閉じる
                if (state.isMobileMenuOpen) {
                    toggleMobileMenu();
                }
                
                // スムーズスクロール
                const headerHeight = elements.header ? elements.header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // フォーカス管理
                setTimeout(() => {
                    targetElement.focus();
                }, 500);
            }
        });
    });
}

/**
 * アクセシビリティ機能の設定
 */
function setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'メインコンテンツにスキップ';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--okinawa-blue)';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '1000';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // ARIAラベルの動的更新
    updateAriaLabels();
}

/**
 * ARIAラベルの更新
 */
function updateAriaLabels() {
    // フォーカス可能な要素にroleとaria-labelを適切に設定
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });
}

/**
 * キーボードナビゲーション
 */
function handleKeyboardNavigation(e) {
    // Escキーでモバイルメニューを閉じる
    if (e.key === 'Escape' && state.isMobileMenuOpen) {
        toggleMobileMenu();
    }
    
    // Enterキーでの要素アクティベーション
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('toggle-btn')) {
            handlePricingToggle(focusedElement);
        }
    }
}

/**
 * 電話番号の整形
 */
function setupPhoneNumberFormatting() {
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(el => {
        const number = el.textContent.trim();
        if (number.match(/^\d{3}-\d{4}-\d{4}$/)) {
            // 既に整形済みの場合はそのまま
            return;
        }
        
        // 日本の携帯電話番号形式に整形
        const formatted = formatPhoneNumber(number);
        if (formatted) {
            el.textContent = formatted;
        }
    });
}

/**
 * 電話番号のフォーマット
 */
function formatPhoneNumber(number) {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
    }
    return number;
}

/**
 * 電話発信の追跡
 */
function trackPhoneCall(e) {
    const phoneNumber = e.target.href.replace('tel:', '');
    
    // アナリティクス追跡（実装時に有効化）
    // trackEvent('phone_call', { number: phoneNumber });
    
    console.log(`Phone call initiated: ${phoneNumber}`);
}

/**
 * リサイズ処理
 */
function handleResize() {
    // モバイルメニューが開いているときの処理
    if (state.isMobileMenuOpen && window.innerWidth >= 768) {
        toggleMobileMenu();
    }
    
    // 要素の再計算が必要な場合の処理
    updateLayoutDependentElements();
}

/**
 * レイアウト依存要素の更新
 */
function updateLayoutDependentElements() {
    // ヒーローセクションの高さ調整
    const hero = document.querySelector('.hero');
    if (hero) {
        const minHeight = window.innerHeight * 0.8;
        hero.style.minHeight = `${minHeight}px`;
    }
}

/**
 * ページロード完了時の処理
 */
function handlePageLoad() {
    // プリローダーの非表示（存在する場合）
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
    
    // 初期アニメーションの実行
    triggerInitialAnimations();
    
    // レイアウト依存要素の初期設定
    updateLayoutDependentElements();
}

/**
 * 初期アニメーションの実行
 */
function triggerInitialAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in-up');
        }, index * 200);
    });
}

/**
 * フォーム送信の処理（将来的な拡張用）
 */
function setupFormHandling() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // バリデーション
    if (!validateForm(form)) {
        return;
    }
    
    // 送信処理（実装時に有効化）
    // submitForm(formData);
    
    console.log('Form submitted:', Object.fromEntries(formData));
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'この項目は必須です');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * パフォーマンス最適化関数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * ユーティリティ関数
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // エラー報告システムに送信（実装時に有効化）
    // reportError(e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // エラー報告システムに送信（実装時に有効化）
    // reportError(e.reason);
});

/**
 * 外部ライブラリの遅延読み込み（必要に応じて使用）
 */
function loadExternalScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = callback;
    script.onerror = () => console.error(`Failed to load script: ${src}`);
    document.head.appendChild(script);
}

/**
 * Service Worker登録（PWA対応時に使用）
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

/**
 * 初期化の実行
 */
document.addEventListener('DOMContentLoaded', initialize);

// モジュールエクスポート（ES6モジュール使用時）
// export { initialize, toggleMobileMenu, handlePricingToggle };