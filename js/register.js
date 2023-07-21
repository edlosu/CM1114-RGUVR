//Confirmation script
    //
    //Script submits the form only when certain conditions are met. It checks for missing input fields
    //and provides a further check for passwords to match and emails to match. To submit the 
    //user must accept the confirmation dialogue first.

    var input= document.getElementById("input");
    var email = document.getElementById("input-email")
    var send = document.getElementById("send");
    var repeatEmail = document.getElementById("input-repeat-email");
    var password = document.getElementById("input-password");
    var repeatPassword = document.getElementById("input-repeat-password")
   

    function passwordMatch(){
        if (password.value === repeatPassword.value){
            return true
        }else{
            return false
        }
    }

    function emailMatch(){
        if (email.value === repeatEmail.value){
            return true
        }else{
            return false
        }
    }

    //button functionality
    send.addEventListener('click', function(){
        var confirmBool = confirm('Confirm form submssion?')
        if (confirmBool){
            //all inputs entered
            if ( input.value !== "" && email.value !== "" && repeatEmail.value !=="" && password!=="" && repeatPassword!==""){
                //paswword and email match
                if (emailMatch() && passwordMatch()){
                    alert("Proceed");
                    input.value="";
                    email.value="";
                    repeatEmail.value="";
                    password.value="";
                    repeatPassword.value="";

                }
            //inputs are missing
            }else{
                alert("Missing fields")
            }
        }
    })
    
