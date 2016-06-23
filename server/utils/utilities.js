import config from '../config';
import parse from 'co-body';
import monk from 'monk';
import wrap from 'co-monk';


var db = monk('localhost/mongodb_test1');

var users = wrap(db.get('users'));


module.exports.login = function*() {
	console.log(this.request.body);
	let userid = this.request.body.userid;
	let password = this.request.body.password;

	var user = yield users.findOne({id: userid, password: password});
	if (!user) this.throw(404, 'invalid post id');

	console.log('login ok: ' + userid + ', role: ' + user.role);
	this.session.role = user.role;
	this.body = JSON.stringify({status: 200, role: user.role});
};
module.exports.logout = function*() {
	console.log('logout!');
	this.session = null;
	this.body = 'logout';
};
module.exports.register = function*() {
	console.log(this.request.body.userid + ', ' + this.request.body.password + ', ' + this.request.body.email + ', ' + this.request.body.name);
	var user = {
		id: this.request.body.userid,
		password: this.request.body.password,
		email: this.request.body.email,
		name: this.request.body.name,
		role: 10
	};
	yield users.insert(user);
	console.log('register ok');
	this.body = JSON.stringify({status: 200, result: 'register ok'});
};
module.exports.list = function*() {
	if (this.session.role == 1) {
		let userList = yield users.find({});
		console.log(userList);
		// this.status = 200;
		this.body = JSON.stringify(userList);
	} else {
		console.log("permission error: " + this.session.role);
		// this.status = 400;
		this.body = JSON.stringify({status: 400, message: 'permission error' });
	}
};
module.exports.modify = function*(userid) {
	if (this.session.role == 1) {
		yield users.findAndModify({ _id: this.request.body._id }, { $set: {password: this.request.body.password } });
		// this.status = 200;
		this.body = JSON.stringify({status: 200, message: 'succeeded to update'});
	} else {
		console.log("permission error: " + this.session.role);
		// this.status = 400;
		this.body = JSON.stringify({status: 400, message: 'permission error' });
	}
};
