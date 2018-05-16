
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
	console.log('ID : ', idMoreLess)
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
	moreLess.style.margin 	= "0 0 0 10%";

	comment.textContent  	= text;
	comment.style.wordWrap 	= "break-word";
	comment.style.display 	= "block";
	comment.style.padding 	= "0 5% 0 5%";

	cell.style.maxWidth 	= "400px";
	cell.style.height 		= 125 * text/45 + "px";
	cell.style.borderRadius = "40px";

	commentDiv.style.height = commentDiv.offsetHeight + 100 + "px"

}

function create_node_comment(login, text, i, date)
{
	if (login && text)
	{
		let cell						= document.createElement("div");
		let cellAuteur 					= document.createElement("p");
		let cellComments 				= document.createElement("p");
		let cellDate 					= document.createElement("p");
		let idDate						= 'date-'+i;
		let idComment 					= 'comment-'+i;
		let idAuteur 					= 'auteur-'+i;
		let idCell 						= 'cell-'+i;

		cell.style.margin 				= "1% 0 0 0";
		cell.style.opcatity 			= "0.1";
		cell.style.borderRadius 		= "500px";
		cell.style.backgroundColor 		= this.colorMaterialize[pickRandomColor()];

		if (this.user && this.user.login == login)
			cellAuteur.textContent 		= "you :\xa0";
		else
			cellAuteur.textContent 		= login + ":\xa0";
		cellAuteur.style.display 		= "inline-block";
		cellAuteur.style.padding 		= text.length > 30 ? "3% 0 0 5%" : "3% 0 0 25%"
		cellAuteur.style.fontWeight 	= "bold";
		cellAuteur.style.textAlign 		= "center";
		cellAuteur.setAttribute("id", idAuteur);
		
		cellComments.textContent 		= text.length > 30 ? text.substr(0, 30) : text;
		cellComments.style.display 		= "inline-block";
		cellComments.style.minWidth 	= "160px";
		cellComments.setAttribute("id", idComment );

		cellDate.textContent 			= "Posté le : "  + (!date ? this.pictures[this.currentPictureIndex].comments[i].date : "Maintenant ..");
		cellDate.style.fontSize 		= "0.7em";
		cellDate.style.display 			= "inline-block";
		cellDate.setAttribute("id", idDate);

		
		zoomComments.appendChild(cell);
		cell.appendChild(cellAuteur);
		cell.appendChild(cellComments);
		cell.appendChild(cellDate);
		cell.setAttribute("id", idCell);

		if (text.length > 30)
		{
			let more 				= document.createElement("a");
			let moreLess 			= document.createElement("a");


			more.textContent 		= " ... ";
			more.setAttribute("id", "moreMore-"+idComment.split('-')[1]);
			more.setAttribute("onclick", "commentSeeMore('"+idComment+"', '"+idAuteur+"', '"+idCell+"', '"+"moreMore-"+idComment.split('-')[1]+"', '"+"moreLess-"+idComment.split('-')[1]+"', '"+text+"');");
			cell.appendChild(more)

			moreLess.textContent	= " ... ";
			moreLess.style.display 	= 'none';
			moreLess.setAttribute("id", "moreLess-"+idComment.split('-')[1]);
			moreLess.setAttribute("onclick", "commentSeeLess('"+idComment+"', '"+idAuteur+"', '"+idCell+"', '"+"moreMore-"+idComment.split('-')[1]+"', '"+"moreLess-"+idComment.split('-')[1]+"');");
			cell.appendChild(moreLess)
		}
	}
}

function add_comment ()
{
	let text 	= document.getElementById("textComment").value;
	let login 	= this.user.login;
	let date 	= new Date("Y-m-d");

	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.add.comment&&text='+text+'&&picture='+this.pictures[this.currentPictureIndex].path, false);
	xhr.send();

		let len 	= this.pictures[this.currentPictureIndex].comments.length
		create_node_comment(login, text, this.pictures[this.currentPictureIndex].comments.length, date)
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
		this.pictures[this.currentPictureIndex].likes++;
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
		this.pictures[this.currentPictureIndex].likes--;
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
		let zoomDescriptionDate 			= document.getElementById("zoomDescriptionDate");
		let zoomDescriptionAuteur 			= document.getElementById("zoomDescriptionAuteur");

		zoomDescription.style.display 		= "block";

		zoomDescriptionText.style.display 	= "inline-block";
		zoomDescriptionText.textContent 	= this.pictures[index]['description'];


		zoomDescriptionAuteur.style.display 	= "inline-block";
		zoomDescriptionAuteur.textContent 	= this.pictures[index]['auteur'];

		zoomDescriptionDate.style.display 	= "inline-block";
		zoomDescriptionDate.style.fontSize  = "0.7em";
		zoomDescriptionDate.textContent 	= this.pictures[index].date ? this.pictures[index].date : new Date("Y-m-d");
	}
	if (this.user.login == this.pictures[index]['auteur'])
		document.getElementById("deleteImage").style.display = "block";
	if (this.pictures[index].comments.length > 0)
	{
		let zoomComments	= document.getElementById("zoomComments");
		let zoomAddComments = document.getElementById("zoomAddComments");

		zoomComments.style.margin = "24% 0 0 0";

		for (let i = 0; i < this.pictures[index].comments.length; i++)
			create_node_comment(this.pictures[index].comments[i].login, this.pictures[index].comments[i].text, i, null)
	}
	if (this.is_loggued === true)
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


function deleteImage()
{
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/picture.model.php?action=picture.delete&&login='+this.user.login+'&&url='+this.pictures[this.currentPictureIndex].path, false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			console.log("delete : ", xhr.responseText);
			if (xhr.responseText == 'true')
			{
				let infoMessage = document.getElementById("infoMessage");
				let zoomDiv 	= document.getElementById("zoomDiv");

				infoMessage.textContent 			= "Suppression réussie."
				infoMessage.style.backgroundColor 	= "#9CCC65";
				infoMessage.style.display 			= "block";
				infoMessage.style.width 			= "50%";
				infoMessage.style.height 			= "auto";
				infoMessage.style.padding 			= "1% 0% 1% 0%";
				infoMessage.style.textAlign 		= "center";
				infoMessage.style.margin 			= "0 0 0 35%";
				zoomDiv.style.margin 				= "5% 0 0 25%";
				setTimeout(function(){ location.reload(); }, 500);
			}
		}
	};
	xhr.send();

}