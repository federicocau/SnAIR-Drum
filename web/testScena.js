/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Set up plugins

  Leap.loop({background: true})
    .use('transform', {
      vr: 'desktop' // Switch to meters.
    })
    .use('boneHand', {
      targetEl: document.getElementById('container'),
      jointColor: new THREE.Color(0xffffff),
      rendererOps: {antialias: true}
    })
    .use('proximity');

  // Set up scene

  var scene = Leap.loopController.plugins.boneHand.scene;
  var camera = Leap.loopController.plugins.boneHand.camera;
  var renderer = Leap.loopController.plugins.boneHand.renderer;
  
  //camera.position.set( 0, 0.5, 0.3 );
  camera.position.set(0, 0.467, 0.313); 


  var controls = new THREE.OrbitControls( camera );
  controls.enabled = false; // disabilito la possibilità di muovere la telecamera

  //var axisHelper = new THREE.AxisHelper( 0.5 );
  //scene.add( axisHelper );

  // Add a plane
  
//  buttonMesh.scale.setY(0.5);

// new code

var loader = new THREE.ColladaLoader();
				loader.options.convertUpAxis = true;
				loader.load( 'models/drumset.dae', function ( collada ) {
					var object = collada.scene;
					object.scale.set( 0.003, 0.002, 0.002 );
					object.position.set( -0.02, -0.02, -0.01); 
                                        object.rotation.set(0,210.5,0); 
					scene.add( object );
				} );
// new code

        renderer.setSize($("#container").width(), $("#container").height());
        var container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        
        // struttura per le figure sopra gli strumenti
        var figures = [
            { name: 'hitom', key: 'da scrivere', dimension: [0.08, 0.07, 1, 1], position: [-0.085, 0.15, 0.020], rotation: [180.8, 0, 0] },
            { name: 'midtom', key: 'da scrivere', dimension: [0.08, 0.07, 1 ,1], position: [0.001, 0.15, 0.020], rotation: [180.8, 0, 0] },
            { name: 'splash', key: 'da scrivere', dimension: [0.06, 0.04, 1 ,1], position: [-0.03, 0.181, 0.003], rotation: [180.8, 0, 0] },          
            { name: 'snare', key: 'da scrivere', dimension: [0.1, 0.07, 1, 1], position: [-0.10, 0.123, 0.09], rotation: [180.8, 0, 0] },
            { name: 'hat', key: 'da scrivere', dimension: [0.1, 0.07, 1, 1], position: [-0.23, 0.139, 0.07], rotation: [180.8, 0, 0] },           
            { name: 'ride', key: 'da scrivere', dimension: [0.13, 0.07, 1, 1], position: [0.1, 0.132, 0.06], rotation: [180.8, 0, 0] },       
            { name: 'floortom', key: 'da scrivere', dimension: [0.1, 0.05, 1, 1], position: [0.09, 0.111, 0.13], rotation: [180.8, 0, 0] },
            //{ name: 'kick', key: 'da scrivere', dimension: [0.07, 0.04, 1, 1], position: [-0.01, 0.123, 0.08], rotation: [180.8, 0, 0] },
            { name: 'crash', key: 'da scrivere', dimension: [0.13, 0.07, 1, 1], position: [-0.2, 0.21, -0.01], rotation: [180.8, 0, 0] },
            { name: 'crash2', key: 'da scrivere', dimension: [0.13, 0.075, 1, 1], position: [0.045, 0.22, -0.01], rotation: [180.8, 0, 0] },
            { name: 'china', key: 'da scrivere', dimension: [0.1, 0.08, 1, 1], position: [0.18, 0.19, 0.14], rotation: [180.8, 74, 0] }      
        ];
        
        //var meshes = []; // figure senza interazione
        var interactiveButtons = []; // figure con interazione
        
        // genero ogni figura
        for(i=0; i<figures.length; i++){
            // come evitare questo abominio?
            var planeGeometry = new THREE.PlaneGeometry(figures[i].dimension[0], figures[i].dimension[1], figures[i].dimension[2], figures[i].dimension[3]);
            var planeMaterial = new THREE.MeshLambertMaterial({wireframe: false, color: 0xff0000, transparent: true, opacity: 0.0});
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(figures[i].position[0], figures[i].position[1], figures[i].position[2]); // posizione
            plane.rotation.set(figures[i].rotation[0], figures[i].rotation[1], figures[i].rotation[2]); // rotazione
            plane.name = figures[i].name;
            scene.add(plane); 
            //meshes[i] = plane;
            
            // rendo la figura interattiva
            interactiveButtons[i] = new PushButton(
                new InteractablePlane(plane, Leap.loopController),
                {
                  locking: false,
                  longThrow: 0
                }          
                ).on('press', function(mesh){ // non funziona on('touch'!
                     //prova();
                     //console.log(mesh.name);
                     trovaSuono:
                     for(k=0; k<figures.length; k++){
                         if(figures[k].name === mesh.name){
                            playSound(figures[k].name);
                            break trovaSuono;
                         }
                     }
                     
                 });/*.on('release', function(mesh){
                     prova();
                });*/
        }
        
            //console.log('as ' + interactiveButtons[0].plane.touched);
          /*  
            interactiveButtons[0].plane.touch(function(mesh){                
                suono = figures[0].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[1].plane.touch(function(mesh){                
                suono = figures[1].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[2].plane.touch(function(mesh){                
                suono = figures[2].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[3].plane.touch(function(mesh){                
                suono = figures[3].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[4].plane.touch(function(mesh){                
                suono = figures[4].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[5].plane.touch(function(mesh){                
                suono = figures[5].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[6].plane.touch(function(mesh){                
                suono = figures[6].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[7].plane.touch(function(mesh){                
                suono = figures[7].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[8].plane.touch(function(mesh){                
                suono = figures[8].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
              
              interactiveButtons[9].plane.touch(function(mesh){                
                suono = figures[9].name;
                //console.log('touched' + suono);
                playSound(suono);
              });
*/
  var longThrow = -0.1;
  
    function render() {

        renderer.render(scene, camera);

    }
    
    render();
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {


        //$("#container").height(window.innerHeight);
        renderer.setSize($("#container").width(), $("#container").height());
        camera.aspect = $("#container").width() / $("#container").height();
        camera.updateProjectionMatrix();


        //controls.handleResize();

        render();

    }

    function animate() {

        requestAnimationFrame(animate);
        render(); // new
        controls.update();
        //update(); // per le intersezioni

    }
    

