/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var delta = 0.11; // delta di approssimazione per la pressione dei tasti
var sheet = spartitoTamburo(); // oggetto contenente i dettagli dello spartito
var i = 0;

var queue = [];/*
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
var i = queue.shift(); // queue is now [5]
alert(i);              // displays 2
*/


function productor(){
    
  /*  document.onkeydown = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
        
    };*/
    
    /*var k = ['ciao',Math.random()];  
    queue.push(k);
    console.log("produttore: " + k[0] + " " + k[1]);
    setTimeout(productor, 400);*/
}

function controller(flag){
    //if(queue){
    if(flag){
        console.log("note: " + sheet.notes[i].name + " time: " + sheet.notes[i].time);
      //  item = queue.shift();
      //  console.log("item: " + item);
        i++;
        console.log("sheet.notes[i-1].duration: " + sheet.notes[i-1].duration);
        var sleep = sheet.notes[i-1].duration; // moltiplico per 1000 per renderlo in secondi
   // }
    setTimeout(controller, sleep*1000); // aspetto una durata pari alla nota corrente - un delta
    }
}
