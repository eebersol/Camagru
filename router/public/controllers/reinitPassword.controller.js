
function sendReinitPasswordEmail()
{
	let email = document.getElementById("reinitEmail");

	if (email.value)
	{
		getData('/models/user.model.php','?action=user.update.reinit&&email='+email.value, 'GET', (data) =>
		{
				let message 	= Jdata;
				let messageDiv 	= document.getElementsByClassName("infoMessage")[1];
				let messageText = document.getElementsByClassName("infoMessageText")[1];

				messageDiv.style.display 	= "block";
				messageText.textContent 	= message;

				if (message != "Addresse email incorrect.")
					messageDiv.style.backgroundColor = "#9CCC65";
				else
					messageDiv.style.backgroundColor = "#F44336";
		});
	}
}
