USE projet;

DELIMITER $$
--
-- Procédures
--
CREATE OR REPLACE PROCEDURE `AddQuartTravail` (IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` BIGINT, IN `_fin` BIGINT, IN `_confirme` TINYINT)  NO SQL
BEGIN
    INSERT INTO QuartsTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut ,fin,confirme)
    VALUES(_idPlancher, _idUtilisateur, _idRoleUtilisateur, _debut, _fin, 0);
    SELECT * FROM QuartsTravail WHERE idQuartTravail=(SELECT LAST_INSERT_ID());
END $$

CREATE OR REPLACE PROCEDURE `AddUtilisateur`(IN `_prenomUtilisateur` VARCHAR(45), IN `_nomUtilisateur` VARCHAR(45), IN `_alias` VARCHAR(45), IN `_motDePasse` VARCHAR(45), IN `_idTypeUtilisateur` INT, IN `_idPlancher` INT, IN `_age` INT, IN `_telephone` VARCHAR(11), IN `_courriel` VARCHAR(150), IN `_actif` TINYINT)
    NO SQL
BEGIN
DECLARE hash_password varchar(255);
SET hash_password=PASSWORD(_motDePasse);
INSERT INTO Utilisateurs(prenomUtilisateur, nomUtilisateur, alias, motDePasse, idTypeUtilisateur, idPlancher, age, telephone, courriel,actif) VALUES(_prenomUtilisateur,_nomUtilisateur,_alias,hash_password,_idTypeUtilisateur,_idPlancher,_age,_telephone,_courriel,_actif);
END$$

CREATE OR REPLACE PROCEDURE `GetAllPlanchers` ()  NO SQL
SELECT * FROM Planchers $$

CREATE OR REPLACE PROCEDURE `GetAllRoles` ()  NO SQL
SELECT * FROM RolesUtilisateurs $$

CREATE OR REPLACE PROCEDURE `GetPlanchersBySuperviseur` (IN `userid` INT)  NO SQL
SELECT Planchers.idPlancher, Planchers.nomPlancher FROM Planchers
INNER JOIN SuperviseursPlanchers
ON Planchers.idPlancher = SuperviseursPlanchers.idPlancher
INNER JOIN Utilisateurs
ON SuperviseursPlanchers.idUtilisateur = Utilisateurs.idUtilisateur
WHERE Utilisateurs.idUtilisateur = userid $$

CREATE OR REPLACE PROCEDURE `GetQuartsByPlancher` (IN `_idPlancher` INT, IN `_debut` BIGINT, IN `_fin` BIGINT)  NO SQL
SELECT Utilisateurs.idUtilisateur,Utilisateurs.alias,Utilisateurs.prenomUtilisateur as prenom,Utilisateurs.nomUtilisateur as nom, debut,fin FROM QuartsTravail INNER JOIN Utilisateurs
ON Utilisateurs.idUtilisateur = QuartsTravail.idUtilisateur
WHERE QuartsTravail.idPlancher=_idPlancher AND debut>=_debut AND fin<=_fin $$

CREATE OR REPLACE PROCEDURE `GetQuartsByUser` (IN `_idUtilisateur` INT, IN `_debut` BIGINT, IN `_fin` BIGINT)  NO SQL
SELECT * FROM QuartsTravail 
WHERE idUtilisateur=_idUtilisateur AND debut>=_debut AND fin<=_fin $$

CREATE OR REPLACE PROCEDURE `getSuperviseurOfPlancher` (IN `_idPlancher` INT)  NO SQL
SELECT Utilisateurs.idUtilisateur,idTypeUtilisateur,prenomUtilisateur as prenom, nomUtilisateur as nom, alias, age,telephone,courriel,actif FROM `SuperviseursPlanchers` INNER JOIN Utilisateurs ON Utilisateurs.idUtilisateur=SuperviseursPlanchers.idUtilisateur
WHERE SuperviseursPlanchers.`idPlancher`= _idPlancher $$

CREATE OR REPLACE PROCEDURE `RemoveQuartTravail` (IN `_idQuartTravail` INT)  NO SQL
DELETE FROM QuartsTravail WHERE idQuartTravail=_idQuartTravail $$

CREATE OR REPLACE PROCEDURE `UpdateQuartTravail` (IN `_idQuartTravail` INT, IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` BIGINT, IN `_fin` BIGINT, IN `_confirme` TINYINT)  NO SQL
UPDATE QuartsTravail SET idPlancher=_idPlancher, idUtilisateur=_idUtilisateur, idRoleUtilisateur = _idRoleUtilisateur, debut = _debut, fin = _fin, confirme =_confirme
WHERE idQuartTravail=_idQuartTravail$$


CREATE OR REPLACE PROCEDURE `GetListEmployes`(IN `_idUtilisateur` INT) NO SQL
BEGIN
DECLARE varIdTypeUtilisateur INT;
SET varIdTypeUtilisateur=(SELECT idTypeUtilisateur FROM Utilisateurs WHERE idUtilisateur=_idUtilisateur);

