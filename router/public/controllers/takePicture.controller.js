function takePicture()
{
	let takePictureDiv 					= document.getElementById("takePictureDiv");
	let optionDiv 						= document.getElementById("optionDivLogin");
	this.filterListDiv 					= document.getElementById("filterListDiv");

	optionDiv.style.display 			= "none";
	takePictureDiv.style.display 		= "block";
	this.filterListDiv.style.display	= "block";

	this.pictureTake = active_cam();
	display_filter();
}


function refresh_picture(pic)
{
	let hidden_canvas 			= document.querySelector('canvas');
	let context 				= hidden_canvas.getContext('2d');
	let video 					= document.querySelector('#camera-stream');
	let image 					= document.querySelector('#snap');
	let delete_photo_btn 		= document.querySelector('#delete-photo');
	let download_photo_btn 		= document.querySelector('#download-photo');
	let save_photo_btn 			= document.querySelector('#save-photo')
	let width 					= video.videoWidth;
	let height 					= video.videoHeight;


	this.pictureTake = pic;

	this.imgPic = new Image ();
	this.imgPic.src = pic;
	this.imgPic.onload = () =>
	{
		if (width && height)
		{
			// Setup a canvas with the same dimensions as the video.
			hidden_canvas.width 	= width;
			hidden_canvas.height 	= height;
			// Make a copy of the current frame in the video on the canvas.
			context.drawImage(this.imgPic, 0, 0, width, height);
			// Turn the canvas image into a dataURL that can be used as a src for our photo.
			this.pictureTake =  hidden_canvas.toDataURL('image/png');

			image.setAttribute('src', this.pictureTake);
			image.classList.add("visible");

			delete_photo_btn.classList.remove("disabled");
			save_photo_btn.classList.remove("disabled");
			download_photo_btn.classList.remove("disabled");


			download_photo_btn.href = this.pictureTake;

			video.pause();
		}
	}


}
function upload_picture()
{
		var file = document.getElementById("submitfile").files[0];
   		var reader = new FileReader();
   		reader.onloadend = function(){
   			refresh_picture(reader.result); 
   		}
   		if(file){
      		reader.readAsDataURL(file);
   		 }else{
    	}
}

