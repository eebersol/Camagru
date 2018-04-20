
<html>
	<head>
		 <link rel="stylesheet" type="text/css" href="/css/home.css">
		 <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		 <script type="text/javascript" src="/controllers/home_controller.js"></script>
	</head>

	<body>
		<div id="titleHome">
			<h1 id="titleTextHome" class="policeFamily" onclick="returnHome();">Camagru </h1> 
		</div>
		<!-- ENTER -->
		<div id="enterHome">
			<h1 id="enterTextHome" class="policeFamily" onclick="enter()">enter  </h1> 
		</div>
		<!-- END ENTER -->
		<!-- OPTIONS -->
		<div id="optionHome">
			<h1 id="optionInputHome" class="policeFamily" onclick="login()">Se connecter</h1>
			<h1 id="optionInputHome" class="policeFamily" onclick="subscribe()">S'enregister</h1>
			<h1 id="optionInputHome" class="policeFamily">Voir la gallerie</h1>
		</div>
		<!-- END OPTIONS -->
		<!-- LOGIN -->
		<div id="loginHome">
			<h1 id="loginTitleHome" class="policeFamily">Se connecter :</h1>
    		<input onclick="check_input('login')" class="form-control policeFamily" id="loginCell" name="loginLogin" type="text" placeholder="login">
    		<input onclick="check_input('passwd')" class="form-control policeFamily" id="loginCell" name="passwdLogin" type="text" placeholder="password">
    		<input class="form-control policeFamily" id="loginCell" type="submit" placeholder="password" onclick="login_user()">
		</div>
		<!-- END LOGIN -->
		<!-- LOGIN SUCESS -->
		<div id="successLoginHome"></div>
		<!-- END LOGIN SUCCESS -->
		<!-- LOGIN FAIL -->
		<div id="failLoginHome"></div>
		<!-- END LOGIN FAIL -->
		<!-- SUBSCRIBE -->
		<div id="subscribeHome">
			<h1 id="subscribeTitleHome" class="policeFamily">S'enregister :</h1>
    		<input onclick="check_input('email')" class="form-control policeFamily" id="subscribeCell" name="email" type="text" placeholder="email">
    		<input onclick="check_input('login')" class="form-control policeFamily" id="subscribeCell" name="login" type="text" placeholder="login">
    		<input onclick="check_input('passwd')" class="form-control policeFamily" id="subscribeCell" name="passwd" type="text" placeholder="password">
    		<input onclick="check_input('passwdClone')" class="form-control policeFamily" id="subscribeCell" name="passwdClone" type="text" placeholder="password">
    		<input class="form-control policeFamily" id="subscribeCell" type="submit" placeholder="password" onclick="create_user()">
		</div>
		<!-- END SUBSCRIBE -->
		<!-- SUBSCRIBE SUCESS -->
		<div id="successSubscribeHome"></div>
		<!-- END SUBSCRIBE SUCCESS -->
		<!-- SUBSCRIBE FAIL -->
		<div id="failSubscribeHome"></div>
		<!-- END SUBSCRIBE FAIL -->
		<!-- VIEW GALLERY -->
		<div id="failSubscribeHome"></div>
		<!-- END VIEW GALLERY -->
	</body>
</html>
