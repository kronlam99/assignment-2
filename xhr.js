// file xhr.js
// Student name: Chi Thanh Lam
// Student ID: 18013769

function createRequest() {
    // var xhr = false; 
	
    // if (window.XMLHttpRequest) {
    //     xhr = new XMLHttpRequest();
    // } else if (window.ActiveXObject) {
    //     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    // }
	
    // return xhr;

    var xhr = null; 
	
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.createRequest) {
        xhr = window.createRequest();
    } else if (window.ActiveXObject) {
        try {
            xhr = new ActiveXObject("Msxm12.XMLHTTP");
        } catch (e){
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
        
    }
	
    return xhr;
} // end function getXHR()

//---------End function---------

//Reference: Schiller, C., Fogie, S., DeRodeff, C., & Gregg, M. (2011). Infosecurity 2008 threat analysis. Elsevier.