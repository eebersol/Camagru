
function sendReinitPasswordEmail()
{
	let email = document.getElementById("reinitEmail");

	if (email.value)
		loadXMLReinitPassword(email.value)
}



function loadXMLReinitPassword(email)
{
	let xhr = new XMLHttpRequest();

	xhr.open('GET', '/models/user.model.php?action=user.update.reinit&&email='+email, false);
	xhr.onload = function() 
	{
		if (xhr.status === 200) 
		{
			console.log(xhr.responseText)
			console.log(JSON.parse(xhr.responseText));
			if (xhr.status === 200)
			{
				let message 	= JSON.parse(xhr.responseText);
				let messageDiv 	= document.getElementsByClassName("infoMessage")[1];
				let messageText = document.getElementsByClassName("infoMessageText")[1];

				messageDiv.style.display 	= "block";
				messageText.textContent 	= message;

				if (JSON.parse(xhr.responseText) != "Addresse email incorrect.")
					messageDiv.style.backgroundColor = "#9CCC65";
				else
					messageDiv.style.backgroundColor = "#F44336";

				console.log("MESSAGE : ", message)
				console.log(messageDiv);
				console.log(messageText.value);
			}
		}
	};
	xhr.send();
}