
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
	let subscribeDiv 				= document.getElementById("subscribeDiv");
	let successDiv 					= document.getElementById("successsubscribeDiv");
	let iDiv 						= document.createTextNode("✓ Bienvenu " + login + " votre compte a été créé, un email de vérification à été envoyé à l'adresse suivante : " + email + ".");
	
	subscribeDiv.style.display 		= "none";
	successDiv.style.display 		= "block";
	iDiv.id 						= 'successSubscribeTextHome';
	successDiv.appendChild(iDiv);
}

function subscription_fail(login, email)
{
	let subscribeDiv 				= document.getElementById("subscribeDiv");
	let failDiv 					= document.getElementById("failsubscribeDiv");
	let iDiv 						= document.createTextNode("✘ Cette adresse email est déja utilisé.");
	
	subscribeDiv.style.display 		= "none";
	failDiv.style.display 			= "block";
	iDiv.id 						= 'successSubscribeTextHome';
	failDiv.appendChild(iDiv);
}

function login_fail(login)
{
	let loginDiv 					= document.getElementById("loginDiv");
	let failDiv 					= document.getElementById("failloginDiv");
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
	let loginDiv 					= document.getElementById("loginDiv");
	let successDiv 					= document.getElementById("successloginDiv");
	let iDiv 						= document.createTextNode("Bienvenue " +response[0] + ".");
	
	loginDiv.style.display 			= "none";
	successDiv.style.display 		= "block";
	response 						= response.split(',');
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
	let enterDiv 			= document.getElementById("enterDiv");
	let optionDiv 			= document.getElementById("optionDiv");

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
	let optionDiv 				= document.getElementById("optionDiv");
	let subscribeDiv 			= document.getElementById("subscribeDiv");

	optionDiv.style.display 	= "none";
	subscribeDiv.style.display 	= "block";	
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

function loadXMLLogin(email, login, passwd, url)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.login.php?login=true&&login='+login+'&&passwd='+passwd, false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
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
	let optionDiv 				= document.getElementById("optionDiv");
	let loginDiv 				= document.getElementById("loginDiv");

	optionDiv.style.display 	= "none";
	loginDiv.style.display 		= "block";	
}

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



// GALLERY //

function resetPage(element)
{	
	var paras = document.getElementsByClassName(element);

	while(paras[0])
		paras[0].parentNode.removeChild(paras[0]);
}

function changePage(page)
{
	resetPage("galleryPaginationNumber");
	resetPage("galleryPicture");
	loadXMLgetImage(page);
}

function create_div_pagination(i, char)
{
	let iDiv = document.createElement("a");
	let page = document.createTextNode(char);
	iDiv.appendChild(page);
	iDiv.href = "#";
 	iDiv.setAttribute("class", "galleryPaginationNumber");
 	iDiv.setAttribute("onclick", "changePage("+i+");");
 	return (iDiv)
}

function make_pagination(length, page)
{
	let galleryPagination 	= document.getElementById("galleryPagination");
 	let nbr_page 			= Math.round(length/9);
 	let iDiv 				= create_div_pagination(0, "<<");

 	galleryPagination.appendChild(iDiv);
 	for (let i = 0; i < nbr_page; i++)
 	{
 		iDiv = create_div_pagination(i, i);
 		if (page == i)
 			iDiv.style.backgroundColor = "#BDBDBD";
    	galleryPagination.appendChild(iDiv);
 	}
 	iDiv = create_div_pagination("", ">>");
 	galleryPagination.appendChild(iDiv);

}

function parse_pictures(pictures, page)
{
	let galleryDivFPicture 		= document.getElementById("galleryDivPicture");
	let i 						= 0
    
    this.pictures = JSON.parse(pictures);
    if (page == 0)
    	i = 0;
    else
    	i = page * 10
    let limit = i + 9
    for (i; i < limit; i++)
    {
    	if (i >= pictures.length)
    		break;
    	let iDiv 		= document.createElement("IMG");
    	let category 	= this.pictures[i][4];
    	let path 		= this.pictures[i][5];
    	iDiv.setAttribute("src", path);
    	iDiv.setAttribute("class", "galleryPicture");
		iDiv.setAttribute("width", "300");
		iDiv.setAttribute("onclick", "displayPicture("+i+");");
		iDiv.setAttribute("height", "200");
		galleryDivFPicture.appendChild(iDiv);
    }
    make_pagination(pictures.length, page);
}

function loadXMLgetImage(page)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/picture.get.php?getImage=true&&page='+page+'', false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			if (xhr.responseText !== null)
			{
				parse_pictures(xhr.responseText, page);
				return xhr.responseText;
			}
			else if (xhr.responseText == null)
				console.log("FAIL")
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function set_user(data)
{
	this.user = JSON.parse(data)
}

