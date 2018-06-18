'use strict';

const mongoose =require('mongoose');

mongoose.Promise = global.Promise;

////Course Catalog
const courseCatalogSchema = mongoose.Schema({
	"programCode": {type: String, required: true},
	"programTitle": {type: String, required: true},
	"totalReqCredit": {type: Number, required: true},
	"selection": [Number],
	"courses": [String]
}, {collection: 'coursecatalog'});

courseCatalogSchema.methods.serialize  = function() {
	return {
		"id": this._id,
		"programCode": this.programCode,
		"programTitle": this.programTitle,
		"totalReqCredit": this.totalReqCredit,
		"selection": this.selection,
		"courses": this.courses
	};
}

const Coursecatalog = mongoose.model("coursecatalog", courseCatalogSchema);


//Student Academic Plan
const acadPlanSchema = mongoose.Schema({
	"username": {type: String, required: true},
	"firstname": {type: String, required: true},
	"lastname": {type: String, required: true},
	"programcode": {type: String, required: true},
	"plan": [{type: String, required: true}]
});

acadPlanSchema.methods.serialize = function() {
	return {
		"id": this._id,
		"username": this.username,
		"firstname": this.firstname,
		"lastname": this.lastname,
		"programcode": this.programcode,
		"plan": this.plan
	}
}
const Acadplan = mongoose.model("Acadplan", acadPlanSchema);

module.exports = {Coursecatalog, Acadplan}
