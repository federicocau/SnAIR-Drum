/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// pseudo coda
function Queue(array) {
    array = [];
    var reversearray;
    //--Define the max size of the stack
    var MAX_SIZE = 1;

    /*function isEmpty() {
        if (array.length < 1){
            console.log("Queue is empty");
            return true;
        } 
        else
            return false;
    };*/

    return {
        isEmpty: function() {
        if (array.length < 1){
            //console.log("Queue is empty");
            return true;
        }
        else
               return false;
        },
        
        size: function(){
            return array.length;
        },
            
        insert: function(ele) {
            if (array.length < MAX_SIZE) {
                //reversearray = array.reverse();
                array.push(ele);
                //reversearray = array.reverse();
                //return reversearray;
                return array;
            } else {
                console.log("Queue Overflow");
            }
        },
        
        delete: function() {
            if (array.length >= 1) {
                //reversearray = array.reverse();
                array.pop();
                return array;
            } else {
                console.log("Queue Underflow");
            }
        },
        
        shift: function(){
            if(array.length <= MAX_SIZE){
                return array[0];
                //return array[MAX_SIZE-1];
            }
        },
        
        print: function(){
            for(i=0; i<array.length; i++)
                console.log(array[i]);
        }
    };
};

/*
var queue = Queue();

var item = {name: 'asd', time: 0.2147124};
var item2 = {name: 'asd2', time: 0.2147124};
var item3 = {name: 'asd3', time: 0.2147124};
var item4 = {name: 'asd4', time: 0.2147124};
console.log(queue.insert(item));
console.log(queue.print());

console.log(queue.insert(item2));
console.log(queue.print());

console.log(queue.insert(item3));
console.log(queue.print());

console.log(queue.insert(item4));


/*
console.log(queue.isEmpty());
console.log(queue.insert(item));
temp = queue.shift();
console.log(temp.name, temp.time);
console.log(queue.size());
*/

