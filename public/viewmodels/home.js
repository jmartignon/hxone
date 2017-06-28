(function (global) {

    var app = global.app = global.app || {},
        HomeViewModel = kendo.data.ObservableObject.extend({
            user: {},
            patient: {},

            init: function () {
                var that = this; 
                
                kendo.data.ObservableObject.fn.init.apply(this, []); 

                pubsub.subscribe('user', function(user){
                    that.set("user", user);
                });

                pubsub.subscribe('data.patient', function(patient){
                    that.set("patient", patient);
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
            
            onLoginClick: function() {
                app.application.navigate("views/login.html");    
            },

            onViewShow: function(e) {
            },
        });

    app.homeViewModel = new HomeViewModel();
})(window);
