const {User,Post,Comment,Userdetail} = require('../DB/model.js')

async function createnewuser(username,email)
{
    const users = await User.create({
        username : username,
        email : email
    })
    return users;
}

async function getalluser()
{
    const users = await User.findAll({include : [{model : Post}],
      include : [{model : Userdetail}],
    required : true});
    return users;
}

async function getpostbyuser(username)
{
    const users = await User.findOne({
        where : {username},
        include: [
            {
              model: Post,
              include: [
                {
                  model: Comment
                }
              ]
            }
          ],
        required : true
    });
    return users;
}
async function getpostbyuseremail(email)
{
    const users = await User.findOne({
        where : {email},
        include: [
            {
              model: Post,
              include: [
                {
                  model: Comment
                }
              ]
            }
          ],
        required : true
    });
    return users;
}
///     -------- TESTING  -----------------///
async function task1()
{
    const users = await createnewuser('aman','amankaushik29may')
    console.log(users.username)
}
    //  task1();

async function task2()
{
    const users = await getpostbyuseremail('amankaushik29may');    //we are getting data in form of string raw metadata
    
   const results=JSON.parse(JSON.stringify(users))   //JSON.stringify will convert the users object to JSONString
                                                       //JSON.parse will convert the JSON.string data into JSONOBJEct
   
        var i = 0;
    for (let u of results.posts)    //jitni posts hai utna loop chalega yaha pe
    {
    console.log("User-Name : "+results.username,results.email)
    console.log("#======================#")
    console.log("User POST TITLE : "+results.posts[i].title);  //hume ye yad rhakna hai ki ye post se posts banjata hai
    console.log("#======================#")
    console.log("User post ID"+results.posts[i].id)
    console.log("#======================#")
       let j = 0;
       for(let v of results.posts[i].comments)  //ye tabhi chalega jab comments exist karte honge
       {
         console.log("inside results.posts.comments = ",results.posts[i].comments[j].commentbody)
         console.log("#=========================#")
         j++;
       }
       i++;
        }
   console.log(JSON.stringify(users,null,2));   ///now yaha pe user ke andr {} post ki posts ayengi 
   
}
    // task2()

async function task3()
{
    const users = await getalluser().sort({createdAt : 'desc'});
    const resultval = JSON.parse(JSON.stringify(users))  //sahi way se raw data ko represent karne ke liye ye karna padta hai
    for (let u of resultval)
    {
        console.log("usernames : ",u.username)
        console.log("##================##")
        console.log(u.id)
        console.log(u)
        // let i = 0;
        // for(let p of u.posts)   //yaha humne jo user ke andar ka posts hai uske liye loop chaladiya
        // {
        // console.log(u.posts[i].title,u.posts[i].id)   
        // console.log("##==================##")
        // i++
        // }
        let j = 0;
        for (let c of u.userdetails)
        {
          console.log(u.userdetails[j].profession)
          j++;
        }   
    }
    //console.log(resultval)
}
 //  task3()



   
async function task4()
{
    const users = await getalluser();
    const resultval = JSON.parse(JSON.stringify(users))  //sahi way se raw data ko represent karne ke liye ye karna padta hai
    for (let u of resultval)
    {
        console.log("username : ",u.username)
        console.log("##================##")
        console.log(u.id)
        console.log(u)
    }
    //console.log(resultval)
}
   task4()

