
this.colorMaterialize = {
	'red' 			: '#F44336',
	'pink'			: '#F48FB1',
	'purple'		: '#9C27B0',
	'deep-purple'	: '#7E57C2',
	'indigo'		: '#5C6BC0',
	'blue'			: '#7986CB',
	'light-blue'	: '#4FC3F7',
	'cyan'			: '#4DD0E1',
	'teal'			: '#80CBC4',
	'light-green'	: '#AED581',
	'green'			: '#81C784',
	'lime'			: '#DCE775',
	'yellow'		: '#FFEE58',
	'amber'			: '#FFCA28',
	'orange'		: '#FFA726',
	'brown'			: '#8D6E63',
	'grey'			:'#BDBDBD'
};

function pickRandomColor()
{
	let result;
	let count = 0;
	for (let prop in this.colorMaterialize)
		if (Math.random() < 1/++count)
			result = prop;
	return result;
}

function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

function resultSubscribeLogin (message, type, err)
{
	let infoMessage 				= document.getElementById("infoMessage");
	let loginDiv 					= document.getElementById("loginDiv");
	let subscribeDiv 				= document.getElementById("subscribeDiv");
	let messageNode 				= document.createElement("p");
	
	if (type == "login")
		loginDiv.style.display = "none";
	else if (type == "subscribe")
		subscribeDiv.style.display = "none";

	if (type == "subscribe" && err == false)
		infoMessage.style.height = "20%";
	if (err == true)
		infoMessage.style.backgroundColor = "#F44336";
	else
		infoMessage.style.backgroundColor = "#9CCC65";

	messageNode.textContent 		= message;
	messageNode.style.fontSize 		= "2em"
	messageNode.style.textAlign		= "center";
	messageNode.style.padding 		= "3% 0 0 0";
	messageNode.style.fontWeight 	= "bold";
	infoMessage.style.display 		= "block";
	infoMessage.appendChild(messageNode);

	if (type == "login" && err == false)
		setTimeout(function(){ location.reload(); }, 1000);

}

// AJAX //

function loadXMLSuccessLogin(email, login, passwd)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.login.php?success=true&&email='+email+'&&login='+login+'&&passwd='+passwd, false);
	xhr.onload = function() {
		if (xhr.status === 200)
			resultSubscribeLogin("Bienvenue " + login + " !", "login", false);
		else
			alert('Request failed.  Returned status of ' + xhr.status);
	};
	xhr.send();
}

function loadXMLSubscribe(email, login, passwd, url)
{
	console.log("BOOOM")
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.create.php?create=true&&email='+email+'&&login='+login+'&&passwd='+passwd, false);
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText)
			if (xhr.responseText == "TRUE")
			{
				console.log("1");
				resultSubscribeLogin("✓ Bienvenu " + login + " votre compte a été créé, un email de vérification à été envoyé à l'adresse suivante : " + email + ".", "subscribe", false);
			}
			else if (xhr.responseText == "FALSE")
			{
				console.log("2");
				resultSubscribeLogin("✘ Cette adresse email/login est déja utilisé.", "subscribe", true);
			}
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function loadXMLLogin(email, login, passwd, url)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.login.php?login=true&&login='+login+'&&passwd='+passwd, false);
	xhr.onload = function() {
		if (xhr.status === 200) {
			if (xhr.responseText == "TRUE")
				loadXMLSuccessLogin(email, login, passwd);
			else if (xhr.responseText == "FALSE")
				resultSubscribeLogin("✘ login / mot de passe incorrect", "login", true);
		}
		else
			alert('Request failed.  Returned status of ' + xhr.status);
	};
	xhr.send();
}


/////////////////////////////

function enter()
{
	let enterDiv 			= document.getElementById("enterDiv");
	let optionDiv 			= document.getElementById("optionDiv");

	enterDiv.style.display 	= "none";
	optionDiv.style.display = "block";
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
	if (this.page === undefined)
		this.page = 0;
	if (page == -1)
	{
		if (this.page < 1)
			return ;
		else
			this.page = this.page - 1;
	}
	else if (page == 66.66)
	{
		if (this.page < this.nbr_page - 1)
			this.page += 1;
		else
			return;
	}
	else
		this.page = page;
	resetPage("galleryPaginationNumber");
	resetPage("galleryPicture");
	loadXMLgetImage(this.page);
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
 	this.nbr_page 			= Math.round(length/9);
 	let iDiv 				= create_div_pagination(-1, "<<");

 	galleryPagination.appendChild(iDiv);
 	for (let i = 0; i < nbr_page; i++)
 	{
 		iDiv = create_div_pagination(i, i);
 		if (page == i)
 			iDiv.style.backgroundColor = "#BDBDBD";
    	galleryPagination.appendChild(iDiv);
 	}
 	iDiv = create_div_pagination(66.66, ">>");
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
    	if (i >= this.pictures.length)
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
    make_pagination(this.pictures.length, page);
}

