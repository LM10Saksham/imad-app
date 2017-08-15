console.log('Loaded!');
var button = document.getElementById('counter');
var span = document.getElementById('count');

button.onclick = function(){
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpReques.DONE){
            if(request.status == 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter;
            }
        }
    };
    request.open('GET', 'http://sakshambarcelona.imad.hasura-app.io/counter');
};

