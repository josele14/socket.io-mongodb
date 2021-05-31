<?php
	$servername = "localhost:3306";
	$database = "chatdb";
	$username = "root";
	$password = "";

	// Create & check connection
	$conn = new mysqli($servername, $username, $password, $database);
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error($conn));
	}

	// Pick up the data from the form
	$user = $_POST['username'];	
	$room = $_POST['room'];	
	$msg = $_POST['text'];	

    // Make query and send to database
	$query = "INSERT INTO room ('name', 'user', 'room') VALUES ('
        + $user + ' , ' + $room + ', ' + $msg + ')";
	$result = $conn->query($query);
	
    // Analyze response of database. Query inserted?
    if ($result === FALSE) {
        echo mysqli_error($conn);
    }
	
    // Make this script ends
    exit();
?>