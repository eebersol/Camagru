<html>
	<head>
		 <link rel="stylesheet" type="text/css" href="/css/home.css">
		 <link rel="stylesheet" type="text/css" href="/css/materialize_button.css">
		 <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
		 <script type="text/javascript" src="/controllers/home_controller.js"></script>
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

				<!-- ENTER -->
			      <div class="row">
			      	<section class="col-lg-12">
			      		<div id="enterDiv">
			            	<h1  id="enter" onclick="enter()">Entrer</h1>
			            </div> 
			        </section>
			      </div>

		      <!-- OPIONS -->
			      <div class="row" id="optionDiv">
			      	<section class="col-lg-12" >
			            	<h1 id="optionText" onclick="login()">Se connecter</h1>
			            	<h1 id="optionText" onclick="subscribe()">S'inscrire</h1>
			            	<h1 id="optionText" onclick="gallery();">Voir la gallerie</h1>
			          </section>
			      </div>


			      <!-- SUBSCRIBE -->
				<div class="row" id="subscribeDiv">
					<section  class="col-lg-12">
						<aside> <h1 id="mediumTitle">Inscription:</h1> </aside>
						<aside> 
							<div class="group">      
								<input name="email" type="text" required>
								<span class="highlight"></span>
								<span onclick="check_input('email')" class="bar"></span>
								<label >Email</label>
							</div>
						</aside>
						<aside >
							<div class="group">      
								<input name="login" type="text" required>
								<span class="highlight"></span>
								<span onclick="check_input('login')" class="bar"></span>
								<label >Login</label>
							</div>
						</aside>
						<aside >
							<div class="group">	
								<input name="passwd" type="text" required>
								<span class="highlight"></span>
								<span onclick="check_input('passwd')" class="bar"></span>
								<label>Mot de passe</label>
							</div>
						</aside>
						<aside >
							<div class="group">	
								<input name="passwdClone" type="text" required>
								<span class="highlight"></span>
								<span onclick="check_input('passwdClone')" class="bar"></span>
								<label>Mot de passe</label>
							</div>
						</aside>
						<aside >
							<input id="submitButton" type="submit" placeholder="password" onclick="create_user()">
						</aside>
					</section>
				</div>

		      	    <!-- LOGIN -->
				   	<div class="row" id="loginDiv">
				      	<section  class="col-lg-12">
			 				<aside >
				      			<h1 id="mediumTitle">Se connecter :</h1>
				      		</aside>
				            <aside >
				            	<div class="group">      
			      					<input id="loginLogin" name="login" type="text" required>
			      					<span class="highlight"></span>
			      					<span onclick="check_input('login')" class="bar"></span>
			      					<label>Login</label>
			    				</div>
				            </aside>
				            <aside >
						<div class="group">      
			      					<input id="passwdLogin" name="passwd" type="text" required>
			      					<span class="highlight"></span>
			      					<span onclick="check_input('passwd')" class="bar"></span>
			      					<label>Mot de passe</label>
			    				</div>
				            </aside>
				            <aside >
						<input id="submitButton" type="submit" placeholder="password" onclick="login_user()">
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

				<div id="successloginDiv"></div>
				<div id="failloginDiv"></div>
				<div id="successsubscribeDiv"></div>
				<div id="failsubscribeDiv"></div>

		    </div>


	</body>
	<footer class="row">
						<div class="col-lg-12">
							Pied de page
						</div>
					</footer> 
</html>
