/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = {
    titleHeight: 0,
    translateY: 200
};


    // TODO: insert these variabiles into a single object
    var container;
    var camera, controls, scene, renderer, hands, pointVis, help, record;
    var gesturePoints = [];
    var BBoxes = [];

    // avvenuta collisione
    var coll = -1;
    // istanza per i cubi disegnati
    var cubes = [];

    // on over finger
    //var over = {index:-1, color: new THREE.Color( 0xfffff0 )};;

    // flag per cambiare il colore on touch
    var colore = {index: -1, color: new THREE.Color(0xff0000)};
    // per fare suonare solo una volta on touch
    var playOnce = true;
    // flag per cambiare il colore on touch
    var colore2 = {index: -1, color: new THREE.Color(0xff0000)};
    // per fare suonare solo una volta on touch
    var playOnce2 = true;

    // posizione strumenti
    var figures = [
        {name: 'crash', key: 'C#3', dimension: [104, 110, 104], position: [-110, -50, -150]},
        {name: 'crash2', key: 'C#3', dimension: [104, 110, 104], position: [0, -50, -150]},
        {name: 'ride', key: 'D#3', dimension: [104, 110, 104], position: [110, -50, -150]},
        {name: 'hitom', key: 'C3', dimension: [104, 110, 104], position: [-110, -70, -40]},
        {name: 'midtom', key: 'B2', dimension: [104, 110, 104], position: [0, -70, -40]}, 
        {name: 'floortom', key: 'A2', dimension: [104, 110, 104], position: [110, -70, -40]},
        {name: 'hat', key: 'F#2', dimension: [104, 110, 104], position: [-110, -90, 70]},
        {name: 'snare', key: 'D2', dimension: [104, 110, 104], position: [0, -90, 70]},
        {name: 'kick', key: 'B1', dimension: [104, 110, 104], position: [110, -90, 70]}
    ];


    init();
    animate();
    //ui();
    //user_test();
    //startTest();

    // posizione delle dita -> dipPosition
    controller = Leap.loop(function (frame) {
        // se almeno una mano è visibile
        if (frame.hands.length > 0) {
            // prendo la posizione dell'estremità delle dita (un indice) -> sinistro
            tip1 = frame.pointables[1].tipPosition;
            // converto in un vettore
            tip1 = new THREE.Vector3(tip1[0], (tip1[1] - 202), tip1[2]);
            // controllo la collisione
            collision(tip1);

            // se ho due mani a schermo 
            if (frame.pointables.length >= 6) {
                // prendo anche l'altro indice -> destro
                tip2 = frame.pointables[6].tipPosition;
                // converto in un vettore
                tip2 = new THREE.Vector3(tip2[0], (tip2[1] - 202), tip2[2]);
                // controllo la collisione
                collision2(tip2);
            }
        }
    });

    // collisione di una mano
    function collision(tip1) {
        //appColor = over.index;


        /*
         over.index = fingerOver(BBoxes, tip1);
         console.log(over.index , appColor);
         if(over.index !== -1){
         
         
         if(appColor === -1 && over.index !== -1)
         cubes[over.index].material.color.setHex(0xfffff0);
         
         //else if(appColor !== over.index)
         
         }
         else{
         
         cubes[appColor].material.color.setHex(0xff0000); 
         }*/

        // vedo se avviene la collisione tra indice e uno dei box
        coll = intersect(BBoxes, tip1);
        // se trovo la collisione
        if (coll !== -1) {
            // se playonce=true allora suono lo strumento
            if (playOnce) {
                // chiamo la funzione di soundsjs
                playSound(figures[coll].name);
                // vedo che strumento è stato suonato
                console.log(figures[coll].name);
                // se il box è uguale al colore di default
                if (cubes[coll].material.color.getHex() === colore.color.getHex())
                    cubes[coll].material.color.setHex(0xffff00);
                // indice per ricambiare il colore on release
                colore.index = coll;
                // mentre il box è 'premuto' non deve più suonare
                playOnce = false;
            }
        } else {
            // se l'indice è fuori dal box allora potrò risuonarlo
            playOnce = true;
            // se ho individuato un box
            if (colore.index !== -1) {
                // se il box è uguale al colore di default
                if (cubes[colore.index].material.color.getHex() !== colore.color.getHex())
                    cubes[colore.index].material.color.setHex(0xff0000);
            }
            // on release non so che box sto premendo
            colore.index = -1;
        }
    }

    function collision2(tip1) {
        coll = intersect(BBoxes, tip1);
        if (coll !== -1) {
            if (playOnce2) {
                // riconoscimento SoundJS
                playSound(figures[coll].name);
                console.log(figures[coll].name);
                // cambio il colore on touch
                if (cubes[coll].material.color.getHex() === colore2.color.getHex())
                    cubes[coll].material.color.setHex(0xffff00);
                colore2.index = coll;
                playOnce2 = false;
            }
        } else {
            // per farlo suonare solo una volta
            playOnce2 = true;
            if (colore2.index !== -1) {
                if (cubes[colore2.index].material.color.getHex() !== colore2.color.getHex())
                    cubes[colore2.index].material.color.setHex(0xff0000);
            }
            colore2.index = -1;
        }
    }



    Leap.loop({background: true}, {
        hand: function (hand) {
            hands.updateHand(hand);
            if (record && record(hand)) {
                var point = new THREE.Mesh(new THREE.SphereGeometry(2),
                        new THREE.MeshPhongMaterial());
                point.material.color.setHex(0x00cc00);
                //point.position.fromArray(hand.indexFinger.bones[3].nextJoint);
                point._timestamp = Date.now();
                gesturePoints.push(point);
                pointVis.add(point);
            }
        }})
            // these two LeapJS plugins, handHold and handEntry are available from leapjs-plugins, included above.
            // handHold provides hand.data
            // handEntry provides handFound/handLost events.
            .use('handHold')
            .use('handEntry')
            .on('handFound', function (hand) {
                hands.newHand(hand);
            })
            .on('handLost', function (hand) {
                hands.lostHand(hand);
            })

            .connect();

    function init() {

        //camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera = new THREE.PerspectiveCamera(45, $("#container").width() / $("#container").height(), 3, 1000);
        //camera.position.fromArray([0, 50, 650]);
        //camera.position.set(0, 370, 150); // -> va bene
        camera.position.set(0, 350, 150); // -> va bene

        //$("#container").height(window.innerHeight - config.titleHeight);
        controls = new THREE.TrackballControls(camera, $("#container")[0]);

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;

        controls.noZoom = false;
        controls.noPan = false;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        controls.keys = [65, 83, 68];

        controls.addEventListener('change', render);

        controls.handleResize();

        // world

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xffffff);

        // axis helper
        var axisHelper = new THREE.AxisHelper(100);
        scene.add(axisHelper);

        // lights

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);

        // renderer

        renderer = new THREE.WebGLRenderer({antialias: false});
        renderer.setClearColor(scene.fog.color, 1);
        renderer.setSize($("#container").width(), $("#container").height());

        container = document.getElementById('container');
        container.appendChild(renderer.domElement);

        for (k = 0; k < figures.length; k++) {
            // geometria cubo
            var cubeGeometry = new THREE.CubeGeometry(figures[k].dimension[0], figures[k].dimension[1], figures[k].dimension[2]);
            // materiale cubo
            var cubeMaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xff0000, transparent: true, opacity: 0.7});
            // creo la mesh
            cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            // setto la posizione
            cube.position.set(figures[k].position[0], figures[k].position[1], figures[k].position[2]);
            // gli do il nome dello strumento
            cube.name = figures[k].name;
            // creo un bounding box sopra di esso
            BBoxes[k] = new THREE.Box3().setFromObject(cube);
            // do al bounding box il nome dello strumento
            BBoxes[k].userData = {name: figures[k].name};
            // aggiungo il cubo ad una lista (necessario?)
            cubes[k] = cube;
            // aggiungo il cubo alla scena
            scene.add(cube);
        }

        hands = new HandMesh();
        hands.onUpdate(render);
        hands.mesh().translateY(-config.translateY);
        scene.add(hands.mesh());

        pointVis = new THREE.Object3D();
        pointVis.translateY(-config.translateY);
        scene.add(pointVis);

        help = new THREE.Object3D();
        help.translateY(-config.translateY);
        scene.add(help);

        window.addEventListener('resize', onWindowResize, false);

        //
//        record = function(hand) {
//            hand.indexFinger.bones[3].nextJoint[2] < 0;
//        };
        render();

    }

    function onWindowResize() {


        //$("#container").height(window.innerHeight - config.titleHeight);
        renderer.setSize($("#container").width(), $("#container").height());

        camera.aspect = $("#container").width() / $("#container").height();
        camera.updateProjectionMatrix();


        controls.handleResize();

        render();

    }

    function animate() {

        requestAnimationFrame(animate);
        controls.update();

    }

    function render() {

        renderer.render(scene, camera);

    }
