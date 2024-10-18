
const { userCollection } = require('../config/collections');
const connection = require('../config/connection')
const bcryptjs = require('bcryptjs');

class User {
    constructor(req) {
        this.req = req
        this.conn = connection.getDb().collection(userCollection)
    }

    async doSignup() {
        try{
            delete this.req['confirm-password'];
            const user = await this.conn.findOne({email:this.req.email})
            if (!user){
                const hashed_password = await bcryptjs.hash(this.req.password,10);
                this.req.password = hashed_password;
                const result = await this.conn.insertOne(this.req)
                return result.insertedId; 
            }else{
                return "User already exist!"
            }
            
        }catch(err){
            return err
        }
        
    }

    async logIn() {
       const user = await this.conn.findOne({email:this.req.email})
       if(!user){
        return {status:false,message:"User not found"}
       }else{
       return  await bcryptjs.compare(this.req.password,user.password).then(status=>{
        if(status){
            delete user.password
            return {status,user,message:"Password is correct"}
        }else{
            return {status,message:"Passwrod is wrong"}
        }
        }).catch(err=>{
            return err
        })
       }
    
    }

    
}


module.exports =User