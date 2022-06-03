<?php
// booking_php.php: add a new booking request to the database and return the result
header('Content-Type: text/xml');

// include the info that is required to connect to the database
require_once('sqlinfo.inc.php');

// The @ operator suppresses the display of any error messages
// mysqli_connect returns false if connection failed, otherwise a connection value
$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);

// Checks if connection is successful
if (!$conn) {
    // Displays an error message
    echo "<p>Connection failure</p>";
} else {
    // Upon successful connection
    // Get data from the form
    $cname = pre_process_form_data($_POST['cname']);
    $phone = pre_process_form_data($_POST['phone']);
    $unumber = pre_process_form_data($_POST['unumber']);
    $snumber = pre_process_form_data($_POST['snumber']);
    $stname = pre_process_form_data($_POST['stname']);
    $sbname = pre_process_form_data($_POST['sbname']);
    $dsbname = pre_process_form_data($_POST['dsbname']);
    $date = pre_process_form_data($_POST['date']);
	
	// Generate a unique random booking reference number
	do{
		$booking_reference_number = rand(1000000, 9999999);
		$checkSQL = "select * from $sql_table where booking_reference_number = '$booking_reference_number'";
		$checkResult = @mysqli_query($conn, $checkSQL);
	} while(@mysqli_num_rows($checkResult) !== 0);
	
	// Get the current date time of the server
	$booking_time = date("Y-m-d H:i:s");
	// Each new booking request has a initial booking status of 'unassigned' 
	$booking_status = "unassigned";

    // Set up the SQL command to add the data into the table
    $insertSQL = "insert into $sql_table"
            . "(cname, phone, unumber, snumber, stname, sbname, dsbname, date, booking_reference_number, booking_time, booking_status)"
            . "values"
            . "('$cname','$phone','$unumber', '$snumber', '$stname', '$sbname', '$dsbname', '$date', '$booking_reference_number', '$booking_time', '$booking_status')";

    // executes the query
    $result = @mysqli_query($conn, $insertSQL);

    // checks if the execution was successful
    if (!$result) {
        echo "<p>Something is wrong with ", $insertSQL, ", please check the values again.</p>";
    } else {
        // Upon successfully inserting into the table, return the XML to the client
        echo (toXML($booking_reference_number, $cname, $phone, $sbname, $dsbname, $date, $booking_time));
    }

    // close the database connection
    mysqli_close($conn);
}

// Validate and secure input data
function pre_process_form_data($data) {
    $data = trim($data);
    $data = stripcslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

// Construct a XML doc that is returned to the client
function toXML($bookingReferenceNumber, $customerName, $contactPhone, $pickUpSuburb, $destinationSuburb, $pickUpTime, $bookingTime) {
    $doc = new DomDocument('1.0');
    $bookings = $doc->createElement('bookings');
    $doc->appendChild($bookings);

    $booking = $doc->createElement('booking');
    $bookings->appendChild($booking);

    $booking_reference_number = $doc->createElement('booking_reference_number');
    $booking->appendChild($booking_reference_number);
    $value1 = $doc->createTextNode($bookingReferenceNumber);
    $booking_reference_number->appendChild($value1);

    $cname = $doc->createElement('cname');
    $booking->appendChild($cname);
    $value2 = $doc->createTextNode($customerName);
    $cname->appendChild($value2);

    $phone = $doc->createElement('phone');
    $booking->appendChild($phone);
    $value3 = $doc->createTextNode($contactPhone);
    $phone->appendChild($value3);

    $sbname = $doc->createElement('sbname');
    $booking->appendChild($sbname);
    $value4 = $doc->createTextNode($pickUpSuburb);
    $sbname->appendChild($value4);

    $dsbname = $doc->createElement('dsbname');
    $booking->appendChild($dsbname);
    $value5 = $doc->createTextNode($destinationSuburb);
    $dsbname->appendChild($value5);

    $date = $doc->createElement('date');
    $booking->appendChild($date);
    $value6 = $doc->createTextNode($pickUpTime);
    $date->appendChild($value6);
	
	$booking_time = $doc->createElement('booking_time');
    $booking->appendChild($booking_time);
    $value7 = $doc->createTextNode($bookingTime);
    $booking_time->appendChild($value7);

    $strXml = $doc->saveXML();

    return $strXml;
}
?>