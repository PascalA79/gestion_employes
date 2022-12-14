class Redirect{
    constructor(session,response){
        this.session=session;
        this.response=response
    }
    // se connecter à la page cible si expr est true
    // access retourne 0 dans ce cas, sinon 1
    async access(key,expr=(value)=>!value,cible='/login'){
        if(await expr(this.session.get(key))){
            await this.response.redirect(cible);
            return 0;
        }
        return 1;
    }
}
module.exports =Redirect