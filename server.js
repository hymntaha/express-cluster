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
}
