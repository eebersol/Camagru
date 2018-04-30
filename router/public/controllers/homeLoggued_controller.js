
function returnHome()
{
	location.reload()
}



// ON LOAD //

function getUser()
{
	getUserInformations((data, err) => 
	{
		if (data)
		{
			this.user = {
				'id' 			: data['id'],
				'email' 		: data['email'],
				'login' 		: data['login'],
				'passwd'		: data['passwd'],
				'subscribeMail'	: data['subscribe_email'],
				'tokenMail'		: data['token_subscribe'],
				'picture'		: {
					'liked'	: [],
					'added' : data['pic_liked']
				},
				'notification' 	: {
					'like': data['notification_like'],
					'comment': data['notification_comment']
				}
			}
		}

		getUserPictureLike((data, err) =>
		{
			if (data)
			{
				for (let i = 0; i < data.length; i++)
					this.user.picture.liked.push(data[i].picture_path)
			}
			return (this.user);
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

	emailTmp 	= email.value
	loginTmp 	= login.value
	passwdTmp 	= passwd.value
	

	if (emailTmp && !validateEmail(emailTmp))
		email.style.borderColor = 'red';
	else if (loginTmp && loginTmp.length < 6)
		login.style.borderColor = 'red';
	else
	{
		let oldInformation = [this.user.email, this.user.login, this.user.passwd];
		let newInformation = [emailTmp, loginTmp, passwdTmp];
		xhr.open('GET', '/models/user.model.php?action=user.update.information&&oldInformation='+oldInformation+'&&newInformation='+newInformation, false);
		xhr.onload= function() { if (xhr.status === 200) getUser(); };
		xhr.send();		
	}
}

/////////////////////////////////////

 						// AJAX //

function disconnect()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.disconnect', true);
	xhr.onload= function() {
		if (xhr.status === 200) {
			location.reload()
		}
	};
	xhr.send();
}

function getUserPictureLike(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.get.picture.like', false);
	xhr.onload= function() {
		if (xhr.status === 200)
		{
			console.log("getUserPictureLike : ", xhr.responseText);
			callback(JSON.parse(xhr.responseText));
		}
	};
	xhr.send();	
}

function getUserInformations(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.get.information', false);
	xhr.onload= function() {
		if (xhr.status === 200) 
			console.log("Get Information : ", xhr.responseText);
			callback(JSON.parse(xhr.responseText));
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

	modifyLike("user.update.like", path, (data, error) => 
	{
			this.user.picture.liked.push(path);
			changeLikeIcon("liked");
	});
}

function unlikePicture() 
{
	let currentPicture 	= document.getElementById('zoomPicture');
	let path 			= '../' + currentPicture.src.substring(22, currentPicture.src.length);

	modifyLike("user.update.unlike", path, (data, error) => 
	{
		if (this.user.picture.liked.indexOf(path)+1 == this.user.picture.liked.length)
			this.user.picture.liked.pop()
		else
			this.user.picture.liked.slice(this.user.picture.liked.indexOf(path), 1);
		changeLikeIcon("no_like");
	});


}


function modifyLike(type, path, callback)
{
	let xhr 			= new XMLHttpRequest();

	xhr.open('GET', '/models/user.model.php?action='+type+'&&login='+this.user.login+'&&path='+path);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log("modifyLike : ", xhr.responseText);
			callback(xhr.responseText);
		}
	};
	xhr.send();	
}

function add_comment ()
{
	let text 	= document.getElementById("textComment").value;
	let login 	= this.user.login;

	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.add.comment&&text='+text+'&&picture='+this.pictures[this.currentPictureIndex].path, false);
	xhr.send();
}

function checkKey(event)
{
	let textComment = document.getElementById("textComment")
	let cellComment = document.getElementById("cellComment");

	if (textComment.value.length > 21)
	{
		textComment.style.padding 		= "3% 1% 1% 3%";
		textComment.style.lineHeight 	= "1em";
	}
	if (event.keyCode === 13 && event.shiftKey === false) 
	{
		event.preventDefault();
		add_comment();
	}
	else if (event.keyCode === 13 && event.shiftKey === true)
		textComment.value = textComment.value + "\n";
}

///////////////////////////// AJAX ////////////////////////







