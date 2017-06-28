(function (global) {

    var app = global.app = global.app || {},
        LoginViewModel = kendo.data.ObservableObject.extend({
            firstTime: true,
            user: {},

            init: function () {
                var that = this; 
                
                kendo.data.ObservableObject.fn.init.apply(this, []);                 

                pubsub.subscribe('user', function(user){
                    that.set("user", user);
                });
            },

            isLoggedIn: function() {
                var that = this,
                    user = that.get("user");

                if( !jQuery.isEmptyObject(user) && user.hasOwnProperty("displayName") )
                    return true;
                else
                    return false;
            },

            logOut: function() {
                firebase.auth().signOut().then(function() {
                    pubsub.publish("user", {});
                }, function(error) {
                });
            },

            onViewShow: function(e) {
                var that = this;
                
                if( that.firstTime ) {
                    // FirebaseUI config.
                    var uiConfig = {
                        signInSuccessUrl: '#views/home.html',
                        signInOptions: [
                            // Leave the lines as is for the providers you want to offer your users.
                            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            firebase.auth.EmailAuthProvider.PROVIDER_ID,
                            firebase.auth.PhoneAuthProvider.PROVIDER_ID
                        ],
                        // Terms of service url.
                        tosUrl: 'https://hxone-241be.firebaseapp.com'
                    };

                    // Initialize the FirebaseUI Widget using Firebase.
                    var ui = new firebaseui.auth.AuthUI(firebase.auth());
                    // The start method will wait until the DOM is loaded.
                    ui.start('#firebaseui-auth-container', uiConfig);
                    that.firstTime = false;
                }
            },
        });

    app.loginViewModel = new LoginViewModel();
})(window);
