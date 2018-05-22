
function returnHome()
{
	location.reload()
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
