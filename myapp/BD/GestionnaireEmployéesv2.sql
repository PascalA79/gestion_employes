DROP DATABASE IF EXISTS GestionnaireEmployes;

CREATE DATABASE GestionnaireEmployes;
USE GestionnaireEmployes;

CREATE OR REPLACE TABLE TypesUtilisateurs(
    idTypeUtilisateur INT NOT NULL AUTO_INCREMENT,
    nomTypeUtilisateur VARCHAR(45) NOT NULL,
    PRIMARY KEY (idTypeUtilisateur)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE PostesDepenses(
    idPosteDepenses INT NOT NULL AUTO_INCREMENT,
    nomPosteDepenses VARCHAR(45) NOT NULL,
    PRIMARY KEY (idPosteDepenses)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE Departements(
    idDepartement INT NOT NULL AUTO_INCREMENT,
    nomDepartement VARCHAR(45) NOT NULL,
    PRIMARY KEY (idDepartement)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE RolesUtilisateurs(
    idRoleUtilisateur INT NOT NULL AUTO_INCREMENT,
    idPosteDepenses INT NOT NULL,
    idDepartement INT NOT NULL,
    nomRoleUtilisateur VARCHAR(45) NOT NULL,
    PRIMARY KEY (idRoleUtilisateur),
    FOREIGN KEY FK_RolesUtilisateurs_PostesDepenses (idPosteDepenses) REFERENCES PostesDepenses(idPosteDepenses),
    FOREIGN KEY FK_RolesUtilisateurs_Departements (idDepartement) REFERENCES Departements(idDepartement)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE Planchers(
    idPlancher INT NOT NULL AUTO_INCREMENT,
    nomPlancher VARCHAR(45),
    PRIMARY KEY (idPlancher)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE Utilisateurs(
    idUtilisateur INT NOT NULL AUTO_INCREMENT,
    idTypeUtilisateur INT NOT NULL,
    idPlancher INT NOT NULL,
    prenomUtilisateur VARCHAR(45) NOT NULL,
    nomUtilisateur VARCHAR(45) NOT NULL,
    alias VARCHAR(45) NOT NULL UNIQUE,
    motDePasse VARCHAR(255) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,
    telephone VARCHAR(11) NOT NULL,
    courriel VARCHAR(150),
    actif BIT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idUtilisateur),
    FOREIGN KEY FK_Utilisateurs_TypesUtilisateurs (idTypeUtilisateur) REFERENCES TypesUtilisateurs(idTypeUtilisateur),
    FOREIGN KEY FK_Utilisateurs_Planchers (idPlancher) REFERENCES Planchers(idPlancher),
    CONSTRAINT CK_Age CHECK (age > 13 AND age < 120)
) ENGINE=INNODB;


-- Horaires
-- ---------------------------------------------------------------------
CREATE OR REPLACE TABLE SuperviseursPlanchers(
    idUtilisateur INT NOT NULL,
    idPlancher INT NOT NULL,
    PRIMARY KEY (idUtilisateur, idPlancher),
    FOREIGN KEY FK_SuperviseursPlanchers_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs(idUtilisateur),
    FOREIGN KEY FK_SuperviseursPlanchers_Planchers (idPlancher) REFERENCES Planchers(idPlancher)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE TauxHoraires(
    idTauxHoraire INT NOT NULL AUTO_INCREMENT,
    idUtilisateur INT NOT NULL,
    idRoleUtilisateur INT NOT NULL,
    tauxHoraire INT NOT NULL,
    PRIMARY KEY (idUtilisateur, idRoleUtilisateur),
    FOREIGN KEY FK_TauxHoraires_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs(idUtilisateur),
    FOREIGN KEY FK_TauxHoraires_RolesUtilisateurs (idRoleUtilisateur) REFERENCES RolesUtilisateurs(idRoleUtilisateur),
    CONSTRAINT CK_tauxHoraire CHECK (tauxHoraire >= 1425)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE RequisPlancher(
    idRequisPlancher INT NOT NULL AUTO_INCREMENT,
    idPlancher INT NOT NULL,
    idRoleUtilisateur INT NOT NULL,
    debut DATETIME NOT NULL,
    fin DATETIME NOT NULL,
    quantite INT NOT NULL,
    PRIMARY KEY (idRequisPlancher),
    FOREIGN KEY FK_RequisPlancher_Plancher (idPlancher) REFERENCES Planchers(idPlancher),
    FOREIGN KEY FK_RequisPlancher_RolesUtilisateurs (idRoleUtilisateur) REFERENCES RolesUtilisateurs(idRoleUtilisateur),
    CONSTRAINT CK_quantite CHECK (quantite >= 0),
    CONSTRAINT CK_debut_fin CHECK (debut < fin)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE QuartsTravail(
    idQuartTravail INT NOT NULL AUTO_INCREMENT,
    idPlancher INT NOT NULL,
    idUtilisateur INT NOT NULL,
    idRoleUtilisateur INT NOT NULL,
    debut DATETIME NOT NULL,
    fin DATETIME NOT NULL,
    confirme BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (idQuartTravail),
    FOREIGN KEY FK_QuartsTravail_Plancher (idPlancher) REFERENCES Planchers(idPlancher),
    FOREIGN KEY FK_QuartsTravail_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs(idUtilisateur),
    FOREIGN KEY FK_QuartsTravail_RolesUtilisateurs (idRoleUtilisateur) REFERENCES RolesUtilisateurs(idRoleUtilisateur),
    CONSTRAINT CK_debut_fin CHECK (debut < fin)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE Poincons(
    idPoincon INT NOT NULL AUTO_INCREMENT,
    idUtilisateur INT NOT NULL,
    temps DATETIME NOT NULL,
    PRIMARY KEY(idPoincon),
    FOREIGN KEY FK_Poincons_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs(idUtilisateur)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE Disponibilites(
    idDisponibilite INT NOT NULL AUTO_INCREMENT,
    idUtilisateur INT NOT NULL,
    debut DATETIME NOT NULL,
    fin DATETIME NOT NULL,
    confirme BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(idDisponibilite),
    FOREIGN KEY FK_Disponibilites_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur),
    CONSTRAINT CK_debut_fin CHECK (debut < fin)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE Conges(
    idConge INT NOT NULL AUTO_INCREMENT,
    idUtilisateur INT NOT NULL,
    dateConge DATE NOT NULL,
    confirme BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (idConge),
    FOREIGN KEY FK_Conges_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur)
) ENGINE=INNODB;


-- Clavardage
-- ---------------------------------------------------------------------
CREATE OR REPLACE TABLE Conversations(
    idConversation INT NOT NULL AUTO_INCREMENT,
    idUtilisateurCreateur INT NOT NULL,
    nomConversation VARCHAR(45) NOT NULL,
    PRIMARY KEY (idConversation),
    FOREIGN KEY FK_Conversations_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE ParticipantsConversations(
    idConversation INT NOT NULL,
    idUtilisateur INT NOT NULL,
    PRIMARY KEY (idConversation, idUtilisateur),
    FOREIGN KEY FK_ParticipantsConversations_Conversations (idConversation) REFERENCES Conversations (idConversation),
    FOREIGN KEY FK_ParticipantsConversations_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE MessagesConversations(
    idMessageConvo INT NOT NULL AUTO_INCREMENT,
    idConversation INT NOT NULL,
    idUtilisateur INT NOT NULL,
    dateTexto DATETIME NOT NULL,
    texte VARCHAR(500) NOT NULL,
    PRIMARY KEY (idMessageConvo),
    FOREIGN KEY FK_MessagesConversations_Conversations (idConversation) REFERENCES Conversations (idConversation),
    FOREIGN KEY FK_MessagesConversations_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur)
) ENGINE=INNODB;


-- Messagerie interne
-- ---------------------------------------------------------------------
CREATE OR REPLACE TABLE MessagesInternes(
    idMessageInterne INT NOT NULL AUTO_INCREMENT,
    idUtilisateur INT NOT NULL,
    dateMessage DATETIME NOT NULL,
    objet VARCHAR(45) NOT NULL,
    texte VARCHAR(2000) NOT NULL,
    important BIT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(idMessageInterne),
    FOREIGN KEY FK_MessagesInternes_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur)
) ENGINE=INNODB;

CREATE OR REPLACE TABLE DestinatairesMessages(
    idUtilisateur INT NOT NULL,
    idMessageInterne INT NOT NULL,
    statusMessage TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (idUtilisateur, idMessageInterne),
    FOREIGN KEY FK_DestinatairesMessages_Utilisateurs (idUtilisateur) REFERENCES Utilisateurs (idUtilisateur),
    FOREIGN KEY FK_DestinatairesMessages_MessagesInternes (idMessageInterne) REFERENCES MessagesInternes (idMessageInterne)
) ENGINE=INNODB;