<?php
// admin_php.php: select all the qulified booking requests and return the result as XML document
header('Content-Type: text/xml');

// include the info that is required to connect to the database
require_once('sqlinfo.inc.php');

// The @ operator suppresses the display of any error messages
// mysqli_connect returns false if connection failed, otherwise a connection value
$conn = @mysqli_connect($sql_host, $sql_user, $sql_pass, $sql_db);

// Checks if connection is successful
if (!$conn) {
    // Displays an error message
    echo "<p>Database connection failure</p>";
} else {
    // Set up the SQL command to select all the qualified rows
    $sql = "SELECT * FROM $sql_table WHERE date > NOW() AND date < NOW() + INTERVAL 2 HOUR AND booking_status = 'unassigned'";

    // executes the query
    $resultSet = @mysqli_query($conn, $sql);

    // checks if the execution was successful
    if (!$resultSet) {
        echo "<p>Something is wrong with ", $sql, ", please check the values again.</p>";
    } else {
		// Upon successfully selecting rows from the table, return the XML to the client
        echo (toXML($resultSet));
    }

    // close the database connection
    mysqli_close($conn);
}

// Construct a XML doc that is returned to the client
function toXML($resultSet) {
    $doc = new DomDocument('1.0');
    $bookings = $doc->createElement('bookings');
    $doc->appendChild($bookings);

	$row = mysqli_fetch_assoc($resultSet);
	
	// Iterate each row in the result set and construct the XML using the values in the row.
	// If $row is not beyond the last row in the result set, then execute the statements in the while loop.
	while ($row) {
		$booking = $doc->createElement('booking');
		$bookings->appendChild($booking);
		
		$booking_reference_number = $doc->createElement('booking_reference_number');
		$booking->appendChild($booking_reference_number);
		$value1 = $doc->createTextNode($row["booking_reference_number"]);
		$booking_reference_number->appendChild($value1);
	
		$cname = $doc->createElement('cname');
		$booking->appendChild($cname);
		$value2 = $doc->createTextNode($row["cname"]);
		$cname->appendChild($value2);
	
		$phone = $doc->createElement('phone');
		$booking->appendChild($phone);
		$value3 = $doc->createTextNode($row["phone"]);
		$phone->appendChild($value3);
	
		$sbname = $doc->createElement('sbname');
		$booking->appendChild($sbname);
		$value4 = $doc->createTextNode($row["sbname"]);
		$sbname->appendChild($value4);
	
		$dsbname = $doc->createElement('dsbname');
		$booking->appendChild($dsbname);
		$value5 = $doc->createTextNode($row["dsbname"]);
		$dsbname->appendChild($value5);
	
		$date = $doc->createElement('date');
		$booking->appendChild($date);
		$value6 = $doc->createTextNode($row["date"]);
		$date->appendChild($value6);
		
		// Move the row pointer to the next row
		$row = mysqli_fetch_assoc($resultSet);
	}

    $strXml = $doc->saveXML();

    return $strXml;
}
?>