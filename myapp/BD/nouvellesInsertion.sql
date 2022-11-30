/* AddQuartTravail(idPlancher, idUtilisateur, idRoleUtilisateur, debut, fin, confirme) */

DELETE FROM QuartsTravail WHERE debut>'2022-11-7 0:00' AND fin < '2022-11-14 0:00';

/* lundi le 7 décembre */
CALL AddQuartTravail(1, 2, 3, '2022-11-7 6:00' , '2022-11-7 15:00', 0);
CALL AddQuartTravail(1, 1, 3, '2022-11-7 8:00' , '2022-11-7 19:00', 0);
CALL AddQuartTravail(1, 3, 3, '2022-11-7 11:00' , '2022-11-7 20:00', 0);
CALL AddQuartTravail(1, 5, 3, '2022-11-7 16:00' , '2022-11-7 23:00', 0);

CALL AddQuartTravail(1, 6, 1, '2022-11-7 6:00' , '2022-11-7 14:00', 0);
CALL AddQuartTravail(1, 7, 1, '2022-11-7 7:00' , '2022-11-7 15:00', 0);
CALL AddQuartTravail(1, 8, 1, '2022-11-7 9:00' , '2022-11-7 16:00', 0);
CALL AddQuartTravail(1, 10, 1, '2022-11-7 11:00' , '2022-11-7 19:00', 0);
CALL AddQuartTravail(1, 11, 1, '2022-11-7 16:00' , '2022-11-7 23:00', 0);

CALL AddQuartTravail(1, 14, 2, '2022-11-7 6:00' , '2022-11-7 14:00', 0);
CALL AddQuartTravail(1, 15, 2, '2022-11-7 9:00' , '2022-11-7 17:00', 0);
CALL AddQuartTravail(1, 16, 2, '2022-11-7 11:00' , '2022-11-7 19:00', 0);
CALL AddQuartTravail(1, 17, 2, '2022-11-7 11:00' , '2022-11-7 19:00', 0);
CALL AddQuartTravail(1, 18, 2, '2022-11-7 15:00' , '2022-11-7 23:00', 0);
CALL AddQuartTravail(1, 20, 2, '2022-11-7 17:00' , '2022-11-7 23:00', 0);

/* mardi le 8 décembre */
CALL AddQuartTravail(1, 2, 3, '2022-11-8 6:00' , '2022-11-8 15:00', 0);
CALL AddQuartTravail(1, 1, 3, '2022-11-8 8:00' , '2022-11-8 19:00', 0);
CALL AddQuartTravail(1, 3, 3, '2022-11-8 11:00' , '2022-11-8 20:00', 0);
CALL AddQuartTravail(1, 5, 3, '2022-11-8 16:00' , '2022-11-8 23:00', 0);

CALL AddQuartTravail(1, 6, 1, '2022-11-8 6:00' , '2022-11-8 14:00', 0);
CALL AddQuartTravail(1, 7, 1, '2022-11-8 7:00' , '2022-11-8 15:00', 0);
CALL AddQuartTravail(1, 8, 1, '2022-11-8 9:00' , '2022-11-8 16:00', 0);
CALL AddQuartTravail(1, 10, 1, '2022-11-8 16:00' , '2022-11-8 23:00', 0);
CALL AddQuartTravail(1, 17, 1, '2022-11-8 11:00' , '2022-11-8 19:00', 0);

CALL AddQuartTravail(1, 9, 2, '2022-11-8 11:00' , '2022-11-8 19:00', 0);
CALL AddQuartTravail(1, 14, 2, '2022-11-8 6:00' , '2022-11-8 14:00', 0);
CALL AddQuartTravail(1, 15, 2, '2022-11-8 9:00' , '2022-11-8 17:00', 0);
CALL AddQuartTravail(1, 16, 2, '2022-11-8 11:00' , '2022-11-8 19:00', 0);
CALL AddQuartTravail(1, 18, 2, '2022-11-8 15:00' , '2022-11-8 23:00', 0);
CALL AddQuartTravail(1, 19, 2, '2022-11-8 17:00' , '2022-11-8 23:00', 0);
CALL AddQuartTravail(1, 20, 2, '2022-11-8 17:00' , '2022-11-8 23:00', 0);

/* mercredi le 9 décembre */
CALL AddQuartTravail(1, 2, 3, '2022-11-9 6:00' , '2022-11-9 15:00', 0);
CALL AddQuartTravail(1, 1, 3, '2022-11-9 8:00' , '2022-11-9 19:00', 0);
CALL AddQuartTravail(1, 4, 3, '2022-11-9 14:00' , '2022-11-9 23:00', 0);
CALL AddQuartTravail(1, 5, 3, '2022-11-9 16:00' , '2022-11-9 23:00', 0);

CALL AddQuartTravail(1, 6, 1, '2022-11-9 6:00' , '2022-11-9 14:00', 0);
CALL AddQuartTravail(1, 7, 1, '2022-11-9 7:00' , '2022-11-9 15:00', 0);
CALL AddQuartTravail(1, 8, 1, '2022-11-9 9:00' , '2022-11-9 16:00', 0);
CALL AddQuartTravail(1, 9, 1, '2022-11-9 11:00' , '2022-11-9 19:00', 0);
CALL AddQuartTravail(1, 10, 1, '2022-11-9 11:00' , '2022-11-9 19:00', 0);
CALL AddQuartTravail(1, 11, 1, '2022-11-9 16:00' , '2022-11-9 23:00', 0);

