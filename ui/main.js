/*var button = document.getElementById('counter');


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
*/
/*var nameinput = document.getElementById('name');
var name = nameinput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i = 0; i<names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
    request.open('GET', 'http://sakshambarcelona.imad.hasura-app.io/submit-name?name='+name, true);
};*/
var element  = document.getElementById('change');
element.onclick = function() {
    for(moveRight = 0; moveRight<1000; moveRight++){
        
    
    element.style.marginLeft = moveRight;
    
    }
    
}