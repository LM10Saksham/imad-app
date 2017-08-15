console.log('Loaded!');
var button = document.getElementById('counter');
var span = document.getElementById('count');
button.onclick = function(){
    span = span + 1;
    span.innerHTML = span;
};
    