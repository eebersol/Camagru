
function take_picture()
{
	let optionDiv 		= document.getElementById("optionHome");
	let takePictureDiv 	= document.getElementById("takePictureHome");

	takePictureDiv.style.display 	= "block";
	optionDiv.style.display 		= "none";
}

function troll(index)
{
	if (index == 1)
	{
		document.getElementById("picture").style.display = 'none'
		document.getElementById("pictureTroll").style.display = 'block'
	}
	else
	{
		document.getElementById("picture").style.display = 'block'
		document.getElementById("pictureTroll").style.display = 'none'
	}
}
function returnHome()
{
	location.reload()
}

function check_input(name)
{
	if (document.getElementsByName(name)[0].style.borderColor == 'red')
		document.getElementsByName(name)[0].style.borderColor = 'grey';

}

function subscription_success(login, email)
{
	let subscribeDiv 				= document.getElementById("subscribeHome");
	let successDiv 					= document.getElementById("successSubscribeHome");
	let iDiv 						= document.createTextNode("✓ Bienvenu " + login + " votre compte a été créé, un email de vérification à été envoyé à l'adresse suivante : " + email + ".");
	
	subscribeDiv.style.display 		= "none";
	successDiv.style.display 		= "block";
	iDiv.id 						= 'successSubscribeTextHome';
	successDiv.appendChild(iDiv);
}

function subscription_fail(login, email)
{
	let subscribeDiv 				= document.getElementById("subscribeHome");
	let failDiv 					= document.getElementById("failSubscribeHome");
	let iDiv 						= document.createTextNode("✘ Cette adresse email est déja utilisé.");
	
	subscribeDiv.style.display 		= "none";
	failDiv.style.display 			= "block";
	iDiv.id 						= 'successSubscribeTextHome';
	failDiv.appendChild(iDiv);
}

function login_fail(login)
{
	let loginDiv 					= document.getElementById("loginHome");
	let failDiv 					= document.getElementById("failLoginHome");
	let iDiv 						= document.createTextNode("✘ login / mot de passe incorrect");
	
	loginDiv.style.display 			= "none";
	failDiv.style.display 			= "block";
	iDiv.id 						= 'failLoginTextHome';
	failDiv.appendChild(iDiv);
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

function login_success(email, login, passwd, response)
{
	let loginDiv 					= document.getElementById("loginHome");
	let successDiv 					= document.getElementById("successLoginHome");
	
	loginDiv.style.display 			= "none";
	successDiv.style.display 		= "block";
	response = response.split(',');
	let iDiv 						= document.createTextNode("Bienvenue " +response[0] + ".");
	iDiv.id 						= 'successLoginTextHome';
	successDiv.appendChild(iDiv);
	setTimeout(function(){ location.reload(); }, 4000);
}


function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function enter()
{
	let enterDiv 			= document.getElementById("enterHome");
	let optionDiv 			= document.getElementById("optionHome");

	enterDiv.style.display 	= "none";
	optionDiv.style.display = "block";
}

function loadXMLSubscribe(email, login, passwd, url)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.create.php?create=true&&email='+email+'&&login='+login+'&&passwd='+passwd, false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log("TRUE 1 : " + xhr.responseText);
			if (xhr.responseText == "TRUE")
				subscription_success(login, email)
			else if (xhr.responseText == "FALSE")
				subscription_fail(login, email)
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function subscribe()
{
	let optionDiv 				= document.getElementById("optionHome");
	let subscribeDiv 			= document.getElementById("subscribeHome");

	optionDiv.style.display 	= "none";
	subscribeDiv.style.display 	= "block";	
}

function create_user()
{
	let email 		= document.getElementsByName("email")[0].value;
	let login 		= document.getElementsByName("login")[0].value;
	let passwd 		= document.getElementsByName("passwd")[0].value;
	let passwdClone = document.getElementsByName("passwdClone")[0].value;
	let flag 		= true;

	if (!email || !validateEmail(email))
	{
		flag = false;
		document.getElementsByName("email")[0].style.borderColor = 'red';
	}
	if (!login || login.length < 6)
	{
		flag = false;
		document.getElementsByName("login")[0].style.borderColor = 'red';
	}
	if (!passwdClone)
	{
		flag = false;
		document.getElementsByName("passwdClone")[0].style.borderColor = 'red';
	}
	if (!passwd || passwd.length < 6)
	{
		flag = false;
		document.getElementsByName("passwd")[0].style.borderColor = 'red';
	}
	if (passwd != passwdClone)
	{
		flag = false;
		document.getElementsByName("passwd")[0].style.borderColor = 'red';
		document.getElementsByName("passwdClone")[0].style.borderColor = 'red';
	}
	if (flag == true)
		loadXMLSubscribe(email, login, passwd);


}

function loadXMLLogin(email, login, passwd, url)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.login.php?login=true&&login='+login+'&&passwd='+passwd, false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			if (xhr.responseText == "TRUE")
			{
				loadXMLSuccessLogin(email, login, passwd);
			}
			else if (xhr.responseText == "FALSE")
				login_fail(login);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function login()
{
	let optionDiv 				= document.getElementById("optionHome");
	let loginDiv 				= document.getElementById("loginHome");

	optionDiv.style.display 	= "none";
	loginDiv.style.display 		= "block";	
}

function login_user()
{
	let login 		= document.getElementsByName("loginLogin")[0].value;
	let passwd 		= document.getElementsByName("passwdLogin")[0].value;
	let flag 		= true;

	if (!login || login.length < 6)
	{
		flag = false;
		document.getElementsByName("login")[0].style.borderColor = 'red';
	}
	if (!passwd || passwd.length < 6)
	{
		flag = false;
		document.getElementsByName("passwd")[0].style.borderColor = 'red';
	}
	if (flag == true)
		loadXMLLogin("", login, passwd)

}