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
-- AddUtilisateur(prenom, nom, alias, mot de passe, idTypeUtilisateur, idPlancher, age, telephone, courriel,actif)
CALL AddUtilisateur('pascal','ares','pares','Test123','3','3','23','4502804076','pascal.ares@calendrix.ca','1');
CALL AddUtilisateur('philippe','leger','pleger','Test123','2','3','26','5142397711','philippe.leger@calendrix.ca','1');
CALL AddUtilisateur('william','smith','wsmith','Test123','1','1','23','4502801234','william.smith@calendrix.ca','1');
CALL AddUtilisateur('alexandre','leger','aleger','Test123','1','1','21','5149982829','alexandre.leger@calendrix.ca','1');
CALL AddUtilisateur('amelia','boucher','aboucher','Test123','1','1','16','5142239801','amelia.boucher@calendrix.ca','1');
CALL AddUtilisateur('gabriel','proulx','gproulx','Test123','0','2','23','4509370091','gabriel.proulx@calendrix.ca','1');
CALL AddUtilisateur('samuel','auger','sauger','Test123','0','2','17','5145537894','samuel.auger@calendrix.ca','1');
CALL AddUtilisateur('emma','etienne','eetienne','Test123','0','1','25','5149756257','emma.etienne@calendrix.ca','1');
CALL AddUtilisateur('noah','lamarche','nlamarche','Test123','0','2','17','5148225945','noah.lamarche@calendrix.ca','1');
CALL AddUtilisateur('olivia','durocher','odurocher','Test123','0','1','29','5147106012','olivia.durocher@calendrix.ca','1');
CALL AddUtilisateur('william','tremblay','wtremblay','Test123','0','2','16','5149201542','william.tremblay@calendrix.ca','1');
CALL AddUtilisateur('alice','picher','apicher','Test123','0','1','23','5146131961','alice.picher@calendrix.ca','1');
CALL AddUtilisateur('thomas','saintclair','tsaintclair','Test123','0','2','15','5145113036','thomas.saintclair@calendrix.ca','1');
CALL AddUtilisateur('florence','vaillancourt','fvaillancourt','Test123','0','1','19','5142235537','florence.vaillancourt@calendrix.ca','1');
CALL AddUtilisateur('leo','major','lmajor','Test123','0','2','17','5147193772','leo.major@calendrix.ca','1');
CALL AddUtilisateur('charlie','brown','cbrown','Test123','0','1','25','5143520574','charlie.brown@calendrix.ca','1');
CALL AddUtilisateur('liam','neeson','lneeson','Test123','0','2','30','5142069666','liam.neeson@calendrix.ca','1');
CALL AddUtilisateur('livia','lafoest','llafoest','Test123','0','1','17','5146023298','livia.lafoest@calendrix.ca','1');
CALL AddUtilisateur('jacob','cloutier','jcloutier','Test123','0','2','25','5142943389','jacob.cloutier@calendrix.ca','1');
CALL AddUtilisateur('nathan','desjardins','ndesjardins','Test123','0','3','23','5147373464','nathan.desjardins@calendrix.ca','1');


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
