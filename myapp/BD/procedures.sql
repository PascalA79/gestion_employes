DELIMITER $$
--
-- Procédures
--
CREATE OR REPLACE PROCEDURE `AddQuartTravail` (IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME, IN `_confirme` TINYINT)  NO SQL
BEGIN
INSERT INTO QuartsTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut ,fin ,confirme) VALUES(_idPlancher, _idUtilisateur, _idRoleUtilisateur, _debut, _fin, _confirme);
SELECT LAST_INSERT_ID() as id;
END$$

CREATE OR REPLACE PROCEDURE `AddUser` (IN `_prenomUtilisateur` VARCHAR(45), IN `_nomUtilisateur` VARCHAR(45), IN `_alias` VARCHAR(45), IN `_motDePasse` VARCHAR(45), IN `_idTypeUtilisateur` INT, IN `_idPlancher` INT, IN `_age` INT, IN `_telephone` VARCHAR(11), IN `_courriel` VARCHAR(150))  NO SQL
BEGIN
DECLARE hash_password varchar(255);
SET hash_password=PASSWORD(_motDePasse);
INSERT INTO Utilisateurs(prenomUtilisateur, nomUtilisateur, alias, motDePasse, idTypeUtilisateur, idPlancher, age, telephone, courriel) VALUES(_prenomUtilisateur,_nomUtilisateur,_alias,hash_password,_idTypeUtilisateur,_idPlancher,_age,_telephone,_courriel);
END$$

CREATE OR REPLACE PROCEDURE `GetAllPlanchers` ()  NO SQL
SELECT * FROM Planchers$$

CREATE OR REPLACE PROCEDURE `GetAllRoles` ()  NO SQL
SELECT * FROM RolesUtilisateurs$$

CREATE OR REPLACE PROCEDURE `GetPlanchersBySuperviseur` (IN `userid` INT)  NO SQL
SELECT Planchers.idPlancher, Planchers.nomPlancher FROM Planchers
INNER JOIN SuperviseursPlanchers
ON Planchers.idPlancher = SuperviseursPlanchers.idPlancher
INNER JOIN Utilisateurs
ON SuperviseursPlanchers.idUtilisateur = Utilisateurs.idUtilisateur
WHERE Utilisateurs.idUtilisateur = userid$$

CREATE OR REPLACE PROCEDURE `GetQuartsByPlancher` (IN `_idPlancher` INT, IN `_debut` DATETIME, IN `_fin` DATETIME)  NO SQL
SELECT Utilisateurs.idUtilisateur,Utilisateurs.alias,Utilisateurs.prenomUtilisateur as prenom,Utilisateurs.nomUtilisateur as nom, debut,fin FROM QuartsTravail INNER JOIN Utilisateurs
ON Utilisateurs.idUtilisateur = QuartsTravail.idUtilisateur
WHERE QuartsTravail.idPlancher=_idPlancher AND debut>=_debut AND fin<=_fin$$

CREATE OR REPLACE PROCEDURE `GetQuartsByUser` (IN `_idUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME)  NO SQL
SELECT * FROM QuartsTravail 
WHERE idUtilisateur=_idUtilisateur AND debut>=_debut AND fin<=_fin$$

CREATE OR REPLACE PROCEDURE `getSuperviseurOfPlancher` (IN `_idPlancher` INT)  NO SQL
SELECT Utilisateurs.idUtilisateur,idTypeUtilisateur,prenomUtilisateur as prenom, nomUtilisateur as nom, alias, age,telephone,courriel,actif FROM `SuperviseursPlanchers` INNER JOIN Utilisateurs ON Utilisateurs.idUtilisateur=SuperviseursPlanchers.idUtilisateur
WHERE SuperviseursPlanchers.`idPlancher`= _idPlancher$$

CREATE OR REPLACE PROCEDURE `RemoveQuartTravail` (IN `_idQuartTravail` INT)  NO SQL
DELETE FROM QuartsTravail WHERE idQuartTravail=_idQuartTravail$$

CREATE OR REPLACE PROCEDURE `UpdateQuartTravail` (IN `_idQuartTravail` INT, IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME, IN `_confirme` TINYINT)  NO SQL
UPDATE QuartsTravail SET idPlancher=_idPlancher, idUtilisateur=_idUtilisateur, idRoleUtilisateur = _idRoleUtilisateur, debut = _debut, fin = _fin, confirme =_confirme
WHERE idQuartTravail=_idQuartTravail$$

--
-- Fonctions
--
CREATE OR REPLACE FUNCTION `CheckPassword` (`_alias` VARCHAR(45), `_motDePasse` VARCHAR(45)) RETURNS TINYINT(1) NO SQL
RETURN PASSWORD(_motDePasse) = (SELECT Utilisateurs.motDePasse FROM Utilisateurs WHERE Utilisateurs.alias=_alias)$$

DELIMITER ;
