
const express = require('express');
const acadPlanRouter = express.Router();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Acadplan } = require('./models');

acadPlanRouter.use(bodyParser.json());

acadPlanRouter.get('/api/dashboard', (req, res) => {
	const searchFields = ['username']
	const queryFields = {};
	for(let i = 0; i < searchFields.length; i++) {
		const searchField = searchFields[i];
		if(req.query[searchField]) {
			queryFields[searchField] = req.query[searchField]; 
			
		} else {
			return res.json({message: 'No valid username'});
		}
	};
	Acadplan
		.find(queryFields)
		.then(acadplans => {
			res.send({acadplans: acadplans.map(acadplan => acadplan.serialize()) 
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'});
		})
});

acadPlanRouter.get('/api/testing', (req, res) => {
	const searchFields = ['username']
	const queryFields = {};
	for(let i = 0; i < searchFields.length; i++) {
		const searchField = searchFields[i];
		if(req.query[searchField]) {
			queryFields[searchField] = req.query[searchField]; 
			
		}
	};
	Acadplan
		.find(queryFields)
		.then(acadplans => {
			res.send({acadplans: acadplans.map(acadplan => acadplan.serialize()) 
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'});
		})
});


acadPlanRouter.get('/api/dashboard/:id', (req, res) => {
	console.log(req.params.id);
	if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
	Acadplan
		.findById(req.params.id)
		.then(acadplan => {
			res.send(acadplan.serialize())
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'});
		})
	}
});

acadPlanRouter.post('/api/acadplan', (req, res) => {

	const requiredFields = ['username', 'firstname', 'lastname', 'programcode', 'plan'];

	for(let i = 0; i < requiredFields.length; i++){

		const field = requiredFields[i];

		if(!(field in req.body)){

			const message = `Missing \`${field}\` in request body`;
			
			return res.status(400).send(message);
		}
	}

	const newData = {
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			programcode: req.body.programcode,
			plan: req.body.plan
	}

	Acadplan
		.create({
			username: req.body.username,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			programcode: req.body.programcode,
			plan: req.body.plan
		})
		.then(acadplans => res.status(200).json(acadplans.serialize()))
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'})
		});
});

//PUT - use PUT method to update academic plans
acadPlanRouter.put('/api/acadplan/:id', (req, res) => {
	const reqFields =  ['username', 'firstname', 'lastname', 'programcode', 'plan'];
	if(!(req.params.id && req.body.id&& req.params.id === req.body.id)) {
		const errorMessage = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
		console.log(errorMessage);
		console.log(req.body);

	};
	const toUpdate = {};

	const updateableFields  = ['plan'];

	updateableFields.forEach(field => {
		if (field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});
	console.log(toUpdate);
	Acadplan
		.findByIdAndUpdate(req.params.id, { $set: toUpdate}, {new: true})
		.then(acadplans => res.status(204).end())
		.catch(err => res.status(500).json({message: 'Internal server error'}))
})


module.exports = {acadPlanRouter};