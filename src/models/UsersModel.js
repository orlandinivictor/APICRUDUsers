const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  marital: { type: String, required: true },
  cpf: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const UsersModel = mongoose.model('Users', UsersSchema);

function Users(body) {
  this.body = body;
  this.errors = [];
  this.user = null;
}

Users.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.validation();

  if(this.errors.length > 0) return;
  this.user = await UsersModel.findByIdAndUpdate(id, this.body, {new: true});
}

Users.prototype.register = async function() {
  this.validation();

  if (this.errors.length > 0) return;
  this.user = await UsersModel.create(this.body);
}

Users.prototype.validation = function() {
  this.cleanUp();

  if(!this.body.name) this.errors.push('Nome precisa ser preenchido');
  if(!this.body.age) this.errors.push('Idade precisa ser preenchido');
  if(!this.body.marital) this.errors.push('Estado Civil precisa ser preenchido');
  if(!this.body.cpf) this.errors.push('CPF precisa ser preenchido');
  if(!this.body.city) this.errors.push('Cidade precisa ser preenchido');
  if(!this.body.state) this.errors.push('Estado precisa ser preenchido');
}

Users.prototype.cleanUp = function() {
  for (const key in this.body) {
    if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
    }
  }

  this.body = {
    name: this.body.name,
    age: this.body.age,
    marital: this.body.marital,
    cpf: this.body.cpf,
    city: this.body.city,
    state: this.body.state,
  };
}

Users.findUsers = async function() {
  const users = await UsersModel.find();
  return users;
}

Users.findOne = async function(id) {
  const users = await UsersModel.findById(id);
  return users;
}

Users.delete = async function (id) {
  if (typeof id !== 'string') return;
  const user = await UsersModel.findOneAndDelete({_id: id});
  return user;
}


module.exports = Users;