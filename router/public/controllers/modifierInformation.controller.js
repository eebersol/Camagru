// MODIFIER MES INFORMATIONS //
function modifyInformationProfil()
{
	let email 				= document.getElementById("userProfilEmailInput");
	let login 				= document.getElementById("userProfilLoginInput");
	let passwd 				= document.getElementById("userProfilPasswdInput");

	if (passwd.value && !check_passwd(passwd.value))
		passwd.style.borderColor = '#F44336';
	else if (email.value && !validateEmail(email.value))
		email.style.borderColor = '#F44336';
	else if (login.value && login.value.length < 6)
		login.style.borderColor = '#F44336';
	else
	{
		let oldInformation = [this.user.email, this.user.login, this.user.passwd];
		let newInformation = [email.value, login.value, passwd.value];
		getData('/models/user.model.php', '?action=user.update.information&&oldInformation='+oldInformation+'&&newInformation='+newInformation, 'GET', (data) =>
		{
			let message 			= data;
			let successModifyDiv 	= document.getElementById("successModify");
			let successModifyText 	= document.getElementById("successModifyText");
			console.log(successModifyDiv)
			console.log(successModifyText)

			successModifyDiv.style.display 	= "block";
			successModifyText.textContent 	= message;

			if (data == "Informations modifiées.")
				successModifyDiv.style.backgroundColor = "#9CCC65";
			else
				successModifyDiv.style.backgroundColor = "#F44336";
			getUser();
			setTimeout(function(){ location.reload(); }, 1000);
		});
	}
}

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
/////////////////////////////////////