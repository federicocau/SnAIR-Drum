/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function changeVolume(value) {
    createjs.Sound.setVolume(value);
}; 
 
    
var instances = [];

function init(){
     createjs.Sound.alternateExtensions = ["mp3"];
 createjs.Sound.on("fileload", loadHandler);
 ['kick', 'hat', 'snare', 'crash', 'crash2', 'hitom', 'midtom', 'floortom', 'splash', 'china', 'ride'].forEach(function (effect) {
        //createjs.Sound.registerSound('sounds/' + effect + '.mp3', effect);
        createjs.Sound.registerSound('sounds/' + effect + '.mp3', effect);
    });
}

 function loadHandler(event) {
     // This is fired for each sound that is registered.
     //var instance = createjs.Sound.play("hitom");  // play using id.  Could also use full source path or event.src.
     //instance.on("complete", this.handleComplete, this);
 }
 
function playSound(id){
    //console.log("playSound id: " + id);
    instances[id] = createjs.Sound.play(id);
}

init();