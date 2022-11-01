USE projet;

DELIMITER $$
--
-- Test Unitaires
--

CREATE OR REPLACE PROCEDURE `TestUnitaire`()  NO SQL
BEGIN
    DECLARE last_id INT DEFAULT -1;
    DECLARE currentTest INT DEFAULT 0;
    SET currentTest=(SELECT MAX(numTest) FROM TestUnitaire);
    IF (currentTest IS NULL) THEN SET currentTest=0;END IF;
    SET currentTest=currentTest +1;

    DELETE FROM QuartsTravail WHERE debut= '3022-09-17 03:00:00' AND fin = '3022-09-17 16:00:00';
    INSERT INTO `QuartsTravail` (`idPlancher`, `idUtilisateur`, `idRoleUtilisateur`, `debut`, `fin`) VALUES ('-1', '2', '1', '3022-09-17 03:00:00',  '3022-09-17 16:00:00');

    SET last_id = LAST_INSERT_ID();
    INSERT INTO TestUnitaire(numTest, fonction,description, params, estReussi) VALUES 
    /*  IsValidQuart  */
    (currentTest,'IsValidQuart','quart_avant',
        "(-1,2, '3022-09-16 22:00:00', '3022-09-16 2:00:00')",
        (SELECT IsValidQuart(-1,2, '3022-09-16 22:00:00','3022-09-16     2:00:00'))
    ),
    (currentTest,'IsValidQuart','quart_apres',"(-1,2, '3022-09-17 16:00:00','3022-09-16 23:00:00')",
        (SELECT IsValidQuart(-1,2,
            '3022-09-17 16:00:00','3022-09-16 23:00:00'))
    ),
    (currentTest,'IsValidQuart','dedans',
        "(-1,2,'3022-09-17 04:00:00','3022-09-17 14:00:00')",
        (SELECT 0 = IsValidQuart(-1,2,
            '3022-09-17 04:00:00','3022-09-17 14:00:00'))
    ),
    (currentTest,'IsValidQuart','même',
        "(-1,2, '3022-09-16 22:00:00', '3022-09-16 2:00:00')",
        (SELECT IsValidQuart(-1,2, '3022-09-16 22:00:00','3022-09-16     2:00:00'))
    ),
    (currentTest,'IsValidQuart','debut',
        "(-1,2,        '3022-09-17 10:00:00','3022-09-17 16:00:00)'",
        (SELECT 0= IsValidQuart(-1,2,
            '3022-09-17 10:00:00','3022-09-17 16:00:00'))
    ),
    (currentTest,'IsValidQuart','fin',
        "(-1,2,        '3022-09-17 01:00:00','3022-09-17 13:00:00')",
        (SELECT 0= IsValidQuart(-1,2,
            '3022-09-17 01:00:00','3022-09-17 13:00:00'))
    ),
    (currentTest,'IsValidQuart','encadre',
        "(-1,2,        '3022-09-17 01:00:00','3022-09-17 19:00:00')",
        (SELECT 0= IsValidQuart(-1,2,
            '3022-09-17 01:00:00','3022-09-17 19:00:00'))
    ),
    (currentTest,'IsValidQuart','finTouche',
        "(-1,2,        '3022-09-16 22:00:00','3022-09-17 3:00:00')",
        (SELECT IsValidQuart(-1,2,
            '3022-09-16 22:00:00','3022-09-17 3:00:00'))
    ),
    (currentTest,'IsValidQuart','debutTouche',
        "(-1,2,        '3022-09-17 16:00:00','3022-09-17 19:00:00')",
        (SELECT IsValidQuart(-1,2,
            '3022-09-17 16:00:00','3022-09-17 19:00:00'))
    ),
    (currentTest,'IsValidQuart','dedans_meme_id',
        CONCAT("(",last_id,",2,'3022-09-17 04:00:00','3022-09-17 14:00:00')"),
        (SELECT IsValidQuart(last_id,2,'3022-09-17 04:00:00','3022-09-17 14:00:00'))
    ),
    (currentTest,'IsValidQuart','quart_avant_meme_id',
        CONCAT("(",last_id,",2, '3022-09-16 22:00:00','3022-09-16 2:00:00')"),
        (SELECT IsValidQuart(last_id,2, '3022-09-16 22:00:00','3022-09-16 2:00:00'))
    ),
    (currentTest,'IsValidQuart','quart_apres_meme_id',
        CONCAT("(",last_id,",2,        '3022-09-17 16:00:00','3022-09-16 23:00:00')"),
        (SELECT IsValidQuart(last_id,2,
            '3022-09-17 16:00:00','3022-09-16 23:00:00'))
    );

    SELECT fonction, description ,params, estReussi FROM TestUnitaire WHERE TestUnitaire.numTest=currentTest;
