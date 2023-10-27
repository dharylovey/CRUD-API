const model = require('../models/database');


createUser = (req,res) => {
    const {name, username, password} = req.body;
    const user = { id: model.length + 1, name, username, password};

    const isUserExist = model.some(user => user.username === username);

    if(isUserExist){
        res.status(400).json({
            status: false,
            message: 'Username already exist!'
        })
        return;
    }

    if(!name){
        res.status(400).json({
            status: false,
            message: 'Name field RequireD!'
        })
        return;
    }
    if(!username){
        res.status(400).json({
            status: false,
            message: 'Username field RequireD!'
        })
        return;
    }

    if(!password){
        res.status(400).json({
            status: false,
            message: 'password field RequireD!'
        })
        return;
    }

    model.push(user);
    res.status(200).json({
        status: true,
        message: 'User successfully added'
    })
}

readUser = (req, res) => {
    try {
      res.status(200).json({
        status: true,
        users: model
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error
      });
    }
  };

readUserById = (req, res) =>{
    const userId = Number(req.params.id);
    const user = model.find(user => user.id === userId);

    if ( user){
        res.status(200).json({
            status: true,
            user: user
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'User not found'
        });
    }
}
  


updateUser = (req, res)=> {
    const userId = Number(req.params.id);
    const { name, username, password} = req.body;

    const userIndex = model.findIndex(user => user.id === userId);

    if (userIndex === -1){
        res.status(400).json({
            status: false,
            message: "User id not found"
        })
        return;
    }

    if (name){
        model[userIndex].name = name;
    }

    if(username){
        model[userIndex].username = username;
    }
    if(password){
        model[userIndex].password = password;
    }

    res.status(200).json({
        status: true,
        message: 'User Updated'
    })
}

deleteUser = (req,res)=>{
    const userId = Number(req.params.id);
    const userIndex = model.findIndex(user => user.id === userId);

    if (userIndex === -1){
        res.status(400).json({
            status: false,
            message: 'User not found'
        });
        return;
    }

    model.splice(userIndex, 1);
    res.status(200).json({
        status: true,
        message: 'User deleted'
    });
}




module.exports = {
    createUser,
    readUser,
    readUserById,
    updateUser,
    deleteUser
}