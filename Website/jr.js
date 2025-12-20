(function(){
    const toggle = document.getElementById('dark-toggle');
    const root = document.documentElement;
    const key = 'dark-mode';

    function applyMode(isDark){
        if(isDark){
            root.classList.add('dark');
            if(toggle) toggle.setAttribute('aria-pressed','true');
            if(toggle) toggle.textContent = '☀️ Light';
        } else {
            root.classList.remove('dark');
            if(toggle) toggle.setAttribute('aria-pressed','false');
            if(toggle) toggle.textContent = '🌙 Dark';
        }
    }

    const saved = localStorage.getItem(key);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyMode(saved ? saved === 'on' : prefersDark);

    if(toggle){
        toggle.addEventListener('click', function(){
            const isDark = root.classList.toggle('dark');
            localStorage.setItem(key, isDark ? 'on' : 'off');
            applyMode(isDark);
        });
    }

    const catFactEl = document.getElementById('catFact');
    const refreshBtn = document.getElementById('refresh-fact');

    async function fetchCatFact(){
        if(!catFactEl) return;
        catFactEl.textContent = 'Loading cat fact...';
        try{
            const resp = await fetch('https://catfact.ninja/fact');
            if(!resp.ok) throw new Error('Network response not ok');
            const data = await resp.json();
            catFactEl.innerText = '🐱 ' + (data && data.fact ? data.fact : 'No fact returned.');
        }catch(err){
            console.error('Cat Fact API error:', err);
            catFactEl.innerText = 'Could not load a cat fact right now.';
        }
    }

    fetchCatFact();

    if(refreshBtn){
        refreshBtn.addEventListener('click', fetchCatFact);
    }
})();