
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




ajouter un message d'erreur pour les champs et un message pour dire que l'inscription est valide t au'un mail de verificationarrive

mettre le sinpout mot de pass en hasher



disconnect marche maintenant il faut pouvoir modifier les infornations\








TODO ::: 

- creer l'interface de modifications des donnees
- creer des pages perso quand on clique sur une photo
- peut etre essayer de faire un system de card
- faire aussi la modification du mot de passe via l;envoi d;un mail\




- Commentaire :: on peut voir et ecrire un commentaire, pour l'ajouter il faut finir le systeme de login\















-- Les commentaires ne marche pas encore il faut changer le champ dans user.informations