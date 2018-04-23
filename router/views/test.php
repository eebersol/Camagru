<html>
	<head>
		 <link rel="stylesheet" type="text/css" href="/css/home_test.css">
		 <link rel="stylesheet" type="text/css" href="/css/materialize_button.css">
		 <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
		 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
		 <script type="text/javascript" src="/controllers/home_controller.js"></script>
	</head>

	<body>

		<div class="container">

		<!-- HEADER -->
			<header class="row">
			    <div class="col-lg-4">
			     	<img id="picture" onclick="troll(1);" src="https://image.freepik.com/icones-gratuites/appareil-photo-avec-un-flash_318-60075.jpg">
			     	<img id="pictureTroll" onclick="troll(2);" src="https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/310x190_tous-trolls">
			    </div>
				<div id="titleHome" class="col-lg-8">
					<h1 id="titleTextHome" class="policeFamily" onclick="returnHome();">Camagru </h1> 
				</div>
			</header>

			<!-- ENTER -->
		      <div class="row" id="enterHome">
		      	<section class="col-lg-12">
		            <aside>
		            	<h1 id="enterTextHome" class="policeFamily" onclick="enter()">Entrer</h1> 
		            </aside>
		         </section>
		      </div>

	      <!-- OPYIONS -->
		      <div class="row" id="optionHome">
		      	<section class="col-lg-12">
		            <aside >
		            	<h1 id="optionInputHome" class="policeFamily" onclick="login()">Se connecter</h1>
		            </aside>
		            <aside >
		            	<h1 id="optionInputHome" class="policeFamily" onclick="subscribe()">S'inscrire</h1>
		            </aside>
		            <aside >
		            	<h1 id="optionInputHome" class="policeFamily">Voir la gallerie</h1>
		            </aside>
		          </section>
		      </div>


		      <!-- SUBSCRIBE -->
		      <div class="row">
		      	<section  id="subscribeHome" class="col-lg-6">
		      	 	<aside >
		            	<h1 id="subscribeTitleHome" class="policeFamily">Inscription:</h1>
		            </aside>
		            <aside >
		             <!-- <input onclick="check_input('email')" class="form-control policeFamily" id="subscribeCell" name="email" type="text" placeholder="email"> -->
			            <div class="group" id="subscribeCell">      
	      					<input name="email" type="text" required>
	      					<span class="highlight"></span>
	      					<span onclick="check_input('email')" class="bar"></span>
	      					<label >Email</label>
	    				</div>
		            </aside>
		            <aside >
		             <!-- <input onclick="check_input('login')" class="form-control policeFamily" id="subscribeCell" name="login" type="text" placeholder="login"> -->
			            <div class="group" id="subscribeCell">      
		      					<input name="login" type="text" required>
		      					<span class="highlight"></span>
		      					<span onclick="check_input('login')" class="bar"></span>
		      					<label >Login</label>
		    			</div>
		            </aside>
		            <aside >
		              <!-- <input onclick="check_input('passwd')" class="form-control policeFamily" id="subscribeCell" name="passwd" type="text" placeholder="password"> -->
			            <div class="group" id="subscribeCell">      
		      					<input name="passwd" type="text" required>
		      					<span class="highlight"></span>
		      					<span onclick="check_input('passwd')" class="bar"></span>
		      					<label>Mot de passe</label>
		    			</div>
		            </aside>
		            <aside >
		              <!-- <input onclick="check_input('passwdClone')" class="form-control policeFamily" id="subscribeCell" name="passwdClone" type="text" placeholder="password"> -->
		              <div class="group" id="subscribeCell">      
	      					<input name="passwdClone" type="text" required>
	      					<span class="highlight"></span>
	      					<span onclick="check_input('passwdClone')" class="bar"></span>
	      					<label>Mot de passe</label>
	    				</div>
		            </aside>
		            <aside >
		             	<input class="form-control policeFamily" id="subscribeCellSubmit" type="submit" placeholder="password" onclick="create_user()">
		            </aside>
		          </section>
		      </div>

	      	    <!-- LOGIN -->
			   	<div class="row" >
			      	<section   id="loginHome" class="col-lg-6">
		 				<aside >
			      			<h1 id="loginTitleHome" class="policeFamily">Se connecter :</h1>
			      		</aside>
			            <aside >
			            	<!-- <input onclick="check_input('login')" class="form-control policeFamily" id="loginCell" name="loginLogin" type="text" placeholder="login"> -->
			            	<div class="group" id="loginCell">      
		      					<input name="login" type="text" required>
		      					<span class="highlight"></span>
		      					<span onclick="check_input('login')" class="bar"></span>
		      					<label>Login</label>
		    				</div>
			            </aside>
			            <aside >
			             <!-- <input onclick="check_input('passwd')" class="form-control policeFamily" id="loginCell" name="passwdLogin" type="text" placeholder="password"> -->
			             	<div class="group" id="loginCell">      
		      					<input name="passwd" type="text" required>
		      					<span class="highlight"></span>
		      					<span onclick="check_input('passwd')" class="bar"></span>
		      					<label>Mot de passe</label>
		    				</div>
			            </aside>
			            <aside >
			             <input class="form-control policeFamily" id="loginCellSubmit" type="submit" placeholder="password" onclick="login_user()">
			            </aside>
			          </section>
			    </div>



			   	<footer class="row">
        			<div class="col-lg-12">
         	 			Pied de page
        			</div>
    			</footer>
		    
	    </div>


		<div id="successLoginHome"></div>
		<div id="failLoginHome"></div>
		<!-- END LOGIN FAIL -->
		<!-- SUBSCRIBE -->
<!-- 		<div id="subscribeHome">
			<h1 id="subscribeTitleHome" class="policeFamily">S'enregister :</h1>
    		<input onclick="check_input('email')" class="form-control policeFamily" id="subscribeCell" name="email" type="text" placeholder="email">
    		<input onclick="check_input('login')" class="form-control policeFamily" id="subscribeCell" name="login" type="text" placeholder="login">
    		<input onclick="check_input('passwd')" class="form-control policeFamily" id="subscribeCell" name="passwd" type="text" placeholder="password">
    		<input onclick="check_input('passwdClone')" class="form-control policeFamily" id="subscribeCell" name="passwdClone" type="text" placeholder="password">
    		<input class="form-control policeFamily" id="subscribeCell" type="submit" placeholder="password" onclick="create_user()">
		</div> -->
		<!-- END SUBSCRIBE -->
		<!-- SUBSCRIBE SUCESS -->
		<div id="successSubscribeHome"></div>
		<!-- END SUBSCRIBE SUCCESS -->
		<!-- SUBSCRIBE FAIL -->
		<div id="failSubscribeHome"></div>
		<!-- END SUBSCRIBE FAIL -->
		<!-- VIEW GALLERY -->
		<!-- END VIEW GALLERY -->


	</body>
</html>
