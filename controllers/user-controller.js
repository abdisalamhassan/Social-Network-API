const { User, Thought } = require('../models');

const userController = {

    getAllUsers(req,res){
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

   getUserById({ params }, res){
       User.findOne({_id: params.id }, res) 
           User.findOne({_id: params.id })
           .populate({
               path: "thoughts",
               select: "-__v",
           })
           .select("-__v")
           .then((dbUserData)=> {
               if(!dbUserData){
                   res.status(404).json({ message: "No user found with this ID" });
                   return;
               }
               res.json(dbUserData);
           })
           .catch((err) => {
               console.log(err);
               res.status(400).json(err);
           });
       
   },

   CreateUser({ body }, res){
       User.create(body)
       .then((dbUserData) => res.json(dbUserData))
       .catch((err) => res.status(400).json(err));
   },

   UpdateUser({ params, body }, res){
       User.findOneandUpdate({ _id: params.id }, body, { new: true, RunValidators: true })
       .then(dbUserData => {
           if (!dbUserData) {
               res.status(404).json({message: "No user found with this id" });
               return;
           }
           res.json(dbUserData);
       })
       .catch(err => res.json(err));
   },
    
   deleteUser({ params }, res){
       User.findOneAndDelete({_id: params.id })
       .then((dbUserData) => {
           if(!dbUserData){
               res.status(404).json({message: "No User found with that ID" });
               return;
           }
           res.json(dbUserData);
       })
       .catch((err)+> res.status(400).json(err));
   },

   addFriend({ params }, res ){
       User.findOneandUpdate(
           {_id: params.id },
           { $addToSet: { friends: params.friendsId }},
           { new: true }
       )
       .then((dbUserData) => res.json(dbUserData))
       .catch((err) => res.status(400).json(err));
   },

   deleteFriend({ params }, res){
       User.findOneandUpdate(
           {_id: params.userID },
           { $pull: { friends: params.friendID } },
           { new: true }
       )
       .then((dbUserData) => {
           if(!dbUserData) => {
               res.status(404).json({message: 'No user found with this id'});
               return;
           }
           res.json(dbUserData);
       })
       .catch((err)=> res.status(400).json(err));
   }
};

module.exports = userController