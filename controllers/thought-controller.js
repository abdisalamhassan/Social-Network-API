const { User, Thought, Reaction } = require('../models');;

const ThoughtController = { 

    getALLThoughts(req,res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtByID({ params }, res){
        Thought.findOne({_id: params.id})
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
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                res.status(404).json({ message: 'No user found with this id '});
                return;

                res.json(dbUserData);
            })
            .catch(err => res.json(err));
            
        },

        updateThought({ params,body }, res){
        Thought.findOneAndUpdate({ _id: params.thoughtID }, body, { new: true, runValidators: true })
         .then(dbThoughtData => {
             if(!dbThoughtData){
                res.status(404).json({ message: 'No thought found with this id' });
                return;
             }
             res.json(dbThoughtData);
             })
          .catch(err => res.status(400).json(err));
         
        },

        removeThought({ params }, res ){
            Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deledThought => {
                if(!deleteThought){
                    return res.status(404).json({ message: 'No thought found with this id' });
                }
                return User.findOneAndUpdate(
                    {_id: params.userId },
                    { $pull: {thoughts: params.thoughtId }},
                    {new: true}
                );
            })
            .then(dbUserData=> {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        


    },

    