
const Users = [
    {
        "UserName":"sudeep",
        "password":"BreakIfUCan",
    },{
        "UserName":"Anonymous",
        "password":"HackMe"
    }
];

function fnValidateUser(userObj){

    return Users.find(( user )=>{
        if(user.UserName == userObj.UserName && user.password == userObj.password){
            return true;
        }
    });

}//fnValidateUser

module.exports.ValidateUser = fnValidateUser;