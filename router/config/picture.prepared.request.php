<?php

function get_page($offset, $page)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	// $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('SELECT * FROM camagru.pictures ORDER BY id LIMIT ?, ?');		
	$SQL_QUERY->bindParam(1, $offset,PDO::PARAM_INT);
	$SQL_QUERY->bindParam(2, $page,PDO::PARAM_INT);
	$SQL_QUERY->execute();
	$result = $SQL_QUERY->fetchAll();
	return ($result);
}

function execute_sql_query_with_value($query)
{
	require("database.php");
	
	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare($query);
	$SQL_QUERY->execute();
	$result = $SQL_QUERY->fetchAll();
	$SQL_QUERY = null;
	$conn = null;
	return $result;
}

function get_picture_user($login) 
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT * FROM camagru.pictures WHERE auteur=?");
	$SQL_QUERY->execute([$login]);
	$result = $SQL_QUERY->fetchAll();
	return ($result);	
}
function get_picture_nbr()
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("SELECT COUNT(*) FROM camagru.pictures");
	$SQL_QUERY->execute();
	$result = $SQL_QUERY->fetchAll();
	return ($result);	
}
function add_picture($date, $category, $token, $description, $login)
{
	require("database.php");

	$conn 		= new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY 	= $conn->prepare('
			INSERT INTO camagru.pictures 
			(id, date_creation, category, picture_path, description, nbr_like, auteur) 
			VALUES 
			(0,  :date_create, :category, :token, :description, 0, :login)');
	$SQL_QUERY->bindValue(':login', $login, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':date_create', $date, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':category', $category, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':token', $token, PDO::PARAM_STR);
	$SQL_QUERY->bindValue(':description', $description, PDO::PARAM_STR);
	$SQL_QUERY->execute();
}


function delete_value($table, $key, $value)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare("DELETE FROM ? WHERE ?=?");
	$SQL_QUERY->execute([$table, $key, $value]);
	$result = $SQL_QUERY->fetchAll();
}

function delete_picture($login, $url)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare('DELETE FROM camagru.pictures WHERE auteur=? AND picture_path=?');
	$SQL_QUERY->execute([$login, $url]);
	$result = $SQL_QUERY->fetchAll();
}
?>
