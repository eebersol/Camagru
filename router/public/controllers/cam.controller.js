function takePicture()
{
	// References to all the element we will need.
	this.desirePosition 				= {};
	this.video 							= document.querySelector('#camera-stream');
	this.image 							= document.querySelector('#snap');
	this.start_camera					= document.querySelector('#start-camera');
	this.camera_stream					= document.querySelector('#camera-stream');
	this.controls 						= document.querySelector('.controls');
	this.take_photo_btn 				= document.querySelector('#take-photo');
	this.delete_photo_btn 				= document.querySelector('#delete-photo');
	this.download_photo_btn 			= document.querySelector('#download-photo');
	this.save_photo_btn 				= document.querySelector('#save-photo');
	this.error_message 					= document.querySelector('#error-message');
	this.filterListDiv 					= document.getElementById("filterListDiv");
	this.filterList 					= document.getElementById("filterList");
	this.oldPictureDiv					= document.getElementById("oldPicture");
	this.oldPicture						= document.getElementById("oldPicture");
	let takePictureDiv 					= document.getElementById("takePictureDiv");
	let optionDiv 						= document.getElementById("optionDivLogin");
	let uploadPictureDiv				= document.getElementById("uploadPicture");

	optionDiv.style.display 			= "none";
	takePictureDiv.style.display 		= "block";
	uploadPictureDiv.style.display 		= "block";
	this.filterListDiv.style.display	= "block";
	this.filterList.style.display   	= "block";
	this.oldPictureDiv.style.display	= "block";
	this.oldPicture.style.display		= "block";

	active_cam();
	active_event();
	display_filter();
	display_old_picture();
}

function getElementOffset() 
{
  let top = 0;
  let left = 0;
  let element = document.querySelector('#camera-stream');

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top,
    left,
  };
}

function get_position(e)
{
	let offset = getElementOffset()
	let relativeX = (e.pageX - offset.left);
	let relativeY = (e.pageY - offset.top);

  console.log("X: " + relativeX + "  Y: " + relativeY);

	if (this.currentFilter && this.currentFilter.src)
	{
  		this.desirePosition.x 	= relativeX - 150;
  		this.desirePosition.y 	= relativeY - 100;
  	}
}

function get_positionSnap(e)
{
	let offset = getElementOffset()
	let relativeX = (e.pageX - offset.left);
	let relativeY = (e.pageY - offset.top);

  console.log("X: " + relativeX + "  Y: " + relativeY);

	if (this.currentFilter && this.currentFilter.src && this.is_take == true)
	{
  		this.desirePosition.x 	= relativeX - 150;
  		this.desirePosition.y 	= relativeY - 100;
  	}
}


function check_info_picture ()
{
	this.name			= document.getElementById("namePicture");
	this.description	= document.getElementById("descriptionPicture");

		console.log("Name : ", this.name.value)
		if (this.name && this.name.value)
			this.name = this.name.value;
		else
			this.name = "random";
		if (this.description && this.description.value)
			this.description = this.description.value;
		else
			this.description = "";

		if (this.description.length > 100)
			this.description = this.description.substr(0, 100);

}

function refresh_picture(pic)
{
	init_context();
	this.imgPic 			= new Image ();
	this.imgPic.src 		= pic;
	this.imgPic.onload 	= () =>
	{
		if (this.width && this.height)
		{
			this.hidden_canvas.width 	= this.width;
			this.hidden_canvas.height 	= this.height;
			this.context.drawImage(this.imgPic, 0, 0, this.width, this.height);
			buildImage()
			showIUButton();
			this.video.pause();
		}
	}
}


function upload_picture()
{
	var file 			= document.getElementById("submitfile").files[0];
	var reader 			= new FileReader();
	reader.onloadend 	= () => { refresh_picture(reader.result);}
	if (file)
		reader.readAsDataURL(file);
}

