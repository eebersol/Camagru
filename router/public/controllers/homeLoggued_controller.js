
function returnHome()
{
	location.reload()
}


function loadXMLSuccessLogin(email, login, passwd)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.login.php?success=true&&email='+email+'&&login='+login+'&&passwd='+passwd, false);
	xhr.onload= function() {
		if (xhr.status === 200) {
			login_success(email, login, passwd, xhr.responseText);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}

function disconnect()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.disconnect.php?disconnect=true');
	xhr.onload= function() {
		if (xhr.status === 200) {
			alert(xhr.responseText);
			location.reload()
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}