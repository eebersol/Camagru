// function loadXMLgetComments(page, callback)
// {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', '/models/picture.model.php?action=picture.get.comment&&page='+page+'', false);
// 	xhr.onload= function() {
// 		if (xhr.status === 200) {
// 			if (xhr.responseText !== null)
// 				callback(JSON.parse(xhr.responseText));
// 		}
// 		else {
// 			alert('Request failed.  Returned status of ' + xhr.status);
// 		}
// 	};
// 	xhr.send();
// }

function returnHome()
{
	location.reload()
}

function getUser()
{
	getUserInformations((data, err) => 
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

		getUserPictureLike((data, err) =>
		{
			if (data)
			{
				for (let i = 0; i < data.length; i++)
					this.user.picture.liked.push(data[i].picture_path)
			}
			return (this.user);
		});
	});
}


getUser();

function getUserPictureLike(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.get.picture.like', false);
	xhr.onload= function() {
		if (xhr.status === 200)
		{
			console.log("getUserPictureLike : ", xhr.responseText);
			callback(JSON.parse(xhr.responseText));
		}
	};
	xhr.send();	
}

function getUserInformations(callback)
{
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/models/user.model.php?action=user.get.information', false);
	xhr.onload= function() {
		if (xhr.status === 200) 
			console.log("Get Information : ", xhr.responseText);
			callback(JSON.parse(xhr.responseText));
	};
	xhr.send();	
}

