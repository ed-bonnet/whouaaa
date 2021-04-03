console.log('starting demo 1');

let scene;
let renderer;
let camera;
let fbxLoader
let raycaster;
let mouse;
let mixer;
let clock;
let projector;
let mainObject;

let startAnimation = false;
let counter = 0;
let animationDirection = 1;
let stop = true;
let animationAction;

let lottieAnimation;
let audios = [];
let audioCursor = 0;

var initialize = function(){
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(1, 1);

    fbxLoader = new THREE.FBXLoader();
    clock = new THREE.Clock();
};

var animate = function() {
    requestAnimationFrame(animate);
    
    if(startAnimation && !stop){
        const delta = clock.getDelta();
        mixer.update(delta * animationDirection);
        // counter += delta;

        // if(counter > 2.5){
        //     counter = 0;
        //     animationDirection *= -1;
        // }
    }

    renderer.render(scene, camera);
}

var raycast = function (event){
    event.preventDefault();

    const audioCurrentlyPlayed = audios.find(a => !a.prop('paused'));

    if(audioCurrentlyPlayed){
        return;
    }

    // update the mouse variable
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );

    if ( intersects.length > 0 ) {
        console.log('clicked', intersects[0]);

        audios[audioCursor].trigger('play');
        audioCursor = (audioCursor +1) % audios.length;

        stop = false;
        animationAction.play();
    }
}
var loadLottieAnimation = function(){
    lottieAnimation = lottie.loadAnimation({
        container: document.getElementById('anim-waiter'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../animations/nuit_jour_export_lottie.sifz.6C41B1FD.json',
    });
    console.log('lottie loaded');
}

$(function(){
    loadLottieAnimation();

    audios.push($('#audio_whouaaa2'));
    audios.push($('#audio_whouaaa3'));
    audios.push($('#audio_whouaaa4'));
    audios.push($('#audio_whouaaa1'));

    audios.forEach(a => a.prop('volume', 0.1));

    $('audio').on('ended', function test() {
        console.log('audio ended');
        animationAction.reset();
        animationAction.stop();
        stop = true;
    });

    scene = new THREE.Scene();
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper)
    
    let light = new THREE.PointLight();
    light.position.x = 2.50;
    light.position.y = 2.50;
    light.position.z = 2.50;

    scene.add(light);
    let ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 0.1, 1000);
    camera.position.y = 1;
    camera.position.z = 3;
    // camera.position.set(0.8, 1.4, 1.0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    $('body').append(renderer.domElement);
    
    // const material = new THREE.MeshNormalMaterial();
    
    initialize();
    
    renderer.domElement.addEventListener('click', raycast, false);

    fbxLoader.load(
        '../obj/Drunk_Walk.fbx',
         //'../obj/ouauh.fbx',
        (object) => {
            mainObject = object;
            mixer = new THREE.AnimationMixer(object);

            animationAction = mixer.clipAction(object.animations[0]);

            object.scale.set(.01, .01, .01);
            scene.add(object);

            animationAction.play();
            
            // start to animate a frame
            clock.getDelta();

            // then start the animation in the updater
            startAnimation = true;

            $('#anim-waiter').fadeOut(1000, function(){
                console.log('lottie destruction');
                lottieAnimation.destroy();
            });
            
        },
        (xhr) => { console.log("chargé!"); },
        (error) => { console.log("error!", error); },
    );
    animate();

});