CALL AddQuartTravail(1, 14, 2, '2022-11-9 6:00' , '2022-11-9 14:00', 0);
CALL AddQuartTravail(1, 15, 2, '2022-11-9 9:00' , '2022-11-9 17:00', 0);
CALL AddQuartTravail(1, 16, 2, '2022-11-9 11:00' , '2022-11-9 19:00', 0);
CALL AddQuartTravail(1, 17, 2, '2022-11-9 11:00' , '2022-11-9 19:00', 0);
CALL AddQuartTravail(1, 18, 2, '2022-11-9 15:00' , '2022-11-9 23:00', 0);
CALL AddQuartTravail(1, 19, 2, '2022-11-9 17:00' , '2022-11-9 23:00', 0);
CALL AddQuartTravail(1, 20, 2, '2022-11-9 17:00' , '2022-11-9 23:00', 0);

/* jeudi le 10 décembre */
CALL AddQuartTravail(1, 1, 3, '2022-11-10 6:00' , '2022-11-10 15:00', 0);
CALL AddQuartTravail(1, 3, 3, '2022-11-10 11:00' , '2022-11-10 20:00', 0);
CALL AddQuartTravail(1, 4, 3, '2022-11-10 14:00' , '2022-11-10 23:00', 0);
CALL AddQuartTravail(1, 5, 3, '2022-11-10 16:00' , '2022-11-10 23:00', 0);

CALL AddQuartTravail(1, 6, 1, '2022-11-10 6:00' , '2022-11-10 14:00', 0);
CALL AddQuartTravail(1, 7, 1, '2022-11-10 7:00' , '2022-11-10 15:00', 0);
CALL AddQuartTravail(1, 8, 1, '2022-11-10 9:00' , '2022-11-10 16:00', 0);
CALL AddQuartTravail(1, 9, 1, '2022-11-10 11:00' , '2022-11-10 19:00', 0);
CALL AddQuartTravail(1, 10, 1, '2022-11-10 11:00' , '2022-11-10 19:00', 0);
CALL AddQuartTravail(1, 11, 1, '2022-11-10 16:00' , '2022-11-10 23:00', 0);

CALL AddQuartTravail(1, 14, 2, '2022-11-10 6:00' , '2022-11-10 14:00', 0);
CALL AddQuartTravail(1, 15, 2, '2022-11-10 9:00' , '2022-11-10 17:00', 0);
CALL AddQuartTravail(1, 16, 2, '2022-11-10 11:00' , '2022-11-10 19:00', 0);
CALL AddQuartTravail(1, 17, 2, '2022-11-10 11:00' , '2022-11-10 19:00', 0);
CALL AddQuartTravail(1, 18, 2, '2022-11-10 15:00' , '2022-11-10 23:00', 0);
CALL AddQuartTravail(1, 19, 2, '2022-11-10 17:00' , '2022-11-10 23:00', 0);
CALL AddQuartTravail(1, 20, 2, '2022-11-10 17:00' , '2022-11-10 23:00', 0);

/* vendredi le 11 décembre */
CALL AddQuartTravail(1, 2, 3, '2022-11-11 6:00' , '2022-11-11 15:00', 0);
CALL AddQuartTravail(1, 1, 3, '2022-11-11 8:00' , '2022-11-11 19:00', 0);
CALL AddQuartTravail(1, 4, 3, '2022-11-11 11:00' , '2022-11-11 20:00', 0);
CALL AddQuartTravail(1, 5, 3, '2022-11-11 16:00' , '2022-11-11 23:00', 0);

CALL AddQuartTravail(1, 6, 1, '2022-11-11 6:00' , '2022-11-11 14:00', 0);
CALL AddQuartTravail(1, 7, 1, '2022-11-11 7:00' , '2022-11-11 15:00', 0);
CALL AddQuartTravail(1, 8, 1, '2022-11-11 9:00' , '2022-11-11 16:00', 0);
CALL AddQuartTravail(1, 9, 1, '2022-11-11 11:00' , '2022-11-11 19:00', 0);
CALL AddQuartTravail(1, 10, 1, '2022-11-11 11:00' , '2022-11-11 19:00', 0);
CALL AddQuartTravail(1, 11, 1, '2022-11-11 16:00' , '2022-11-11 23:00', 0);

CALL AddQuartTravail(1, 14, 2, '2022-11-11 6:00' , '2022-11-11 14:00', 0);
CALL AddQuartTravail(1, 15, 2, '2022-11-11 9:00' , '2022-11-11 17:00', 0);
CALL AddQuartTravail(1, 16, 2, '2022-11-11 11:00' , '2022-11-11 19:00', 0);
CALL AddQuartTravail(1, 17, 2, '2022-11-11 11:00' , '2022-11-11 19:00', 0);
CALL AddQuartTravail(1, 18, 2, '2022-11-11 15:00' , '2022-11-11 23:00', 0);
CALL AddQuartTravail(1, 19, 2, '2022-11-11 17:00' , '2022-11-11 23:00', 0);
CALL AddQuartTravail(1, 20, 2, '2022-11-11 17:00' , '2022-11-11 23:00', 0);
