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


}

?>