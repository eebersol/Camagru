<?php

require("../models/mail.subscribe.php");

if (verify_token($_GET['token']) === true)
{
	if (verify_account($_GET['token']) == 1)
		echo "Email verifié";
	else
		echo "Une erreur s'est produite veuillez contacter un admin.\n";
}
else
	echo "Une erreur s'est produite veuillez contacter un admin.\n";

?>