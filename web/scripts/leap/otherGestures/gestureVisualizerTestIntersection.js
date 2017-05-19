/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var config = {
    titleHeight: 0,
    translateY: 200
};

$(document).ready(function() {
    // TODO: insert these variabiles into a single object
    var container;
    var camera, controls, scene, renderer, hands, pointVis, help, record;
    var gesturePoints = [];
    
    var mouse = new THREE.Vector2();
    var INTERSECTED;
    //var mouse = { x: 0, y: 0 };
    var keyboard = new THREEx.KeyboardState();




    init();
    animate();
    ui();
    user_test();
    //startTest();


    
    Leap.loop({background: true}, {
        hand: function(hand) {

            hands.updateHand(hand);
            if (record && record(hand)) {
                var point = new THREE.Mesh(new THREE.SphereGeometry(2),
                        new THREE.MeshPhongMaterial());
                point.material.color.setHex(0x00cc00);
                point.position.fromArray(hand.indexFinger.bones[3].nextJoint);
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
            .on('handFound', function(hand) {
                hands.newHand(hand);
            })
            .on('handLost', function(hand) {
                hands.lostHand(hand);
            })

            .connect();

    function init() {

        //camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        
        // old
        //camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 3, 2000);
        /*
        camera = new THREE.PerspectiveCamera(55, 700 / 580, 3, 2000);
        camera.position.fromArray([0, 50, 650]);
        camera.lookAt(new THREE.Vector3(0, 200, 600));*/
        
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        //camera = Leap.loopController.plugins.boneHand.camera;
        
        //camera.position.set(-9.25, 305.7, -164.59);
        camera.position.set(0, 305, 200);
        scene = new THREE.Scene();
        //scene = Leap.loopController.plugins.boneHand.scene;

        $("#container").height(window.innerHeight - config.titleHeight);
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

        //scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xffffff);



        // lights
        /*
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);*/
        
        var ambientLight = new THREE.AmbientLight(0x444444);
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 1, -1).normalize();
        scene.add(directionalLight);

        // renderer

        renderer = new THREE.WebGLRenderer({antialias: false});
        renderer.setClearColor(scene.fog.color, 1);
        //renderer.setClearColor(0x000000, 1);
        renderer.setSize($("#container").width(), $("#container").height());

        container = document.getElementById('container');
        container.appendChild(renderer.domElement);


        /*var geometry = new THREE.PlaneGeometry(1000, 700);
         
         var material = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide, opacity: .4, transparent: true});
         var plane = new THREE.Mesh(geometry, material);
         plane.position.set(0, 0, 0);
         scene.add(plane);*/

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
        
        var loader = new THREE.ColladaLoader();
				loader.options.convertUpAxis = true;
				loader.load( 'drumset.dae', function ( collada ) {
					var object = collada.scene;
					//object.scale.set( 0.0025, 0.0025, 0.0025 );
                                        object.scale.set( 2.2, 1.4, 1.2 );
					object.position.set( -23, -15, 10 );
                                        // translo gli assi
                                        /*object.translateX(15);
                                        object.translateY(-10);*/
                                        object.rotation.set(0,210.5,0);
					scene.add( object );
				} );
                                
        var figures = [
            { name: 'hitom', key: 'da scrivere', dimension: [59, 36, 1, 1], position: [-70, 105, 35], rotation: [180.8, 0, 0] },
            { name: 'midtom', key: 'da scrivere', dimension: [55, 33, 1, 1], position: [-10, 105, 34], rotation: [180.8, 0, 0] },
            { name: 'splash', key: 'da scrivere', dimension: [45, 20, 1, 1], position: [-32, 114, 11], rotation: [180.8, 0, 0] },
            { name: 'snare', key: 'da scrivere', dimension: [86, 49, 1, 1], position: [-82, 80, 68], rotation: [180.8, 0, 0] },
            { name: 'hihat', key: 'da scrivere', dimension: [68, 34, 1, 1], position: [-158, 94, 71], rotation: [180.8, 0, 0] },
            { name: 'ride', key: 'da scrivere', dimension: [110, 60, 1, 1], position: [68, 82, 45], rotation: [180.8, 0, 0] },
            { name: 'floortom', key: 'da scrivere', dimension: [100, 45, 1, 1], position: [64, 67, 97], rotation: [180.8, 0, 0] },
            { name: 'crashSx', key: 'da scrivere', dimension: [94, 50, 1, 1], position: [-154, 150, 15], rotation: [180.8, 0, 0] },
            { name: 'crashDx', key: 'da scrivere', dimension: [100, 50, 1, 1], position: [15, 145, 2], rotation: [180.8, 0, 0] },
            { name: 'china', key: 'da scrivere', dimension: [83, 50, 1, 1], position: [120, 148, 110], rotation: [180.8, 74, 0] }      
        ];
        
        
        for(i=0; i<10; i++){
            // come evitare questo abominio?
            var planeGeometry = new THREE.PlaneGeometry(figures[i].dimension[0], figures[i].dimension[1], figures[i].dimension[2], figures[i].dimension[3]);
            var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(figures[i].position[0], figures[i].position[1], figures[i].position[2]); // posizione
            plane.rotation.set(figures[i].rotation[0], figures[i].rotation[1], figures[i].rotation[2]); // rotazione
            scene.add(plane); 
        }
        
        // new code added
        // new code added
        
        
        /*                        
        // tom acuto
        var planeGeometry = new THREE.PlaneGeometry(59, 36, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-70, 105, 35); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);   
        
        // tom medio
        var planeGeometry = new THREE.PlaneGeometry(55, 33, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-10, 105, 34); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);
        
        // splash
        var planeGeometry = new THREE.PlaneGeometry(45, 20, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-32, 114, 11); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);
        
        // tamburo
        var planeGeometry = new THREE.PlaneGeometry(86, 49, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-82, 80, 68); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane); 
        
        // hihat
        var planeGeometry = new THREE.PlaneGeometry(68, 34, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-158, 94, 71); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane); 
        
        // ride
        var planeGeometry = new THREE.PlaneGeometry(110, 60, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(68, 82, 45); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);
        
        // timpano
        var planeGeometry = new THREE.PlaneGeometry(100, 45, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(64, 67, 97); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);
        
        // crash destra
        var planeGeometry = new THREE.PlaneGeometry(94, 50, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(15, 145, 2); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);
        
        // crash sinistra
        var planeGeometry = new THREE.PlaneGeometry(94, 50, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(-154, 150, 15); // posizione
        plane.rotation.set(180.8, 0, 0); // rotazione
        scene.add(plane);
        
        // china
        var planeGeometry = new THREE.PlaneGeometry(83, 50, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({wireframe: true, color: 0xff0000});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(120, 148, 110); // posizione
        plane.rotation.set(180.8, 74, 0); // rotazione
        scene.add(plane);
        */
        //
//        record = function(hand) {
//            hand.indexFinger.bones[3].nextJoint[2] < 0;
//        };
        render();

    }
    
    function update()
    {
        // find intersections

        // create a Ray with origin at the mouse position
        //   and direction into the scene (camera direction)
        var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
        //projector.unprojectVector( vector, camera );
        vector.unproject(camera);
        
        projector = new THREE.Projector();
        // when the mouse moves, call the given function
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        /*var raycaster = new THREE.Raycaster();
         raycaster.setFromCamera( mouse, camera );
         var intersects = raycaster.intersectObjects( scene.children );  */

        // create an array containing all objects in the scene with which the ray intersects
        var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = ray.intersectObjects(scene.children);

        // INTERSECTED = the object in the scene currently closest to the camera 
        //		and intersected by the Ray projected from the mouse position 	

        // if there is one (or more) intersections
        if (intersects.length > 0)
        {
            // if the closest object intersected is not the currently stored intersection object
            if (intersects[ 0 ].object != INTERSECTED)
            {
                // restore previous intersection object (if it exists) to its original color
                if (INTERSECTED)
                    INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
                // store reference to closest object as current intersection object
                INTERSECTED = intersects[ 0 ].object;
                // store color of closest object (for later restoration)
                INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                // set a new color for closest object
                INTERSECTED.material.color.setHex(0xffff00);
            }
        } else // there are no intersections
        {
            // restore previous intersection object (if it exists) to its original color
            if (INTERSECTED)
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            // remove previous intersection object reference
            //     by setting current intersection object to "nothing"
            INTERSECTED = null;
        }


        if (keyboard.pressed("z"))
        {
            // do something
        }


        controls.update();
        //stats.update();
    }

    function onWindowResize() {


        $("#container").height(window.innerHeight - config.titleHeight);
        renderer.setSize($("#container").width(), $("#container").height());

        camera.aspect = $("#container").width() / $("#container").height();
        camera.updateProjectionMatrix();


        controls.handleResize();

        render();

    }

    function animate() {

        requestAnimationFrame(animate);
        render(); // new
        controls.update();
        update(); // per le intersezioni

    }

    function render() {

        renderer.render(scene, camera);

    }
    
    function onDocumentMouseMove(event)
    {
        // the following line would stop any other event handler from firing
        // (such as the mouse's TrackballControls)
        // event.preventDefault();

        // update the mouse variable
        mouse.x = (event.clientX / $("#container").width()) * 2 - 1;
        //mouse.y = -(event.clientY / $("#container").height()) * 2 + 1;
        mouse.y = -(event.clientY / $("#container").height()) * 2 + 1.165; // 1.165 torna!
    }

    function ui() {
        $("#btn-clear").click(function(event) {
            event.preventDefault();
            clear();
        });

        $("#btn-reset").click(function(event) {
            event.preventDefault();
            controls.reset();
            render();
        });

        $("#btn-load")
                .click(function(event) {
                    $.ajax({
                        url: "file.json",
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/json',
                        mimeType: 'application/json',
                        data: {id: "#"},
                        success: function(data) {
                            var list = $("#file-list");
                            list.empty();
                            var template = $("<li><a href=\"#\"></a><ul></ul></li>");
                            template.addClass("folder-close");
                            template.on("click", "a", folderNode);
                            data.forEach(function(file) {
                                var fileElement = template.clone(true);
                                fileElement.children().first().text(file.text);
                                fileElement.attr("data-path", file.id);
                                list.append(fileElement);
                            });
                            $("#btn-load-confirm").prop("disabled", true);
                            $("#load-form").modal();
                        }
                    });

                });


        gestureAnimator.render = render;
        gestureAnimator.helpMesh = help;
        gestureAnimator.config = config;



        $("#gesture-menu li a").click(function(event) {
            var index = $(this).parent().prevAll().length;
            gestureAnimator.requestAnimation(
                    gestureAnimator.animations[index].duration,
                    gestureAnimator.animations[index].gesture);
        });

        $("#btn-save").click(function() {
            save();
        });

        $("#btn-load-confirm").click(function() {
            load();
        });

        $("#btn-logout").click(function() {
            $.ajax({
                url: "logout.json",
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json',
                data: {},
                success: function(data) {
                    if (data.status === 0) {
                        location.reload();
                    }
                }
            });
        });

    }

    function clear() {
        gesturePoints.forEach(function(point) {
            pointVis.remove(point);
        });

        gesturePoints = [];
        renderer.render(scene, camera);
    }

    function save(filename) {
        var series = [];
        gesturePoints.forEach(function(p) {
            series.push([p.position.x, p.position.y, p.position.z, p._timestamp]);
        });
        if (!filename) {
            filename = $("#save-name").val();
        }
        var test = {
            points: series,
            name: filename
        };
        $.ajax({
            url: "save.json",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            mimeType: 'application/json',
            data: JSON.stringify(test),
            success: function(data) {
                $("#save-form").modal("hide");

            }
        });

    }


    function load() {
        $(".file-selected").each(function(sel) {
            var path = $(this).attr("data-path");
            $.ajax({
                url: "load.json",
                type: "GET",
                data: {
                    name: path
                },
                success: function(data) {
                    var color = Math.random() * 0xFFFFFF << 0;
                    data.points.forEach(function(p) {
                        var point = new THREE.Mesh(new THREE.SphereGeometry(2),
                                new THREE.MeshPhongMaterial());
                        point.material.color.setHex(color);
                        point.position.setX(p[0]);
                        point.position.setY(p[1]);
                        point.position.setZ(p[2]);
                        point._timestamp = p[3];
                        gesturePoints.push(point);
                        pointVis.add(point);
                    });
                    render();
                }
            });
        });
        $("#load-form").modal("hide");
    }

    function folderNode(event) {

        event.preventDefault();
        var folder = $(event.delegateTarget);
        var list = folder.children("ul");
        if ($(event.delegateTarget).hasClass("folder-open")) {
            folder.addClass("folder-close");
            folder.removeClass("folder-open");
            list.hide();
        } else {
            folder.addClass("folder-open");
            folder.removeClass("folder-close");
            var id = folder.attr("data-path");
            $.ajax({
                url: "file.json",
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                mimeType: 'application/json',
                data: {"id": id},
                success: function(data) {
                    list.empty();
                    var template = $("<li><a href=\"#\"></a></li>");
                    template.addClass("file");
                    template.on("click", "a", fileSelect);
                    data.forEach(function(file) {
                        var fileElement = template.clone(true);
                        fileElement.children().first().text(file.text);
                        fileElement.attr("data-path", file.id);
                        list.append(fileElement);
                    });
                    list.show();
                }
            });

        }

    }

    function fileSelect(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!event.shiftKey) {
            $("#file-list .file-selected").removeClass("file-selected").addClass("file");
        }
        $(event.delegateTarget).addClass("file-selected");
        $("#btn-load-confirm").prop("disabled", false);
    }


    // user-test related functionalities
    var startRecord = function() {
        return true;
    };
    var stopRecord = function() {
        return false;
    };

    function user_test() {
        $(".help-msg > span").hide();
        
        
        var actions = [
            {show: $(".help-msg span")[0]},
            {show: $(".help-msg span")[1]},
            {show: $(".help-msg span")[2],
                action: function(onComplete) {
                    gestureAnimator.requestAnimation(
                            75,
                            "circle",
                            onComplete);
                }
            },
            {show: $(".help-msg span")[3]},
            {
                show: $(".help-msg span")[4],
                interactive: false,
                action: function(onComplete) {
                    clear();
                    var msg = $("#countdown").show();
                    msg.text("-3");

                    var timer = new TimerManager([
                        {time: 1000, action: function() {
                                msg.text("-2");
                            }},
                        {time: 1000, action: function() {
                                msg.text("-1");
                            }},
                        {time: 1000, action: function() {
                                msg.text("Azione!");
                                record = startRecord;
                            }},
                        {time: 3000, action: function() {
                                record = stopRecord;
                                onComplete();
                            }}
                    ]);

                    timer.start();
                }
            },
            {show: $(".help-msg span")[5]},
            {show: $(".help-msg span")[6],
                action: function(onComplete) {
                    clear();
                }}
        ];

        var tutorial = new TutorialSequence(
                actions,
                $("#btn-tutorial-next"),
                $("#btn-tutorial-prev"),
                startTest);
        tutorial.next();
        $("#btn-tutorial-prev").click(function(event) {
            event.preventDefault();
            tutorial.previous();
        });
        $("#btn-tutorial-next").click(function(event) {
            event.preventDefault();
            tutorial.next();
        });
    }

    function startTest() {
        $("#help-bar").hide();
        $(".test-msg > span").hide();
        $("#test-bar").show();



        record = stopRecord;

        function recordGesture(onComplete, duration) {
            $("#btn-test-repeat").hide();
            var msg = $("#test-count").show();
            msg.text("-3");
            var timer = new TimerManager([
                {time: 1000, action: function() {
                        msg.text("-2");
                    }},
                {time: 1000, action: function() {
                        msg.text("-1");
                    }},
                {time: 1000, action: function() {
                        msg.text("Azione !");
                        record = startRecord;
                    }},
                {time: duration, action: function() {
                        record = stopRecord;
                        onComplete();
                    }}
            ]);
            timer.start();
        }
        ;


        var steps = [];
        var stepsPerIteration = 3;
        var isBack= false;
        for (var i = 0; i < gestureAnimator.animations.length; i++) {
            // demo step
            var demo = {};
            demo.show = $(".test-msg span")[i + 3];
            demo.interactive = true;
            demo.name = gestureAnimator.animations[i].gesture;
            demo.d = gestureAnimator.animations[i].duration;
            demo.index = i;
            demo.action = function(onComplete) {
                if (this.index > 0 && !isBack) {
                    save(steps[(this.index - 1) * stepsPerIteration + 1].name);
                    clear();
                }
                $("#btn-test-repeat").show();
                gestureAnimator.requestAnimation(
                        this.d,
                        this.name,
                        onComplete);
            };
            steps.push(demo);

            // gesture performance
            var performance = {};
            performance.show = $(".test-msg span")[0];
            performance.interactive = false;
            performance.skipOnPrevious = true;
            performance.time = gestureAnimator.animations[i].performance;
            performance.action = function(onComplete) {
                recordGesture(onComplete, this.time);
            };
            steps.push(performance);

            // feedback
            var feedback = {};
            feedback.show = $(".test-msg span")[1];
            feedback.skipOnPrevious = true;
            feedback.action = function() {
                $("#btn-test-repeat").hide();
            };
            steps.push(feedback);


        }

        steps.splice(0, 0, {
            show: $(".test-msg span")[2],
            action: function() {
                $("#btn-test-repeat").hide();
            }
        });

        steps.push({
            show: $(".test-msg span")[gestureAnimator.animations.length + 3],
            action: function() {
                save(gestureAnimator.animations[gestureAnimator.animations.length - 1].gesture);
                clear();
            }
        });

        var tutorial = new TutorialSequence(
                steps,
                $("#btn-test-next"),
                $("#btn-test-prev"),
                normalEditor);
        tutorial.next();
        $("#btn-test-prev").click(function(event) {
            event.preventDefault();
            isBack = true;
            clear();
            tutorial.previous();
        });
        $("#btn-test-next").click(function(event) {
            event.preventDefault();
            isBack = false;
            tutorial.next();
        });
        $("#btn-test-repeat").click(function(event) {
            event.preventDefault();
            isBack = true;
            tutorial.repeat();
        });
    }

    function normalEditor() {
        $("#help-bar").hide();
        $("#test-bar").hide();
    }

});