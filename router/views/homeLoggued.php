<html>
	<head>
		<?php session_start(); ?>
		 <link rel="stylesheet" type="text/css" href="/css/homeLoggued.css">
		 <link rel="stylesheet" type="text/css" href="/css/materialize_button.css">
		 <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
		 <script type="text/javascript" src="/controllers/home_controller.js"></script>
		 <script type="text/javascript" src="/controllers/homeLoggued_controller.js"></script>
	</head>

	<body>
			<div class="container">
			<!-- HEADER style="background-color: red" -->
				<header class="row">
				    <div class="col-lg-3">
				     		<img id="photoPicture" onclick="troll(1);" src="https://image.freepik.com/icones-gratuites/appareil-photo-avec-un-flash_318-60075.jpg">
				     		<img id="trollPicture" onclick="troll(2);" src="https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/310x190_tous-trolls">
				    </div>
					<div class="col-lg-9" id="titleDiv">
							<h1 id="title"  onclick="returnHome();">Camagru </h1>
					</div>
				</header>

		      <!-- OPIONS -->
			      <div class="row" id="optionDiv">
			      	<section class="col-lg-12" >
			            	<h1 id="optionText" onclick="userProfil()">Modifier mes informations</h1>
			            	<h1 id="optionText" onclick="gallery();">Parcourir la galerie</h1>
			            	<h1 id="optionText" onclick="disconnect();">Se déconnecter</h1>
			          </section>
			      </div>



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
							<input id="submitButton" type="submit" value="modifier mes informations" placeholder="password" onclick="userModifyProfil();">
						</aside>
					</section>
				</div>


				    <!-- GALLERIE PHOTO -->
					<div class="row" id="galleryDiv">
						<section  class="col-lg-12">
							<div id="galleryDivPicture"></div>
						</section>
						<div id="galleryPagination"></div>
					</div>


					<!-- VUE DETAILLEE -->
					<div class="container" id="zoomDiv">
						<div class="row" >
							<div  class="col" >
								<img id="zoomPicture">
							</div>
							<div class="col" >
								<div id="zoomComments"></div>
								<div id="zoomAddComments"></div>
							</div>
							<div class="w-100" ></div>
							<div class="col" >
								<div id="zoomDescription">
									<b>Description : </b>
									<p id="zoomDescriptionText"></p>
								<div>
							</div>
							<div class="col" >Column</div>
						</div>
					</div>
		    </div>


	</body>
	<footer class="row">
		<div class="col-lg-12">
			Pied de page
		</div>
	</footer> 
</html>
