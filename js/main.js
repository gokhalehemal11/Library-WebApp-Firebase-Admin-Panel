
(function ($) {
    "use strict";



    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  

    var input = $('.validate-input .input100');


    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {

            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });


})(jQuery);

/*
  var config = {
    apiKey: "AIzaSyC5KYHGWCDaEL3W1o-Uk3Jt4vJTTvBulk8",
    authDomain: "btapp-2a08c.firebaseapp.com",
    databaseURL: "https://btapp-2a08c.firebaseio.com",
    projectId: "btapp-2a08c",
    storageBucket: "btapp-2a08c.appspot.com",
    messagingSenderId: "202689453275"
  };
  firebase.initializeApp(config);


  var con= firebase.database().ref('logged_user');


  document.getElementById("form").addEventListener("submit", (e) =>{

    e.preventDefault();

    var userInfo= con.push();
    userInfo.set({
         name: getId("username"),
         passwd: getId("password")

    });

    alert("sent");
    console.log("sent");
    document.getElementById("form").reset();

  });

  function getId(id){
    return document.getElementById(id).value;
  }*/