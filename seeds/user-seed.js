const { User } =require ('../models');
const userData = [
    {
        username: "mark_wahlberg",
        twitter: "markemark",
        github: "markwall",
        email: "markw@gmail.com",
        password: "pa$$word1"
    },
    {
        username: "matt_damon",
        twitter: "mattdee",
        github: "mattdamon1",
        email: "mattd@gmail.com",
        password: "pa$$word2"
    },
    {
        username: "nick_cage",
        twitter: "ncage",
        github: "nickcagedit",
        email: "nickcgmail.com",
        password: "pa$$word3"
    },
    {
        username: "bill_gates",
        twitter: "billyoung",
        github: "bgates",
        email: "billg@gmail.com",
        password: "pa$$word4'"
    },
    {
        username: "steve_mccqueen",
        twitter: "stevesleave",
        github: "stevemic",
        email: "stevem@gmail.com",
        password: "pa$$word5"
    },
    {
        username: "johnny_rotten",
        twitter: "jrot",
        github: "johnnyrot",
        email: "jrotten@gmail.com",
        password: "pa$$word6"
    },
    {
        username: "chirstina_applegate",
        twitter: "cappleg",
        github: "chrisapple",
        email: "capplegate@gmail.com",
        password: "pa$$word7"
    },
    {
        username: "joe_rogan",
        twitter: "j_rogand",
        github: "joerogan",
        email: "jrog@gmail.com",
        password: "pa$$word8"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers