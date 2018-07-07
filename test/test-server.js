'use strict';

//Testing server side of the app
//Firt create dummy data and use them to test the server side of the app
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;
mongoose.Promise = global.Promise;

const { app, runServer, closeServer } = require('../server');
const {TEST_DATABASE_URL, DATABASE_URL} = require('../config'); 
const {Coursecatalog, Acadplan} = require('../models');

chai.use(chaiHttp);


function generateRandomValues(arrayDocument){
	return arrayDocument[Math.floor(Math.random()*arrayDocument.length)];
}
const seedDocuments = {
	programCode: ['A25800A'],
	programTitle: ['Accounting and Finance'],
	totalReqCredit: [68, 71, 64],
	selection: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	courses: ["Writing and Inquiry,ENG 111,3,1,10",
				"Principles of Financial Accounting,ACC 120,4,1,10",
				"Principles of Managerial Accounting,ACC 121,4,1,10",
				"Individual Income Taxes,ACC 129,3,1,10",
				"Introduction to Accounting Spreadsheets,ACC 149,2,1,10",
				"Intermediate Accounting I,ACC 220,4,1,10"
				],
	programcode: ["Accounting and Finance, A25800A"],
	username:['test', 'segen'],
	plan: ["Fall 2018, Writing and Inquiry,ENG 111,3",
			"Fall 2018, Principles of Financial Accounting,ACC 120,4",
			"Fall 2018, Principles of Managerial Accounting,ACC 121,4",
			"Fall 2018,Individual Income Taxes,ACC 129,3"
			]

}

function generateCourseCatalogData() {
  return {
	programCode: generateRandomValues(seedDocuments.programCode),
	programTitle: generateRandomValues(seedDocuments.programTitle),
	totalReqCredit: generateRandomValues(seedDocuments.totalReqCredit),
	selection: generateRandomValues(seedDocuments.selection),
	courses: generateRandomValues(seedDocuments.courses),
  };
}

function generateAcadPlansData() {
  return {
  	username: generateRandomValues(seedDocuments.username),
  	firstname: faker.name.firstName(),
  	lastname: faker.name.lastName(),
	programcode: generateRandomValues(seedDocuments.programcode),
	plan: generateRandomValues(seedDocuments.plan)
	};
}

//=======
function seedCourseCatalogData(){
	const seedData = [];
	for(let i = 1; i <= 10; i++){
		seedData.push(generateCourseCatalogData());
	}
	return Coursecatalog.insertMany(seedData);
}

//=======
function seedAcadPlansData(){
	const seedData = [];
	for(let i = 1; i <= 10; i++){
		seedData.push(generateAcadPlansData());
	}
	return Acadplan.insertMany(seedData);
}

//=======
function seedData(){
	seedCourseCatalogData();
	seedAcadPlansData();
}

function deleteCourseCatalogDB(){
	return new Promise((resolve, reject)=>{
		Coursecatalog.remove({}, function(err){
			console.log('Delete database');
		})
		.then((result) => resolve(resolve))
		.catch((err) => reject(err));
	});
}

//=======
function deleteAcadplanDB(){
	return new Promise((resolve, reject)=>{
		Acadplan.remove({}, function(err){
			console.log('Delete database');
		})
		.then((result) => resolve(resolve))
		.catch((err) => reject(err));
	});
}

//=======
function deleteDB(){
	deleteCourseCatalogDB();
	deleteAcadplanDB();
}

//========================================

describe('Testing academic planner app, my-acad-roadmap', function() {
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function(){
		return seedData();
	});

	afterEach(function(){
		return deleteDB();
	});

	after(function(){
		return closeServer();
	});

	describe('GET endpoint - course catalog', function(){
		this.timeout(15000);
		it('should return all course catalogs', function(){
			let res;
			return chai.request(app)
				.get('/api/catalog')
				.then(function(_res) {
					res = _res;
					expect(res).to.have.status(200);
					return Coursecatalog.count();
				})
				.then(function(count) {
					expect(res.body.coursecatalog).to.have.lengthOf(count);
				});

		});

		it('should return course catalogs with right fields', function(){
			let resCoursecatalog;
			return chai.request(app)
				.get('/api/catalog')
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res.body.coursecatalog).to.be.a('array');
					expect(res.body.coursecatalog).to.have.lengthOf.at.least(1);
					res.body.coursecatalog.forEach(function(coursecatalog) {
						expect(coursecatalog).to.be.a('object');
						expect(coursecatalog).to.include.keys(
							'id', 'programCode', 'programTitle', 'totalReqCredit', 'selection', 'courses'
							);
					});
					resCoursecatalog = res.body.coursecatalog[0];
					return Coursecatalog.findById(resCoursecatalog.id);
				})
				.then(function(coursecatalog) {
					expect(resCoursecatalog.id).to.equal(coursecatalog.id);

				})
		});
	});

	describe('GET endpoint - academic plans', function(){
		this.timeout(30000);
		it('should return all academic plans', function(){
			let res;
			return chai.request(app)
				.get('/api/dashboard/?username=segen')
				.then(function(_res) {
					res = _res;
					expect(res).to.have.status(200);
					return Acadplan.count();
				})
				.then(function(count) {
					expect(res.body.acadplans).to.have.lengthOf.at.least(1);
				});

		});

		it('should return academic plans with right fields', function(){
			let resAcadplans;
			return chai.request(app)
				.get('/api/dashboard/?username=segen')
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res.body.acadplans).to.be.a('array');
					expect(res.body.acadplans).to.have.lengthOf.at.least(1);
					res.body.acadplans.forEach(function(acadplan) {
						expect(acadplan).to.be.a('object');
						expect(acadplan).to.include.keys(
							'id', 'username', 'firstname', 'lastname', 'programcode', 'plan'
							);
					});
					resAcadplans = res.body.acadplans[0];
					return Acadplan.findById(resAcadplans.id);
				})
				.then(function(acadplan) {
					expect(resAcadplans.id).to.equal(acadplan.id);

				})
		});

	});


	describe('POST endpoint - academic plans', function(){
		it('should add a new plan', function(){
			const newAcadplan =  generateAcadPlansData();
			return chai.request(app)
				.post('/api/acadplan')
				.send(newAcadplan)
				.then(function(res){
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.be.a('object');
					expect(res.body).to.have.include.keys(
						'id', 'username', 'firstname', 'lastname', 'programcode',
						'plan');
					expect(res.body.id).to.not.be.null;
					expect(res.body.username).to.equal(newAcadplan.username);
					expect(res.body.firstname).to.equal(newAcadplan.firstname);
					expect(res.body.lastname).to.equal(newAcadplan.lastname);
					expect(res.body.programcode).to.equal(newAcadplan.programcode);
					expect(res.body.plan).to.contains(newAcadplan.plan);
				});
		});
	});


	describe('PUT endpoint - academic plan', function(){
		it('should update fields you send over', function(){

			const updateData = generateAcadPlansData();
			const updateAcadPlan = [updateData.plan];

			return Acadplan
				.findOne()
				.then(function(acadplans){
					updateData.id = acadplans.id;
					return chai.request(app)
						.put(`/api/acadplan/${acadplans.id}`)
						.send(updateData) 
				})
				.then(function(res){
					expect(res).to.have.status(204);
					return Acadplan.findById(updateData.id);
				})
				.then(function(acadplans){
					expect(JSON.stringify(updateAcadPlan)).to.equal(JSON.stringify(acadplans.plan));
				})	
		});
	});

});





