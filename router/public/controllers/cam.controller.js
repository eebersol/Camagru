function takePicture()
{
	// References to all the element we will need.
	this.video 							= document.querySelector('#camera-stream');
	this.image 							= document.querySelector('#snap');
	this.start_camera					= document.querySelector('#start-camera');
	this.controls 						= document.querySelector('.controls');
	this.take_photo_btn 				= document.querySelector('#take-photo');
	this.delete_photo_btn 				= document.querySelector('#delete-photo');
	this.download_photo_btn 			= document.querySelector('#download-photo');
	this.save_photo_btn 				= document.querySelector('#save-photo');
	this.error_message 					= document.querySelector('#error-message');
	this.filterListDiv 					= document.getElementById("filterListDiv");
	let takePictureDiv 					= document.getElementById("takePictureDiv");
	let optionDiv 						= document.getElementById("optionDivLogin");

	optionDiv.style.display 			= "none";
	takePictureDiv.style.display 		= "block";
	this.filterListDiv.style.display	= "block";

	active_cam();
	active_event();
	display_filter();
}


function refresh_picture(pic)
{
	this.hidden_canvas 			= document.querySelector('canvas');
	this.context 				= this.hidden_canvas.getContext('2d');
	this.video 					= document.querySelector('#camera-stream');
	this.width 					= this.video.videoWidth;
	this.height 				= this.video.videoHeight;


	this.pictureTake = pic;

	this.imgPic = new Image ();
	this.imgPic.src = pic;
	this.imgPic.onload = () =>
	{
		if (this.width && this.height)
		{
			this.hidden_canvas.width 	= this.width;
			this.hidden_canvas.height 	= this.height;
			this.context.drawImage(this.imgPic, 0, 0, this.width, this.height);
			this.pictureTake =  this.hidden_canvas.toDataURL('image/png');

			this.image.setAttribute('src', this.pictureTake);
			this.image.classList.add("visible");
			this.image.style.width = "90%";
			this.image.style.margin = "0 0 0 5%";

			this.delete_photo_btn.classList.remove("disabled");
			this.save_photo_btn.classList.remove("disabled");
			this.download_photo_btn.classList.remove("disabled");


			this.download_photo_btn.href = this.pictureTake;

			this.video.pause();
		}
	}
}

function upload_picture()
{
	var file 			= document.getElementById("submitfile").files[0];
	var reader 			= new FileReader();
	reader.onloadend 	= () => {
		refresh_picture(reader.result); 
	}
	if (file)
		reader.readAsDataURL(file);
}

function apply_filter(i)
{
	this.filterRef 				= document.getElementById(this.filter[i].split('.')[0]);
	this.hidden_canvas 			= document.querySelector('canvas');
	this.context 				= this.hidden_canvas.getContext('2d');
	this.video 					= document.querySelector('#camera-stream');
	this.width 					= this.video.videoWidth;
	this.height 				= this.video.videoHeight;


	let imageObj1 = new Image();
	let imageObj2 = new Image();

	if (!this.pictureTake)
		this.take_photo_btn.click();
	imageObj1.src = this.pictureTake
		imageObj1.onload = () =>
		{
			imageObj2.src = "ressources/filtre/" + this.filter[i]
			imageObj2.onload = () =>
			{
				this.context.drawImage(imageObj2, width/2, height/2, filterRef.offsetWidth, filterRef.offsetHeight);
				let img = this.hidden_canvas.toDataURL("image/png");
				this.image.setAttribute('src', img);
				this.image.classList.add("visible");
				this.image.style.width = "90%";
				this.image.style.margin = "0 0 0 5%";

				this.delete_photo_btn.classList.remove("disabled");
				this.save_photo_btn.classList.remove("disabled");
				this.download_photo_btn.classList.remove("disabled");


				this.download_photo_btn.href = img;

				this.video.pause();
			}
		};
}

