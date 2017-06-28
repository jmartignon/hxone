(function (global) {

    var app = global.app = global.app || {},
        CreatePatientViewModel = kendo.data.ObservableObject.extend({
            genders: [ "Male", "Female" ],
            user: {},
            patient: {},

            init: function () {
                var that = this; 
                
                kendo.data.ObservableObject.fn.init.apply(this, []); 

                that.set("patient", {
                    name: "",
                    gender: "",
                    startdate: new Date(),
                    startdateDisplay: "",
                    timeline: {
                        title: {
                            media: {
                                url: "",
                                caption: "",
                            },
                            text: {
                                headline: "",
                                text: ""
                            }
                        },
                        events: [ {
                            media: {},
                            group: "Life",
                            start_date: { year: "", month: "", day: ""},
                            text: {
                                headline: "Birth",
                                text: "Date of Birth"
                            }
                        }, {
                            media: {},
                            group: "Life",
                            start_date: { year: "" },
                            text: {
                                headline: "Expected End of Life",
                                text: "Based on AMA information and your demographics, this is your current expected end of life."
                            }
                        }]
                    }
                });

                pubsub.subscribe('user', function(user){
                    that.set("user", user);
                });
            },

            onCreatePatient: function() {
                var that = this;

                that.patient.startdateDisplay = moment(that.patient.startdate).format('L');

                that.patient.timeline.title.text.headline = "Health Expression for " + that.patient.name;
                var startdate = moment(that.patient.startdate);
                that.patient.timeline.events[0].start_date.year = startdate.year();
                that.patient.timeline.events[0].start_date.month = startdate.month() + 1;
                that.patient.timeline.events[0].start_date.day = startdate.date();

                var enddate = moment(that.patient.startdate);
                that.patient.timeline.events[1].start_date.year = enddate.year() + 90;

                app.dataContext.addPatient(that.patient.toJSON(), true);
                app.application.navigate("views/home.html");    
            },

            onViewShow: function(e) {
                var that = this;
            },
        });

    app.createPatientViewModel = new CreatePatientViewModel();
})(window);
