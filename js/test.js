//var count=0;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	console.log("onAuthStateChanged");
    var user = firebase.auth().currentUser;

    if(user != null){
      
    	console.log("onAuthStateChanged IF");
        var email_id = user.email;
        var u_id = user.uid;
    //    count++;
   //     console.log(count);
        console.log("auth"+ u_id);
   //   if(count>1){
        firebase.database().ref("logged_in").remove();
        var con = firebase.database().ref("logged_in");
        con.push(u_id);
        console.log("sent");
        document.getElementById("form").reset();  

        var con2 = firebase.database().ref("issued_books");
        var trial= con2.child(u_id);
        if(trial){
        trial.push({
              0: "",
              1:"",
              2:"",
              3:"",
              4:"",
              5:""
        });
          
      }
    document.getElementById("next_div").style.display = "block";
    document.getElementById("full_login").style.display = "none";
   // }
  
  }   
    else{
        alert("error");
    }
}
});

document.getElementById("form").addEventListener("submit", function(e) { 
  
  e.preventDefault();
  

  
  console.log("login");
  var userEmail = document.getElementById("username").value;
  var userPass = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
         
    console.log("login"+ userEmail+userPass);
  
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    window.alert("Error : " + errorMessage);

  });

});

function logout(){
  
  var user = firebase.auth().currentUser;
  var u_id= user.uid;
  
  var con= firebase.database();
  con.ref('issued_books/'+u_id).once('value').then(function(snapshot) {
  snapshot.forEach(function(snapshot1) {
    console.log(snapshot1.key); 
    //console.log("hey 1");
    snapshot1.forEach(function(childSnapshot) {
     if(childSnapshot.val()[1] == undefined){
         firebase.database().ref("issued_books/"+u_id+"/"+snapshot1.key).remove();
     }
    });
    
  });
  });
  
  firebase.auth().signOut();
  firebase.database().ref("logged_in").remove();
  console.log("Logout success");
  window.location.replace("/index.html");
  }


/* var config = {
    apiKey: "AIzaSyC5KYHGWCDaEL3W1o-Uk3Jt4vJTTvBulk8",
    authDomain: "btapp-2a08c.firebaseapp.com",
    databaseURL: "https://btapp-2a08c.firebaseio.com",
    projectId: "btapp-2a08c",
    storageBucket: "btapp-2a08c.appspot.com",
    messagingSenderId: "202689453275"
  };
  firebase.initializeApp(config);


  var con= firebase.database().ref('logged_in_user');
  var form= document.getElementById("form");

  form.addEventListener("submit", (e) =>{

  	e.preventDefault();

  	var userInfo= con.push();
  	userInfo.set({
  		 name: getId("username");
  		 passwd: getId("password");

  	});
  	alert("sent");
  	console.log("sent");
  	document.getElementById("form").reset();

  });

  function getId(id){
  	return document.getElementById(id).value;
  } */