class Redirect{
    constructor(session,response){
        this.session=session;
        this.response=response
    }
    // se connecter à la page cible si expr est true
    // access retourne 0 dans ce cas, sinon 1
    access(key,expr=(value)=>!value,cible='/login'){
        if(expr(this.session.get(key))){
            this.response.redirect(cible);
            return 0;
        }
        return 1;
    }
}
module.exports =Redirect