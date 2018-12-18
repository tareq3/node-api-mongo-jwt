const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    create: async function (req, res, next) {

        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        try {
            const result = await user.save(); //first getting the result of that call

            //sending response as json file
            res.json({
                status: "success",
                message: "User added successfully!!!",
                data: result
            });

            console.log(result);

        } catch (err) {
            next(err); //sending error to route using next 
        }



    },
    authenticate: async function (req, res, next) {

        try {
            const userInfo = await userModel.findOne({
                email: req.body.email
            });

            const validPassword = await bcrypt.compare(req.body.password, userInfo.password);

            if (validPassword) {
                const token = jwt.sign({
                    id: userInfo._id
                }, req.app.get('secretKey'), {
                    expiresIn: '1h'
                });

                res.json({
                    status: "success",
                    message: "user found!!!",
                    data: {
                        user: userInfo,
                        token: token
                    }
                }).status(200);
            } else {
                res.json({
                    status: "error",
                    message: "Invalid email/password!!!",
                    data: null
                }).status(400);
            }

        } catch (err) {
            next(err); //sending error to route using next 

        }



    }
}