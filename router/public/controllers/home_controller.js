
this.colorMaterialize = {
	'red' 			: '#EF5350',
	'pink'			: '#F48FB1',
	'purple'		: '#CE93D8',
	'blue'			: '#7986CB',
	'light-green'	: '#AED581',
	'yellow'		: '#FFF176',
	'orange'		: '#FFA726',
	'brown'			: '#A1887F',
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
	messageNode.style.fontWeight 	= "bold";
	infoMessage.style.display 		= "block";
	infoMessage.appendChild(messageNode);

	if (type == "login" && err == false)
		setTimeout(function(){ location.reload(); }, 1000);

}

// AJAX //

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
	let paras = document.getElementsByClassName(element);

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
		if (this.page <= this.nbr_page - 1)
		{
			this.page += 1;
		}
		else
			return;
	}
	else
		this.page = page;
	resetPage("galleryPaginationNumber");
	resetPage("galleryPicture");
	displayMiniature(this.page);
	getLikedPicture();
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

function makePagination(page)
{
	let galleryPagination 	= document.getElementById("galleryPagination");
 	this.nbr_page 			= Math.round(this.pictures.length/9);
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

function displayMiniature(page)
{
	loadXMLgetMiniature(page, (data, err) => 
	{
		this.pictures 				= [];
		let galleryDivFPicture 		= document.getElementById("galleryDivPicture");

		for (let j = 0; j < data.length;j++)
		{
			let picture = {
				'id' 			: data[j]['id'],
				'date' 			: data[j]['date_creation'],
				'likes' 		: data[j]['like_reference'],
				'comments'		: [],
				'category'		: data[j]['category'],
				'path'			: data[j]['picture_path'],
				'description'	: data[j]['description']
			}
			this.pictures.push(picture);

		}
	    
	    for (i = 0; i < this.pictures.length; i++)
	    {

	    	if (i >= this.pictures.length)
	    		break;
	    	let iDiv 		= document.createElement("IMG");
	    	iDiv.setAttribute("src", this.pictures[i].path);
	    	iDiv.setAttribute("class", "galleryPicture");
			iDiv.setAttribute("width", "300");
			iDiv.setAttribute("onclick", "displayPicture("+i+");");
			iDiv.setAttribute("height", "200");
			galleryDivFPicture.appendChild(iDiv);
	    }
	    makePagination(page);
	});
}

function loadXMLgetComments(page, callback)
{
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/picture.model.php?action=picture.get.comment&&page='+page+'', false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			if (xhr.responseText !== null)
				callback(JSON.parse(xhr.responseText));
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function loadXMLgetMiniature(page, callback)
{
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/picture.model.php?action=picture.get.miniature&&page='+page+'', false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			if (xhr.responseText !== null)
			{
				console.log(xhr.responseText);
				callback(JSON.parse(xhr.responseText));
			}
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}


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
				'liked'	: data['pic_reference'],
				'added' : data['pic_liked']
			},
			'notification' 	: {
				'like': data['notification_like'],
				'comment': data['notification_comment']
			}
		}

			getUserPictureLike((data, err) =>
			{
				if (data)
					this.user.picture.liked = data;
				return (this.user)
			});
		}
	});
}

function getUserPictureLike(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.get.picutre.like&&login='+this.user.login, false);
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
	xhr.open('GET', '/models/user.model.php?action=user.get.information', false);
	xhr.onload= function() {
		if (xhr.status === 200)
			callback(JSON.parse(xhr.responseText));
	};
	xhr.send();	
}

function gallery(lol)
{
	let optionDiv 				= document.getElementById("optionDiv");
	let galleryDiv 				= document.getElementById("galleryDiv");
	let page 					= 0;

	optionDiv.style.display 	= "none";
	galleryDiv.style.display 	= "block";

	displayMiniature(page);
	getLikedPicture();
	// getUser();
}



// VUE DETAILLE PHOTO //

