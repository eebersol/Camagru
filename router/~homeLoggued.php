<html>
	<head>
		 <link rel="stylesheet" type="text/css" href="/css/homeLoggued.css">
		 <link rel="stylesheet" type="text/css" href="/css/materialize_button.css">
		 <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
		 <script type="text/javascript" src="/controllers/homeLoggued_controller.js"></script>
	</head>

	<body>
			<div class="container">
			<!-- HEADER style="background-color: red" -->
			<?php require("views/includes/header.inc.html"); ?>

		      <!-- OPIONS -->
			  <?php require("views/includes/option.inc.html"); ?>



			      <!-- MES INFORMATIONS -->
				<div class="row" id="userProfilDiv">
					<section  class="col-lg-12">
						<aside> <h1 id="mediumTitle">Mes informations : </h1> </aside>
						<aside >
							<div class="group">      
								<input id="userProfilLoginInput"  name="login" type="text" required>
								<span class="highlight"></span>
								<span class="bar"></span>
								<label id="userProfilLogin">Login</label>
							</div>
						</aside>
						<aside> 
							<div class="group">      
								<input id="userProfilEmailInput" name="email" type="text" required>
								<span class="highlight"></span>
								<span class="bar"></span>
								<label id="userProfilEmail" style="display: inline-block;">Email</label>
							</div>
						</aside>
						<aside >
							<div class="group">	
								<input id="userProfilPasswdInput" name="passwd" type="text" required>
								<span class="highlight"></span>
								<span class="bar"></span>
								<label id="userProfilPasswd">Mot de passe</label>
							</div>
						</aside>
						<aside >
							<input id="submitButton" type="submit" value="modifier mes informations" placeholder="password" onclick="modifyInformationProfil();">
						</aside>
					</section>
				</div>


				    <!-- GALLERIE PHOTO -->
					<div  class="row" id="galleryDiv">
						<section  id="filtered" class="col">
							<b class="filter" onclick="filter('mostLike');">. Les plus liké</b>
							<b class="filter" onclick="filter('myLike');">. Vos likes</b>
							<br/>
							<b class="filter" onclick="filter('myLike');">. Les plus vues</b>
							<b class="filter" onclick="filter('myLike');">. Les nouveautées</b>
							<br/>
							<b class="filter" onclick="filter('myLike');">. All</b>
							<b class="filter" onclick="filter('myLike');">. Mes photos</b>
						</section>
						<section  class="col-lg-12">
							<div id="galleryDivPicture"></div>
						</section>
						<div id="galleryPagination"></div>
					</div>

					<!-- VUE DETAILLEE -->
					<div class="container" id="zoomDiv">
						<div class="row" >
							<div class="col" >
								<div id="zoomDescription">
									<b>Description : </b>
									<p id="zoomDescriptionText"></p>
									<img id="zoomPicture">
								</div>
								</div>
								<div class="col">
									<div id="zoomComments"></div>
									<div id="zoomAddComments"></div>
								</div>
								<div class="w-100"></div>
								<div class="col">
									<img id="liked" onclick="unlikePicture() ;" src="/ressources/images/liked.svg">
									<img id="no_like" onclick="likePicture();" src="/ressources/images/no_like.svg">
								</div>
							</div>
						</div>
		   		 	</div>


	</body>
	<footer class="container row">
		<div class="col-lg-12">
			<img id="photoDisconnect" src="/ressources/images/disconnect.png" onclick="disconnect();">
		</div>
	</footer> 
	<?php require("views/includes/script.inc.html"); ?>
</html>
