const bcrypt = require('bcrypt');
const User = require('../models/Users');

const register = async (userName,password, email, role)=>{
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    let user = new User({
        username: userName,
        email: email,
        password: hashPassword,
        role: role,
    });
    return await user.save();
}
const login = async (userName,password, email)=>{
    const filter = {
        username: userName,
        email: email,
    };
    console.log('Filter ',filter);
    const user = await User.findOne(filter);
    if(user)
    {
        //console.log('Username',userName, " Password ",user.password);
        const validPass = await bcrypt.compare(password, user.password);
        if(validPass)
        {
            return user;
        }
        else
        {
            throw Error("Invalid user or password");
        }
    }
    throw Error("Invalid user or password");
};
const getUserById = async (userId)=>{
    // return {
    //     userId:userId,
    //     name : "Some data from DB"
    // }

    let user = await User.findById(userId);
    // console.log(user);
    if(!user) throw new Error('No users found');
    return user;
};

const getAllUsers = async () => {
    let users = await User.find();
    if(Array.isArray(users) && !users.length) throw new Error('No users found');
    return users;
}

const updateUser = async (id, user)=>{
    let oldUser = await User.findById(id);
    if (oldUser) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        let newUser = {
            username: user.username,
            email: user.email,
            password: hashPassword,
        };
        console.log(newUser);
        return User.findByIdAndUpdate(id, newUser, {new: true});
    }
    else {
        throw new Error("User with id " + id + " not found");
    }
}

const deleteUser = async (id)=>{
    let user = await User.findById(id);
    if(user){
        return User.findByIdAndDelete(id);
    }
    else{
        throw new Error("User with id " + id + " not found");
    }
}
module.exports = {
    getAllUsers,
    getUserById,
    register,
    login,
    updateUser,
    deleteUser,
}