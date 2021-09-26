const { Post,User,Comment } = require('../DB/model.js')

async function createnewpost(commentbody,postId,userId)
{
    const comments = await Comment.create({
     commentbody,
     postId,
     userId
    })
    return comments
}

async function getallcomments()
{
    const comments = await Comment.findAll({
        include : [{model : Post, include : [{model : User}]}]
    })
    return comments
}

////    ------ TESTING ---------///
async function task1()
{
    const comments = await createnewpost('i hope it will short out soon',1,1)
    console.log(comments.commentbody,comments.id)
}
 //task1();

async function task2()
  {
      const allcomments = await getallcomments()
      //console.log(allcomments) 
      for (let u of allcomments)
      {
        console.log("POST : "+u.post.title)
          console.log("Comment :" + u.id,u.commentbody)
          console.log("User-name : "+u.post.id,u.post.user.username)
      }
  }
 // task2()


  ///mera ye error rhe raha hai ki mujhe user ke liye foreign kry banani hogi iss model me