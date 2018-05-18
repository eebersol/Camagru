function login_user()
{
	let login 		= document.getElementById("loginLogin");
	let passwd 		= document.getElementById("passwdLogin");

	if (!login.value || login.value.length < 6)
		login.style.borderColor = '#D32F2F';
	else if (!passwd.value || passwd.value.length < 6)
		passwd.style.borderColor = '#D32F2F';
	else
	{
		getData('/models/user.model.php', '?action=user.login&&login='+login.value+'&&passwd='+passwd.value, 'GET', (data) => 
		{
			if (data != "✘ login / mot de passe incorrect")
				resultSubscribeLogin(data, "login", false);
			else
				resultSubscribeLogin(data, "login", true);
		});
	}
}

function reinitPassword()
{
	let reinitPassword 				= document.getElementById("userReinitPassword");
	let loginDiv 					= document.getElementById("loginDiv");

	reinitPassword.style.display 	= "block";
	loginDiv.style.display 			= "none";
}
