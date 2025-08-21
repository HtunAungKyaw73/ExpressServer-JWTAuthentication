const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { config } = require('./../config/Config');

const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    // console.log('Token ',token);
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        token = token.split(' ')[1] // Remove Bearer from string
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        let verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);   // verify ရင် payload ပြန်ရမယ်
        if (!verifiedUser) return res.status(401).send('Unauthorized request')
        console.log("Verified User",verifiedUser);

        req.user = verifiedUser; // user_id ကို ထည့်ပေးလိုက်ပြီး controller ကနေ ပြန်ဖမ်းသုံးနိုင်တယ်[stateless ဖြစ်တာကို ကျော်တာ]
        next();
    }
    catch (error) {
        // console.log(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).send('Token has expired');
        }
        res.status(401).send("Invalid Token");
    }
}

module.exports = {
    verifyUserToken
}