const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authenticate=require('../authenticate');
const Computers=require('../models/computers');

const computerRouter=express.Router();
computerRouter.use(bodyParser.json());
computerRouter.route('/')

.get((req,res,next)=>{
	Computers.find({})
	.then((computers)=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json(computers); 
	},(err)=>next(err))
	.catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{//adding authenticate middleware to verify user. It will automatically  handle the error as well as authenticate user.

	Computers.create(req.body)
	.then((computers)=>{
		console.log("computer created",computers);
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json(computers);
	},(err)=>next(err))
	.catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req,res,next)=>{
	res.statusCode=403;
	res.end("PUT operation not supported on /computers");
})
.delete(authenticate.verifyUser,(req,res,next)=>{
	Computers.remove({})
	.then((resp)=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json(resp);
	},(err)=>next(err))
	.catch((err)=>next(err));
});


computerRouter.route('/:computerId')
.get((req,res,next)=>{
	Computers.findById(req.params.computerId)
	.then((computers)=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json(computers);
	},(err)=>next(err))
	.catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
	res.statusCode=403;
	res.end("POST operation not supported on /computers/ "+req.params.computerId);
})
.put(authenticate.verifyUser,(req,res,next)=>{
	Computers.findByIdAndUpdate(req.params.computerId,{
		$set:req.body
	},{new:true})
.then((computers)=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json(computers);
	},(err)=>next(err))
	.catch((err)=>next(err));

})
.delete(authenticate.verifyUser,(req,res,next)=>{
	Computers.findByIdAndRemove(req.params.computerId)
	.then((computers)=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json');
		res.json(computers);
	},(err)=>next(err))
	.catch((err)=>next(err));
});



module.exports=computerRouter;