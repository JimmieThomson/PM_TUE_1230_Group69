const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router()
const GpsInfo = require('../models/GpsInfo')
app.use(bodyParser.json());
const bodyparserpost = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get('/', async (req,res) => {
    try {
        const gpsInfos = await GpsInfo.find()
        res.json(gpsInfos)
    } 
    catch(err){
        res.status(500).json({ message: err.message})
    }
})
//getting one
router.get('/:id', async (req,res) => {
    try{
        const gpsinfo = await GpsInfo.findById(req.params.id);
        res.json(quote);
    }catch(err){
        res.json({message: err})
    }
})

//creating one 
router.post('/', bodyparserpost ,async (req,res) => {
    console.log(req.body.id)
    // try {
    //     const newGpsinfo = await gpsinfo.save()
    //     res.status(201).json(newGpsinfo)
    // }
    // catch(err){
    //     res.status(400).json({message: err.message})
    // }
})
router.delete('/:id', getGpsInfo, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: 'Deleted User'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
});
async function getGpsInfo(req, res, next) {
    let gpsInfo
    try {
         gpsInfo = await User.findById(req.param.id)
         if(gpsInfo == null){
             return res.status(404).json({message: 'Cannot find quotes'})
         }
    } catch (err)   {
        return res.status(500).json({message: err.mefssage})
    }
    res.gpsInfo = gpsInfo
    next()
}
module.exports = router;