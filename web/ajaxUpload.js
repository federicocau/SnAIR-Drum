/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
// funziona ma lo preleva solo da file! 
function JSONtoJavascript(){

    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","testTone.json",false);
    xmlhttp.send();
    // trasformo da json a js
    var js = JSON.parse(xmlhttp.responseText);
    // prendo solo le note dall'oggetto
    var notes = js.tracks[0].notes;
    // prova stampa
    for(i=0; i<notes.length; i++)
        console.log("notes time: " +notes[i].time);
}

JSONtoJavascript();*/
//stampa il contenuto del div in #Text
function test(){ 
    // preleva tutto il codice della pagina
    $.ajax({
        url: 'https://tonejs.github.io/MidiConvert/',
        type: 'GET',
        success: function (data) { 
            // prova stampa con ricerca id
            var output = $('#Text', data).text();
            console.log("Test" + output);
          
        }
    });
}

/*
function estrai(){
    console.log("ciao");
    var json = document.getElementById('Text');
    alert(json.textContent);
}
*/


// estrae il json  (devo ancora salvare il file in json)
function estrai(){
    t = setTimeout(getJSON, 1000); 
    function getJSON(){
        var json = document.getElementById('ResultsText').value;
        clearTimeout(t);
        
        function modificaLink(a){
            var name = document.getElementById("Text").innerHTML;
            // estrapolo solo il nome senza l'estensione
            name = name.substring(0, name.length - 4);
            console.log(name);
            a.download = name + ".json";
            a.href = "data:text/json," + json;
            a.innerHTML = "Download - " + name + ".json";  
        }
        
        var d = document.getElementById("download").textContent;
        // controllo se il contenuto del div è vuoto, e se lo è creo il child a
        if(d === ""){
            console.log("a creato");
            var a = document.getElementById("download").appendChild(
                document.createElement("a")
                );
            modificaLink(a);
        }
        // altrimenti a esiste già e sovrascrivo il suo contenuto
        else{
            console.log("a sovrascritto");
            var a = document.getElementById("download").getElementsByTagName("a")[0];
            modificaLink(a);
        }
        
        // trasforma da json a javascript
        /*var js = JSON.parse(json);
        console.log(js);
        var sheet = js.tracks[0];
        console.log(sheet.notes[0].time);*/
    }    
}


//test();

function t(){
    
    /*function uploadFile(event)
    {
        event.stopPropagation();
        event.preventDefault();
        var files = '00_tamburo.mid';
        var data = new FormData();
        $.each(files, function (key, value)
        {
            data.append(key, value);
        });
        console.log('data');
        postFilesData(data);
    }

    function postFilesData(data)
    {
        $.ajax({
            url: 'https://tonejs.github.io/MidiConvert/',
            type: 'GET',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data, textStatus, jqXHR)
            {
                //success
                //var output = $('#Text', data).text();
                $('#Test input').on('load', uploadFile);  
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log('ERRORS: ' + textStatus);
            }
        });

    }*/
    xmlhttp = new XMLHttpRequest();
    formData = '00_tamburo.mid';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://tonejs.github.io/MidiConvert/', true); // If async=false, then you'll miss progress bar support.
    xhr.send(formData);
    
  
}


/*
function aa(){
    var fileInput = document.querySelector('input[type=file]');
    //var attachment = fileInput.files[0];

    var formData = new FormData();
    formData.append('file','00_tamburo.mid');
    var request = new XMLHttpRequest();
    request.open('POST', 'https://tonejs.github.io/MidiConvert/', true);
    request.onload = function () {
        console.log("Server responded with %o", request.responseText);
    };
    
    console.log(formData);
    request.send(formData);
}

aa();*/


/*
function beginQuoteFileUnquoteUpload(data)
{
    // Define a boundary, I stole this from IE but you can use any string AFAIK
    var boundary = "---------------------------7da24f2e50046";
    var xhr = new XMLHttpRequest();
    var body = '--' + boundary + '\r\n'
             // Parameter name is "file" and local filename is "temp.txt"
             + 'Content-Disposition: form-data; id="Text";'
             + 'filename="00_tamburo.mid"\r\n'
             // Add the file's mime-type
             + 'Content-type: plain/text\r\n\r\n'
             + data + '\r\n'
             + boundary + '--';

    xhr.open("POST", "https://tonejs.github.io/MidiConvert/", true);
    xhr.setRequestHeader(
        "Content-type", "multipart/form-data; boundary="+boundary

    );
    xhr.onreadystatechange = function (data)
    {
        if (xhr.readyState === 4 && xhr.status === 200)
            alert("File uploaded!");
        

        var output = $('#Results', data).text();
        console.log("Test" + output);
    };
    xhr.send(body);
}

beginQuoteFileUnquoteUpload();
*/