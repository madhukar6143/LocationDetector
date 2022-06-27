const express = require('express');
require('dotenv').config()
const app = express();
const path = require('path');
const axios = require('axios');
const { response } = require('express');
const mc=require("mongodb").MongoClient

const dataBaseUrl ="mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"
let dataBaseObj;

app.use(express.static(path.join(__dirname,'./dist/location-detector')))


mc.connect(dataBaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
    if(err)
    {
        console.log("err in mongodb connection",err)
    }
    else
    {
        dataBaseObj=client.db("myfirstdb")
        console.log("connected to database")
       start()
       
    }
})



app.use('/presentcontest',async(req,res)=>{
  
    try {
        const resp= await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=+latitude+&longitude=+longitude+&localityLanguage=en')
        const newUser = 
        {
        "latitude":resp.data.latitude,
        "longitude":resp.data.longitude,
        "locality":resp.data.locality,
        "district":resp.data.localityInfo.administrative[2].name,
        "mandal":resp.data.localityInfo.administrative[3].name,
        }
       console.log("yeah",newUser)

       //await dataBaseObj.collection("mycollection").insertOne(newUser)
       res.send(newUser)
    } catch (err) {
        console.error(err);
    }
})








const  start = async function() 
{
  
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=ec21427b734a45219f84aa68df34a301')
        .then(response => {
            const lat=response.data.latitude
            const lon =response.data.longitude
            console.log(lat,lon)
            axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+lon+"&localityLanguage=en")
            .then(resp=>
                {   
                    const newUser = 
                    {
                    "latitude":resp.data.latitude,
                    "longitude":resp.data.longitude,
                    "locality":resp.data.locality,
                    "district":resp.data.localityInfo.administrative[2].name,
                    "mandal":resp.data.localityInfo.administrative[3].name,
                    }   
                  dataBaseObj.collection("mycollection").insertOne(newUser)
                  console.log("yeah",newUser)
                })
                .catch( 
                    err=>{  
                    console.log(err)
                })
        })
        .catch(error => {
            console.log(error);
        });

    
   

       
   
}






const port = process.env.PORT || 5000;
const host = '0.0.0.0'
app.listen(port, host, ()=> console.log(`server is running on port ${port}`))














