USE projet;



INSERT INTO Planchers(nomPlancher) VALUES ('Plancher cuisine'); --1
INSERT INTO Planchers(nomPlancher) VALUES ('Plancher restaurant'); --2
INSERT INTO Planchers(nomPlancher) VALUES ('Plancher administration'); --3

CALL AddUser('prenom', 'nom', 'alias', 'Test123', 1, 1, 23, 1234567890, 'courriel@email.com'); --6
CALL AddUser('prenom1', 'nom1', 'alias1', 'Test123', 1, 1, 23, 1234567890, 'courriel@email.com'); --7
CALL AddUser('prenom2', 'nom2', 'alias2', 'Test123', 1, 1, 23, 1234567890, 'courriel@email.com'); --8
CALL AddUser('prenom3', 'nom3', 'alias3', 'Test123', 1, 2, 23, 1234567890, 'courriel@email.com'); --9
CALL AddUser('prenom4', 'nom4', 'alias4', 'Test123', 1, 2, 23, 1234567890, 'courriel@email.com'); --10
CALL AddUser('prenom5', 'nom5', 'alias5', 'Test123', 2, 3, 23, 1234567890, 'courriel@email.com'); --11
CALL AddUser('prenom6', 'nom6', 'alias6', 'Test123', 2, 2, 23, 1234567890, 'courriel@email.com'); --12

INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (11, 1);
INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (11, 2);
INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (12, 1);

INSERT INTO Departements (nomDepartement) VALUES ('Restaurant'); -- 3

INSERT INTO PostesDepenses (nomPosteDepenses) VALUES ('Charge salariale'); -- 1

INSERT INTO RolesUtilisateurs (idPosteDepenses, idDepartement, nomRoleUtilisateur, couleur) VALUES (1, 3, 'Cuisinier', 'yellow'); --2
INSERT INTO RolesUtilisateurs (idPosteDepenses, idDepartement, nomRoleUtilisateur, couleur) VALUES (1, 3, 'Serveur', 'cyan'); --3
INSERT INTO RolesUtilisateurs (idPosteDepenses, idDepartement, nomRoleUtilisateur, couleur) VALUES (1, 3, 'Hôte', 'orange'); --4

CALL AddQuartTravail(1, 6, 2, '2022-09-25 9:30', '2022-09-25 12:30', 0);
CALL AddQuartTravail(1, 6, 2, '2022-09-28 12:00', '2022-09-28 19:00', 0);
CALL AddQuartTravail(1, 7, 3, '2022-09-25 12:00', '2022-09-25 19:00', 0);
CALL AddQuartTravail(1, 7, 3, '2022-09-26 12:00', '2022-09-26 19:00', 0);
CALL AddQuartTravail(1, 7, 3, '2022-09-27 12:00', '2022-09-27 19:00', 0);
CALL AddQuartTravail(1, 7, 3, '2022-09-28 12:00', '2022-09-28 19:00', 0);
CALL AddQuartTravail(1, 8, 4, '2022-09-25 12:00', '2022-09-25 19:00', 0);
CALL AddQuartTravail(1, 8, 4, '2022-09-26 12:00', '2022-09-26 19:00', 0);
CALL AddQuartTravail(1, 8, 4, '2022-09-27 12:00', '2022-09-27 19:00', 0);
CALL AddQuartTravail(1, 8, 3, '2022-09-28 12:00', '2022-09-28 19:00', 0);
CALL AddQuartTravail(2, 12, 4, '2022-09-28 12:00', '2022-09-28 19:00', 0);
