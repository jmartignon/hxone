(function (global) {
    var app = global.app = global.app || {},
        TimeLineViewViewModel = kendo.data.ObservableObject.extend({
            user: {},
            patient: {},

            init: function () {
                var that = this; 
                
                kendo.data.ObservableObject.fn.init.apply(this, []); 

                pubsub.subscribe('user', function(user){
                    that.set("user", user);
                });

                pubsub.subscribe('data.patient', function(patient){
                    that.set('patient', patient);
                });
            },

            onViewShow: function(e) {
                var that = this,
                    options = {
                            hash_bookmark: false,
                            debug: true,
                            timenav_height_percentage: 60,
                            scale_factor: .5
                        };
            
                if( !jQuery.isEmptyObject(that.patient) ) {
                    new TL.Timeline('timeline-embed', that.patient.timeline, options);
                } else {
                    app.application.navigate("#views/home.html");
                }
            },
        });

    app.timeLineViewViewModel = new TimeLineViewViewModel();
})(window);
