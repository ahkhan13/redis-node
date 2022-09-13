import express from 'express';
import UserModel from './model/usermodel.js';
import redis from 'redis';
import { initiateDBConnection } from './config/conn.js';
const app = express();
const client = redis.createClient(6379);
await client.connect();
client.on('connect', () => console.log('Redis connected'));

const getUser = async (req,res) => { 
    try{
    const user = await UserModel.find({});
    //############ set data into redis cache ############
    client.setEx('UserData', 120, JSON.stringify(user));
    return  res.send({normal_data : user});
    }catch(err){
        return err;
    }
}

const redisData = async(req, res, next)=>{
     //############ get data from redis cache ############
    const data = await client.get('UserData');
    if(data){
        res.send({redis_data : JSON.parse(data)});
    }else{
        next();
    }

}
app.get('/users', redisData, getUser);



app.listen(3000, async () => {
    await initiateDBConnection();
    console.log("Server is running successfully", 3000);
})