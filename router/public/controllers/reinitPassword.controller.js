
function sendReinitPasswordEmail()
{
	let email = document.getElementById("reinitEmail");

	if (email.value)
	{
		getData('/models/user.model.php','?action=user.update.reinit&&email='+email.value, 'GET', (data) =>
		{
				let message 	= data;
				let messageDiv 	= document.getElementsByClassName("infoMessage")[2];
				let messageText = document.getElementsByClassName("infoMessageText")[1];

				messageDiv.style.display 	= "block";
				messageText.textContent 	= message;

				document.getElementById("userReinitPassword").style.margin = "3% 0 0 5%";
				if (message != "Addresse email incorrect.")
				{
					messageDiv.style.backgroundColor = "#9CCC65";
					setTimeout(function(){ location.reload(); }, 1000);
				}
				else
					messageDiv.style.backgroundColor = "#F44336";
		});
	}
}

function removeMessage ()
{
	document.getElementsByClassName("infoMessage")[2].style.display = "none";
	document.getElementById("userReinitPassword").style.margin = "10% 0 0 5%";
}