function get_filter(cb)
{
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/picture.model.php?action=picture.get.filter', true);
	xhr.onload= function() {
		if (xhr.status === 200) {
		
			if (xhr.responseText)
			{
				console.log("get_filter : ", xhr.responseText)
				cb(JSON.parse(xhr.responseText))
			}
		}
	};
	xhr.send();
}

function display_filter () {

	get_filter ((data, err) =>
	{
		if (data)
		{
			this.filter 		= data;
			let filterList 		= document.getElementById("filterList");
			let path			= "../ressources/filtre/"

			for (let i = 0; i < this.filter.length; i++)
			{
				let filterDiv 	= document.createElement("div");
				let filterImg 	= document.createElement("img");
				let filterName 	= this.filter[i];
				let filterId  	= filterName.split('.')[0] + 'i';

				if (i == 0 || i < this.filter.length)
					filterDiv.style.padding	 = "1% 0 1% 15%";
				else
					filterDiv.style.padding	 = "0 0 1% 15%";
				filterDiv.setAttribute("id", filterId);
				filterImg.setAttribute("src", path + filterName);
				filterImg.setAttribute("onclick", "apply_filter("+i+")");
				filterImg.style.maxWidth	 = "200px";
				filterImg.setAttribute("id", filterName.split('.')[0]);

				filterList.appendChild(filterDiv);
				filterDiv.appendChild(filterImg);

				this.index 					= i;
			}
		}
	});
}

function showVideo()
{
	// Display the video stream and the controls.
	hideUI();
	this.video.classList.add("visible");
	this.controls.classList.add("visible");
}

function takeSnapshot()
{

	this.hidden_canvas 			= document.querySelector('canvas');
	this.context 				= this.hidden_canvas.getContext('2d')
	this.width 					= this.video.videoWidth;
	this.height 				= this.video.videoHeight;


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

function displayErrorMessage(error_msg, error)
{
	error = error || "";
	if (error)
		console.log(error);
	error_message.innerText = error_msg;
	hideUI();
	this.error_message.classList.add("visible");
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


function XMLgetSavePicture(snap, description)
{
	let data = new FormData();

	if (description.length > 100)
		description = description.substring(0, 100);
	data.append('login', this.user.login);
	data.append('description', description);
	data.append('file', snap)

	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/models/picture.model.php', true);
	xhr.onload = function () {
	    // do something to response
	    let infoMessage 	= document.getElementById("infoMessage");
		let takePictureDiv	= document.getElementById("takePictureDiv");

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
	};
	xhr.send(data);

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
				// Create an object URL for the video stream and
				// set it as src of our HTLM video element.
				this.video.src = window.URL.createObjectURL(stream);
				// Play the video element to start the stream.
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
		// Start video playback manually.
		this.video.play();
		showVideo();
	});

	this.take_photo_btn.addEventListener("click", (e) => 
	{
		e.preventDefault();
		if (this.pictureTake)
			this.delete_photo_btn.click();
		this.pictureTake 				= takeSnapshot();
		this.download_photo_btn.href 	= this.pictureTake;
		this.image.setAttribute('src', this.pictureTake);
		this.delete_photo_btn.classList.remove("disabled");
		this.save_photo_btn.classList.remove("disabled");
		this.download_photo_btn.classList.remove("disabled");

		this.video.pause();
	});


	this.save_photo_btn.addEventListener("click", (e) => 
	{
		e.preventDefault();
		let description =  prompt("Enter une description (maximum 100 caractères)", "Aucune");

		if (!description)
			description = "";
		XMLgetSavePicture(this.download_photo_btn.href, description);
	});

	this.delete_photo_btn.addEventListener("click", (e) =>
	{
		console.log('delete')
		e.preventDefault();
		// Hide image.
		this.image.setAttribute('src', "");
		this.image.classList.remove("visible");
		// Disable delete and save buttons
		this.delete_photo_btn.classList.add("disabled");
		this.download_photo_btn.classList.add("disabled");
		// Resume playback of stream.
		this.video.play();
	});
}

