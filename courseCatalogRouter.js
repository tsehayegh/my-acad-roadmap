'use strict';

//Course Catalog Router
const express = require('express');
const courseCatalogRouter = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');

const { Coursecatalog } = require('./models');


courseCatalogRouter.use(bodyParser.json());

//GET-end point: course catalog
courseCatalogRouter.get('/api/catalog', (req, res) => {
	const searchFields = ['programCode']
	const queryFields = {};
	for(let i = 0; i < searchFields.length; i++) {
		const searchField = searchFields[i];
		if(req.query[searchField]) {
			queryFields[searchField] = req.query[searchField]; 
			
		};
	};

	Coursecatalog
		.find(queryFields)
		.then(coursecatalog => {
			res.send({coursecatalog: coursecatalog.map(coursecatalog => coursecatalog.serialize()) 
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'});
		})
});

courseCatalogRouter.get('/api/catalog/:programCode', (req, res) => {
	Coursecatalog
		.find({programCode: req.params.programCode})
		.then(coursecatalog => {res.send({coursecatalog: coursecatalog.map(coursecatalog => coursecatalog.serialize())})})
		.catch(err => {
			console.log(err);
			res.status(500).json({message: 'Internal server error'});
		})
});


module.exports = {courseCatalogRouter};
