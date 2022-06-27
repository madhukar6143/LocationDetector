const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT||3000

var corsOptions = {
    origin: '*', //everyone is allowed, You can write your domain here so only you can get the response from this server.
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET"
}

app.use(cors(corsOptions))
app.get('/', (req, res) => {

    let IP = (req.headers['x-forwarded-for'] ||'').split(',').pop().trim() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress ||
        req.headers['x-appengine-user-ip'] ||
        req.headers['fastly-client-ip'] ;


        res.send(IP)
})


app.listen(port, () => console.log(`go to ==>>> http://localhost:${port}/`))


/* var app = require("express")();

app.get("/", function (req, res) {
  console.log(req.socket.remoteAddress);
  console.log(req.ip);
  res.send("your IP is: " + req.ip);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});


/* const express = require('express');
require('dotenv').config()
const app = express();
const path = require('path');
const axios = require('axios');
const { response } = require('express');
const mc=require("mongodb").MongoClient
app.set('trust proxy', true);

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
      // start()
      
       
    }
})





app.use('/presentcontest',async(req,res)=>{
  
    try {

        const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=ec21427b734a45219f84aa68df34a301')
        console.log(response.data.ip_address)
        const ip=response.data.ip_address
            const lat=response.data.latitude
            const lon =response.data.longitude
            console.log(lat,lon)
        const resp= await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=+latitude+&longitude=+longitude+&localityLanguage=en')
        const newUser = 
        {
            "ip":ip,
            "lat":lat,
            "lon":lon,
        "latitude":resp.data.latitude,
        "longitude":resp.data.longitude,
        "locality":resp.data.locality,
        "district":resp.data.localityInfo.administrative[2].name,
        "mandal":resp.data.localityInfo.administrative[3].name,
        }
       console.log("yeah",newUser)

       await dataBaseObj.collection("mycollection").insertOne(newUser)
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














 */ 