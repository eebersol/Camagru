
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
	let optionDiv 				= document.getElementById("optionDiv");
	let loginDiv 				= document.getElementById("loginDiv");

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
	let i = 0
    
    pictures = JSON.parse(pictures);
    if (page == 0)
    	i = 0;
    else
    	i = page * 10
    let limit = i + 9
    console.log("Affice : [" + i + '-' + limit + ']');
    for (i; i < limit; i++)
    {
    	if (i >= pictures.length)
    		break;
    	console.log(pictures[i]);
    	let iDiv 		= document.createElement("IMG");
    	let category 	= pictures[i][4];
    	let path 		= pictures[i][5];
    	iDiv.setAttribute("src", path);
    	iDiv.setAttribute("class", "galleryPicture");
		iDiv.setAttribute("width", "300");
		iDiv.setAttribute("onclick", "loadXMLgetInfoImage('"+ pictures[i][5] +"')");
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

function loadXMLgetInfoImage(path)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/picture.get.php?oneImage=true&&path='+path+'', false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			if (xhr.responseText !== null)
			{
				open_pictures(JSON.parse(xhr.responseText));
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

function gallery()
{
	let optionDiv 				= document.getElementById("optionDiv");
	let galleryDiv 				= document.getElementById("galleryDiv");
	let page 					= 0;

	optionDiv.style.display 	= "none";
	galleryDiv.style.display 	= "block";


	loadXMLgetImage(page);
}

function open_pictures(data)
{
	let zoomDiv 					= document.getElementById("zoomDiv");
	let zoomDisplayPicture 			= document.getElementById("zoomDisplayPicture");
	let zoomDisplayDecription 			= document.getElementById("zoomDisplayDescription");
	let galleryDiv 					= document.getElementById("galleryDiv");
	
	galleryDiv.style.display 		= "none";
	zoomDiv.style.display 			= "block";

	let picture 					= document.createElement("IMG");
	picture.setAttribute("src", data[0][5]);
	zoomDisplayPicture.appendChild(picture);

	let description 				= document.createElement("p");
	let descriptionText 			= document.createTextNode("Description : " + data[0][6]);
	description.style.float = "right";
	description.appendChild(descriptionText);
	zoomDisplayDescription.appendChild(description)




	// let iDiv 						= document.createElement("IMG");
	// iDiv.setAttribute("src", data[0][5]);
	// iDiv.setAttribute("width", "500");
	// iDiv.setAttribute("height", "500");
	// zoomDisplay.appendChild(iDiv)

	// let description = document.createTextNode(data[0][6]);
	// zoomDisplayDescription[0].value = "TOTO"
	// zoomDisplayDescription.appendChild(description);

}


