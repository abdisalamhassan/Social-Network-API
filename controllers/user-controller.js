const { Users, Thoughts } = require('../models');

const userController = {

    getAllUsers(req,res){
        Users.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

   getUserById({ params }, res){
       Users.findOne({_id: params.id }, res) 
           Users.findOne({_id: params.id })
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

   createUser({ body }, res){
       Users.create(body)
       .then((dbUserData) => res.json(dbUserData))
       .catch((err) => res.status(400).json(err));
   },

   updateUser({ params, body }, res){
       Users.findOneAndUpdate({ _id: params.id }, body, { new: true, RunValidators: true })
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
       Users.findOneAndDelete({_id: params.id })
       .then((dbUserData) => {
           if(!dbUserData){
               res.status(404).json({message: "No User found with that ID" });
               return;
           }
           res.json(dbUserData);
       })
       .catch((err)=> res.status(400).json(err));
   },

   addFriend({ params }, res ){
       Users.findOneandUpdate(
           {_id: params.id },
           { $addToSet: { friends: params.friendsId }},
           { new: true }
       )
       .then((dbUserData) => res.json(dbUserData))
       .catch((err) => res.status(400).json(err));
   },

   deleteFriend({ params }, res){
       Users.findOneandUpdate(
           {_id: params.userID },
           { $pull: { friends: params.friendID } },
           { new: true }
       )
       .then((dbUserData) => {
           if(!dbUserData) {
               res.status(404).json({message: 'No user found with this id'});
               return;
           }
           res.json(dbUserData);
       })
       .catch((err)=> res.status(400).json(err));
   }
};

module.exports = userController