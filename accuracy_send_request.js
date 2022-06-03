// This js file is used to validate the user input as well as call the sendRequest function which is sending the xhr request
var check_Point = true;

function Is_name_emty() {
	var cname = document.getElementById("cname").value;
	
	if(cname == "") {
		document.getElementById("cname_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else {
		document.getElementById("cname_error").innerHTML = "Approval";
		check_Point = true;
	}
}

function Is_phone_emty() {
	var phone = document.getElementById("phone").value;
	
	if(phone == "") {
		document.getElementById("phone_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else if(!phone.match(/^\d+$/)){
		document.getElementById("phone_error").innerHTML = "Numerals only";
		check_Point = false;
	} else {
		document.getElementById("phone_error").innerHTML = "Approval";
		check_Point = true;
	}
}

// Since it is valid to leave the unit number blank, there is no need to set the check_Point flag.
function Is_unumber_emty() {
	var unumber = document.getElementById("unumber").value;
	
	if(unumber == "") {
		document.getElementById("unumber_error").innerHTML = "Empty! But also accept";
	} else {
		document.getElementById("unumber_error").innerHTML = "Approval";
	}
}

// Street number can include letters in some countries.
function Is_snumber_empty() {
	var snumber = document.getElementById("snumber").value;
	
	if(snumber == "") {
		document.getElementById("snumber_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else {
		document.getElementById("snumber_error").innerHTML = "Approval";
		check_Point = true;
	}
}

function Is_stname_empty() {
	var stname = document.getElementById("stname").value;
	
	if(stname == "") {
		document.getElementById("stname_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else {
		document.getElementById("stname_error").innerHTML = "Approval";
		check_Point = true;
	}
}

function Is_sbname_empty() {
	var sbname = document.getElementById("sbname").value;
	
	if(sbname == "") {
		document.getElementById("sbname_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else {
		document.getElementById("sbname_error").innerHTML = "Approval";
		check_Point = true;
	}
}

function Is_dsbname_empty() {
	var dsbname = document.getElementById("dsbname").value;
	
	if(dsbname == "") {
		document.getElementById("dsbname_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else {
		document.getElementById("dsbname_error").innerHTML = "Approval";
		check_Point = true;
	}
}

function Is_date_empty() {
	var date = document.getElementById("date").value;
	
	var date_object = new Date(date);
	var current_time_object = new Date();
	
	if(date == "") {
		document.getElementById("date_error").innerHTML = "Cannot empty this field";
		check_Point = false;
    } else if(date_object < current_time_object) {
		document.getElementById("date_error").innerHTML = "Must not be earlier than current date and time on the current time";
		check_Point = false;
	} else {
		document.getElementById("date_error").innerHTML = "Approval";
		check_Point = true;
	}
}

function accuracy_send_request() {//chưa đổi tên
	// Validate all the fields before sending the xhr request
	Is_name_emty();
	Is_phone_emty();
	Is_snumber_empty();
	Is_stname_empty();
	Is_sbname_empty();
	Is_dsbname_empty();
	Is_date_empty();
	
	// Only if all the fileds are valid, then the request can be sent
	if(check_Point) {
		sendRequest('booking_php.php');//chưa đổi tên file

		// After sending the booking request, reset the form
		document.getElementById("booking_system").reset();
		// After sending the booking request, clear all the hint messages
		document.getElementById("cname_error").innerHTML = "";
		document.getElementById("phone_error").innerHTML = "";
		document.getElementById("unumber_error").innerHTML = "";
		document.getElementById("snumber_error").innerHTML = "";
		document.getElementById("stname_error").innerHTML = "";
		document.getElementById("sbname_error").innerHTML = "";
		document.getElementById("dsbname_error").innerHTML = "";
		document.getElementById("date_error").innerHTML = "";
	}
}