function loadXMLgetImage(page)
{
	console.log("PAGE ::", page)
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
	xhr.open('GET', '/models/user.informations.php?addComment=true&&auteur='+login+'&&text='+text+'&&photoUrl='+this.currentPicture);
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

	if (textComment.value.length > 21)
	{
		textComment.style.padding = "3% 1% 1% 3%";
		textComment.style.lineHeight = "1em";
	}
	if (event.keyCode === 13 && event.shiftKey === false) 
	{
		event.preventDefault();
		add_comment();
	}
	else if (event.keyCode === 13 && event.shiftKey === true)
		textComment.value = textComment.value + "\n";
}

function commentSeeLess(idComment, idAuteur, idCell, idMoreMore, idMoreLess)
{
	let commentDiv 			= document.getElementById("zoomComments")
	let comment 			= document.getElementById(idComment);
	let cell 				= document.getElementById(idCell);
	let lessMore			= document.getElementById(idMoreLess);
	let moreMore			= document.getElementById(idMoreMore);
	let more 				= document.createElement("a");

	lessMore.style.display 	= "none";
	moreMore.style.display 	= "inline-block";
	comment 				= this.oldCommentProperty.comment;
	comment.style.padding 	= "0"
	comment.style.display 	= "inline-block";
	cell					= this.oldCommentProperty.cell;
	commentDiv				= this.oldCommentProperty.commentDiv;

	more.textContent 		= " ... "
	more.setAttribute("id", "moreMore-"+idComment.split('-')[1]);
	more.setAttribute("onclick", "commentSeeMore('"+idComment+"', '"+idAuteur+"', '"+idCell+"', '"+"moreMore-"+idComment.split('-')[1]+"',  '"+"moreLess-"+idComment.split('-')[1]+"', '"+comment.textContent+"');");
	comment.appendChild(more)
	comment.textContent 	= this.oldCommentProperty.text.substr(0, this.oldCommentProperty.text.length - 4);
	
}


function commentSeeMore(idComment, idAuteur, idCell, idMoreMore, idMoreLess, text)
{
	let commentDiv 	= document.getElementById("zoomComments")
	let comment 	= document.getElementById(idComment);
	let auteur 		= document.getElementById(idAuteur);
	let cell 		= document.getElementById(idCell);
	let moreMore 	= document.getElementById(idMoreMore);
	let moreLess 	= document.getElementById(idMoreLess);


	this.oldCommentProperty = {
		'comment' 	: comment,
		'cell'		: cell,
		'commentDiv': commentDiv,
		'text' 		: comment.textContent,
		'auteur'	: auteur

	};

	moreMore.style.display 	= "none";
	moreLess.style.display 	= "inline-block";
	moreLess.style.margin 	= "0 0 0 80%";

	comment.textContent  	= text;
	comment.style.wordWrap 	= "break-word";
	comment.style.display 	= "block";
	comment.style.padding 	= "0 5% 5% 5%";

	cell.style.maxWidth 	= "400px";
	cell.style.height 		= 125 * text/45 + "px";
	cell.style.borderRadius = "40px";

	commentDiv.style.height = commentDiv.offsetHeight + 100 + "px"

}


