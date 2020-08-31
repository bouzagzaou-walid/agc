function checkUser(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  } else {
  document.location.href="home.html";
  

  }
});}