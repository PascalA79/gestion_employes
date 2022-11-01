// Classe js qui met en place une session qui a le comportement semblable à $__SESSION de php
var session = require('express-session')
class Session{
    constructor(router){
        this.session = require('express-session')

        router.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            //store: database  https://www.youtube.com/watch?v=J1qXK66k1y4&ab_channel=ZachGollwitzer 8:54
            //cookie: { maxAge: 600000 }
          }))
    }
    start(req){
        this.req=req
    }
    destroy(){
        this.req.session.destroy()
    }
    set(key,value){
        this.req.session[key]=value;
        return this.req.session[key];
    }
    get(key){
        if(this.req && this.req.session)
        return this.req.session[key];
        else return undefined
    }
    
    fSet(key,fonction,defaut){
        if(this.get(key)!=undefined){
            let value=fonction(this.get(key));
            this.set(key,value);
            return this.get(key)
          }
          else{
            this.set(key,defaut)
            return this.get(key)
          }
    }
}

module.exports = Session;
