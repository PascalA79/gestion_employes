-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 09 Octobre 2022 à 11:30
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

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `Conges`
--

CREATE OR REPLACE TABLE `Conges` (
  `idConge` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `dateConge` date NOT NULL,
  `confirme` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Conversations`
--

CREATE OR REPLACE TABLE `Conversations` (
  `idConversation` int(11) NOT NULL,
  `idUtilisateurCreateur` int(11) NOT NULL,
  `nomConversation` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Departements`
--

CREATE OR REPLACE TABLE `Departements` (
  `idDepartement` int(11) NOT NULL,
  `nomDepartement` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `DestinatairesMessages`
--

CREATE OR REPLACE TABLE `DestinatairesMessages` (
  `idUtilisateur` int(11) NOT NULL,
  `idMessageInterne` int(11) NOT NULL,
  `statusMessage` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Disponibilites`
--

CREATE OR REPLACE TABLE `Disponibilites` (
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

CREATE OR REPLACE TABLE `MessagesConversations` (
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

CREATE OR REPLACE TABLE `MessagesInternes` (
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

CREATE OR REPLACE TABLE `ParticipantsConversations` (
  `idConversation` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Planchers`
--

CREATE OR REPLACE TABLE `Planchers` (
  `idPlancher` int(11) NOT NULL,
  `nomPlancher` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Poincons`
--

CREATE OR REPLACE TABLE `Poincons` (
  `idPoincon` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  `temps` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `PostesDepenses`
--

CREATE OR REPLACE TABLE `PostesDepenses` (
  `idPosteDepenses` int(11) NOT NULL,
  `nomPosteDepenses` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `QuartsTravail`
--

CREATE OR REPLACE TABLE `QuartsTravail` (
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

CREATE OR REPLACE TABLE `RequisPlancher` (
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

CREATE OR REPLACE TABLE `RolesUtilisateurs` (
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

CREATE OR REPLACE TABLE `SuperviseursPlanchers` (
  `idUtilisateur` int(11) NOT NULL,
  `idPlancher` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `TauxHoraires`
--

CREATE OR REPLACE TABLE `TauxHoraires` (
  `idUtilisateur` int(11) NOT NULL,
  `idRoleUtilisateur` int(11) NOT NULL,
  `tauxHoraire` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `TypesUtilisateurs`
--

CREATE OR REPLACE TABLE `TypesUtilisateurs` (
  `idTypeUtilisateur` int(11) NOT NULL,
  `nomTypeUtilisateur` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateurs`
--

CREATE OR REPLACE TABLE `Utilisateurs` (
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
  MODIFY `idDepartement` int(11) NOT NULL AUTO_INCREMENT;
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
  MODIFY `idRoleUtilisateur` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `TypesUtilisateurs`
--
ALTER TABLE `TypesUtilisateurs`
  MODIFY `idTypeUtilisateur` int(11) NOT NULL;
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
