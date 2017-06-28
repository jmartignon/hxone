(function (global) {

    var app = global.app = global.app || {}, 
        IndexViewModel = kendo.data.ObservableObject.extend({
            user: {},
            patient: {},
            
            init: function () {
                var that = this; 
                
                kendo.data.ObservableObject.fn.init.apply(this, []); 

                pubsub.subscribe('version', function(version){
                    that.set("version", version);
                });

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

            hideDrawer: function() {
                $("#appDrawer").data("kendoMobileDrawer").hide();
            },

            onViewShow: function(e) {
            },

        });

    app.indexViewModel = new IndexViewModel();
})(window);