IF varIdTypeUtilisateur=1 THEN
   
    SELECT Utilisateurs.idUtilisateur as id, Utilisateurs.idTypeUtilisateur,TypesUtilisateurs.nomTypeUtilisateur, Planchers.nomPlancher, Utilisateurs.idPlancher,prenomUtilisateur as prenom, nomUtilisateur as nom, alias, age, telephone, courriel, actif FROM Utilisateurs INNER JOIN Planchers ON 
    Utilisateurs.idPlancher = Planchers.idPlancher
INNER  JOIN TypesUtilisateurs ON 
TypesUtilisateurs.idTypeUtilisateur=Utilisateurs.idTypeUtilisateur WHERE 
    actif=1 AND SuperviseursPlanchers.idUtilisateur = _idUtilisateur;
END IF;
IF varIdTypeUtilisateur>=2 THEN
    SELECT Utilisateurs.idUtilisateur as id, Utilisateurs.idTypeUtilisateur,TypesUtilisateurs.nomTypeUtilisateur, Planchers.nomPlancher, Utilisateurs.idPlancher,prenomUtilisateur as prenom, nomUtilisateur as nom, alias, age, telephone, courriel, actif FROM Utilisateurs INNER JOIN Planchers ON 
    Utilisateurs.idPlancher = Planchers.idPlancher
INNER  JOIN TypesUtilisateurs ON 
TypesUtilisateurs.idTypeUtilisateur=Utilisateurs.idTypeUtilisateur;
END IF;
END $$

DELIMITER $$
CREATE OR REPLACE PROCEDURE `UpdatePassword`(IN `_alias` VARCHAR(45), IN `_newPassword` VARCHAR(45))
    NO SQL
BEGIN
DECLARE hash_password varchar(255);
SET hash_password=PASSWORD(_newPassword);
UPDATE Utilisateurs SET motDePasse=hash_password WHERE alias=_alias;
END$$

DELIMITER ;
CREATE OR REPLACE PROCEDURE `UpdateUtilisateur`(IN `_id` INT, IN `_idTypeUtilisateur` INT, IN `_idPlancher` INT, IN `_prenom` VARCHAR(45), IN `_nom` VARCHAR(45), IN `_alias` VARCHAR(45), IN `_age` INT, IN `_telephone` VARCHAR(11), IN `_courriel` VARCHAR(150), IN `_actif` TINYINT)
    NO SQL
UPDATE Utilisateurs SET idTypeUtilisateur=_idTypeUtilisateur, idPlancher=_idPlancher, prenomUtilisateur=_prenom,nomUtilisateur=_nom, alias=_alias, age=_age,telephone=_telephone, courriel=_courriel, actif=_actif
WHERE idUtilisateur=_id$$
DELIMITER ;
--
-- Trigger
--
DELIMITER $$
CREATE OR REPLACE TRIGGER `BeforeInsertQuartsTravail` BEFORE INSERT ON `QuartsTravail`
    FOR EACH ROW BEGIN
        DECLARE isInvalid INT;
        SET isInvalid=(SELECT IsValidQuart(NEW.idQuartTravail, NEW.idUtilisateur, 
        NEW.debut, NEW.fin));
        IF(isInvalid>0) THEN
            SIGNAL sqlstate '45001' set message_text = "Ajout du QuartsTravail impossible!";
        END IF;
END $$

CREATE OR REPLACE TRIGGER `BeforeUpdateQuartsTravail` BEFORE UPDATE ON `QuartsTravail`
    FOR EACH ROW BEGIN
        DECLARE isInvalid INT;
        SET isInvalid=(SELECT IsValidQuart(NEW.idQuartTravail, NEW.idUtilisateur, NEW.debut, NEW.fin));
        IF(isInvalid>0) THEN
            SIGNAL sqlstate '45002' set message_text = "Modification du QuartsTravail impossible!";
        END IF;
END $$
DELIMITER ;

--
-- Fonctions
--
DELIMITER $$
CREATE OR REPLACE FUNCTION `CheckPassword` (`_alias` VARCHAR(45), `_motDePasse` VARCHAR(45)) RETURNS TINYINT(1) NO SQL
RETURN PASSWORD(_motDePasse) = (SELECT Utilisateurs.motDePasse FROM Utilisateurs WHERE Utilisateurs.alias=_alias) $$


DELIMITER $$
CREATE OR REPLACE FUNCTION `IsValidQuart`(`_idQuartTravail` INT, `_idUtilisateur` INT, `_debutQuart` BIGINT, `_finQuart` BIGINT) RETURNS tinyint(11) NO SQL
RETURN (
    SELECT COUNT(QuartsTravail.idQuartTravail) AS result FROM QuartsTravail 
    WHERE QuartsTravail.idUtilisateur=_idUtilisateur AND
    QuartsTravail.idQuartTravail!=_idQuartTravail AND
    (
    (_debutQuart>=QuartsTravail.debut AND
    _debutQuart<QuartsTravail.fin)
    OR
    (_finQuart>QuartsTravail.debut AND 
    _finQuart<=QuartsTravail.fin)
    OR
    (_debutQuart<=QuartsTravail.debut AND 
    _finQuart>=QuartsTravail.fin)
    )
   )$$
DELIMITER ;

SELECT IsValidQuart(-1, 6, 3000000000, 3000000001);