function parse_comments(comments)
{
	if (comments)
	{
		let tmpObjTab 	= [];
		if (comments.search("&&") > 0)
		{
			let comment = comments.split("&&");

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
				'auteur':comments.split("||")[0] 	|| null,
				'text':comments.split("||")[1] 		|| null
			}
			tmpObjTab.push(obj_comment);
		}
		comments = tmpObjTab
		return (comments)
	}
	else
		return '';
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
	
	galleryDiv.style.display 		= "none";
	zoomDiv.style.display 			= "block";
	zoomPicture.style.width 		= "100%";
	zoomPicture.style.height 		= "auto";
	zoomPicture.setAttribute("src", this.pictures[index].path);
	this.currentPictureIndex 		= index;	

	if (this.pictures[index]['description'] != '')
	{
		let zoomDescription					= document.getElementById("zoomDescription");
		let zoomDescriptionText 			= document.getElementById("zoomDescriptionText");

		zoomDescription.style.display 		= "block";
		zoomDescriptionText.style.display 	= "inline-block";
		zoomDescriptionText.textContent 	= this.pictures[index]['description'];
	}

	if (this.pictures[index].comments.length > 0)
	{
		let zoomComments	= document.getElementById("zoomComments");
		let zoomAddComments = document.getElementById("zoomAddComments");

		zoomComments.style.margin = "9% 0 0 0";

		for (let i = 0; i < this.pictures[index].comments.length; i++)
		{
			let comment = this.pictures[index].comments[i];

			if (comment.login && comment.text)
			{
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

				if (this.user && this.user.login == comment.login)
					cellAuteur.textContent 		= "you :\xa0";
				else
					cellAuteur.textContent 		= comment.login + ":\xa0";
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
	}
	if (this.user && this.user.email)
	{
		let cellAddComment 		= document.createElement("div");
		let textareaComments 	= document.createElement("textarea");


		if (this.user.picture.liked.indexOf(this.pictures[this.currentPictureIndex].path) != -1)
			document.getElementById("liked").style.display = "block";
		else
			document.getElementById("no_like").style.display = "block";
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
		display_like()
	}

}

function getLikedPicture () 
{
	let tabPathPicture 	= [];
	let tabObj 			= [];

	for (let i = 0; i < this.pictures.length; i++)
	{
		tabPathPicture.push(this.pictures[i].path);
		tabObj.push({'path':this.pictures[i].path,'count':0})
	}
	XMLgetLikePage(tabPathPicture, (data, error) => 
	{
		if (data)
		{
			for (let i = 0; i < data.length; i++)
			{
				let index = tabPathPicture.indexOf(data[i]['picture_path'])
				tabObj[index].count++;
			}
		}
		XMLgetCommentPage(tabPathPicture, (data, err) => 
		{
			if (data)
			{
				for (let i = 0; i < data.length; i++)
				{
					let index = tabPathPicture.indexOf(data[i]['picture_path'])
					this.pictures[index].comments.push({'login':data[i].login,'text':data[i].comment});
				}
			}
		});
	});
}

function XMLgetLikePage(tab,  callback)
{
	let xhr 	= new XMLHttpRequest();
	xhr.open('GET', '/models/picture.model.php?action=picture.get.page.like&&tabPath='+tab, false);
	xhr.onload= function() {
		if (xhr.status === 200)
		{
			console.log('XMLgetLikePage : ', xhr.responseText)
			callback(JSON.parse(xhr.responseText));
		}
		else
			alert('Request failed.  Returned status of ' + xhr.status);
	};
	xhr.send();
}

function XMLgetCommentPage(tab,  callback)
{
	let xhr 	= new XMLHttpRequest();
	xhr.open('GET', '/models/picture.model.php?action=picture.get.page.comment&&tabPath='+tab, false);
	xhr.onload= function() {
		if (xhr.status === 200)
		{
			console.log("XMLgetCommentPage : ", xhr.responseText);
			callback(JSON.parse(xhr.responseText));
		}
	};
	xhr.send();
} 

function display_like (data)
{
	let liked 					= document.getElementById("liked");	
	let no_like 				= document.getElementById("no_like")

	if (this.user.picture.liked.indexOf(this.pictures[this.currentPictureIndex].path) != -1)
	{
		liked.style.display 	= "block";
		no_like.style.display 	= "none";
	}
	else
	{
		liked.style.display 	= "none";
		no_like.style.display 	= "block";
	}

}

