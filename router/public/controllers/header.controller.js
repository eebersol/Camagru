
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

getData('/models/user.model.php', '?action=user.is_login', 'GET', (data) =>
{
 	 	this.is_loggued = data;

 	 if (this.is_loggued === true)
 	 {
 	 	document.getElementById("enterDiv").style.display 		= "none";
 	 	document.getElementById("optionDivLogin").style.display = "block";
 	 }
 	 else
 	 	document.getElementById("enterDiv").style.display 		= "block";
});
