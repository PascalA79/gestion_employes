var session = require('express-session')
class Session{
    constructor(router){
        this.session = require('express-session')

        router.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            //store: database  https://www.youtube.com/watch?v=J1qXK66k1y4&ab_channel=ZachGollwitzer 8:54
            cookie: { maxAge: 60000 }
          }))
    }
    start(req){
        this.req=req
    }
    set(key,value){
        this.req.session[key]=value
    }
    get(key){
        return this.req.session[key]
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
