USE projet;

DELETE FROM QuartsTravail;
ALTER TABLE QuartsTravail AUTO_INCREMENT = 1;
DELETE FROM RolesUtilisateurs;
ALTER TABLE RolesUtilisateurs AUTO_INCREMENT = 1;
DELETE FROM PostesDepenses;
ALTER TABLE PostesDepenses AUTO_INCREMENT = 1;
DELETE FROM Departements;
ALTER TABLE Departements AUTO_INCREMENT = 1;
DELETE FROM SuperviseursPlanchers;
ALTER TABLE SuperviseursPlanchers AUTO_INCREMENT = 1;
DELETE FROM Utilisateurs;
ALTER TABLE Utilisateurs AUTO_INCREMENT = 1;
DELETE FROM TypesUtilisateurs;
-- ALTER TABLE TypesUtilisateurs AUTO_INCREMENT = 0;
DELETE FROM Planchers;
ALTER TABLE Planchers AUTO_INCREMENT = 1;

INSERT INTO Planchers(nomPlancher) VALUES ('Plancher cuisine'); --1
INSERT INTO Planchers(nomPlancher) VALUES ('Plancher restaurant'); --2
INSERT INTO Planchers(nomPlancher) VALUES ('Plancher administration'); --3

INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (-1, '');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (1, 'superviseur');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (0, 'employé');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (2, 'directeur');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (3, 'administrateur');

