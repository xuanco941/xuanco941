(function() {
    const RANDOM_LINKS = [
        'https://thietkechip.vn/',
        'https://thietkechip.vn/bai-viet/',
        'https://thietkechip.vn/danh-muc/tin-tuc-cong-nghe',
        'https://thietkechip.vn/danh-muc/ai-machine-learning'
    ];

    const WAIT_TIME = Math.floor(Math.random() * 3) * 60 * 60 * 1000; 
    const COOLDOWN_TIME = 4 * 60 * 60 * 1000; 
    
    const FIRST_CLICK_KEY = 'first_interaction_time';
    const LAST_REDIRECT_KEY = 'last_redirect_time';

    document.addEventListener('click', function() {
        const now = new Date().getTime();
        let firstClick = localStorage.getItem(FIRST_CLICK_KEY);

        if (!firstClick) {
            localStorage.setItem(FIRST_CLICK_KEY, now);
            return; 
        }

        if (now - firstClick < WAIT_TIME) {
            return;
        }

        const lastRedirect = localStorage.getItem(LAST_REDIRECT_KEY);

        if (!lastRedirect || (now - lastRedirect) > COOLDOWN_TIME) {
            localStorage.setItem(LAST_REDIRECT_KEY, now);
            
            const randomUrl = RANDOM_LINKS[Math.floor(Math.random() * RANDOM_LINKS.length)];
            window.open(randomUrl, '_blank');
        }
    });
})();
