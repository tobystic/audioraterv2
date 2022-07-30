<?php

$user = 'root';
$pass = '';
$db = 'afrolingowebdb';

$db = new mysqli('localhost', $user, $pass, $db) or die("Username or Password is wrong. Unable to connect");


if(isset($_POST['fname'])){
// upload directory
	$filePath = 'uploads/' . $_POST['fname'];

// path to ~/tmp directory
	$fileName = $_FILES['data']['tmp_name'];
	$fileSize = $_FILES['data']['size'];
	$tempphid = basename($filePath,".mpeg3");
	$currentTime = date('Y-m-d H:i:s');
	$phid = substr($tempphid, -5);

// move file from ~/tmp to "uploads" directory
		if (move_uploaded_file($fileName, $filePath)) {

			$insert_path = "INSERT INTO audiotable(fileName,filePath,fileSize,phid,datetime) VALUES ('$fileName','$filePath','$fileSize','$phid','$currentTime')";
			$var=mysqli_query($db,$insert_path);
				} else "The file could not be uploaded. Contact admin";
		}
		
	mysqli_close($db);
?>

