function login_user()
{
	let login 		= document.getElementById("loginLogin");
	let passwd 		= document.getElementById("passwdLogin");

	if (!login.value || login.value.length < 6)
		login.style.borderColor = '#D32F2F';
	else if (!passwd.value || passwd.value.length < 6)
		passwd.style.borderColor = '#D32F2F';
	else
		loadXMLLogin("", login.value, passwd.value)
}

function loadXMLLogin(email, login, passwd, url)
{
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '/models/user.model.php?action=user.login&&login='+login+'&&passwd='+passwd, false);
	xhr.onload = function() 
	{
		if (xhr.status === 200) 
		{
			console.log("Se conecter : ", xhr.responseText)
			if (JSON.parse(xhr.responseText) != "✘ login / mot de passe incorrect")
				resultSubscribeLogin(JSON.parse(xhr.responseText), "login", false);
			else
				resultSubscribeLogin(JSON.parse(xhr.responseText), "login", true);
		}
	};
	xhr.send();
}