function choose_filter(i)
{
	let div = document.getElementById(this.filter[i].split('.')[0])

	this.currentFilter = {
		'src'   : "ressources/filtre/" + this.filter[i],
		'name'  : this.filter[i],
		'index' : i,
		'width' : div.offsetWidth,
		'height': div.offsetHeight
	}
}

function draw_filter(src1)
{
	init_context();
	let imageObj1 		= new Image();
	let imageObj2 		= new Image();

	// if (!this.pictureTake)
	// 	this.take_photo_btn.click();
	imageObj1.src = src1
		imageObj1.onload = () =>
		{
			imageObj2.src = this.currentFilter.src;
			imageObj2.onload = () =>
			{
				let x = !this.desirePosition.x ? width/2 : this.desirePosition.x;
				let y = !this.desirePosition.y ? height/2 : this.desirePosition.y;

				console.log("Classic position : ", width/2, height/2)
				console.log("New position : ",  this.desirePosition.x,  this.desirePosition.y)
				this.context.drawImage(imageObj2, x, y, this.currentFilter.width, this.currentFilter.height);
				buildImage();
				showIUButton();
				this.is_take = true;
				this.video.pause();
			}
		};
}

function display_old_picture()
{
	getData('/models/picture.model.php', '?action=picture.get.userPicture&&login='+this.user.login, 'GET', (data) =>
	{
		console.log("Old Picture : ", data);
		if (data)
		{
			this.oldPicture = data;
			for (let i = 0; i < this.oldPicture.length; i++)
			{
				let picDiv 		= document.createElement("div");
				let picImg 		= document.createElement("img");
				let picName 	= this.oldPicture[i]['picture_path'];

				if (i == 0 || i < this.oldPicture.length)
					picDiv.style.padding	 = "1% 0 1% 15%";
				else
					picDiv.style.padding	 = "0 0 1% 15%";
				picDiv.setAttribute("id", picName.split('/')[picName.split('/').length] + 'i');
				
				picImg.setAttribute("src", picName);
				picImg.style.maxWidth	 = "200px";
				picImg.setAttribute("id", picName.split('.')[0]);

				document.getElementById("oldPicture").appendChild(picDiv);
				picDiv.appendChild(picImg);

			}
		}
		if (data.length == 0)
			setTimeout(function(){ alert("1. .Choississez un filtre.\n2.Cliquer une fois sur la camera pour choisirs l'emplacement\n3.Prenez une photo."); }, 2000);
	});
}

function display_filter () 
{
	getData('/models/picture.model.php', '?action=picture.get.filter', 'GET', (data) =>
	{
		if (data)
		{
			this.filter 		= data;
			for (let i = 0; i < this.filter.length; i++)
			{
				if (this.filter[i] != '.' && this.filter[i] != '..')
				{
					console.log(this.filter[i]);
					let filterDiv 	= document.createElement("div");
					let filterImg 	= document.createElement("img");
					let filterName 	= this.filter[i];

					if (i == 0 || i < this.filter.length)
						filterDiv.style.padding	 = "1% 0 1% 15%";
					else
						filterDiv.style.padding	 = "0 0 1% 15%";
					filterDiv.setAttribute("id", filterName.split('.')[0] + 'i');
					
					filterImg.setAttribute("src", "../ressources/filtre/" + filterName);
					filterImg.setAttribute("onclick", "choose_filter("+i+")");
					filterImg.style.maxWidth	 = "200px";
					filterImg.setAttribute("id", filterName.split('.')[0]);

					document.getElementById("filterList").appendChild(filterDiv);
					filterDiv.appendChild(filterImg);

					this.index 		= i;
				}
			}
		}
	});
}

function active_cam()
{
	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	if (navigator.getMedia)
	{
		// Request the camera.
		navigator.getMedia({video: true}, 
			(stream) => 
			{
				this.video.src = window.URL.createObjectURL(stream);
				this.video.play();
				this.video.onplay = function() { showVideo(); };

			},
			(err) => { displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
		});
	}
	else
		displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");

	// Mobile browsers cannot play video without user input,
	// so here we're using a button to start it manually.
}

