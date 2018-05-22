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

	public function set_session($email, $login, $passwd, $flag)
	{
		$_SESSION['login'] 	= $this->_login;
		$_SESSION['email'] 	= $this->_email;
		$_SESSION['passwd'] = $this->_passwd;

		if ($flag == true)
			$this->user_card =  login_get_user(0, $login, $passwd);
	}

	public function get_return_value() {
		print_r(json_encode($this->_message));
	}

	public function create_user($email, $login, $passwd)
	{
		$this->is_subscribe($email, $login);
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
			add_user($this->_login, $this->_email, $this->_passwd, $this->_token);
		}
		else
			$this->_message = "✘ Cette adresse email/login est déja utilisé.";
	}

	private function generate_token($length) {
		$pull = [];
		while (count($pull) < $length)
			$pull = array_merge($pull, range(0, 9), range('a', 'z'), range('A', 'Z'));
		shuffle($pull);
		return (implode("", $pull));
	}

	public function send_subscribe_email()
	{
		$this->_token 	= $this->generate_token(90);
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

	public function is_subscribe($email, $login)
	{
		if ($email)
		{
			$this->_is_subscribe =  user_is_subscribe_email($email);
			if (count($this->_is_subscribe) == 0 && $login)
				$this->_is_subscribe =  user_is_subscribe_login($login);

		}
	}

	public function login_user($email, $login, $passwd)
	{
		$ret = login_get_user(0, $login, $passwd);
		if ($ret['email'])
		{
			$this->_email 		= $ret['email'];
        	$this->_login 		= $login;
       	 	$this->_passwd 		= $passwd;
       	 	$this->user_card 	= $ret;
			$this->_message 	= "Bienvenue " . $this->_login . " !";
			$this->_is_login 	= true;
			$this->set_session($this->_email, $this->_login, $this->_passwd, false);
		}
		else
			$this->_message = "✘ login / mot de passe incorrect";
	}


	
	public function update_user($oldInformation, $newInformation)
	{
		$oldInformation = explode(',', $oldInformation);
		$newInformation = explode(',', $newInformation);
		$new_email 		= $newInformation[0];
		$new_login 		= $newInformation[1];
		$new_passwd	 	= $newInformation[2];
		$old_email 		= $oldInformation[0];
		$old_login 		= $oldInformation[1];
		$old_passwd	 	= $oldInformation[2];

		if ($new_email == '')
			$this->_email = $old_email;
		else if ($old_email != $new_email)
		{
			$this->is_subscribe($new_email, null);
			if (count($this->_is_subscribe) == 0)
				$this->_email = $new_email;
			else
			{
				$this->_email = $old_email;
				$this->_message = "Email déjà utilisé.";
				return ;
			}
		}
		else
			$this->_email = $old_email;


		if ($new_login == '')
			$this->_login = $old_login;
		else if ($old_login != $new_login)
		{
			$this->_is_used_login = user_is_subscribe_login($new_login);
			if (count($this->_is_used_login) == 0)
			{
				$this->_login = $new_login;
				update_database_likes($new_login, $old_login);
				update_database_comments($new_login, $old_login);
				update_database_pictures($new_login, $old_login);
			}
			else
			{
				$this->_login = $old_login;
				$this->_message = "Login déjà utilisé.";
				return ;
			}
		}
		else
			$this->_login = $old_login;


		if ($new_passwd == '')
			$this->_passwd = $old_passwd;
		else if ($old_passwd != hash('whirlpool', $new_passwd))
			$this->_passwd = hash('whirlpool', $newInformation[2]);
		else
			$this->_passwd = $old_passwd;


		update_user($this->_login, $this->_email, $this->_passwd, $old_email);
		$this->set_session($this->_email, $this->_login, $this->_passwd, true);
		$this->_message = "Informations modifiées.";
	}

	public function dislike($picture_path)
	{
		$ret = remove_like($this->_login, $picture_path);
		$this->_message = decrease_like($picture_path);
	}

	public function like($picture_path)
	{
		$ret = is_like($this->_login, $picture_path);
		if (!$ret)
		{
			$ret =  add_like ($this->_login, $picture_path);
			$this->_message = increase_like($picture_path);
		}
	}

	public function get_picture_liked() {
		$this->_picture_liked = user_get_picture_like($this->_login);
	}

	public function add_comment($text, $picture_path, $auteur) 
	{
		if( ! ini_get('date.timezone') )
		{
    		date_default_timezone_set('GMT');
		}
		$date = date("Y-m-d");
		$this->_picture_comment = add_comment($this->_login, $text, $picture_path, $date);
		$this->_token_password 	= $this->generate_token(1);
		$subject 		= "[-CAMAGRU-] - Notification";
		$headers  		= 'MIME-Version: 1.0' . "\r\n";
		$headers 		.= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$headers 		.= 'From: <eebersol@student.42.fr>' . "\r\n";
		$html_page 		= file_get_contents("../../ressources/mails/mail.new_comment.html");
		$html_page 		= str_replace("LOGIN", $auteur, $html_page);
		$html_page 		= str_replace("AUTEUR", $this->_login, $html_page);
		$html_page 		= str_replace("PICTURE",$picture_path, $html_page);
		$html_page 		= str_replace("TEXT",$text, $html_page);
		$message 		= $html_page;
		$this->_message = email_user($auteur);
		$auteurEmail = $this->_message[0][0];
		mail($auteurEmail, $subject, $message, $headers); 
		$this->_message = "Email envoyé.";
	}

	public function reinit_password($email)
	{
		$this->is_subscribe($email, null);
		if (count($this->_is_subscribe) != 0)
		{
			$this->_token_password 	= $this->generate_token(1);
			reinit_password_user(hash('whirlpool', $this->_token_password), $email);
			$subject 		= "[-CAMAGRU-] - Réinitialisation mot de passe";
			$headers  		= 'MIME-Version: 1.0' . "\r\n";
			$headers 		.= 'Content-type: text/html; charset=UTF-8' . "\r\n";
			$headers 		.= 'From: <eebersol@student.42.fr>' . "\r\n";
			$html_page 		= file_get_contents("../../ressources/mails/mail.reinit_password.html");
			$html_page 		= str_replace("LOGIN", $email, $html_page);
			$html_page 		= str_replace("TOKEN", $this->_token_password, $html_page);
			$message 		= $html_page;
			$this->_message = "Email envoyé.";
			mail($email, $subject, $message, $headers); 
		}
		else
			$this->_message = "Addresse email incorrect.";
	}

}

?>