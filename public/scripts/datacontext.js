app.dataContext = (function () {
    'use strict';
    
    var DataContext = kendo.data.ObservableObject.extend({
        firsttime: true,
        user: {},

        init: function () {
            var that = this;
            
            kendo.data.ObservableObject.fn.init.apply(this, []);     

            pubsub.subscribe('user', function(user){
                that.set("user", user);
            });

            pubsub.subscribe('query.getPatient', function(patientId){
                that.getPatient(patientId);
            });            
        },

        getPatient: function(patientId) {
            var that = this,
                patientRef = null;

            patientRef = firebase.database().ref().child('patients').child(patientId);

            //patientRef.on('value', snap => {
            patientRef.on('value', function(snap) {
                pubsub.publish('data.patient', snap.val());                    
            });
        },

        addPatient: function(patient, updatelocalstorage) {
            var that = this,
                updates = {},
                key = firebase.database().ref().child('patients').push().key;

            patient.id = key;
            
            updates['patients/' + key] = patient;
            firebase.database().ref().update(updates,  
                function(error) {              
                    if (error) {
                        console.log('Synchronization failed');
                    } else {
                        if( updatelocalstorage )
                            localStorage.setItem(that.user.id + '-patientid', key);

                        pubsub.publish("data.patient", patient);
                        notify("Patient " + patient.name + " created."); 
                    }
                });
        },

        removePatient: function(patient) {
            var that = this;

            firebase.database().ref().child('/patients/' + patient.id).remove( 
                function(error) {
                    if(error) {
                        notify("Patient " + patient.name + " unable to be removed.", "error");
                    } else {
                        localStorage.removeItem(that.user.id + '-patientid');
                        pubsub.publish("data.patient", {});

                        notify("Patient " + patient.name + " removed.", "success");
                        app.application.navigate("views/createPatient.html");
                    }
            });
        },
        
    });
    
    return new DataContext();

}());
