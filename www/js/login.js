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
                    localStorage.setItem('pid',obj.profil_id);
                    localStorage.setItem('iscoach',obj.is_coach);
                    localStorage.setItem('isparent',obj.profil_parent);
                    localStorage.setItem('isadherent',obj.profil_adherent);
                    localStorage.setItem('iscomite',obj.in_comite);
                    localStorage.setItem('isadmin',obj.is_admin);

                    
                    if (obj.is_coach == 1 && obj.is_admin == 1 && obj.in_comite == 1) {
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