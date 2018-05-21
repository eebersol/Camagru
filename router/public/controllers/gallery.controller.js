this.page = 0;


function getLikedPicture (callback) 
{
	let tabPathPicture 	= [];
	let tabObj 			= [];

	for (let i = 0; i < this.pictures.length; i++)
	{
		tabPathPicture.push(this.pictures[i].path);
		tabObj.push({'path':this.pictures[i].path,'count':0})
	}
	getData('/models/picture.model.php','?action=picture.get.page.like&&tabPath=' +tabPathPicture, 'GET', (data, error) => 
	{
		if (data)
		{
			for (let i = 0; i < data.length; i++)
			{
				let index = tabPathPicture.indexOf(data[i]['picture_path'])
				if (index != -1)
					tabObj[index].count++;
			}
		}
		getData('/models/picture.model.php', '?action=picture.get.page.comment&&tabPath='+tabPathPicture, 'GET', (data, err) => 
		{
			if (data)
			{
				for (let i = 0; i < data.length; i++)
				{
					let index = tabPathPicture.indexOf(data[i]['picture_path'])
					this.pictures[index].comments.push({'login':data[i].login,'text':data[i].comment, 'date':data[i]['posted_date']});
				}
			}
			callback();
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
		if (this.page < this.nbr_page - 1)
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
	displayMiniature(this.page, (data) => {
		getLikedPicture(() => { return ;});
	});
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

	galleryPagination.appendChild(create_div_pagination(-1, "<<"));

	if (this.nbr_page >= 11)
		galleryPagination.style.margin = '0 0 0 15%';
	for (let i = 0; i < this.nbr_page -1; i++)
 	{
 		iDiv = create_div_pagination(i, i.toString());
 		if (page == i)
 			iDiv.style.backgroundColor = "#BDBDBD";
    	galleryPagination.appendChild(iDiv);
 	}
 	galleryPagination.appendChild(create_div_pagination(66.66, ">>"));
}


function displayMiniature(page, callback)
{
	getData('/models/picture.model.php', '?action=picture.get.miniature&&page='+page, 'GET', (data) =>
	{
    	console.log("DATA : ", data)
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
				'description'	: data[j]['description'],
				'auteur'		: data[j]['auteur']
			}
			this.pictures.push(picture);
		}
		getData	('/models/picture.model.php', '?action=picture.get.totalPicture', 'GET', (data) =>
		{
			this.nbrPicture = data[0][0]-1;

			console.log("Il y a ", this.nbrPicture, 'images on peut mettre 9 images par page donc ', this.nbrPicture,'/ 9=', this.nbrPicture/9)
			console.log(this.nbrPicture/9, Math.round(this.nbrPicture/9))
			if (this.nbrPicture/9 > Math.round(this.nbrPicture/9))
				this.nbr_page = (this.nbrPicture/9)+1;
			else
				this.nbr_page = (this.nbrPicture/9)+1;
			console.log("Nombre de page : ", this.nbr_page, data[0][0]%9, data[0][0])
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
			callback();
		});
	}); 
}


function hoverHome(id, flag)
{
	let div 		= document.getElementById(id);
	if (flag == false)
		div.style.opacity = '1';
	else
		div.style.opacity = '0.5';
}
