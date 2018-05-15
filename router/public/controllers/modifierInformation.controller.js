// MODIFIER MES INFORMATIONS //

function modifyInformation()
{
	let userProfilDiv 			= document.getElementById("userProfilDiv");
	let optionDivLogin 			= document.getElementById("optionDivLogin");
	let email 					= document.getElementById("userProfilEmail");
	let login 					= document.getElementById("userProfilLogin");
	let passwd 					= document.getElementById("userProfilPasswd");

	userProfilDiv.style.display = "block";
	optionDivLogin.style.display 	= "none";
	email.textContent 			= this.user.email;
	login.textContent 			= this.user.login;
	passwd.textContent 			= "Mot de passe";
}

function modifyInformationProfil ()
{
	let 		emailTmp;
	let 		loginTmp;
	let 		passwdTmp;
	let email 	= document.getElementById("userProfilEmailInput");
	let login 	= document.getElementById("userProfilLoginInput");
	let passwd 	= document.getElementById("userProfilPasswdInput");
	let xhr 	= new XMLHttpRequest();

	emailTmp 	= email.value;
	loginTmp 	= login.value;
	passwdTmp 	= passwd.value;
	

	if (emailTmp && !validateEmail(emailTmp))
		email.style.borderColor = 'red';
	else if (loginTmp && loginTmp.length < 6)
		login.style.borderColor = 'red';
	else
	{
		let oldInformation = [this.user.email, this.user.login, this.user.passwd];
		let newInformation = [emailTmp, loginTmp, passwdTmp];
		xhr.open('GET', '/models/user.model.php?action=user.update.information&&oldInformation='+oldInformation+'&&newInformation='+newInformation, false);
		xhr.onload = function() 
		{ 
			if (xhr.status === 200)
			{
				let message 	= JSON.parse(xhr.responseText);
				let messageDiv 	= document.getElementsByClassName("infoMessage")[0];
				let messageText = document.getElementsByClassName("infoMessageText")[0];

				messageDiv.style.display 	= "block";
				messageText.textContent 	= message;

				if (JSON.parse(xhr.responseText) == "Informations modifiées.")
					messageDiv.style.backgroundColor = "#9CCC65";
				else
					messageDiv.style.backgroundColor = "#F44336";
				getUser();
				setTimeout(function(){ location.reload(); }, 1000);
			}
		};
		xhr.send();		
	}
}

/////////////////////////////////////

