<?php

function reinit_password_user($token_passwd, $email)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("UPDATE users SET passwd=:passwd WHERE email=:email");
	$SQL_QUERY->bindValue(':passwd', $token_passwd, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':email', $email, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}

function email_user($login)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT email FROM users WHERE login=?");
	$SQL_QUERY->execute([$login]);
	$result = $SQL_QUERY->fetchAll();
	return ($result);
}

function login_get_user($subscribe_email, $login, $passwd)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT * FROM users WHERE subscribe_email=? AND login=? AND passwd=?");
	$SQL_QUERY->execute([$subscribe_email, $login, $passwd]);
	$result = $SQL_QUERY->fetchAll();
	return ($result[0]);
}

function add_user($login, $email, $passwd, $token)
{
	require("database.php");

	$conn 		= new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY 	= $conn->prepare('
			INSERT INTO
			users (id, email, login, passwd, subscribe_email, token_subscribe, pic_reference, pic_liked, notification_like, notification_comment) 
			VALUE (0, :email, :login, :passwd, 1, :token, "", "", 1, 1)');
	$SQL_QUERY->bindValue(':login', $login, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':email', $email, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':passwd', $passwd, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':token', $token, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}

function user_is_subscribe_email($value)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT * FROM users WHERE email=?");
	$SQL_QUERY->execute([$value]);
	$result = $SQL_QUERY->fetchAll();
	return ($result);
}

function user_is_subscribe_login($value)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT * FROM users WHERE login=?");
	$SQL_QUERY->execute([$value]);
	$result = $SQL_QUERY->fetchAll();
	return ($result);
}

function update_database_likes($new_value, $old_value)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("UPDATE likes SET login=:login WHERE login=:oldLogin");
	$SQL_QUERY->bindValue(':login', $new_value, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':oldLogin', $old_value, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}

function update_database_comments($new_value, $old_value)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("UPDATE comments SET login=:login WHERE login=:oldLogin");
	$SQL_QUERY->bindValue(':login', $new_value, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':oldLogin', $old_value, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}


function update_database_pictures($new_value, $old_value)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("UPDATE pictures SET auteur=:login WHERE auteur=:oldLogin");
	$SQL_QUERY->bindValue(':login', $new_value, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':oldLogin', $old_value, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}


function update_user($login, $email, $passwd, $old_email)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('UPDATE users SET login=:login, email=:email, passwd=:passwd WHERE email=:oldEmail');
	$SQL_QUERY->bindValue(':login', $login, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':email', $email, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':passwd', $passwd, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':oldEmail', $old_email, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}

function remove_like($login, $path)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('DELETE FROM likes WHERE login=? AND picture_path=?');
	$SQL_QUERY->execute([$login, $path]);
	return ($result);
}

function add_like ($login, $path)
{
	require("database.php");

	$conn 		= new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY 	= $conn->prepare('INSERT INTO likes (id, login, picture_path) VALUES (:id, :login, :pathPicture)');
	$SQL_QUERY->bindValue(':id', 0, PDO::PARAM_INT);
	$SQL_QUERY->bindValue(':login', $login, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':pathPicture', $path, PDO::PARAM_STR);
	$reult 		= $SQL_QUERY->execute();
	return ($result);
}

function is_like($login, $path)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT * FROM likes WHERE login=? AND picture_path=?");
	$SQL_QUERY->execute([$login, $path]);
	$result = $SQL_QUERY->fetchAll();
	return ($result);
}


function increase_like($picture_path)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('UPDATE pictures SET nbr_like = nbr_like + 1 WHERE picture_path=?');
	$SQL_QUERY->execute([$picture_path]);
}

function decrease_like($picture_path)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('UPDATE pictures SET nbr_like = nbr_like - 1 WHERE picture_path=?');
	$SQL_QUERY->execute([$picture_path]);
}

function user_get_picture_like($login)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('SELECT picture_path FROM likes WHERE login=?');
	$SQL_QUERY->execute([$login]);
	$result = $SQL_QUERY->fetchAll();
	return ($result);
}

function add_comment($login, $text, $path, $date)
{
	require("database.php");

	$conn 		= new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY 	= $conn->prepare('INSERT INTO comments (id, login, comment, picture_path, posted_date) VALUE (0, :login, :textComment, :pathPicture, :dateComment)');
	$SQL_QUERY->bindValue(':login', $login, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':textComment', $text, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':pathPicture', $path, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':dateComment', $date, PDO::PARAM_STR);
	$reult 		= $SQL_QUERY->execute();
	return ($result);
}
?>
