<?php

function subscribe_mail($email, $login, $token, $ip)
{
	$subject = "[CAMAGRU] - Email verification";
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	$headers .= 'From: <eebersol@student.42.fr>' . "\r\n";
	$message = '
	<html>
		<head>
			<title>' . $subject . '</title>
		</head>
		<body>
			Hello ' . htmlspecialchars($login) . ' </br>
			To finalyze your subscribtion please click the link below </br>
			<a href="http://' . $ip . '/verify.php?token=' . $token . '">Verify my email</a>
		</body>
	</html>
	';
	mail($email, $subject, $message, $headers); 
}
?>