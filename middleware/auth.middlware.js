const jwt = require("jsonwebtoken");
const {BLackListModel} = require("../models/blacklist.modle")
require("dotenv").config();

const auth = async(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        let existingToken = await BLackListModel.find({
            blacklist: {$in: token},
        });
        if(existingToken){
            res.status(200).json("Please Login!!")
        }else{
            const decoded = jwt.verify(token, "kamran");
            req.body.userID = decoded.userID;
            next()
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {auth}