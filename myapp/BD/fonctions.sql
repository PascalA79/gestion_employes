DELIMITER $$
CREATE DEFINER=`pascala79`@`%` FUNCTION `CheckPassword`(`_alias` VARCHAR(45), `_motDePasse` VARCHAR(45)) RETURNS tinyint(1)
    NO SQL
RETURN PASSWORD(_motDePasse) = (SELECT Utilisateurs.motDePasse FROM Utilisateurs WHERE Utilisateurs.alias=_alias)$$
DELIMITER ;