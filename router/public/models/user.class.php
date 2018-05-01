<?php 

class User {
	
	public $_email;
	public $_login;
	public $_passwd;
	public $_token;
	public $_ret;
	public $_message;
	public $_is_subscribe;
	public $_is_login = false;

	function __construct() 
	{
	}

	public function set_session($email, $login, $passwd)
	{
		$_SESSION['login'] 	= $this->_login;
		$_SESSION['email'] 	= $this->_email;
		$_SESSION['passwd'] = $this->_passwd;
	}

	public function get_return_value() {
		print_r(json_encode($this->_message));
	}

	public function create_user($email, $login, $passwd)
	{
		$this->is_subscribe($email, $passwd);
		if (count($this->_is_subscribe) == 0)
		{
			$this->_email 	= $email;
        	$this->_login 	= $login;
       	 	$this->_passwd 	= $passwd;
        	$this->_message = "✓ Bienvenu " 
        		. $this->_login 
        		. " votre compte a été créé, un email de vérification à été envoyé à l'adresse suivante : " 
        		. $this->_email 
        		. ".";
			$this->send_subscribe_email();
			$this->push_user();
		}
		else
			$this->_message = "✘ Cette adresse email/login est déja utilisé.";
	}

	public function send_subscribe_email()
	{
		function generate_token($length) {
			$pull = [];
			while (count($pull) < $length)
				$pull = array_merge($pull, range(0, 9), range('a', 'z'), range('A', 'Z'));
			shuffle($pull);
			return (implode("", $pull));
		}

		$this->_token 	= generate_token(90);
		$subject 		= "[-CAMAGRU-] - Email verification";
		$headers  		= 'MIME-Version: 1.0' . "\r\n";
		$headers 		.= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$headers 		.= 'From: <eebersol@student.42.fr>' . "\r\n";
		$html_page 		= file_get_contents("../../ressources/mails/mail.subscribe.html");
		$html_page 		= str_replace("HERE", $this->_token, $html_page);
		$html_page 		= str_replace("LOGIN", $this->_login, $html_page);
		$message 		= $html_page;
		mail($this->_email, $subject, $message, $headers); 
	}

	public function push_user()
	{
		exec_sql_query('
			INSERT INTO
			users (id, email, login, passwd, subscribe_email, token_subscribe, pic_reference, pic_liked, notification_like, notification_comment) 
			VALUE (0, "'.$this->_email.'", "'.$this->_login.'", "'.$this->_passwd.'", 1, "'.$this->_token.'", "", "", 1, 1)'
		);	
	}

	public function is_subscribe($email) {
		$this->_is_subscribe = execute_sql_query_with_value("SELECT * FROM users WHERE email = '" .$email."'");
	}

	private function check_login ($login)
	{
		$this->_is_used_login = execute_sql_query_with_value("SELECT * FROM users WHERE login = '" .$login."'");
	}

	public function login_user($email, $login, $passwd)
	{
		$ret = execute_sql_query_with_value("SELECT * FROM users WHERE subscribe_email = 0 AND login = '" .$login. "' AND passwd= '" .$passwd. "'")[0];
		if ($ret['email'])
		{
			$this->_email 	= $ret['email'];
        	$this->_login 	= $login;
       	 	$this->_passwd 	= $passwd;
       	 	$this->user_card = $ret;
       	 	$this->set_session($this->_email, $this->_login, $this->_passwd);
			$this->_message = "Bienvenue " . $this->_login . " !";
			$this->_is_login = true;
		}
		else
			$this->_message = "✘ login / mot de passe incorrect";
	}


	
	public function update_user($oldInformation, $newInformation)
	{
		$oldInformation = explode(',', $oldInformation);
		$newInformation = explode(',', $newInformation);

		$new_email 	= $newInformation[0];
		$new_login 	= $newInformation[1];
		$new_passwd = $newInformation[2];
		$old_email 	= $oldInformation[0];
		$old_login 	= $oldInformation[1];
		$old_passwd = $oldInformation[2];

		if ($new_email == '')
			$this->_email = $old_email;
		else if ($old_email != $new_email)
		{
			$this->is_subscribe($new_email);
			if (count($this->_is_subscribe) == 0)
				$this->_email = $new_email;
			else
			{
				$this->_email = $old_email;
				$this->_message = "Email déjà utilisé.";
			}
		}
		else
			$this->_email = $old_email;


		if ($new_login == '')
			$this->_login = $old_login;
		else if ($old_login != $new_login)
		{
			$this->check_login($new_login);
			if (count($this->_is_used_login) == 0)
			{
				$this->_login = $new_login;
				exec_sql_query('UPDATE likes SET login="' .$this->_login. '"WHERE login="'. $old_login. '"');
				exec_sql_query('UPDATE comments SET login="' .$this->_login. '"WHERE login="'. $old_login. '"');
			}
			else
			{
				$this->_login = $old_login;
				$this->_message = "Login déjà utilisé.";
			}
		}
		else
			$this->_email = $old_login;


		if ($new_passwd == '')
			$this->_passwd = $old_passwd;
		else if ($old_passwd != hash('whirlpool', $new_passwd))
			$this->_passwd = hash('whirlpool', $newInformation[2]);
		else
			$this->_passwd = $old_passwd;


		$ret = exec_sql_query('UPDATE users SET login="' .$this->_login. '", email="' .$this->_email. '", passwd="' .$this->_passwd. '" WHERE email="'. $old_email. '"');

		if ($ret == 1)
		{
			$this->set_session($this->_email, $this->_login, $this->_passwd);
			$this->_message = "Informations modifiées.";
		}
		else
			$this->_message = "Une erreur est survenue veuillez contacter un administrateur.";
	}

	public function dislike($picture_path)
	{
		$ret = exec_sql_query('DELETE FROM likes WHERE login = "' .$this->_login. '" AND picture_path = "' .$picture_path. '"');

		if ($ret == 1)
			$this->_message = "Vous n'aimez plus cette image.";
		else
			$this->_message = "Une erreur est survenue.";
	}

	public function like($picture_path)
	{
		$ret = exec_sql_query('SELECT * FROM likes WHERE login = "' .$_GET['login']. '" AND picture_path = "' .$_GET['path']. '" ');
		if (!$ret)
		{
			$ret = exec_sql_query('INSERT INTO likes (id, login, picture_path) VALUES (0, "' .$this->_login. '", "' .$picture_path. '");');
			if ($ret)
				$this->_message = "Vous aimez cette image.";
			else
				$this->_message = "Une erreur est survenue.";
		}
	}

	public function get_picture_liked() {
		$this->_picture_liked = execute_sql_query_with_value('SELECT picture_path FROM likes WHERE login = "' .$this->_login. '"');
	}

	public function add_comment($text, $picture_path) {
		$this->_picture_comment = exec_sql_query('INSERT INTO comments (id, login, comment, picture_path) VALUE (0, "'.$this->_login.'", "'.$text.'", "'.$picture_path.'")');
	}

}

?>