function apply_filter(i)
{
	let filterRef 				= document.getElementById(this.filter[i].split('.')[0]);
	let hidden_canvas 			= document.querySelector('canvas');
	let context 				= hidden_canvas.getContext('2d');
	let video 					= document.querySelector('#camera-stream');
	let image 					= document.querySelector('#snap');
	let width 					= video.videoWidth;
	let height 					= video.videoHeight;
	let delete_photo_btn 		= document.querySelector('#delete-photo');
	let download_photo_btn 		= document.querySelector('#download-photo');
	let save_photo_btn 			= document.querySelector('#save-photo')

	if (typeof this.pictureTake != 'string')
		return ;
	let imageObj1 = new Image();
	let imageObj2 = new Image();

	imageObj1.src = this.pictureTake
		imageObj1.onload = () =>
		{
			imageObj2.src = "ressources/filtre/" + this.filter[i]
			imageObj2.onload = () =>
			{
				context.drawImage(imageObj2, width/2, height/2, filterRef.offsetWidth, filterRef.offsetHeight);
				let img = hidden_canvas.toDataURL("image/png");
				image.setAttribute('src', img);
				image.classList.add("visible");

				delete_photo_btn.classList.remove("disabled");
				save_photo_btn.classList.remove("disabled");
				download_photo_btn.classList.remove("disabled");


				download_photo_btn.href = img;

				video.pause();
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

function active_cam()
{
	display_filter();
	// References to all the element we will need.
	let video 				= document.querySelector('#camera-stream');
	let image 				= document.querySelector('#snap');
	let start_camera		= document.querySelector('#start-camera');
	let controls 			= document.querySelector('.controls');
	let take_photo_btn 		= document.querySelector('#take-photo');
	let delete_photo_btn 	= document.querySelector('#delete-photo');
	let download_photo_btn 	= document.querySelector('#download-photo');
	let save_photo_btn 		= document.querySelector('#save-photo');
	let error_message 		= document.querySelector('#error-message');

	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	if( !navigator.getMedia)
		displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
	else
	{
		// Request the camera.
		navigator.getMedia({video: true},
		// Success Callback
			(stream) =>
			{
				// Create an object URL for the video stream and
				// set it as src of our HTLM video element.
				video.src = window.URL.createObjectURL(stream);
				// Play the video element to start the stream.
				video.play();
				video.onplay = function() { showVideo(); };
			},
			// Error Callback
			(err) => {
				displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
			}
		);
	}

	// Mobile browsers cannot play video without user input,
	// so here we're using a button to start it manually.
	start_camera.addEventListener("click", (e) => 
	{
		e.preventDefault();
		// Start video playback manually.
		video.play();
		showVideo();
	});

	take_photo_btn.addEventListener("click", (e) => 
	{
		e.preventDefault();

		let snap = takeSnapshot();
		this.pictureTake = snap;

		image.setAttribute('src', snap);
		image.classList.add("visible");

		delete_photo_btn.classList.remove("disabled");
		save_photo_btn.classList.remove("disabled");
		download_photo_btn.classList.remove("disabled");


		download_photo_btn.href = snap;

		video.pause();
		return (snap);

	});


	save_photo_btn.addEventListener("click", (e) => 
	{
		e.preventDefault();
		let description =  prompt("Enter une description (maximum 100 caractères)", "Aucune");
		XMLgetSavePicture(download_photo_btn.href, description);
	});

	delete_photo_btn.addEventListener("click", (e) =>
	{
		e.preventDefault();
		// Hide image.
		image.setAttribute('src', "");
		image.classList.remove("visible");
		// Disable delete and save buttons
		delete_photo_btn.classList.add("disabled");
		download_photo_btn.classList.add("disabled");
		// Resume playback of stream.
		video.play();
	});

	function showVideo()
	{
		// Display the video stream and the controls.
		hideUI();
		video.classList.add("visible");
		controls.classList.add("visible");
	}

	function takeSnapshot()
	{
		// Here we're using a trick that involves a hidden canvas element.  
		let hidden_canvas 			= document.querySelector('canvas');
		let context 				= hidden_canvas.getContext('2d');
		let width 					= video.videoWidth;
		let height 					= video.videoHeight;

		if (width && height)
		{
			// Setup a canvas with the same dimensions as the video.
			hidden_canvas.width 	= width;
			hidden_canvas.height 	= height;
			// Make a copy of the current frame in the video on the canvas.
			context.drawImage(video, 0, 0, width, height);
			// Turn the canvas image into a dataURL that can be used as a src for our photo.
			return hidden_canvas.toDataURL('image/png');
		}
	}

	function displayErrorMessage(error_msg, error)
	{
		error = error || "";
		if (error)
			console.log(error);
		error_message.innerText = error_msg;
		hideUI();
		error_message.classList.add("visible");
	}

	function hideUI()
	{
		// Helper function for clearing the app UI.
		controls.classList.remove("visible");
		start_camera.classList.remove("visible");
		video.classList.remove("visible");
		snap.classList.remove("visible");
		error_message.classList.remove("visible");
	}

	function base64toBlob(base64Data, contentType) 
	{
	    contentType = contentType || '';
	    var sliceSize = 1024;
	    var byteCharacters = atob(base64Data);
	    var bytesLength = byteCharacters.length;
	    var slicesCount = Math.ceil(bytesLength / sliceSize);
	    var byteArrays = new Array(slicesCount);

	    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
	        var begin = sliceIndex * sliceSize;
	        var end = Math.min(begin + sliceSize, bytesLength);

	        var bytes = new Array(end - begin);
	        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
	            bytes[i] = byteCharacters[offset].charCodeAt(0);
	        }
	        byteArrays[sliceIndex] = new Uint8Array(bytes);
	    }
	    return new Blob(byteArrays, { type: contentType });
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
}

