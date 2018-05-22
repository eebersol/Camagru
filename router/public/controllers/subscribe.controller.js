
function check_input(id)
{	
	console.log("Id : ", id );
	console.log(document.getElementById(id).style)
	if (document.getElementById(id).style.borderColor == "rgb(244, 67, 54)")
		document.getElementById(id).style.borderColor = 'grey';
}

function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function check_passwd(passwd)
{
	let re  		= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return re.test(String(passwd).toLowerCase());
}


function create_user()
{
	let email 		= document.getElementsByName("email")[0];
	let login 		= document.getElementsByName("login")[0];
	let passwd 		= document.getElementsByName("passwd")[0];
	let passwdClone = document.getElementsByName("passwdClone")[0];

	if (!email.value || !validateEmail(email.value))
		email.style.borderColor = '#F44336';
	else if (!login.value || login.value.length < 6)
		login.style.borderColor = '#F44336';
	else if (!passwdClone.value)
		passwdClone[0].style.borderColor = '#F44336';
	else if (!passwd.value || !check_passwd(passwd.value))
		passwd.style.borderColor = '#F44336';
	else if (passwd.value != passwdClone.value)
		passwd.style.borderColor = passwdClone.style.borderColor ='#F44336';
	else 
	{
		getData('/models/user.model.php', '?action=user.create&&email='+email.value+'&&login='+login.value+'&&passwd='+passwd.value, 'GET', (data) => {
			console.log('data : ', data)
			if (data != "✘ Cette adresse email/login est déja utilisé.")
				resultSubscribeLogin(data, "subscribe",  false);
			else
				resultSubscribeLogin(data, "subscribe", true);
		})
	}
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
