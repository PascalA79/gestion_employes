-- Contient la création des tables et des procédures stocké de la base de donnée


-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 28 Septembre 2022 à 15:00
-- Version du serveur :  10.3.36-MariaDB-0+deb10u1
-- Version de PHP :  7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projet`
--
USE projet


DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`projet`@`%` PROCEDURE `AddQuartTravail` (IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME, IN `_confirme` TINYINT)  NO SQL
BEGIN
INSERT INTO QuartsTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut ,fin ,confirme) VALUES(_idPlancher, _idUtilisateur, _idRoleUtilisateur, _debut, _fin, _confirme);
SELECT LAST_INSERT_ID() as id;
END$$

CREATE DEFINER=`projet`@`%` PROCEDURE `AddUser` (IN `_prenomUtilisateur` VARCHAR(45), IN `_nomUtilisateur` VARCHAR(45), IN `_alias` VARCHAR(45), IN `_motDePasse` VARCHAR(45), IN `_idTypeUtilisateur` INT, IN `_idPlancher` INT, IN `_age` INT, IN `_telephone` VARCHAR(11), IN `_courriel` VARCHAR(150))  NO SQL
BEGIN
DECLARE hash_password varchar(255);
SET hash_password=PASSWORD(_motDePasse);
INSERT INTO Utilisateurs(prenomUtilisateur, nomUtilisateur, alias, motDePasse, idTypeUtilisateur, idPlancher, age, telephone, courriel) VALUES(_prenomUtilisateur,_nomUtilisateur,_alias,hash_password,_idTypeUtilisateur,_idPlancher,_age,_telephone,_courriel);
END$$

CREATE DEFINER=`projet`@`%` PROCEDURE `GetAllPlanchers` ()  NO SQL
SELECT * FROM Planchers$$

CREATE DEFINER=`projet`@`%` PROCEDURE `GetPlanchersBySuperviseur` (IN `userid` INT)  NO SQL
SELECT Planchers.idPlancher, Planchers.nomPlancher FROM Planchers
INNER JOIN SuperviseursPlanchers
ON Planchers.idPlancher = SuperviseursPlanchers.idPlancher
INNER JOIN Utilisateurs
ON SuperviseursPlanchers.idUtilisateur = Utilisateurs.idUtilisateur
WHERE Utilisateurs.idUtilisateur = userid$$

CREATE DEFINER=`projet`@`%` PROCEDURE `GetQuartsByPlancher` (IN `_idPlancher` INT, IN `_debut` DATETIME, IN `_fin` DATETIME)  NO SQL
SELECT Utilisateurs.idUtilisateur,Utilisateurs.alias,Utilisateurs.prenomUtilisateur as prenom,Utilisateurs.nomUtilisateur as nom, debut,fin FROM QuartsTravail INNER JOIN Utilisateurs
ON Utilisateurs.idUtilisateur = QuartsTravail.idUtilisateur
WHERE QuartsTravail.idPlancher=_idPlancher AND debut>=_debut AND fin<=_fin$$

CREATE DEFINER=`projet`@`%` PROCEDURE `GetQuartsByUser` (IN `_idUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME)  NO SQL
SELECT debut,fin FROM QuartsTravail WHERE idUtilisateur=_idUtilisateur AND debut>=_debut AND fin<=_fin$$

CREATE DEFINER=`projet`@`%` PROCEDURE `getSuperviseurOfPlancher` (IN `_idPlancher` INT)  NO SQL
SELECT Utilisateurs.idUtilisateur,idTypeUtilisateur,prenomUtilisateur as prenom, nomUtilisateur as nom, alias, age,telephone,courriel,actif FROM `SuperviseursPlanchers` INNER JOIN Utilisateurs ON Utilisateurs.idUtilisateur=SuperviseursPlanchers.idUtilisateur
WHERE SuperviseursPlanchers.`idPlancher`= _idPlancher$$

CREATE DEFINER=`projet`@`%` PROCEDURE `RemoveQuartTravail` (IN `_idQuartTravail` INT)  NO SQL
DELETE FROM QuartsTravail WHERE idQuartTravail=_idQuartTravail$$

