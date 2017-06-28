
function dateForStorage(d) {
    var m = d;
    if( !moment.isMoment(d) )
        m = moment(d);
    return m.format('YYYY-MM-DDTHH:mm:ss.sssZ');
}

// Toastr Functions
function notify( data, ntype ) {
    switch( ntype ) {
        case "success":
		    toastr.success(data);
        	break;
        case "info":
		    toastr.info(data);
        	break;
        case "warning":
		    toastr.warning(data);
        	break;
        case "error":
		    toastr.error(data);
        	break;
    }
}

var setToastrOptions = function() {
    
    toastr.options= {
      "positionClass": "toast-bottom-right",
      "showDuration": "300",
      "hideDuration": "300",
      "timeOut": "1500",
      "extendedTimeOut": "500",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
}