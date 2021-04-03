
let anim = lottie.loadAnimation({
    container: document.getElementById('anim-waiter'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: '../animations/nuit_jour_export_lottie.sifz.6C41B1FD.json',
});

anim.addEventListener('DOMLoaded', (e) => {
    console.log('play', anim);
    anim.playCount =100;
    anim.loop = true;
    anim.play(); 
    // anim.playSegments([1, 34], true);
});