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
ALTER TABLE TypesUtilisateurs AUTO_INCREMENT = 1;
DELETE FROM Planchers;
ALTER TABLE Planchers AUTO_INCREMENT = 1;

INSERT INTO Planchers(nomPlancher) VALUES ('Plancher cuisine'); --1
INSERT INTO Planchers(nomPlancher) VALUES ('Plancher restaurant'); --2
INSERT INTO Planchers(nomPlancher) VALUES ('Plancher administration'); --3

INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (-1, '');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (0, 'employé');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (1, 'superviseur');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (2, 'directeur');
INSERT INTO TypesUtilisateurs(idTypeUtilisateur, nomTypeUtilisateur) VALUES (3, 'administrateur');

-- AddUser(prenom, nom, alias, mot de passe, idTypeUtilisateur, idPlancher, age, telephone, courriel)
CALL AddUser('Steve', 'Administrateur1', 'Admin1', 'Test123', 3, 3, 23, 1234567890, 'courriel@email.com'); --1
CALL AddUser('Alexandre', 'Directeur1', 'Boss1', 'Test123', 2, 3, 23, 1234567890, 'courriel@email.com'); --2
CALL AddUser('Étienne', 'SuperviseurCuisine', 'Super1', 'Test123', 1, 1, 23, 1234567890, 'courriel@email.com'); --3
CALL AddUser('Alice', 'SuperviseurResto', 'Super2', 'Test123', 1, 2, 23, 1234567890, 'courriel@email.com'); --4
CALL AddUser('Alice', 'SuperviseurCuisine&Resto', 'Super3', 'Test123', 1, 2, 23, 1234567890, 'courriel@email.com'); --5
CALL AddUser('Sudo', 'Employé1', 'Emp1', 'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --6
CALL AddUser('Sudo', 'Employé2', 'Emp2', 'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --7
CALL AddUser('Sudo', 'Employé3', 'Emp3', 'Test123', 0, 1, 23, 1234567890, 'courriel@email.com'); --8
CALL AddUser('Sudo', 'Employé4', 'Emp4', 'Test123', 0, 2, 23, 1234567890, 'courriel@email.com'); --9
CALL AddUser('Sudo', 'Employé5', 'Emp5', 'Test123', 0, 2, 23, 1234567890, 'courriel@email.com'); --10
CALL AddUser('Sudo', 'Employé6', 'Emp6', 'Test123', 0, 2, 23, 1234567890, 'courriel@email.com'); --11

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
CALL AddQuartTravail(1, 6, 1, '2022-10-25 9:30' , '2022-10-25 12:30', 0);
CALL AddQuartTravail(1, 6, 1, '2022-10-25 9:30' , '2022-10-25 12:30', 0);
CALL AddQuartTravail(1, 6, 1, '2022-10-28 12:00', '2022-10-28 19:00', 0);
CALL AddQuartTravail(1, 7, 2, '2022-10-25 12:00', '2022-10-25 19:00', 0);
CALL AddQuartTravail(1, 7, 2, '2022-10-26 12:00', '2022-10-26 19:00', 0);
CALL AddQuartTravail(1, 7, 2, '2022-10-27 12:00', '2022-10-27 19:00', 0);
CALL AddQuartTravail(1, 7, 2, '2022-10-28 12:00', '2022-10-28 19:00', 0);
CALL AddQuartTravail(1, 8, 3, '2022-10-25 12:00', '2022-10-25 19:00', 0);
CALL AddQuartTravail(1, 8, 3, '2022-10-26 12:00', '2022-10-26 19:00', 0);
CALL AddQuartTravail(1, 8, 3, '2022-10-27 12:00', '2022-10-27 19:00', 0);
CALL AddQuartTravail(1, 8, 2, '2022-10-28 12:00', '2022-10-28 19:00', 0);
-- CALL AddQuartTravail(2, 12, 4, '2022-09-28 12:00', '2022-09-28 19:00', 0);
