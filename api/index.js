const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function(req, res, next){     res.header("Access-Control-Allow-Origin", "*");     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");     next(); });

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/';
var db;
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
	db = client.db('proyect');
	if(!err)
		console.log('db conected')
});

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Api listening at http://localhost:${port}`)
});

app.post('/register', (req,res) => {
	db.collection("usuarios").findOne({user: req.body.user}, function(err1, result1){
		if(err1) throw err1;
		if(result1 == null){
			db.collection("usuarios").findOne({mail: req.body.mail}, function(err2, result2){
				if(err2) throw err2;
				if(result2 == null){
					db.collection("usuarios").insertOne({name: req.body.name, rut: req.body.rut, mail: req.body.mail, address: req.body.address, fono: req.body.fono, user: req.body.user, password: req.body.password}, function(err3, result3){
						if(err3) throw err3;
						res.json(0);
					});
				}
				else{
					res.json(2);
				}
			});
		}
		else{
			res.json(1);
		}
	});
});

app.post('/login', (req,res) => {
	db.collection("usuarios").findOne({user: req.body.user, password: req.body.password}, function(err, result){
		if(err) throw err;
		if(result != null){
			res.json(result.name);
		}
		else{
			res.json(false);
		}
	});
});

app.post('/find', (req,res) => {
	db.collection('datos').find({user: req.body.user}).toArray(function(err, result){
		if (err) throw err;
		res.send(result);
	});
});

app.post('/add', (req,res) => {
	var aux2 = 9;
	const day = 1; 
	for(var i=0; i<=100; i++){
		var aux = Math.random() * (38.2 - 35) + 35 + Math.random();
		if(i==0){
			aux2 = aux2;
		}
		else{
			aux2 = aux2 + 0.1;
		}
		db.collection("datos").insertOne({user: req.body.user, hora: aux2.toFixed(2), temp: aux.toFixed(1)}, function(err, result){
			if(err) throw err;
			//console.log(result);
		});
		//console.log(aux.toFixed(1)+"--"+ aux2.toFixed(1));
	}
	res.json(true);
});


app.get('/', (req,res) => {
	res.send("Hello word");	
});

/*sudo systemctl start mongod*/
