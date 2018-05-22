function returnHome() {
	location.reload();
}

function troll(id)
{
	console.log(id)
	let img = document.getElementById(id);

	console.log(img)
	if (img.src == 'https://image.freepik.com/icones-gratuites/appareil-photo-avec-un-flash_318-60075.jpg')
	{
		img.style.marginTop = '7%';
		img.src = 'https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/310x190_tous-trolls';
	}
	else
	{
		img.style.marginTop = '0';
		img.src = 'https://image.freepik.com/icones-gratuites/appareil-photo-avec-un-flash_318-60075.jpg'
	}
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