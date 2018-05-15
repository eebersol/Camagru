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
				'likes' 		: data[j]['nbr_like'],
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
	    	let id 			= 'picture-'+i
	    	iDiv.setAttribute('id', id)
	    	iDiv.setAttribute("src", this.pictures[i].path);
	    	iDiv.setAttribute("class", "galleryPicture");
			iDiv.setAttribute("width", "300");
			iDiv.setAttribute("onclick", "displayPicture("+i+");");
			iDiv.setAttribute("onmouseout", "hoverHome('"+id+"', false)")
			iDiv.setAttribute("onmouseover", "hoverHome('"+id+"', true)")
			iDiv.setAttribute("height", "200");
			galleryDivFPicture.appendChild(iDiv);
		}
		    makePagination(page);
	});
}


function hoverHome(id, flag)
{
	let div 		= document.getElementById(id);
	if (flag == false)
		div.style.opacity = '1';
	else
		div.style.opacity = '0.5';

	console.log(id.split('-')[1])
	console.log(this.pictures[id.split('-')[1]])
}
