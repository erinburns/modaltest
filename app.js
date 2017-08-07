"use strict";
(function () {
  
  // buttons
  var btnLogin = document.getElementById('btnLogin'),
    btnSignUp = document.getElementById('btnSignUp'),
        btnLogout = document.getElementById('btnLogout');
    
    // login event
    btnLogin.addEventListener('click', function (e) {
        // get email and pass
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var auth = firebase.auth();
        // sign in 
        var promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(function (e) {
            return console.log(e.message);
        });
    });
  
    // form logout button 
    btnLogout.addEventListener('click', function (e) {
        firebase.auth().signOut();
        console.log("You have signed out");
    });  
  
  // ~~~~~ begin listing related scripts
    
    // Reference to the events collection in your Firebase database
var events = firebase.database().ref("events");
    
    
    // displays event listings on browse.html
    events.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var eventkey = childSnapshot.key;
        var eventdata = childSnapshot.val();
        var browseId = eventkey.toString(); // DND - returns event ID
        var showcards = document.getElementById('showcards');
          
        // listing data to be displayed
        var browseTitle = childSnapshot.val().title;
        var browseDate = childSnapshot.val().starttime;
        var browseCity = childSnapshot.val().city;
        var browseCost = childSnapshot.val().price;
          
          // display all listings on page
          // create card and assign class card to div
    var $card = $( '<div class="card"></div>' ); 
    $( "#showcards" ).append( $card );
       
          
        var $cardtitle = $( "<p id='evdata'></p>" );
          $cardtitle.html(browseTitle);
          $card.append($cardtitle);
          
        // create modal button  
        var $modalbtn = $( "<input type='checkbox' id='modalbtn'></input>" );
        $card.append($modalbtn);
          
         // create "more..." label for modalbtn
         var $modlabel = $( "<label for='modalbtn'>more...</label>" );
         $card.append($modlabel);  
              
 // when label is clicked 
  $modlabel.click(function() {
    // create outer container for details
    var $modaldiv = $( "<div class='modal'></div>" );
    $card.append($modaldiv);
 
    // create inner div to display listing details
      var $modalContent = $( "<div class='content'></div>" );
 

  $modalContent.html(childSnapshot.val().title);
                          
 $modaldiv.append($modalContent);       
});          
            
        console.log(eventdata);
  });  // end foreach childSnapshot function
}); // end events.on function
})(); // end file wrapper




