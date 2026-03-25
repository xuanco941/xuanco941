(function() {
    // Danh sách các link ngẫu nhiên bạn muốn hướng tới
    const RANDOM_LINKS = [
        'https://thietkechip.vn/',
        'https://thietkechip.vn/bai-viet/',
        'https://thietkechip.vn/danh-muc/tin-tuc-cong-nghe',
        'https://thietkechip.vn/danh-muc/ai-machine-learning'
    ];

    const COOLDOWN_TIME = 5 * 60 * 60 * 1000; // 5 giờ
    const STORAGE_KEY = 'last_redirect_time';

    document.addEventListener('click', function() {
        const now = new Date().getTime();
        const lastRedirect = localStorage.getItem(STORAGE_KEY);

        if (!lastRedirect || (now - lastRedirect) > COOLDOWN_TIME) {
            localStorage.setItem(STORAGE_KEY, now);
            
            // Chọn ngẫu nhiên 1 link từ danh sách phía trên
            const randomUrl = RANDOM_LINKS[Math.floor(Math.random() * RANDOM_LINKS.length)];
            
            window.open(randomUrl, '_blank');
        }
    });
})();
