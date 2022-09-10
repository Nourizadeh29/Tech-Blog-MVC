const { Comment } =require ('../models');
const commentData = [
    {
        user_id: 1,
        blog_id: 5,
        comment_text: "So Cool"
    },
    {
        user_id: 4,
        blog_id: 4,
        comment_text: "Thats a vertical strategy"
    },
    {
        user_id: 1,
        blog_id: 4,
        comment_text: "Made my day"
    },
    {
        user_id: 3,
        blog_id: 5,
        comment_text: "What kind of tech was needed for the server"   
    },
    {
        user_id: 3,
        blog_id: 2,
        comment_text: "Super Useful and helped me survive it"
    },
    {
        user_id: 3,
        blog_id: 4,
        comment_text: "So amazing!"
    },
    {
        user_id: 5,
        blog_id: 3,
        comment_text: "I really Like what you have here"
    },
    {
        user_id: 2,
        blog_id: 1,
        comment_text: "So so"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments