<?php

$user = 'root';
$pass = '';
$db = 'afrolingowebdb';

$db = mysqli_connect('localhost', $user, $pass, $db) or die("Username or Password is wrong. Unable to connect");



if(isset($_POST)){
	$postData = json_decode(file_get_contents('php://input'), true);
	$sql = "SELECT filePath FROM audiotable WHERE phid = $postData[phrid]";
	$query = mysqli_query($db,$sql);
	
	if(mysqli_num_rows($query) == 1){
		$result = mysqli_fetch_row($query);
		echo json_encode([
			'status' =>  true,
			'url' => $result[0]
		]);
	}else{
		echo json_encode([
			'status' =>  false
		]);
	}
}
	
?>