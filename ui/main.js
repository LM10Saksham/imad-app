console.log('Loaded!');
var button = document.getElementById('counter');
var span = document.getElementById('count');
button.onclick = function(){
    counter = counter + 1;
    span.innerHTML = counter;
};
    