function displayPicture(index)
{
	let galleryDiv 					= document.getElementById("galleryDiv");
	let zoomDiv 					= document.getElementById("zoomDiv");	
	let zoomPicture 				= document.getElementById("zoomPicture");
	let user 						= getUserInformation();
	
	galleryDiv.style.display 		= "none";
	zoomDiv.style.display 			= "block";
	zoomPicture.style.width 		= "100%";
	zoomPicture.style.height 		= "auto";
	zoomPicture.setAttribute("src", this.pictures[index][5]);
	this.currentPicture 			= this.pictures[index][5];
	this.pictureLike 				= getLikedPicture();

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
		zoomComments.style.margin = "9% 0 0 0";

		for (let i = 0; i < this.pictures[index][3].length; i++)
		{
			let comment = this.pictures[index][3][i];
			if (comment.auteur && comment.text)
			{
				let comment 					= this.pictures[index][3][i];
				let cell						= document.createElement("div");
				let cellAuteur 					= document.createElement("p");
				let cellComments 				= document.createElement("p");
				let idComment 					= 'comment-'+i;
				let idAuteur 					= 'auteur-'+i;
				let idCell 						= 'cell-'+i;

				cell.style.margin 				= "1% 0 0 0";
				cell.style.opcatity 			= "0.1";
				cell.style.borderRadius 		= "500px";
				cell.style.backgroundColor 		= this.colorMaterialize[pickRandomColor()];

				if (this.user.login == comment.auteur)
					cellAuteur.textContent 		= "you :\xa0";
				else
					cellAuteur.textContent 		= comment.auteur + ":\xa0";
				cellAuteur.style.display 		= "inline-block";
				cellAuteur.style.padding 		= comment.text.length > 30 ? "3% 0 0 5%" : "3% 0 0 25%"
				cellAuteur.style.fontWeight 	= "bold";
				cellAuteur.style.textAlign 		= "center";
				cellAuteur.setAttribute("id", 'auteur-'+i);
				
				cellComments.textContent 		= comment.text.length > 30 ? comment.text.substr(0, 30) : comment.text;
				cellComments.style.display 		= "inline-block";
				cellComments.setAttribute("id", 'comment-'+i);

				
				zoomComments.appendChild(cell);
				cell.appendChild(cellAuteur);
				cell.appendChild(cellComments);
				cell.setAttribute("id", 'cell-'+i);

				if (comment.text.length > 30)
				{
					let more 				= document.createElement("a");
					let moreLess 			= document.createElement("a");


					more.textContent 		= " ... ";
					more.setAttribute("id", "moreMore-"+idComment.split('-')[1]);
					more.setAttribute("onclick", "commentSeeMore('"+idComment+"', '"+idAuteur+"', '"+idCell+"', '"+"moreMore-"+idComment.split('-')[1]+"', '"+"moreLess-"+idComment.split('-')[1]+"', '"+comment.text+"');");
					cell.appendChild(more)

					moreLess.style.display 	= 'none';
					moreLess.setAttribute("id", "moreLess-"+idComment.split('-')[1]);
					moreLess.setAttribute("onclick", "commentSeeLess('"+idComment+"', '"+idAuteur+"', '"+idCell+"', '"+"moreMore-"+idComment.split('-')[1]+"', '"+"moreLess-"+idComment.split('-')[1]+"');");
					cell.appendChild(moreLess)
				}
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

			textareaComments.style.border 			= 'none';
			textareaComments.style.width 			= '90%';
			textareaComments.style.margin 			= '3% 0 3% 5%';
			textareaComments.style.padding 			= "0 0 0 5%";
			textareaComments.style.backgroundColor 	= '#FAFAFA';
			textareaComments.style.textIndent 		= "0%";
			textareaComments.style.lineHeight		= "2.3em";
			textareaComments.setAttribute("id", "textComment");
			textareaComments.setAttribute("maxlength", "100");
			textareaComments.setAttribute("cols", "20");
			textareaComments.setAttribute("rows", "2");
			textareaComments.setAttribute("onkeypress", "checkKey(event);");
			textareaComments.setAttribute("placeHolder", "ajouter un commentaire ...");


			zoomAddComments.appendChild(cellAddComment);
			cellAddComment.appendChild(textareaComments);
		}
	}

}

function getLikedPicture () 
{
	console.log("ICI : " + this.currentPicture)
	let xhr 	= new XMLHttpRequest();
	xhr.open('GET', '/models/user.informations.php?getLikedPicture=true&&login='+this.user.login+'&&picturePath='+this.currentPicture);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log(xhr.responseText)
			display_like(xhr.responseText);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function display_like (data)
{
	let liked 					= document.getElementById("liked");	
	let no_like 				= document.getElementById("no_like")
	if (data == 'like')
	{
		this.picturesLike = this.user.login + "&&";
		console.log(this.picturesLike.includes(this.user.login + '&&'))
	}
	else
	{
		this.pictureLike 			= JSON.parse(data);
		this.picturesLike 			= this.pictureLike[0]['like_reference']
	}
	if (this.picturesLike.includes(this.user.login + '&&'))
	{
		liked.style.display 	= "block";
		no_like.style.display 	= "none";
	}

}

function likePicture() 
{
	if (this.user)
	{
		let xhr 	= new XMLHttpRequest();
		xhr.open('GET', '/models/user.informations.php?unLikePicture=true&&login='+this.user.login+'&&picturePath='+this.currentPicture);
		xhr.onload= function() {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
				display_like("like");
			}
			else {
				alert('Request failed.  Returned status of ' + xhr.status);
			}
		};
		xhr.send();
	}
	else
		return;
}

function unlikePicture() 
{
	console.log("ICICICICICCI");
	if (this.user)
	{
		let xhr 	= new XMLHttpRequest();
		xhr.open('GET', '/models/user.informations.php?unLikePicture=true&&login='+this.user.login+'&&picturePath='+this.currentPicture);
		xhr.onload= function() {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
			}
			else {
				alert('Request failed.  Returned status of ' + xhr.status);
			}
		};
		xhr.send();
	}
	else
		return;
}
