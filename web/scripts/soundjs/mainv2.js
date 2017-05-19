function changeVolume(value) {
    createjs.Sound.setVolume(value);
}
;
// funz. inutile da cancellare
function createCircle(){
    var svgns = "http://www.w3.org/2000/svg";

    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttributeNS(null, 'x', '100');
    rect.setAttributeNS(null, 'y', '200');
    rect.setAttributeNS(null, 'height', '50');
    rect.setAttributeNS(null, 'width', '50');
    rect.setAttributeNS(null, 'fill', '#' + Math.round(0xffffff * Math.random()).toString(16));
    document.getElementById('notation').appendChild(rect);
    /*
    var newSvg = document.getElementById('notation');
    newSvg.outerHTML += '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;z-index:10;margin:0;padding:0;top:0em;left:0.5em" onclick="go()" width="100" height="100"><circle cx="40" cy="40" r="40" stroke="red" stroke-width="4" fill="blue" /></svg>';
    */
   
}

window.onload = function () {

    var instances = [];

    var fileLoaded = function (e) {
        var icon = document.getElementById(e.id);
        //var kick = 
        /*
         icon.addEventListener('click', function() {
         playSound.call(this, this.id);
         });
         */


        //(funzionante )window.addEventListener('keydown', function (event) {

        //document.getElementById("area_strumenti").addEventListener('keydown', function (event) {
  

        //createjs.Sound.defaultInterruptBehavior = createjs.Sound.INTERRUPT_ANY;

          window.onkeydown = function(event) {  
            // che tasto si preme console.log(event.keyCode); 

            switch (event.keyCode) {
                case 70:
                case 71 :// kick = f,g (prova cassa due dita)
                    document.getElementById("kick").setAttribute("src", "img/kickon.png");
                    playSound.call(this, 'kick');
                    //this.createRect(x,xleft,xright);
                    
                    break;
                case 67:
                case 86:// snare = c,v (prova tamburo con due dita)
                    document.getElementById("snare").setAttribute("src", "img/snareon.png");
                    playSound.call(this, 'snare');
                    break;
                case 65: // hat = a
                    document.getElementById("hat").setAttribute("src", "img/haton.png");
                    playSound.call(this, 'hat');
                    break;
                case 90: // crash = z
                    document.getElementById("crash").setAttribute("src", "img/crashon.png");
                    playSound.call(this, 'crash');
                    break;
                case 83: // hitom = s
                    document.getElementById("hitom").setAttribute("src", "img/hitomon.png");
                    playSound.call(this, 'hitom');
                    break;
                case 88: // floortom = x
                    document.getElementById("floortom").setAttribute("src", "img/floortomon.png");
                    playSound.call(this, 'floortom');
                    break;
            }
          };

        window.addEventListener('keyup', function (event) {
            switch (event.keyCode) {
                case 70:
                case 71 :// kick = f,g (prova cassa due dita)
                    document.getElementById("kick").setAttribute("src", "img/kick.png");
                    break;
                case 67:
                case 86:// snare = d,v (prova tamburo con due dita)
                    document.getElementById("snare").setAttribute("src", "img/snare.png");
                    break;
                case 65: // hat = a
                    document.getElementById("hat").setAttribute("src", "img/hat.png");
                    break;
                case 90: // crash = z
                    document.getElementById("crash").setAttribute("src", "img/crash.png");
                    break;
                case 83: // hitom = s
                    document.getElementById("hitom").setAttribute("src", "img/hitom.png");
                    break;
                case 88: // floortom = x
                    document.getElementById("floortom").setAttribute("src", "img/floortom.png");
                    break;
            }
        });


    };

    /*
     createjs.Sound.alternateExtensions = ["mp3"];
     createjs.Sound.addEventListener('fileload', fileLoaded);
     
     ['night', 'thunder', 'rain', 'wind'].forEach(function (effect) {
     createjs.Sound.registerSound('sounds/' + effect + '.mp3', effect);
     });*/

    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener('fileload', fileLoaded);

    ['kick', 'hat', 'snare', 'crash', 'hitom', 'floortom'].forEach(function (effect) {
        createjs.Sound.registerSound('sounds/' + effect + '.mp3', effect);
    });

    /*
     var playSound = function(id) {
     if (this.className == 'icon active') {
     this.setAttribute('class', 'icon');
     instances[id].stop();
     } else {
     this.setAttribute('class', 'icon active');
     instances[id] = createjs.Sound.play(id);  
     }
     };
     */
    var playSound = function (id) {
        /*if (this.className == 'icon active') {
         this.setAttribute('class', 'icon');
         instances[id].stop();
         } else {*/
        //this.setAttribute('class', 'icon active');

        instances[id] = createjs.Sound.play(id);


        // }
    };


};