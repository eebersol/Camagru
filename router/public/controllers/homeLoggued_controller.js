

function returnHome()
{
	location.reload()
}



// ON LOAD //

function getUser()
{
	getUserInformations((data, err) => {
			this.user = {
			'id' 			: data[0]['id'],
			'email' 		: data[0]['email'],
			'login' 		: data[0]['login'],
			'passwd'		: data[0]['passwd'],
			'subscribeMail'	: data[0]['subscribe_email'],
			'tokenMail'		: data[0]['token_subscribe'],
			'picture'		: {
				'liked'	: [],
				'added' : data[0]['pic_liked']
			},
			'notification' 	: {
				'like': data[0]['notification_like'],
				'comment': data[0]['notification_comment']
			}
		}

		getUserPictureLike(function(data, err){
			for (let i = 0; i < data.length; i++)
				this.user.picture.liked.push(data[i].picture_path)
			return (this.user)
		});
	});
}

getUser();

////////////////////////


// MODIFIER MES INFORMATIONS //

function modifyInformation()
{
	let userProfilDiv 			= document.getElementById("userProfilDiv");
	let optionDiv 				= document.getElementById("optionDiv");
	let email 					= document.getElementById("userProfilEmail");
	let login 					= document.getElementById("userProfilLogin");
	let passwd 					= document.getElementById("userProfilPasswd");

	userProfilDiv.style.display = "block";
	optionDiv.style.display 	= "none";
	email.textContent 			= this.user.email;
	login.textContent 			= this.user.login;
	passwd.textContent 			= "*******";
}

function modifyInformationProfil ()
{
	let emailTmp;
	let loginTmp;
	let passwdTmp;
	let email 	= document.getElementById("userProfilEmailInput");
	let login 	= document.getElementById("userProfilLoginInput");
	let passwd 	= document.getElementById("userProfilPasswdInput");
	let xhr 	= new XMLHttpRequest();

	
	emailTmp 	= !email.value ? this.user.email 	: email.value;
	loginTmp 	= !login.value ? this.user.login 	: login.value;
	passwdTmp 	= !login.value ? this.user.passwd 	: passwd.value;
	
	if (!validateEmail(email.value))
		email.style.borderColor = 'red';
	else if (login.value.length < 6)
		login.style.borderColor = 'red';
	else
	{
		xhr.open('GET', '/models/user.informations.php?refreshInformation=true&&login='+loginTmp+'&&email='+emailTmp+'&&passwd='+passwdTmp);
		xhr.send();		
	}
}

/////////////////////////////////////

 						// AJAX //

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

function getUserPictureLike(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?getUserPicureLike=true&&login='+this.user.login, false);
	xhr.onload= function() {
		if (xhr.status === 200) 
			callback(JSON.parse(xhr.responseText));
		else
			alert('Request failed.  Returned status of ' + xhr.status);
	};
	xhr.send();	
}

function getUserInformations(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?getAllInformations=true', false);
	xhr.onload= function() {
		if (xhr.status === 200) 
			callback(JSON.parse(xhr.responseText));
		else
			alert('Request failed.  Returned status of ' + xhr.status);
	};
	xhr.send();	
}

///////////////////////////////////////////



///// LIKE PICTURE ///////////


function changeLikeIcon(id)
{
	if (id == "liked")
		document.getElementById("no_like").style.display = "none";
	else
		document.getElementById("liked").style.display 	= "none";
	document.getElementById(id).style.display 		= "block";
}
function likePicture() 
{
	let currentPicture 	= document.getElementById('zoomPicture');
	let path 			= '../' + currentPicture.src.substring(22, currentPicture.src.length);

	modifyLike("likePicture", path, (data, error) => {
			this.user.picture.liked.push(path);
			changeLikeIcon("liked");
	});
}

function unlikePicture() 
{
	let currentPicture 	= document.getElementById('zoomPicture');
	let path 			= '../' + currentPicture.src.substring(22, currentPicture.src.length);

	modifyLike("unLikePicture", path, (data, error) => {
		this.user.picture.liked.slice(this.user.picture.liked.indexOf(path), 1);
		changeLikeIcon("no_like");
	});


}


function modifyLike(type, path, callback)
{
	let xhr 			= new XMLHttpRequest();

	xhr.open('GET', '/models/user.informations.php?'+type+'=true&&login='+this.user.login+'&&path='+path);
	xhr.onload= function() {
		if (xhr.status === 200) {
			callback(xhr.responseText);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();	
}
/////////////////////////////

