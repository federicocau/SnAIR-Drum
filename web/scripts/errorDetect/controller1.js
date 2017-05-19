/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* vedere come implementare la coda!!! */

var delta = 0.11; // delta di approssimazione per la pressione dei tasti
var sheet = spartitoTamburo(); // oggetto contenente i dettagli dello spartito
var i = 0;
//sheet.length(); // definire la lunghezza del vettore per poter fermarsi prima che vada fuori range

var queue = [];/*
queue.push(2);         // queue is now [2]
queue.push(5);         // queue is now [2, 5]
var i = queue.shift(); // queue is now [5]
alert(i);              // displays 2
*/

/*
function productor(currentTime){   
    document.onkeydown = function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        switch(e){
            case 67:
            case 86: // c,v
                var data = [e,currentTime];
                queue.push(data);
                console.log("coda:"+ data);
            break;
    }
};
    
    var k = ['ciao',Math.random()];  
    queue.push(k);
    console.log("produttore: " + k[0] + " " + k[1]);
    setTimeout(productor, 400);
}*/


/* funzionante: senza controllo sulla coda
function controller(){
    //if(queue){
        console.log("note: " + sheet.notes[i].name + " time: " + sheet.notes[i].time);
      //  item = queue.shift();
      //  console.log("item: " + item);
        i++;
        //console.log("rightTime " + sheet.notes[i-1].duration); // intervallo per il risveglio del controller
        var sleep = sheet.notes[i-1].duration; // moltiplico per 1000 per renderlo in secondi
   // }
        setTimeout(controller, sleep*1000); // aspetto una durata pari alla nota corrente - un delta
   
}*/

// test prelievo sulla coda -> inserirlo in abcweb10queue
function controller(){
    //if(queue){
        console.log("note: " + sheet.notes[i].name + " time: " + sheet.notes[i].time);
        var item = queue.shift();
        console.log("item: " + item);
        if( (item[1] >= sheet[i].time-delta) && (item[1] <= sheet[i].time+delta) )
            console.log("right");
        i++;
        //console.log("rightTime " + sheet.notes[i-1].duration); // intervallo per il risveglio del controller
        var sleep = sheet.notes[i-1].duration; // moltiplico per 1000 per renderlo in secondi
   // }
        setTimeout(controller, sleep*1000); // aspetto una durata pari alla nota corrente - un delta
   
}

