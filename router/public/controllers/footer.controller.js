
function disconnect()
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.disconnect', true);
	xhr.onload= function() {
		if (xhr.status === 200) {
			location.reload()
		}
	};
	xhr.send();
}