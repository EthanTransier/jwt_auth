const User = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport'); //import models
//get tasks and returns them
const getUsers = async (req, res) => {
  try {
    console.log(`Users: ${User}`)
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try{
    const {email} = req.params
    const user = await User.findById({email: email})
    console.log(user)
    res.json(user)
  }catch (error){
    res.status(500).json({error: error.message})
  }
}

const createUsers = async (req, res) => {
  const {user_name, email, password, password2} = req.body;
    let errors = [];
    console.log(user_name, email, password, password2)
    if(!user_name || !email || !password || !password2){
        errors.push({msg: "Please fill in all fields"})
    }
    // check if match
    if(password !== password2){
        errors.push({msg: "Passwords do not match"})
    }

    // check if password is less than 6 characters
    if(password.length < 6){
        errors.push({msg: "Password needs to be at least 6 characters"})
    }

    if(errors.length > 0){
        res.render('register', {
            errors: errors,
            user_name: user_name,
            email: email,
            password: password
        })
    } else {
        User.findOne({email: email}).then((err, user)=>{
          if(user){
            errors.push({msg: "This email has aleady been registered"})
            res.render('register', {
              errors: errors,
              user_name: user_name,
              email: email,
              password: password
            })
          } else {
              const newUser = new User({
                  user_name: user_name,
                  email: email,
                  password: password
              })

              bcrypt.genSalt(10, (err, salt)=>
                bcrypt.hash(newUser.password,salt,
                  ((err,hash)=> {
                    if(err) throw err;
                      console.log(newUser)
                      // save pass to hash
                      newUser.password = hash
                      console.log(newUser)
                      newUser.save()
                    .then((value)=>{
                      res.redirect('/')
                    })
                    .catch(value=> console.log(value))
                  })
                  )
              )
            }
        })
    }
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }
    // Delete the user
    await user.remove();

    res.status(202).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUsers,
  deleteUsers,
  getUser,
};