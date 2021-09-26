const {Userdetail,User} = require('../DB/model')

async function  createuserdetails(profession,userId)
{
    const uservalues = await Userdetail.create({
      profession : profession,
      userId : userId
    })
    return uservalues
}

async function getalluserdetails()
{
    const userdetails = Userdetail.findAll({
        include : [User]
    })
    return userdetails
}

//--------------testing --------------/////
async function test1()
{
    const uservalues = await createuserdetails('full stack developer',1)
    console.log(uservalues)
}
//test1()

async function test2()
{
    const userdetails = await getalluserdetails()
    for (let u of userdetails)
    {
        console.log(u.profession,u.user.username)
    }
}
//test2()