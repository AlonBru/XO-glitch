const express = require('express');
const fs = require('fs').promises;
const path = require('path')

const app = express();
// app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.static('../client/build'))

app.use(express.json());

app.get('/ping', (req, res) => {
    return res.send('pong')
  })

//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
//   })

app.get('/api/v1/records',async (req,res)=>{
    const records = await fs.readFile("./records.json",'utf-8');
    res.send(records);
});

app.post('/api/v1/records',async (req,res)=>{
    //records is a string
    records = JSON.parse(await fs.readFile("./records.json",'utf-8'));
    let {body} = req;
    body.id=records.length;
    records.push(body);
    console.log(records);
    let json= JSON.stringify(records);
    fs.writeFile("./records.json",json);
    res.send('received');

        
    });

    // const records= JSON.parse(await fs.readFile("./records.json"));
    // const body = JSON.stringify(req.body);
    // JSON.stringify(records);
    // res.send



app.listen(8080);