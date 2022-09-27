module.exports.TITRES={
    PUNCH:'Punch',
    PAIES:'Paies'
}

const tuiles=[]
tuiles['HorairePerso']={};
tuiles['HorairePerso']['text']='Horaire Personnel';
tuiles['HorairePerso']['nombreAlerte']=0;
tuiles['HorairePerso']['url']='/horaire-perso';

tuiles['Horaire']={};
tuiles['Horaire']['text']='Horaire';
tuiles['Horaire']['nombreAlerte']=0;
tuiles['Horaire']['url']='#';

tuiles['Disponibilité']={};
tuiles['Disponibilité']['text']='Disponibilité';
tuiles['Disponibilité']['nombreAlerte']=0;
tuiles['Disponibilité']['url']='#';

tuiles['Employés']={};
tuiles['Employés']['text']="Employés";
tuiles['Employés']['nombreAlerte']=0;
tuiles['Employés']['url']='#';

tuiles['Dépenses']={};
tuiles['Dépenses']['text']="Dépenses";
tuiles['Dépenses']['nombreAlerte']=0;
tuiles['Dépenses']['url']='#';

tuiles['Planchers']={};
tuiles['Planchers']['text']="Planchers";
tuiles['Planchers']['nombreAlerte']=12;
tuiles['Planchers']['url']='/plancher';

tuiles['Utilisateurs']={};
tuiles['Utilisateurs']['text']="Utilisateurs";
tuiles['Utilisateurs']['nombreAlerte']=0;
tuiles['Utilisateurs']['url']='#';

tuiles['Départements']={};
tuiles['Départements']['text']="Départements";
tuiles['Départements']['nombreAlerte']=0;
tuiles['Départements']['url']='#';

tuiles[exports.TITRES.PAIES]={};
tuiles['Paies']['text']="Paies";
tuiles['Paies']['nombreAlerte']=2;
tuiles['Paies']['url']='#';

tuiles['Punch']={};
tuiles['Punch']['text']="Punch";
tuiles['Punch']['nombreAlerte']=0;
tuiles['Punch']['url']='#';
module.exports.tuiles=tuiles