function getUserInformation()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?getInformation=true');
	xhr.onload= function() {
		if (xhr.status === 200) {
			set_user(xhr.responseText);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function gallery(somethong)
{
	console.log(somethong);
	let optionDiv 				= document.getElementById("optionDiv");
	let galleryDiv 				= document.getElementById("galleryDiv");
	let page 					= 0;

	optionDiv.style.display 	= "none";
	galleryDiv.style.display 	= "block";


	loadXMLgetImage(page);
	getUserInformation();
}



// VUE DETAILLE PHOTO //

function parse_comments()
{
	let tmpTab 		= this.pictures;

	for (let i = 0; i < tmpTab.length; i++)
	{
		let tmpObjTab 	= [];
		if (tmpTab[i][3].search("&&") > 0)
		{
			let comment = tmpTab[i][3].split("&&");

			for (let j = 0; j < comment.length; j++)
			{
				let obj_comment = {
					'auteur':comment[j].split("||")[0] 	|| null,
					'text':comment[j].split("||")[1] 	|| null
				}
				tmpObjTab.push(obj_comment);
			}
		}
		else
		{
			let obj_comment = {
				'auteur':tmpTab[i][3].split("||")[0] 	|| null,
				'text':tmpTab[i][3].split("||")[1] 		|| null
			}
			tmpObjTab.push(obj_comment);
		}
		tmpTab[i][3] = tmpObjTab
	}
	this.pictures = tmpTab;
}

function add_comment ()
{
	let text 	= document.getElementById("textComment").value;
	let login 	= this.user.login;

	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?addComment=true&&auteur='+login+'&&text='+text);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			console.log("OK");
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function checkKey(event)
{
	let textComment = document.getElementById("textComment")
	let cellComment = document.getElementById("cellComment");

	if (textComment.value.length%35 == 0)
	{
		cellComment.style.height = (cellComment.offsetHeight + 20) + "px";
		textComment.style.height = (textComment.offsetHeight + 20) + "px";
	}
	if (event.keyCode === 13 && event.shiftKey === false) 
	{
		event.preventDefault();
		add_comment();
	}
	else if (event.keyCode === 13 && event.shiftKey === true)
		textComment.value = textComment.value + "\n";
}

function reducePolice ()
{
	let textComment = document.getElementById("textComment");

	textComment.style.lineHeight 	= "1em";
}

function displayPicture(index)
{
	let galleryDiv 					= document.getElementById("galleryDiv");
	let zoomDiv 					= document.getElementById("zoomDiv");	
	let zoomPicture 				= document.getElementById("zoomPicture");
	let user 						= getUserInformation();
	
	galleryDiv.style.display 		= "none";
	zoomDiv.style.display 			= "block";
	zoomPicture.style.width 		=	"100%";
	zoomPicture.style.height 		=	"auto";
	zoomPicture.setAttribute("src", this.pictures[index][5]);

	if (this.pictures[index][6] != '')
	{
		let zoomDescription					= document.getElementById("zoomDescription");
		let zoomDescriptionText 			= document.getElementById("zoomDescriptionText");

		zoomDescription.style.display 		= "block";
		zoomDescriptionText.style.display 	= "inline-block";
		zoomDescriptionText.textContent 	= this.pictures[index][6];
	}

	if (this.pictures[index][3] != '')
	{
		let zoomComments	= document.getElementById("zoomComments");
		let zoomAddComments = document.getElementById("zoomAddComments");

		parse_comments();

		for (let i = 0; i < this.pictures[index][3].length; i++)
		{
			let comment = this.pictures[index][3][i];
			if (comment.auteur && comment.text)
			{
				let comment 					= this.pictures[index][3][i];
				let cell						= document.createElement("div");
				let cellAuteur 					= document.createElement("p");
				let cellComments 				= document.createElement("p");

				cell.style.margin 				= "1% 0 0 0";
				cell.style.opcatity 			= "0.1";
				cell.style.borderRadius 		= "500px";
				cell.style.backgroundColor 		= "#BDBDBD";

				if (this.user.login == comment.auteur)
					cellAuteur.textContent 		= "you :\xa0";
				else
					cellAuteur.textContent 		= comment.auteur + ":\xa0";
				cellAuteur.style.display 		= "inline-block";
				cellAuteur.style.padding 		= "1% 0 0 25%";
				cellAuteur.style.fontWeight 	= "bold";
				cellAuteur.style.textAlign 		= "center";
				
				cellComments.textContent 		= comment.text;
				cellComments.style.display 		= "inline-block";
				cellAuteur.style.textAlign 		= "center";
			
				zoomComments.appendChild(cell);
				cell.appendChild(cellAuteur);
				cell.appendChild(cellComments);
			}
		}
		if (this.user.email)
		{
			let cellAddComment 		= document.createElement("div");
			let textareaComments 	= document.createElement("textarea");

			cellAddComment.style.margin 			= "6% 0 0 0";
			cellAddComment.style.borderRadius 		= "500px";
			cellAddComment.style.backgroundColor 	= "#BDBDBD";
			cellAddComment.setAttribute("id", "cellComment");

			textareaComments.style.width 			= '90%';
			textareaComments.style.margin 			= '3% 0 3% 5%';
			textareaComments.style.padding 			= "0 0 0 5%";
			textareaComments.style.backgroundColor 	= '#FAFAFA';
			textareaComments.style.textIndent 		= "0%";
			textareaComments.style.lineHeight		= "2.3em";
			textareaComments.setAttribute("id", "textComment");
			textareaComments.setAttribute("cols", "25");
			textareaComments.setAttribute("rows", "5");
			textareaComments.setAttribute("onkeypress", "checkKey(event);");
			textareaComments.setAttribute("onclick", "reducePolice();");
			textareaComments.setAttribute("placeHolder", "ajouter un commentaire ...");


			zoomAddComments.appendChild(cellAddComment);
			cellAddComment.appendChild(textareaComments);
		}
	}

}
