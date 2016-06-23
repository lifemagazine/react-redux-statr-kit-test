import crypto from 'crypto';
import scmp from 'scmp';
import config from '../config';
import mongoose from 'mongoose'



var Schema = mongoose.Schema;

var userSchema = new Schema({
	id: String, password: String,
	name: String, email: String,
	provider: String, role: Number,
	salt: String, work: Number
});

var User = mongoose.model('user', userSchema);


var passwordCreate = function passwordCreate(password, cb){
	crypto.randomBytes(config.crypto.randomSize, function(err, salt) {
		if (err)
			return cb(err, null);
		crypto.pbkdf2(password, salt.toString('base64'), config.crypto.workFactor, config.crypto.keylen, function(err, key) {
			cb(null, salt.toString('base64'), key.toString('base64'));
		});
	});
};

var passwordCheck = function passwordCheck(password, derivedPassword, salt, work, cb) {
	crypto.pbkdf2(password, salt, work, config.crypto.keylen, function(err, key) {
		cb(null, scmp(key.toString('base64'), derivedPassword));
	});
};

var findById = function findById(id, cb) {
	//cb(null, Users[username]);
	User.findOne({id: id}, function(err, user) {
		if (err) {
			cb(err, null);
		} else {
			cb(null, user);
		}
	});
};

var getAllUser = function getAllUser(){
	var userList = [];
	/*for (var i in Users) {
		var user = {};
		user.userid = Users[i].id;
		user.name = Users[i].name;
		user.email = Users[i].email;
		user.password = "********";
		userList.push(user);
	}
	return userList;*/
	User.find(function(err, Users) {
		if (err) return userList;
		for (var i in Users) {
			var user = {};
			user.userid = Users[i].id;
			user.name = Users[i].name;
			user.email = Users[i].email;
			user.password = "********";
			userList.push(user);
		}
		return userList;
	});
};

var addUser = function addUser(id, password, email, name, responseBody, cb) {
	/*if (Users[id] == undefined || Users[id] == null) {
		passwordCreate(password, function(err, salt, password){
			Users[id] = {
				salt: salt,
				password: password,
				work: config.work,
				email: email,
				id: id,
				provider: 'local',
				name: name,
				role: 10
			};

			return cb(null, Users[id]);
		});
	} else {
		return cb('User exists!', null);
	}*/
	User.findOne({id: id}, function(err, user) {
		if (err) {
			cb(err, null, responseBody);
		} else {
			if (user == undefined || user == null) {
				passwordCreate(password, function(err, salt, password) {
					var _user = new User();
					_user.salt = salt;
					_user.password = password;
					_user.work = config.work;
					_user.email = email;
					_user.id = id;
					_user.provider = 'local';
					_user.name = name;
					_user.role = (id == 'admin' ? 1: 10);
					_user.save(function(err) {
						if (err) {
							console.log(err);
							return cb(err, null, responseBody);
						}
						return cb(null, _user, responseBody);
					})
				});
			} else {
				return cb('User exists!', null, responseBody);
			}
		}
	});
};

var updatePassword = function(id, password, work) {
	/*passwordCreate(password, function(err, salt, password){
		Users[id].salt = salt;
		Users[id].password = password;
		Users[id].work = work;
	});*/
	passwordCreate(password, function(err, salt, password) {
		User.update({ id: id }, { password: password, salt: salt, work: work}, function(err, output) {
			if (err) console.log(err);
			else console.log('good job');
		});
	});
};



exports.findById = findById;
exports.getAllUser = getAllUser;
exports.addUser = addUser;
exports.updatePassword = updatePassword;

exports.passwordCreate = passwordCreate;
exports.passwordCheck = passwordCheck;
