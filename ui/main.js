console.log('Loaded!');
var button = document.getElementByID('counter');
var span = document.getElementByID('count');
button.onclick = function(){
    span = span + 1;
};
    