function active_event()
{
	this.start_camera.addEventListener("click", (e) => 
	{
		e.preventDefault();
		this.video.play();
		showVideo();
	});

	this.take_photo_btn.addEventListener("click", (e) => 
	{
		e.preventDefault();
		// if (this.pictureTake)
		// 	this.delete_photo_btn.click();
		if (!this.pictureTake)
			this.pictureTake = takeSnapshot();
		draw_filter(this.pictureTake)
		// this.image.setAttribute('src', this.pictureTake);
		showIUButton()
		this.video.pause();
	});


	this.save_photo_btn.addEventListener("click", (e) => 
	{
		e.preventDefault();
		this.dataPost 		= new FormData();

		this.dataPost.append('login', this.user.login);
		this.dataPost.append('name', this.name);
		if (this.description == undefined)
			this.description = '';
		this.dataPost.append('description', this.description);
		this.dataPost.append('file', this.download_photo_btn.href)
		check_info_picture();
		getData('/models/picture.model.php', '', 'POST', (data) => {
		    let infoMessage 					= document.getElementById("infoMessage");
			let takePictureDiv					= document.getElementById("takePictureDiv");

			infoMessage.textContent 			= "Votre photo à été enregistré et publié."
			infoMessage.style.backgroundColor 	= "#9CCC65";
			infoMessage.style.display 			= "block";
			infoMessage.style.width 			= "50%";
			infoMessage.style.height 			= "auto";
			infoMessage.style.padding 			= "1% 0% 1% 0%";
			infoMessage.style.textAlign 		= "center";
			infoMessage.style.margin 			= "0 0 0 35%";
			takePictureDiv.style.margin 		= "5% 0 0 25%";
		    setTimeout(function(){ location.reload(); }, 500);
			});
	});

	this.delete_photo_btn.addEventListener("click", (e) =>
	{
		e.preventDefault();
		this.image.setAttribute('src', "");
		this.image.classList.remove("visible");
		this.delete_photo_btn.classList.add("disabled");
		this.download_photo_btn.classList.add("disabled");
		this.video.play();
	});
}

function takeSnapshot()
{
	init_context();

	if (this.width && this.height)
	{
		// Setup a canvas with the same dimensions as the video.
		this.hidden_canvas.width 	= this.width;
		this.hidden_canvas.height 	= this.height;
		// Make a copy of the current frame in the video on the canvas.
		this.context.drawImage(this.video, 0, 0, this.width, this.height);
		// Turn the canvas image into a dataURL that can be used as a src for our photo.
		return this.hidden_canvas.toDataURL('image/png');
	}
}
function init_context()
{
	this.hidden_canvas 			= document.querySelector('canvas');
	this.context 				= this.hidden_canvas.getContext('2d');
	this.width 					= this.video.videoWidth;
	this.height 				= this.video.videoHeight;
}

function buildImage()
{
	this.pictureTake = this.hidden_canvas.toDataURL("image/png");
	this.image.setAttribute('src', this.pictureTake);
	this.image.classList.add("visible");
	this.image.style.width = "90%";
	this.image.style.margin = "0 0 0 5%";
}

function showVideo()
{
	// Display the video stream and the controls.
	hideUI();
	this.video.classList.add("visible");
	this.controls.classList.add("visible");
}

function displayErrorMessage(error_msg, error)
{
	error = error || "";
	if (error)
		console.log(error);
	error_message.innerText = error_msg;
	hideUI();
	this.error_message.classList.add("visible");
}

function showIUButton()
{
	this.delete_photo_btn.classList.remove("disabled");
	this.save_photo_btn.classList.remove("disabled");
	this.download_photo_btn.classList.remove("disabled");
	this.download_photo_btn.href = this.pictureTake;
}

function hideUI()
{
	// Helper function for clearing the app UI.
	this.controls.classList.remove("visible");
	this.start_camera.classList.remove("visible");
	this.video.classList.remove("visible");
	this.snap.classList.remove("visible");
	this.error_message.classList.remove("visible");
}
