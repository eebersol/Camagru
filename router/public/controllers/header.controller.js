
function returnHome()
{
	location.reload()
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


function is_login(callback)
{
	let xhr 	= new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.is_login', true);
	xhr.onload= function() {
		if (xhr.status === 200)
		{
			callback(xhr.responseText);
		}
		else
			alert('Request failed.  Returned status of ' + xhr.status);
	};
	xhr.send();	
}

is_login((data, err) => {
	console.log('data : ', data, data === true ? "IS_TRUE" : "IS_FALSE");
 	 this.is_loggued = data;
 	 if (data == 'true')
 	 	this.is_loggued = true;
 	 else
 	 	this.is_loggued = false

 	 if (this.is_loggued === true)
 	 {
 	 	console.log("Log")
 	 	document.getElementById("enterDiv").style.display = "none";
 	 	document.getElementById("optionDivLogin").style.display = "block";
 	 }
 	 else
 	 {
 	 	console.log("No Log")
 	 	document.getElementById("enterDiv").style.display = "block";
 	 }

 	 console.log("Login :1 ", this.is_loggued)
 });