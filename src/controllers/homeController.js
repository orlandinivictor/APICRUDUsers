const Users = require('../models/UsersModel');

exports.index = async (req, res) => {
  const users = await Users.findUsers();
  res.send(users);
};

exports.findOne = async (req, res) => {
  if (!req.params.id) return res.send('404');
  const users = await Users.findOne(req.params.id);
  res.send(users);
};

exports.register = async (req, res) => {
  try {
      const user = new Users(req.body);
      await user.register();
  
      return res.send('Usuário registrado');
  } catch (e) {
      console.log(e);
      return res.send('404');
  }
}

exports.edit = async function(req, res) {
  try {
      if (!req.params.id) return res.send('404');
      const user = new Users(req.body);
      await user.edit(req.params.id);

      return res.send('Usuário editado com sucesso.');    
  } catch(e) {
      console.log(e);
      res.send('404');
  }
}

exports.delete = async function(req,res) {
  if (!req.params.id) return res.send('404');
  const user = await Users.delete(req.params.id);
  if(!user) return res.send('404');

  return res.send('Usuário deletado com sucesso');    
}