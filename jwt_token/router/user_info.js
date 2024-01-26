const express = require("express");
const app = express.Router();
const Servicedata = require("../services/user_services.js")

app.use(express.json());

app.get('/getUsers', async (req, resp) => {
    const get = await Servicedata.getAllUser();
    resp.json({
        "status": "Success",
        "Data": get
    })
});

app.post('/postUser', async (req, resp) => {
    const data = await Servicedata.postUser(req.body);

    if (data) {
        resp.json({
            "status": "Success",
            "Data": data
        })
    } else {
        resp.json({
            "status": "failed"
        })
    }
})

app.put('/updateUser/:id', (req, resp) => {
    const userid = req.params.id;
    const userdata = req.body;

    const data = Servicedata.updateUser(userid, userdata);

    if (data) {
        resp.json({
           "status":"Update SuccessFully",
           "Data":data
        });
    }else{
        resp.json({
            "status":"Failed to update"
        })
    }

});

app.delete('/deleteUser/:id', (req, resp) => {
   const userid = req.params.id;
   const userdata= Servicedata.deleteUser(userid);

   if(userdata){
    resp.json({
      "status":"delete successfully",
      "Data":userdata
    })
   }else{
    resp.json({
        "status":"Failed to get delete  ....",

    })
   }
});

module.exports = app;