CREATE DEFINER=`projet`@`%` PROCEDURE `UpdateQuartTravail` (IN `_idQuartTravail` INT, IN `_idPlancher` INT, IN `_idUtilisateur` INT, IN `_idRoleUtilisateur` INT, IN `_debut` DATETIME, IN `_fin` DATETIME, IN `_confirme` TINYINT)  NO SQL
UPDATE QuartsTravail SET idPlancher=_idPlancher, idUtilisateur=_idUtilisateur, idRoleUtilisateur = _idRoleUtilisateur, debut = _debut, fin = _fin, confirme =_confirme
WHERE idQuartTravail=_idQuartTravail$$

--
-- Fonctions
--
CREATE DEFINER=`projet`@`%` FUNCTION `CheckPassword` (`_alias` VARCHAR(45), `_motDePasse` VARCHAR(45)) RETURNS TINYINT(1) NO SQL
RETURN PASSWORD(_motDePasse) = (SELECT Utilisateurs.motDePasse FROM Utilisateurs WHERE Utilisateurs.alias=_alias)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `Conges`
--

CREATE TABLE `Conges` (
  `idConge` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `dateConge` date NOT NULL,
  `confirme` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Conversations`
--

CREATE TABLE `Conversations` (
  `idConversation` int(11) NOT NULL,
  `idUtilisateurCreateur` int(11) NOT NULL,
  `nomConversation` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Departements`
--

CREATE TABLE `Departements` (
  `idDepartement` int(11) NOT NULL,
  `nomDepartement` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `DestinatairesMessages`
--

CREATE TABLE `DestinatairesMessages` (
  `idUtilisateur` int(11) NOT NULL,
  `idMessageInterne` int(11) NOT NULL,
  `statusMessage` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Disponibilites`
--

CREATE TABLE `Disponibilites` (
  `idDisponibilite` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `confirme` bit(1) NOT NULL DEFAULT b'0'
) ;

-- --------------------------------------------------------

--
-- Structure de la table `MessagesConversations`
--

CREATE TABLE `MessagesConversations` (
  `idMessageConvo` int(11) NOT NULL,
  `idConversation` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `dateTexto` datetime NOT NULL,
  `texte` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `MessagesInternes`
--

CREATE TABLE `MessagesInternes` (
  `idMessageInterne` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `dateMessage` datetime NOT NULL,
  `objet` varchar(45) NOT NULL,
  `texte` varchar(2000) NOT NULL,
  `important` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ParticipantsConversations`
--

CREATE TABLE `ParticipantsConversations` (
  `idConversation` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Planchers`
--

CREATE TABLE `Planchers` (
  `idPlancher` int(11) NOT NULL,
  `nomPlancher` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Poincons`
--

CREATE TABLE `Poincons` (
  `idPoincon` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `temps` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `PostesDepenses`
--

CREATE TABLE `PostesDepenses` (
  `idPosteDepenses` int(11) NOT NULL,
  `nomPosteDepenses` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `QuartsTravail`
--

CREATE TABLE `QuartsTravail` (
  `idQuartTravail` int(11) NOT NULL,
  `idPlancher` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `idRoleUtilisateur` int(11) NOT NULL,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `confirme` bit(1) NOT NULL DEFAULT b'0'
) ;

-- --------------------------------------------------------

--
-- Structure de la table `RequisPlancher`
--

CREATE TABLE `RequisPlancher` (
  `idRequisPlancher` int(11) NOT NULL,
  `idPlancher` int(11) NOT NULL,
  `idRoleUtilisateur` int(11) NOT NULL,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL,
  `quantite` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `RolesUtilisateurs`
--

CREATE TABLE `RolesUtilisateurs` (
  `idRoleUtilisateur` int(11) NOT NULL,
  `idPosteDepenses` int(11) NOT NULL,
  `idDepartement` int(11) NOT NULL,
  `nomRoleUtilisateur` varchar(45) NOT NULL,
  `couleur` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `SuperviseursPlanchers`
--

CREATE TABLE `SuperviseursPlanchers` (
  `idUtilisateur` int(11) NOT NULL,
  `idPlancher` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `TauxHoraires`
--

CREATE TABLE `TauxHoraires` (
  `idUtilisateur` int(11) NOT NULL,
  `idRoleUtilisateur` int(11) NOT NULL,
  `tauxHoraire` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `TypesUtilisateurs`
--

CREATE TABLE `TypesUtilisateurs` (
  `idTypeUtilisateur` int(11) NOT NULL,
  `nomTypeUtilisateur` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateurs`
--

CREATE TABLE `Utilisateurs` (
  `idUtilisateur` int(11) NOT NULL,
  `idTypeUtilisateur` int(11) NOT NULL,
  `idPlancher` int(11) NOT NULL,
  `prenomUtilisateur` varchar(45) NOT NULL,
  `nomUtilisateur` varchar(45) NOT NULL,
  `alias` varchar(45) NOT NULL,
  `motDePasse` varchar(255) NOT NULL,
  `age` tinyint(3) UNSIGNED NOT NULL,
  `telephone` varchar(11) NOT NULL,
  `courriel` varchar(150) DEFAULT NULL,
  `actif` bit(1) NOT NULL DEFAULT b'1'
) ;

--
--
-- Index pour les tables exportées
--

--
-- Index pour la table `Conges`
--
ALTER TABLE `Conges`
  ADD PRIMARY KEY (`idConge`),
  ADD KEY `FK_Conges_Utilisateurs` (`idUtilisateur`);

--
-- Index pour la table `Conversations`
--
ALTER TABLE `Conversations`
  ADD PRIMARY KEY (`idConversation`),
  ADD KEY `FK_Conversations_Utilisateurs` (`idUtilisateurCreateur`);

--
-- Index pour la table `Departements`
--
ALTER TABLE `Departements`
  ADD PRIMARY KEY (`idDepartement`);

--
-- Index pour la table `DestinatairesMessages`
--
ALTER TABLE `DestinatairesMessages`
  ADD PRIMARY KEY (`idUtilisateur`,`idMessageInterne`),
  ADD KEY `FK_DestinatairesMessages_MessagesInternes` (`idMessageInterne`);

--
-- Index pour la table `Disponibilites`
--
ALTER TABLE `Disponibilites`
  ADD PRIMARY KEY (`idDisponibilite`),
  ADD KEY `FK_Disponibilites_Utilisateurs` (`idUtilisateur`);

--
-- Index pour la table `MessagesConversations`
--
ALTER TABLE `MessagesConversations`
  ADD PRIMARY KEY (`idMessageConvo`),
  ADD KEY `FK_MessagesConversations_Conversations` (`idConversation`),
  ADD KEY `FK_MessagesConversations_Utilisateurs` (`idUtilisateur`);

--
-- Index pour la table `MessagesInternes`
--
ALTER TABLE `MessagesInternes`
  ADD PRIMARY KEY (`idMessageInterne`),
  ADD KEY `FK_MessagesInternes_Utilisateurs` (`idUtilisateur`);

--
-- Index pour la table `ParticipantsConversations`
--
ALTER TABLE `ParticipantsConversations`
  ADD PRIMARY KEY (`idConversation`,`idUtilisateur`),
  ADD KEY `FK_ParticipantsConversations_Utilisateurs` (`idUtilisateur`);

--
-- Index pour la table `Planchers`
--
ALTER TABLE `Planchers`
  ADD PRIMARY KEY (`idPlancher`);

--
-- Index pour la table `Poincons`
--
ALTER TABLE `Poincons`
  ADD PRIMARY KEY (`idPoincon`),
  ADD KEY `FK_Poincons_Utilisateurs` (`idUtilisateur`);

--
-- Index pour la table `PostesDepenses`
--
ALTER TABLE `PostesDepenses`
  ADD PRIMARY KEY (`idPosteDepenses`);

--
-- Index pour la table `QuartsTravail`
--
ALTER TABLE `QuartsTravail`
  ADD PRIMARY KEY (`idQuartTravail`),
  ADD KEY `FK_QuartsTravail_Plancher` (`idPlancher`),
  ADD KEY `FK_QuartsTravail_Utilisateurs` (`idUtilisateur`),
  ADD KEY `FK_QuartsTravail_RolesUtilisateurs` (`idRoleUtilisateur`);

--
-- Index pour la table `RequisPlancher`
--
ALTER TABLE `RequisPlancher`
  ADD PRIMARY KEY (`idRequisPlancher`),
  ADD KEY `FK_RequisPlancher_Plancher` (`idPlancher`),
  ADD KEY `FK_RequisPlancher_RolesUtilisateurs` (`idRoleUtilisateur`);

--
-- Index pour la table `RolesUtilisateurs`
--
ALTER TABLE `RolesUtilisateurs`
  ADD PRIMARY KEY (`idRoleUtilisateur`),
  ADD KEY `FK_RolesUtilisateurs_PostesDepenses` (`idPosteDepenses`),
  ADD KEY `FK_RolesUtilisateurs_Departements` (`idDepartement`);

--
-- Index pour la table `SuperviseursPlanchers`
--
ALTER TABLE `SuperviseursPlanchers`
  ADD PRIMARY KEY (`idUtilisateur`,`idPlancher`),
  ADD KEY `FK_SuperviseursPlanchers_Planchers` (`idPlancher`);

--
-- Index pour la table `TauxHoraires`
--
ALTER TABLE `TauxHoraires`
  ADD PRIMARY KEY (`idUtilisateur`,`idRoleUtilisateur`),
  ADD KEY `FK_TauxHoraires_RolesUtilisateurs` (`idRoleUtilisateur`);

--
-- Index pour la table `TypesUtilisateurs`
--
ALTER TABLE `TypesUtilisateurs`
  ADD PRIMARY KEY (`idTypeUtilisateur`);

--
-- Index pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  ADD PRIMARY KEY (`idUtilisateur`),
  ADD UNIQUE KEY `alias` (`alias`),
  ADD KEY `FK_Utilisateurs_TypesUtilisateurs` (`idTypeUtilisateur`),
  ADD KEY `FK_Utilisateurs_Planchers` (`idPlancher`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Conges`
--
ALTER TABLE `Conges`
  MODIFY `idConge` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Conversations`
--
ALTER TABLE `Conversations`
  MODIFY `idConversation` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Departements`
--
ALTER TABLE `Departements`
  MODIFY `idDepartement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `Disponibilites`
--
ALTER TABLE `Disponibilites`
  MODIFY `idDisponibilite` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `MessagesConversations`
--
ALTER TABLE `MessagesConversations`
  MODIFY `idMessageConvo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `MessagesInternes`
--
ALTER TABLE `MessagesInternes`
  MODIFY `idMessageInterne` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Planchers`
--
ALTER TABLE `Planchers`
  MODIFY `idPlancher` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `Poincons`
--
ALTER TABLE `Poincons`
  MODIFY `idPoincon` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `PostesDepenses`
--
ALTER TABLE `PostesDepenses`
  MODIFY `idPosteDepenses` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `QuartsTravail`
--
ALTER TABLE `QuartsTravail`
  MODIFY `idQuartTravail` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `RequisPlancher`
--
ALTER TABLE `RequisPlancher`
  MODIFY `idRequisPlancher` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `RolesUtilisateurs`
--
ALTER TABLE `RolesUtilisateurs`
  MODIFY `idRoleUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `TypesUtilisateurs`
--
ALTER TABLE `TypesUtilisateurs`
  MODIFY `idTypeUtilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  MODIFY `idUtilisateur` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Conges`
--
ALTER TABLE `Conges`
  ADD CONSTRAINT `FK_Conges_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `Conversations`
--
ALTER TABLE `Conversations`
  ADD CONSTRAINT `FK_Conversations_Utilisateurs` FOREIGN KEY (`idUtilisateurCreateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `DestinatairesMessages`
--
ALTER TABLE `DestinatairesMessages`
  ADD CONSTRAINT `FK_DestinatairesMessages_MessagesInternes` FOREIGN KEY (`idMessageInterne`) REFERENCES `MessagesInternes` (`idMessageInterne`),
  ADD CONSTRAINT `FK_DestinatairesMessages_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `Disponibilites`
--
ALTER TABLE `Disponibilites`
  ADD CONSTRAINT `FK_Disponibilites_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `MessagesConversations`
--
ALTER TABLE `MessagesConversations`
  ADD CONSTRAINT `FK_MessagesConversations_Conversations` FOREIGN KEY (`idConversation`) REFERENCES `Conversations` (`idConversation`),
  ADD CONSTRAINT `FK_MessagesConversations_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `MessagesInternes`
--
ALTER TABLE `MessagesInternes`
  ADD CONSTRAINT `FK_MessagesInternes_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `ParticipantsConversations`
--
ALTER TABLE `ParticipantsConversations`
  ADD CONSTRAINT `FK_ParticipantsConversations_Conversations` FOREIGN KEY (`idConversation`) REFERENCES `Conversations` (`idConversation`),
  ADD CONSTRAINT `FK_ParticipantsConversations_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `Poincons`
--
ALTER TABLE `Poincons`
  ADD CONSTRAINT `FK_Poincons_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `QuartsTravail`
--
ALTER TABLE `QuartsTravail`
  ADD CONSTRAINT `FK_QuartsTravail_Plancher` FOREIGN KEY (`idPlancher`) REFERENCES `Planchers` (`idPlancher`),
  ADD CONSTRAINT `FK_QuartsTravail_RolesUtilisateurs` FOREIGN KEY (`idRoleUtilisateur`) REFERENCES `RolesUtilisateurs` (`idRoleUtilisateur`),
  ADD CONSTRAINT `FK_QuartsTravail_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `RequisPlancher`
--
ALTER TABLE `RequisPlancher`
  ADD CONSTRAINT `FK_RequisPlancher_Plancher` FOREIGN KEY (`idPlancher`) REFERENCES `Planchers` (`idPlancher`),
  ADD CONSTRAINT `FK_RequisPlancher_RolesUtilisateurs` FOREIGN KEY (`idRoleUtilisateur`) REFERENCES `RolesUtilisateurs` (`idRoleUtilisateur`);

--
-- Contraintes pour la table `RolesUtilisateurs`
--
ALTER TABLE `RolesUtilisateurs`
  ADD CONSTRAINT `FK_RolesUtilisateurs_Departements` FOREIGN KEY (`idDepartement`) REFERENCES `Departements` (`idDepartement`),
  ADD CONSTRAINT `FK_RolesUtilisateurs_PostesDepenses` FOREIGN KEY (`idPosteDepenses`) REFERENCES `PostesDepenses` (`idPosteDepenses`);

--
-- Contraintes pour la table `SuperviseursPlanchers`
--
ALTER TABLE `SuperviseursPlanchers`
  ADD CONSTRAINT `FK_SuperviseursPlanchers_Planchers` FOREIGN KEY (`idPlancher`) REFERENCES `Planchers` (`idPlancher`),
  ADD CONSTRAINT `FK_SuperviseursPlanchers_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `TauxHoraires`
--
ALTER TABLE `TauxHoraires`
  ADD CONSTRAINT `FK_TauxHoraires_RolesUtilisateurs` FOREIGN KEY (`idRoleUtilisateur`) REFERENCES `RolesUtilisateurs` (`idRoleUtilisateur`),
  ADD CONSTRAINT `FK_TauxHoraires_Utilisateurs` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs` (`idUtilisateur`);

--
-- Contraintes pour la table `Utilisateurs`
--
ALTER TABLE `Utilisateurs`
  ADD CONSTRAINT `FK_Utilisateurs_Planchers` FOREIGN KEY (`idPlancher`) REFERENCES `Planchers` (`idPlancher`),
  ADD CONSTRAINT `FK_Utilisateurs_TypesUtilisateurs` FOREIGN KEY (`idTypeUtilisateur`) REFERENCES `TypesUtilisateurs` (`idTypeUtilisateur`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

