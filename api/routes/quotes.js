const express = require('express');
const { modelName } = require('../models/Quotes');
const router = express.Router()
const Quotes = require('../models/Quotes')
router.get('/', async (req,res) => {
    try {
        const quotes = await Quotes.find()
        res.json(quotes)
    } 
    catch(error){
        res.status(500).json({ message: err.message})
    }
})
//getting one
router.get('/:id', async (req,res) => {
    try{
        const quote = await Quotes.findById(req.params.id);
        res.json(quote);
    }catch(err){
        res.json({message: err})
    }
})

//creating one 
router.post('/', async (req,res) => {
    const quote = new Quotes({
        speed: req.body.speed,
        longtitude: req.body.longtitude,
        latitude: req.body.latitude
        
    })
    try {
        const newQuotes = await quote.save()
        res.status(201).json(newQuotes)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})
router.delete('/:id', getQuotes, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: 'Deleted User'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
});
async function getQuotes(req, res, next) {
    let quote
    try {
         quote = await User.findById(req.param.id)
         if(quote == null){
             return res.status(404).json({message: 'Cannot find quotes'})
         }
    } catch (err)   {
        return res.status(500).json({message: err.mefssage})
    }
    res.quote = quote
    next()
}
module.exports = router;