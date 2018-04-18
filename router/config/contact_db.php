<?php

function execute_sql_query($query)
{
	require("database.php");

	// echo "query : " . $query . "<br/>";
	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$SQL_QUERY = $conn->prepare($query);
	$SQL_QUERY->execute();
	$result = $SQL_QUERY->fetchAll();
	// print_r($result);
	$SQL_QUERY = null;
	$conn = null;
	return count($result) == 0 ? false : true;
}

function exec_sql_query($query)
{
	require("database.php");

	$conn = new PDO($DB_DSN, $DB_USER, $DB_PASS);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return ($conn->exec($query));
}

?>