-- AddUtilisateur(prenom, nom, alias, mot de passe, idTypeUtilisateur, idPlancher, age, telephone, courriel)
CALL AddUtilisateur('Steve',     'Administrateur1',          'Admin1', 'Test123', 3, 3, 23, 1234567890, 'courriel@email.com'); --1
CALL AddUtilisateur('Alexandre', 'Directeur1',               'Boss1',  'Test123', 2, 3, 23, 1234567890, 'courriel@email.com'); --2
CALL AddUtilisateur('Étienne',   'SuperviseurCuisine',       'Super1', 'Test123', 1, 1, 23, 1234567890, 'courriel@email.com'); --3
CALL AddUtilisateur('Alice',     'SuperviseurResto',         'Super2', 'Test123', 1, 2, 23, 1234567890, 'courriel@email.com'); --4
CALL AddUtilisateur('Alice',     'SuperviseurCuisine&Resto', 'Super3', 'Test123', 1, 2, 23, 1234567890, 'courriel@email.com'); --5
CALL AddUtilisateur('Sudo',      'Employé1',                 'Emp1',   'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --6
CALL AddUtilisateur('Sudo',      'Employé2',                 'Emp2',   'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --7
CALL AddUtilisateur('Sudo',      'Employé3',                 'Emp3',   'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --8
CALL AddUtilisateur('Sudo',      'Employé4',                 'Emp4',   'Test123', 0, 2, 23, 1234567890, 'courriel@email.com'); --9
CALL AddUtilisateur('Sudo',      'Employé5',                 'Emp5',   'Test123', 0, 2, 23, 1234567890, 'courriel@email.com'); --10
CALL AddUtilisateur('Sudo',      'Employé6',                 'Emp6',   'Test123', 0, 2, 23, 1234567890, 'courriel@email.com'); --11
CALL AddUtilisateur('Sudo',      'Employé7',                 'Emp7',   'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --12
CALL AddUtilisateur('Sudo',      'Employé8',                 'Emp8',   'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --13
CALL AddUtilisateur('Sudo',      'Employé9',                 'Emp9',   'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --14
CALL AddUtilisateur('Sudo',      'Employé10',                'Emp10',  'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --15
CALL AddUtilisateur('Sudo',      'Employé11',                'Emp11',  'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --16
CALL AddUtilisateur('Sudo',      'Employé12',                'Emp12',  'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --17
CALL AddUtilisateur('Sudo',      'Employé13',                'Emp13',  'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --18
CALL AddUtilisateur('Sudo',      'Employé14',                'Emp14',  'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --19
CALL AddUtilisateur('Sudo',      'Employé15',                'Emp15',  'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --20


INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (3, 1);
INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (4, 2);
INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (5, 1);
INSERT INTO SuperviseursPlanchers(idUtilisateur, idPlancher) VALUES (5, 2);

INSERT INTO Departements (nomDepartement) VALUES ('Restaurant'); -- 1

INSERT INTO PostesDepenses (nomPosteDepenses) VALUES ('Charge salariale'); -- 1

INSERT INTO RolesUtilisateurs (idPosteDepenses, idDepartement, nomRoleUtilisateur, couleur) VALUES (1, 1, 'Cuisinier', 'yellow'); --1
INSERT INTO RolesUtilisateurs (idPosteDepenses, idDepartement, nomRoleUtilisateur, couleur) VALUES (1, 1, 'Serveur', 'cyan'); --2
INSERT INTO RolesUtilisateurs (idPosteDepenses, idDepartement, nomRoleUtilisateur, couleur) VALUES (1, 1, 'Hôte', 'orange'); --3

-- AddQuartTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut, fin, confirme)
-- CALL AddQuartTravail(1, 6, 1, '2022-10-25 9:30' , '2022-10-25 12:30', 0);
-- CALL AddQuartTravail(1, 6, 1, '2022-10-26 9:30' , '2022-10-6 12:30', 0);
-- CALL AddQuartTravail(1, 6, 1, '2022-10-28 12:00', '2022-10-28 19:00', 0);
-- CALL AddQuartTravail(1, 7, 2, '2022-10-25 12:00', '2022-10-25 19:00', 0);
-- CALL AddQuartTravail(1, 7, 2, '2022-10-26 12:00', '2022-10-26 19:00', 0);
-- CALL AddQuartTravail(1, 7, 2, '2022-10-27 12:00', '2022-10-27 19:00', 0);
-- CALL AddQuartTravail(1, 7, 2, '2022-10-28 12:00', '2022-10-28 19:00', 0);
-- CALL AddQuartTravail(1, 8, 3, '2022-10-25 12:00', '2022-10-25 19:00', 0);
-- CALL AddQuartTravail(1, 8, 3, '2022-10-26 12:00', '2022-10-26 19:00', 0);
-- CALL AddQuartTravail(1, 8, 3, '2022-10-27 12:00', '2022-10-27 19:00', 0);
-- CALL AddQuartTravail(1, 8, 2, '2022-10-28 12:00', '2022-10-28 19:00', 0);
-- CALL AddQuartTravail(2, 12, 4, '2022-09-28 12:00', '2022-09-28 19:00', 0);
CALL AddQuartTravail(1, 6, 1, 1666704600000, 1666715400000, 1);
-- CALL AddQuartTravail(1, 6, 1, 1666704600000, 1666715400000, 1);
CALL AddQuartTravail(1, 6, 1, 1666972800000, 1666998000000, 1);
CALL AddQuartTravail(1, 7, 2, 1666713600000, 1666738800000, 1);
CALL AddQuartTravail(1, 7, 2, 1666800000000, 1666825200000, 1);
CALL AddQuartTravail(1, 7, 2, 1666886400000, 1666911600000, 1);
CALL AddQuartTravail(1, 7, 2, 1666972800000, 1666998000000, 1);
CALL AddQuartTravail(1, 8, 3, 1666713600000, 1666738800000, 1);
CALL AddQuartTravail(1, 8, 3, 1666800000000, 1666825200000, 1);
CALL AddQuartTravail(1, 8, 3, 1666886400000, 1666911600000, 1);
CALL AddQuartTravail(1, 8, 2, 1666972800000, 1666998000000, 1);
CALL AddQuartTravail(1, 3, 3, 1667278800000, 1667287800000, 1);
CALL AddQuartTravail(1, 7, 1, 1667278800000, 1667295000000, 1);
CALL AddQuartTravail(1, 12, 3, 1667278800000, 1667289600000, 1);
CALL AddQuartTravail(1, 16, 1, 1667278800000, 1667291400000, 1);
