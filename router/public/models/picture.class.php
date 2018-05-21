<?php 

class Picture {
	
	public $_email;
	public $_login;
	public $_passwd;
	public $_token;
	public $_ret;
	public $_message;
	public $_is_subscribe;
	public $_result;

	function __construct() 
	{
	}

	private function print_result()
	{
		print_r(json_encode($this->_result));
	}

	public function get_picture_page($page)
	{
		$page = ($page + 1) * 9 - 9 + 1;
		if ($page == 1)
			$page = 0;

		 $this->_result = get_page($page, 9);
		$this->print_result();
	}

	public function get_like_page ($paths)
	{
		$tab = explode(',', $paths);
		$this->_result = execute_sql_query_with_value("SELECT * FROM likes WHERE picture_path IN ('" . implode("', '", $tab) . "')");
		$this->print_result();
	}

	public function get_comment_page ($paths)
	{
		$tab = explode(',', $paths);
		$this->_result = execute_sql_query_with_value("SELECT * FROM comments WHERE picture_path IN ('" . implode("', '", $tab) . "')");

		$this->print_result();
	}

	private function generate_token($length) {
		$pull = [];
		while (count($pull) < $length)
			$pull = array_merge($pull, range(0, 9), range('a', 'z'), range('A', 'Z'));
		shuffle($pull);
		return (implode("", $pull));
	}

	public function save_picture($login, $url, $description, $name)
	{
 		if (!ini_get('date.timezone'))
			date_default_timezone_set('GMT');
		$category 		= "unknow";
		$date 			= date("Y-m-d");
		if ($name == "random")
			$token 			=  $this->generate_token(2);
		else
			$token 			= $name;
		$url 			= str_replace('data:image/png;base64','',$url);
		file_put_contents("../ressources/" .$token.".png", base64_decode($url));
		add_picture($date, $category, '../ressources/' . $token.  '.png', $description, $login);
	}


	public function delete_picture($login, $url)
	{
		delete_value('comments', 'picture_path', $url);
		delete_value('likes', 'picture_path', $url);
		delete_picture($login, $url);
		echo 'true';

	}

	public function get_picture_total ()
	{
		$this->_result = get_picture_nbr();
		$this->print_result();
	}

	public function get_picture_user ($login)
	{
		$this->_result = get_picture_user($login);
		$this->print_result();
	}


}

?>