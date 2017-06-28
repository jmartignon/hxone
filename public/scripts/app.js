(function (global) {
    var app = global.app = global.app || {};
    
    app.version = "HxOne.1.03";
    app.cordova = false;
            
    $(document).ready(function() {
        var initialView = "views/home.html";
    
        setToastrOptions();

        app.application = new kendo.mobile.Application(document.body, {
            skin: "flat",
            initial: initialView,
            transition: "slide",
            init: function() {
                kendo.UserEvents.defaultThreshold(kendo.support.mobileOS.device === 'android' ? 0:20);

                if( this.hasOwnProperty("os") && this.os.hasOwnProperty("cordova") && this.os.cordova )
                    app.cordova = true;                                    
            }
        });

        pubsub.publish("version", app.version);
        
    });
})(window);