function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function check_input(name)
{
	if (document.getElementsByName(name)[0].style.borderColor == 'red')
		document.getElementsByName(name)[0].style.borderColor = 'grey';

}

function create_user()
{
	let email 		= document.getElementsByName("email")[0];
	let login 		= document.getElementsByName("login")[0];
	let passwd 		= document.getElementsByName("passwd")[0];
	let passwdClone = document.getElementsByName("passwdClone")[0];

	if (!email.value || !validateEmail(email.value))
		email.style.borderColor = 'red';
	else if (!login.value || login.value.length < 6)
		login.style.borderColor = 'red';
	else if (!passwdClone.value)
		passwdClone[0].style.borderColor = 'red';
	else if (!passwd.value || passwd.value.length < 6)
		passwd.style.borderColor = 'red';
	else if (passwd.value != passwdClone.value)
		passwd.style.borderColor = passwdClone.style.borderColor ='red';
	else 
		loadXMLSubscribe(email.value, login.value, passwd.value);
}

function resultSubscribeLogin (message, type, err)
{
	let infoMessage 				= document.getElementById("infoMessage");
	let loginDiv 					= document.getElementById("loginDiv");
	let subscribeDiv 				= document.getElementById("subscribeDiv");
	let messageNode 				= document.createElement("p");
	
	if (type == "login")
	{
		loginDiv.style.display = "none";
	}
	else if (type == "subscribe")
	{
		subscribeDiv.style.display = "none";
		if (err == false)
			infoMessage.style.height = "20%";
	}

	if (err == true)
		infoMessage.style.backgroundColor = "#F44336";
	else
		infoMessage.style.backgroundColor = "#9CCC65";

	messageNode.textContent 		= message;
	messageNode.style.fontSize 		= "2em"
	messageNode.style.textAlign		= "center";
	messageNode.style.padding 		= "3% 0 0 0";
	if (type == 'login')
		messageNode.style.padding 		= "1.5% 0 0 0"
	messageNode.style.fontWeight 	= "bold";
	infoMessage.style.display 		= "block";
	infoMessage.appendChild(messageNode);

	if (type == "login" && err == false)
		setTimeout(function(){ location.reload(); }, 1000);

}

function loadXMLSubscribe(email, login, passwd, url)
{
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.create&&email='+email+'&&login='+login+'&&passwd='+passwd, true);
	xhr.onload = function() 
	{
		if (xhr.status === 200) 
		{
			console.log("Subscribe : ", xhr.responseText)
 			if (JSON.parse(xhr.responseText) != "✘ Cette adresse email/login est déja utilisé.")
				resultSubscribeLogin(JSON.parse(xhr.responseText), "subscribe",  false);
			else
				resultSubscribeLogin(JSON.parse(xhr.responseText), "subscribe", true);
		}
	};
	xhr.send();
}
