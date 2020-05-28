const express = require("express");
const cluster = require("cluster");
const totalCPUs = requires('os').cpus().length;

const fibObj = require("./math-logic/fibonacci-series");

if(cluster.isMaster){
	console.log(`Total number of CPU counts is ${totalCPUs}`);
	for (var i = 0; i<totalCPUs; i++){
		cluster.fork();
	}
	
	cluster("online", worker=>{
		console.log(`Worker ID ${worker.id} and PID is ${worker.process.pid}`);
	});
	cluster.on("exit", worker=> {
		console.log(`Worker ID ${worker.id} and PID is ${worker.process.pid} is offline`);
		console.log(`Lets fork new worker!");
		cluster.fork();
	});
} else {
	const app = express();
	app.get("/", (req, res) => {
		console.log(`Worker Process ID - ${cluster.worker.process.pid} has accepted the request!`);
		let number = fabObj.calculateFibonacciValue(Number.parseInt(req.query.number));
		res.send(`<h1>${number}</h1>`);
	});
	
	app.listen(3000, () => console.log("Express App is running on PORT : 3000"));
}
