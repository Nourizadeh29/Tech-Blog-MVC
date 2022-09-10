
const { Blog } =require ('../models');
const blogData = 
[
  {
    title: "Learn to use React",
    content: "A tutorial on how to use React.js and implement it into your apps. There 5 steps and videos to watch as you learn the technology that will make your dev skills sharper.",
    user_id: 3
  },
  {
    title: "ES6 VS ES7",
    content: "Whats the difference? If you ever thought the subtleties of updated and newer tech would make or break your app, then this blog is for you",
    user_id: 1
  },
  {
    title: "Survive Bootcamp",
    content: "OK, you made into bootcamp now how to survive. I have listed 3 main category's that will help any new student get through the rigors of boot camp, 1. Time, 2. Curiosity, 3.Drive",
    user_id: 2
  },
  {
    title: "How to use Node.js",
    content: "The documentation wil tell you to instal npm in your terminal, But there are many features to npm",
    user_id: 5
  },
  {
    title: "Dev Ops another mystery",
    content: "Dev Ops got you down? Don't worry we have you back on how to navigate the Dev Ops",
    user_id: 4
  }
]
 const seedBlogs = () => Blog.bulkCreate(blogData);

 module.exports = seedBlogs