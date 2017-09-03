var button = document.getElementById('counter');
button.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET', 'http://sakshambarcelona.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    var name = nameInput.value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                
    var names = request.responseText;
    names = JSON.parse(names);
    var list = "";
    for(var i = 0; i<names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
     var ul = document.getElementById('namelist');
                ul.innerHTML = list;            
            }
             
    
}
            }
        request.open('GET', 'http://sakshambarcelona.imad.hasura-app.io/submit-name?name='+name, true);
        request.send(null);
};
var element  = document.getElementById('change');
element.onclick = function() {
    for(moveRight = 0; moveRight<100; moveRight++){
    element.style.marginLeft = moveRight;
    }};

var submit = document.getElementById('submit');
submit.onclick = function(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
 console.log("meh");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
         console.log("logged in succesfully");
            }
        }
    };
        request.open('POST', 'http://sakshambarcelona.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'applicatoion/json');
        request.send(JSON.stringify({username : username, password : password}));
};
