const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

const computerSchema=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	image:{
		type:String,
		required:true
	},
	modelNumber:{
		type:String,
		required:true,
        unique:true
	},
	brand:{
		type:String,
		required:true
	},
	price:{
		type:Currency,
		required:true
	},
	description:{
		type:String,
		required:true
	}
},{
	timestamps:true
});

var Computers=mongoose.model('Computer',computerSchema);
module.exports=Computers;