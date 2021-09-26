const { User,Post,Comment } = require('../DB/model.js')

async function createnewpost(userId,title)
{
    const posts = await Post.create({
        title,
        userId                       //ye userId depend karta hai user table ke naam pe
    })
    return posts;
}

// async function getallposts()
// {
// const posts = await Post.findAll({include : User });
// return posts
// }

async function getallposts()
{
const posts = await Post.findAll({include :[{ model : User,include : [{ model : Comment} ]}] });
return posts
}



////-----------           CREATING AND FETCHING OF DATA          --------------//////
async function task()
{
    const posts = await createnewpost(2,'covid-19')
    console.log(posts.title,posts.userId)
}
     task();
async function task1()
{
    const posts = await getallposts()
    console.log(posts)
    const postvalues = JSON.parse(JSON.stringify(posts))
    for (let p of postvalues)
    {
        console.log("post title : " + p.title)
        console.log("post - Username : " + p.user.username )
        console.log('#==============#')
        let i = 0;
        for (let v of p.user.comments)   //kyuki yaha "comments" object "user" ke andar hai
        {
        console.log(p.user.comments[i].commentbody)
        i++;
        }
    }
   // console.log(postvalues)
}

  //task1();