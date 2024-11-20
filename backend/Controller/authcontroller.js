const UserDB = require('../Model/user');  
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();



const addUser = async (req, res) => {
    try {
        const { confirmPassword, ...data } = req.body;
        const plainPassword = data.password;
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
        data.password = hashedPassword;
        const userOrDesigner = await UserDB.create(data);
        return res.status(200).send({ data: data });
    } catch (err) {
        return res.status(500).send(err);
    }
};


const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log({email, password})
  
      const findUser = await UserDB.findOne({ email });
      if (!findUser) {
        return res.status(401).send("User Not Found");
      }
  
      const  plainPassword = findUser.password
      const passwordCheck = await bcrypt.compare(password,plainPassword);
      if (!passwordCheck) {
        return res.status(401).send("Invalid Credentials");
      }
      const token = jwt.sign({ sub: findUser }, process.env.JWT_TOKEN, { expiresIn:'5d'})
      res.json({"token":token,"data":findUser})
    } catch (error) {
      console.error(error);
    }
   }

module.exports = { loginUser, addUser};