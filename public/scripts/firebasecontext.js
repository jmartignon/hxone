// Initialize Firebase
var config = {
    apiKey: "AIzaSyCfniZHaoHeCXzEUW8IJiXqCHMs2mapO8k",
    authDomain: "hxone-241be.firebaseapp.com",
    databaseURL: "https://hxone-241be.firebaseio.com",
    projectId: "hxone-241be",
    storageBucket: "hxone-241be.appspot.com",
    messagingSenderId: "227584599818"
};
firebase.initializeApp(config);

//firebase.auth().onAuthStateChanged(firebaseUser => {
firebase.auth().onAuthStateChanged(function(firebaseUser) {
    var user = {
        id: "",
        displayName: "",
        shortName: "",
        userpic: 'url(/images/profile_placeholder.png)',
    };

    if(firebaseUser) {
        user.id = firebaseUser.uid;
        user.displayName = firebaseUser.displayName; 
        user.shortName = firebaseUser.displayName.split(' ')[0];
        user.userPic = 'url(' + firebaseUser.photoURL + ')';
        pubsub.publish("user", user);
        notify(user.displayName + " logged in", "success");
        
        var pid = localStorage.getItem(user.id + "-patientid");
        if( pid !== null ) {
            pubsub.publish("query.getPatient", pid);        
        } else {
            app.application.navigate("views/createPatient.html"); 
        }

    } else {
        pubsub.publish("user", {});
    }
});