END$$

CREATE OR REPLACE PROCEDURE `TestAddQuartTravailAndTrigger`()  NO SQL
BEGIN
    DELETE FROM QuartsTravail WHERE idPlancher=-1 AND idUtilisateur = 3 AND debut= '2022-09-17 03:00:00' AND fin = '2022-09-17 16:00:00';
    INSERT INTO `QuartsTravail` (`idPlancher`, `idUtilisateur`, `idRoleUtilisateur`, `debut`, `fin`) VALUES ('-1', '2', '1', '2022-09-17 03:00:00',  '2022-09-17 16:00:00');
    CREATE OR REPLACE TABLE Resultat(description VARCHAR(20),estReussi INT);
    /* À faire */
    INSERT INTO Resultat VALUES('quart_avant',(SELECT 0= IsValidQuart(-1,3,
    '2022-09-16 22:00:00','2022-09-16 2:00:00')));
    INSERT INTO Resultat VALUES('quart_apres',(SELECT 0= IsValidQuart(-1,3,
    '2022-09-17 16:00:00','2022-09-16 23:00:00')));
    INSERT INTO Resultat VALUES('dedans',(SELECT 0!= IsValidQuart(-1,3,
    '2022-09-17 04:00:00','2022-09-17 14:00:00')));
    INSERT INTO Resultat VALUES('même',(SELECT 0!= IsValidQuart(-1,3,
    '2022-09-17 03:00:00','2022-09-17 16:00:00')));
    INSERT INTO Resultat VALUES('debut',(SELECT 0!= IsValidQuart(-1,3,
    '2022-09-17 10:00:00','2022-09-17 16:00:00')));
    INSERT INTO Resultat VALUES('fin',(SELECT 0!= IsValidQuart(-1,3,
    '2022-09-17 01:00:00','2022-09-17 13:00:00')));
    INSERT INTO Resultat VALUES('encadre',(SELECT 0!= IsValidQuart(-1,3,
    '2022-09-17 01:00:00','2022-09-17 19:00:00')));
    INSERT INTO Resultat VALUES('finTouche',(SELECT 0= IsValidQuart(-1,3,
    '2022-09-16 22:00:00','2022-09-17 3:00:00')));
    INSERT INTO Resultat VALUES('debutTouche',(SELECT 0= IsValidQuart(-1,3,
    '2022-09-17 015:00:00','2022-09-17 19:00:00')));
    INSERT INTO Resultat VALUES('dedans_meme_id',(SELECT 0= IsValidQuart(2,3,
    '2022-09-17 04:00:00','2022-09-17 14:00:00')));
    INSERT INTO Resultat VALUES('quart_avant_meme_id',(SELECT 0= IsValidQuart(2,3,
    '2022-09-16 22:00:00','2022-09-16 2:00:00')));
    INSERT INTO Resultat VALUES('quart_apres_meme_id',(SELECT 0= IsValidQuart(2,3,
    '2022-09-17 16:00:00','2022-09-16 23:00:00')));

    SELECT * FROM Resultat;
    DROP TABLE Resultat;

END $$

DELIMITER ;