
function returnHome()
{
	location.reload()
}

function userProfil()
{
	let userProfilDiv 		= document.getElementById("userProfilDiv");
	let optionDiv 			= document.getElementById("optionDiv");

	userProfilDiv.style.display = "block";
	optionDiv.style.display 	= "none";
	getUserInformation();
}


function loadXMLSuccessLogin(email, login, passwd)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.login.php?success=true&&email='+email+'&&login='+login+'&&passwd='+passwd, false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			login_success(email, login, passwd, xhr.responseText);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function disconnect()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.disconnect.php?disconnect=true');
	xhr.onload= function() {
		if (xhr.status === 200) {
			location.reload()
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function getUserInformation()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?getInformation=true');
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			display_information(JSON.parse(xhr.responseText));
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function display_information(data)
{
	this.user 	= data;
	let email 	= document.getElementById("userProfilEmail");
	let login 	= document.getElementById("userProfilLogin");
	let passwd 	= document.getElementById("userProfilPasswd");

	email.textContent 	= this.user.email;
	login.textContent 	= this.user.login;
	passwd.textContent 	= "*******";
}

function userModifyProfil ()
{
	let email 	= document.getElementById("userProfilEmailInput");
	let login 	= document.getElementById("userProfilLoginInput");
	let passwd 	= document.getElementById("userProfilPasswdInput");

	let emailTmp;
	let loginTmp;
	let passwdTmp;
	

	if (!email.value)
		emailTmp = this.user.email
	else if(!validateEmail(email.value))
	{
		email.style.borderColor = 'red';
	}
	else
		emailTmp = email.value
	if (!login.value)
		loginTmp  = this.user.login
	else if (login.value.length < 6)
	{
		login.style.borderColor = 'red';
	}
	else
		loginTmp = login.value;
	if (!passwd.value)
		passwdTmp = this.user.passwd
	else
		passwdTmp = passwd.value



	let xhr 	= new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?refreshInformation=true&&login='+loginTmp+'&&email='+emailTmp+'&&passwd='+passwdTmp);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText)
				// display_success_modification();
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}
