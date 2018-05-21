function returnHome() {
	location.reload();
}



function getUser()
{
	getData('/models/user.model.php', '?action=user.get.information', 'GET', (data) =>
	{
		if (data)
		{
			this.user = {
				'id' 			: data['id'],
				'email' 		: data['email'],
				'login' 		: data['login'],
				'passwd'		: data['passwd'],
				'subscribeMail'	: data['subscribe_email'],
				'tokenMail'		: data['token_subscribe'],
				'picture'		: {
					'liked'	: [],
					'added' : data['pic_liked']
				},
				'notification' 	: {
					'like': data['notification_like'],
					'comment': data['notification_comment']
				}
			}
		}

		if (this.user)
		{
			document.getElementById("photoDisconnect").style.display = "block";
			getData('/models/user.model.php', '?action=user.get.picture.like', 'GET', (data) =>{
				if (data)
				{
					for (let i = 0; i < data.length; i++)
						this.user.picture.liked.push(data[i].picture_path)
				}
			});
		}
		else
			document.getElementById("photoDisconnect").style.display = "none"
	});
}

getUser();