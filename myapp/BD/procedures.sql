DELIMITER $$
CREATE DEFINER=`pascala79`@`%` PROCEDURE `AddQuartTravail`(IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME, IN `_confirme` TINYINT)
    NO SQL
BEGIN
INSERT INTO QuartsTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut ,fin ,confirme) VALUES(_idPlancher, _idUtilisateur, _idRoleUtilisateur, _debut, _fin, _confirme);
SELECT LAST_INSERT_ID() as id;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`pascala79`@`%` PROCEDURE `AddUser`(IN `_prenomUtilisateur` VARCHAR(45), IN `_nomUtilisateur` VARCHAR(45), IN `_alias` VARCHAR(45), IN `_motDePasse` VARCHAR(45), IN `_idTypeUtilisateur` INT, IN `_idPlancher` INT, IN `_age` INT, IN `_telephone` VARCHAR(11), IN `_courriel` VARCHAR(150))
    NO SQL
BEGIN
DECLARE hash_password varchar(255);
SET hash_password=PASSWORD(_motDePasse);
INSERT INTO Utilisateurs(prenomUtilisateur, nomUtilisateur, alias, motDePasse, idTypeUtilisateur, idPlancher, age, telephone, courriel) VALUES(_prenomUtilisateur,_nomUtilisateur,_alias,hash_password,_idTypeUtilisateur,_idPlancher,_age,_telephone,_courriel);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`pascala79`@`%` PROCEDURE `RemoveQuartTravail`(IN `_idQuartTravail` INT)
    NO SQL
DELETE FROM QuartsTravail WHERE idQuartTravail=_idQuartTravail$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`pascala79`@`%` PROCEDURE `UpdateQuartTravail`(IN `_idQuartTravail` INT, IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME, IN `_confirme` TINYINT)
    NO SQL
UPDATE QuartsTravail SET idPlancher=_idPlancher, idUtilisateur=_idUtilisateur, idRoleUtilisateur = _idRoleUtilisateur, debut = _debut, fin = _fin, confirme =_confirme
WHERE idQuartTravail=_idQuartTravail$$
DELIMITER ;
