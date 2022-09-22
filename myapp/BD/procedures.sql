DELIMITER $$
CREATE DEFINER=`pascala79`@`%` PROCEDURE `AddUser`(IN `_prenomUtilisateur` VARCHAR(45), IN `_nomUtilisateur` VARCHAR(45), IN `_alias` VARCHAR(45), IN `_motDePasse` VARCHAR(45), IN `_idTypeUtilisateur` INT, IN `_idPlancher` INT, IN `_age` INT, IN `_telephone` VARCHAR(11), IN `_courriel` VARCHAR(150))
    NO SQL
BEGIN
DECLARE hash_password varchar(255);
SET hash_password=PASSWORD(_motDePasse);
INSERT INTO Utilisateurs(prenomUtilisateur, nomUtilisateur, alias, motDePasse, idTypeUtilisateur, idPlancher, age, telephone, courriel) VALUES(_prenomUtilisateur,_nomUtilisateur,_alias,hash_password,_idTypeUtilisateur,_idPlancher,_age,_telephone,_courriel);
END$$
DELIMITER ;