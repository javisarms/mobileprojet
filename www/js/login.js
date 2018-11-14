$(document).ready(function(){
    localStorage.clear();
    var url = "http://localhost:8888/Valacro/logIn.php";
    $("#loginButton").click(function(){
        var email= $.trim($("#email").val());
        var password= $.trim($("#password").val());
        var loginString ="email="+email+"&password="+password+"&login=";
        $.ajax({
            type: "POST",crossDomain: true, cache: false,
            url: url,
            data: loginString,
            success: function(data){
                //also add if admin
                if(data == "error") {
                    console.log(data);
                    ons.notification.alert('Incorrect username or password.');
                }
                else {
                    var obj = JSON.parse(data);
                    localStorage.loginstatus = "true";
                    localStorage.setItem('uemail',email);
                    localStorage.setItem('upwd',password);
                    localStorage.setItem('uid',obj.user_id);
                    if (obj.user_id == 2) {
                        window.location.href = "admin_index.html";   
                    }
                    else {
                        window.location.href = "index.html"; 
                    }
                }
            }
        });
    });
});