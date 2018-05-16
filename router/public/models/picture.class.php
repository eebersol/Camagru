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
		$begin 	= (($page + 1) * 9) - 8;
		$end 	=  (($page + 1) * 9) + 1;

		$this->_result = execute_sql_query_with_value('SELECT * FROM pictures WHERE id >= '.$begin.' AND id <'.$end);
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

	public function save_picture($login, $url, $description)
	{
 		if (!ini_get('date.timezone'))
			date_default_timezone_set('GMT');
		$category 		= "unknow";
		$date 			= date("Y-m-d");
		$token 			=  $this->generate_token(2);
		$url 			= str_replace('data:image/png;base64','',$url);
		file_put_contents("../ressources/" .$token.".png", base64_decode($url));
		exec_sql_query('
			INSERT INTO pictures 
			(id, date_creation, category, picture_path, description, nbr_like, auteur) 
			VALUES 
			(0,  "' .$date. '", "' .$category. '", "' . '../ressources/' . $token.  '.png' . '", "' .$description. '", 0, "' .$login. '");');
	}


	public function delete_picture($login, $url)
	{
		exec_sql_query('DELETE FROM pictures 	WHERE auteur 		= "' .$login. '" AND picture_path = "' .$url. '"');
		exec_sql_query('DELETE FROM comments 	WHERE picture_path 	= "' .$url. '"');
		exec_sql_query('DELETE FROM likes 		WHERE picture_path 	= "' .$url. '"');
		unlink($url);
		echo "true";

	}


}

?>