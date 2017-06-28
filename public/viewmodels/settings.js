(function (global) {

    var app = global.app = global.app || {},
        SettingsViewModel = kendo.data.ObservableObject.extend({
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

            onClearPatient: function() {
                var that = this;

                app.dataContext.removePatient(that.patient);
            },

            onViewShow: function(e) {
            },
        });

    app.settingsViewModel = new SettingsViewModel();
})(window);
