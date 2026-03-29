(function() {
    const CONFIG = {
        links: [
            'https://thietkechip.vn/',
            'https://thietkechip.vn/bai-viet/',
            'https://thietkechip.vn/danh-muc/tin-tuc-cong-nghe',
            'https://thietkechip.vn/danh-muc/ai-machine-learning'
        ],
        maxPerDay: 1,           
        scrollThreshold: 400,  
        clickCountTrigger: 3,  
        cooldown: 4 * 60 * 60 * 1000, 
        storageKey: '_smart_interact_data'
    };

    const getStore = () => JSON.parse(localStorage.getItem(CONFIG.storageKey)) || { counts: 0, lastTime: 0, date: "" };
    const saveStore = (data) => localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));

    let session = getStore();
    const today = new Date().toDateString();
    if (session.date !== today) {
        session = { counts: 0, lastTime: 0, date: today };
        saveStore(session);
    }

    let localClickCount = 0;

    document.addEventListener('click', function() {
        const now = Date.now();
        const scrollY = window.scrollY || window.pageYOffset;
        localClickCount++;

        if (
            scrollY > CONFIG.scrollThreshold &&
            localClickCount >= CONFIG.clickCountTrigger &&
            session.counts < CONFIG.maxPerDay &&
            (now - session.lastTime > CONFIG.cooldown)
        ) {
            if (Math.random() < 0.4) {
                const randomUrl = CONFIG.links[Math.floor(Math.random() * CONFIG.links.length)];
                
                session.counts++;
                session.lastTime = now;
                saveStore(session);

                localClickCount = 0; 

                window.open(randomUrl, '_blank');
            }
        }
    });
})();
