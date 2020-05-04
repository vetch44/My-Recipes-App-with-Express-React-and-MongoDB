const express = require ('express');
const router = express.Router();
const Recipe = require('./recipe');

router.get('/recipe/:id', (req, res, next)=>{
    
            Recipe.findOne({_id: req.params.id}).then((recipe)=>{
        res.send(recipe);
    }).catch(next);
});
router.get('/recipe', (req, res, next)=>{
    
    Recipe.find().then((recipe)=>{
res.send(recipe);
}).catch(next);
});
router.post('/recipe', (req, res, next)=>{
    Recipe.create(req.body).then((recipe)=>{
        res.send(recipe);
    }).catch(next);
});

router.put('/recipe/:id', (req, res, next)=>{
    Recipe.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=>{
        Recipe.findOne({_id: req.params.id}).then((recipe)=>{
            res.send(recipe);
        });
    }).catch(next);
});

router.delete('/recipe/:id', (req, res, next)=>{
    Recipe.findByIdAndRemove({_id: req.params.id}).then((recipe)=>{
        res.send(recipe);
    }).catch(next);
});

module.exports = router;