/**
 * GUT HEALTH WORKSHOP SCRIPT - MOBILE FIRST & META ADS OPTIMIZED
 */

document.addEventListener('DOMContentLoaded', () => {
    initCountdownTimer();
    initCounterAnimation();
    initFaqAccordion();

});

function initCountdownTimer() {
    let totalSeconds = 14 * 60 + 52;

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');
    const stickySecs = document.getElementById('sticky-secs');

    setInterval(() => {
        if (totalSeconds <= 0) {
            totalSeconds = 15 * 60;
        } else {
            totalSeconds--;
        }

        const days = Math.floor(totalSeconds / 86400);
        const hrs = Math.floor((totalSeconds % 86400) / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        const minsStr = String(mins).padStart(2, '0');
        const secsStr = String(secs).padStart(2, '0');

        if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minsStr;
        if (secondsEl) secondsEl.textContent = secsStr;
        if (stickySecs) stickySecs.textContent = secsStr;
    }, 1000);
}

function initCounterAnimation() {
    const counterElements = document.querySelectorAll('[data-target]');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counterElements.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const targetVal = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = targetVal % 1 !== 0;

    let frame = 0;
    const totalFrames = 60;
    const counterTimer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentVal = targetVal * (1 - Math.pow(1 - progress, 2));

        if (isDecimal) {
            el.textContent = `${currentVal.toFixed(1)}${suffix}`;
        } else {
            el.textContent = `${Math.floor(currentVal).toLocaleString()}${suffix}`;
        }

        if (frame >= totalFrames) {
            el.textContent = `${isDecimal ? targetVal.toFixed(1) : targetVal.toLocaleString()}${suffix}`;
            clearInterval(counterTimer);
        }
    }, 1000 / 60);
}

function initFaqAccordion() {
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.closest('.faq-item');
            const faqBody = faqItem.querySelector('.faq-body');
            const isActive = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-body').style.maxHeight = null;
                }
            });

            if (isActive) {
                faqItem.classList.remove('active');
                faqBody.style.maxHeight = null;
            } else {
                faqItem.classList.add('active');
                faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
            }
        });
    });
}



