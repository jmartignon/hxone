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
        user.displayName = getDisplayName(firebaseUser); 
        user.shortName = getDisplayName(firebaseUser, true);
        user.userPic = (firebaseUser.photoURL ? 'url(' + firebaseUser.photoURL + ')' : "");
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

function getDisplayName(firebaseUser, short) {
    var name = firebaseUser.displayName;
    
    if( firebaseUser.displayName ) {
        name = (short ? name.split(' ')[0] : name);
    } else {
        if( firebaseUser.phoneNumber ) {
            name = firebaseUser.phoneNumber.replace('+1', "");
        }
    }

    return name;
}