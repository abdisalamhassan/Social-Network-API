const { Users, Thoughts, Reaction } = require('../models');;

const thoughtController = { 

    getAllThoughts(req,res){
        Thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtsByID({ params }, res){
        Thoughts.findOne({_id: params.id})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThoughts({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with id' });
                    return;
                }

                res.json(dbUserData);
            })
            .catch(err => res.json(err));
            
        },

        updateThought({ params, body }, res) {
            Thoughts.findOneAndUpdate({_id: params.id }, body, {new: true, runValidators: true})
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        },

        deleteThoughts({ params }, res) {
            Thoughts.findOneAndDelete({_id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought){
                    return res.status(404).json({ message: 'No user found with this id'});
                     }
                     return Users.findOneAndUpdate(
                         {_id: params.userID },
                         { $pull: { thoughts: params.thoughtId }},
                         {new: true} 
                     );
            })
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

        addReaction({ params, body }, res){
            Thoughts.findOneAndUpdate(
                {_id: params.thoughtId },
                { $addToSet: { reactions: body } },
                {new: true, runValidators: true }
            )
             .then(dbThoughtData => {
                 if(!dbThoughtData){
                     return res.status(404).json({ message: 'No thought found with this id' });
                 }
                 res.json(dbThoughtData);
             })
             .catch(err=> res.json(err));
        },

        deleteReaction({ params }, res){
            Thoughts.findOneAndUpdate(
                {_id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId }}},
                { new: true }
            )
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({ message: 'Nope!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        }
        



    };

    module.exports = thoughtController
    