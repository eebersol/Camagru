
Vous utiliserez l'interface d’abstraction PDO de PHP pour communiquer avec votre
Base de Données, qui devra être requêtable en SQL. Le mode d’erreur de ce driver
sera obligatoirement défini sur PDO::ERRMODE_EXCEPTION










SCHEMA USER ::                

{
	||	USER	||

	email, => CHAR
	login, => CHAR
	passwd, => CHAR
	reference photo, => INT
	account_confirm, => BOOL
	notification_new_like, => INT
	notification_new_comment, => INT

}




SCHEMA PHOTO

{
	||	PHOTO	||

	id, => INT
	date_creation, => DATE
	like => CHAR (LOGIN:login;DATE:date)
	comments => CHAR (LOGIN:login;TEXT:text;DATE:date)
}


On en est ::  user.create.php j'essaye de faire envoyer un mail pour l'inscription -- il va falloir generer un token pour valider la lecture du mail, mais pour le moment e mail ne s'envoi pas


FINALEMENT JE RECOIS LE MAIL



Todo :

-Creation du template du mail et de la creation du token OK



VIEWS :: 

- Register
- Verifier_email
- Register_success