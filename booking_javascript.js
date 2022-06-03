// This js file is used to send the xhr request and register the event listener for the onreadystatechange event
var xhr = createRequest();

function getData() {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
        var response = xhr.responseXML;
        var targetDiv = document.getElementById("targetDiv");
        alert("ok!");
        if (response != null) {
            var header = response.getElementsByTagName("booking");
			// Clear the previous text before displaying new text
            targetDiv.innerHTML = "";
            
			// The index number 0, 5 represent the booking reference number and pickup date time respectively.
            for (var i = 0; i < header.length; i++) {
                if (window.ActiveXObject) {
						targetDiv.innerHTML += "Thank you! Your booking reference number is ";
						targetDiv.innerHTML += header[i].childNodes[0].text;
						targetDiv.innerHTML += ". You will be picked up in front of your provided address at ";
						// Get the time part
						targetDiv.innerHTML += header[i].childNodes[5].text.substr(11,5);
						targetDiv.innerHTML += "on ";
						// Get the date part
						targetDiv.innerHTML += header[i].childNodes[5].text.substr(0,10);
                } else {
                        targetDiv.innerHTML += "Thank you! Your booking reference number is ";
						targetDiv.innerHTML += header[i].childNodes[0].textContent;
						targetDiv.innerHTML += ". You will be picked up in front of your provided address at ";
						// Get the time part
						targetDiv.innerHTML += header[i].childNodes[5].textContent.substr(11,5);
						targetDiv.innerHTML += " on ";
						// Get the date part
						targetDiv.innerHTML += header[i].childNodes[5].textContent.substr(0,10);
                }
            }
        }
    }
}

// The call-back function that will be invoked based on the readyState of the xhr object
function sendRequest(dataSource) {
    var cname = document.getElementById("cname").value;
    var phone = document.getElementById("phone").value;
    var unumber = document.getElementById("unumber").value;
    var snumber = document.getElementById("snumber").value;
    var stname = document.getElementById("stname").value;
    var sbname = document.getElementById("sbname").value;
    var dsbname = document.getElementById("dsbname").value;
    var date = document.getElementById("date").value;

    // The parameter 'value' is used to generate a unique number for each request body
    var requestBody = "cname=" + encodeURIComponent(cname) + "&phone=" + encodeURIComponent(phone) + "&unumber=" + encodeURIComponent(unumber) + "&snumber=" + encodeURIComponent(snumber) + "&stname=" + encodeURIComponent(stname) + "&sbname=" + encodeURIComponent(sbname) + "&dsbname=" + encodeURIComponent(dsbname) + "&date=" + encodeURIComponent(date) + "&value=" + Number(new Date);

	if(xhr) {
		xhr.open("POST", dataSource, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = getData;
		xhr.send(requestBody);
	}
}