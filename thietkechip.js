(function() {
    const REDIRECT_URL = 'https://thietkechip.vn';
    const COOLDOWN_TIME = 5 * 60 * 60 * 1000; // 5 giờ tính bằng miliseconds
    const STORAGE_KEY = 'last_redirect_time';

    document.addEventListener('click', function() {
        const now = new Date().getTime();
        const lastRedirect = localStorage.getItem(STORAGE_KEY);

        // Kiểm tra nếu chưa bao giờ click hoặc đã quá 5 giờ kể từ lần cuối
        if (!lastRedirect || (now - lastRedirect) > COOLDOWN_TIME) {
            
            // Lưu mốc thời gian hiện tại
            localStorage.setItem(STORAGE_KEY, now);
            
            // Mở trang web mới
            window.open(REDIRECT_URL, '_blank');
        }
    });
})();
