<?php
// Grabs the URI and breaks it apart in case we have querystring stuff
session_start();
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);
// Route it up!
switch ($request_uri[0]) {
	// Home page
	case '/':
			require '../home.php';
		break;
	// About page
	case '/about':
		require '../views/about.php';
		break;
	case '/test':
		require '../views/test.php';
		break;
	case '/register';
		require '../views/register.php';
		break;
	case '/login';
		require '../views/login.php';
		break;
	case strpos('/verifier_email', $request_uri[0]);
		require '../views/verifier_email.php';
		break;
	case '/register_controller';
		require '../controllers/register_controller.php';
		break;
	case '/takePicture';
		require '../views/takePicture.html';
		break;

	// Everything else
	default:
		header('HTTP/1.0 404 Not Found');
		require '../views/404.php';
		break;
}