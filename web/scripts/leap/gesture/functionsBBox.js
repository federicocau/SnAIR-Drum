/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// controlla che il dito sia sopra un box
function isOver(box, point) {
    return point.x < box.min.x || point.x > box.max.x ||
            point.y < box.max.y || // controllo che la y del point (dito) sia maggiore di quella della figura
            point.z < box.min.z || point.z > box.max.z ? false : true;
}

// se una delle due dita è sopra un box
function fingerOver(Box, p) {
    for (k = 0; k < Box.length; k++) {
        // se distanza su y è maggiore di 0 e x e z sono compresi
        if (isOver(Box[k], p)) {
            return k;
        }
    }
    return -1;
}


// trovo l'oggetto colliso e lo inserisco nel vettore
function intersect(Box, p) {
    for (k = 0; k < Box.length; k++) {
        if (Box[k].containsPoint(p)) {
            return k;
        }
    }
    return -1;
}

