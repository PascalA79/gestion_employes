const TITRES={
    HORAIRE_PERSO:'HorairePerso',
    HORAIRE_PLANCHER:'HorairePlancher',
    DISPONIBILITE: 'Disponibilité',
    EMPLOYES:'Employés',
    DEPENSES:'Dépenses',
    PLANCHERS:'Planchers',
    UTILISATEURS:'Utilisateurs',
    DEPARTEMENTS:'Départements',
    PUNCH:'Punch',
    PAIES:'Paies'
};
module.exports.TITRES = TITRES;

const tuiles={};
tuiles[TITRES.HORAIRE_PERSO] = {
    text: 'Horaire personnel',
    nombreAlerte: 0,
    url: '/horaire-perso'
};
// tuiles['HorairePerso']={};
// tuiles['HorairePerso']['text']='Horaire Personnel';
// tuiles['HorairePerso']['nombreAlerte']=0;
// tuiles['HorairePerso']['url']='/horaire-perso';

tuiles[TITRES.HORAIRE_PLANCHER]={
    text: 'Gérer les horaires',
    nombreAlerte: 0,
    url: '/horaire-plancher'
};
// tuiles['Horaire']={};
// tuiles['Horaire']['text']='Horaire';
// tuiles['Horaire']['nombreAlerte']=0;
// tuiles['Horaire']['url']='#';

tuiles[TITRES.DISPONIBILITE]={
    text: 'Gérer les disponibilités',
    nombreAlerte: 0,
    url: '/'
};
// tuiles['Disponibilité']={};
// tuiles['Disponibilité']['text']='Disponibilité';
// tuiles['Disponibilité']['nombreAlerte']=0;
// tuiles['Disponibilité']['url']='#';

tuiles[TITRES.EMPLOYES] = {
    text: "Liste des employés",
    nombreAlerte: 0,
    url: '/liste-employe'
};
// tuiles['Employés']={};
// tuiles['Employés']['text']="Employés";
// tuiles['Employés']['nombreAlerte']=0;
// tuiles['Employés']['url']='#';

tuiles[TITRES.DEPENSES] = {
    text: "Dépenses",
    nombreAlerte: 0,
    url: '/'
};
// tuiles['Dépenses']={};
// tuiles['Dépenses']['text']="Dépenses";
// tuiles['Dépenses']['nombreAlerte']=0;
// tuiles['Dépenses']['url']='#';

tuiles[TITRES.PLANCHERS] = {
    text: "Gérer les planchers",
    nombreAlerte: 12,
    url: '/'
};
// tuiles['Planchers']={};
// tuiles['Planchers']['text']="Planchers";
// tuiles['Planchers']['nombreAlerte']=12;
// tuiles['Planchers']['url']='/plancher';

tuiles[TITRES.UTILISATEURS]={
    text: "Gérer les utilisateurs",
    nombreAlerte: 0,
    url: '/'
};
// tuiles['Utilisateurs']={};
// tuiles['Utilisateurs']['text']="Utilisateurs";
// tuiles['Utilisateurs']['nombreAlerte']=0;
// tuiles['Utilisateurs']['url']='#';

tuiles[TITRES.DEPARTEMENTS]={
    text: "Gérer les départements",
    nombreAlerte: 0,
    url: '/'
};
// tuiles['Départements']={};
// tuiles['Départements']['text']="Départements";
// tuiles['Départements']['nombreAlerte']=0;
// tuiles['Départements']['url']='#';

tuiles[TITRES.PAIES]={
    text: "Paies",
    nombreAlerte: 2,
    url: '/'
};
// tuiles[exports.TITRES.PAIES]={};
// tuiles['Paies']['text']="Paies";
// tuiles['Paies']['nombreAlerte']=2;
// tuiles['Paies']['url']='#';

tuiles[TITRES.PUNCH]={
    text:"Afficher l'interface de pointage",
    nombreAlerte: 0,
    url: '/'
};
// tuiles['Punch']={};
// tuiles['Punch']['text']="Punch";
// tuiles['Punch']['nombreAlerte']=0;
// tuiles['Punch']['url']='#';
module.exports.TUILES=tuiles
