
function disconnect()
{
	getData('/models/user.model.php', '?action=user.disconnect', 'GET', (data) => {
		location.reload()
	});
}