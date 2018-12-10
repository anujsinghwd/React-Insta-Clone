let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");


let schema = buildSchema(`
    type User {
      id : String!
      nickname : String!
      avatar : String!
    }
    type Post {
        id: String!
        user: User!
        caption : String!
        image : String!
    }
    type Query{
      user(id: String) : User!
      post(user_id: String, post_id: String) : Post!
      posts(user_id: String) : [Post]
    }
`);


let userslist = {
      a: {
        id: "a",
        nickname: "Anuj",
        avatar: "https://avatars3.githubusercontent.com/u/24680004?s=400&v=4"
      },
      b: {
        id: "b",
        nickname: "Sanuj",
        avatar: "https://avatars3.githubusercontent.com/u/24680004?s=400&v=4"
      },
};

let postslist = {
      a: {
        a: {
          id: "a",
          user: userslist["a"],
          caption: "Moving the World!",
          image: "https://d3ucjech6zwjp8.cloudfront.net/360x240/matrix-1735640_1920_crop-1ff3637c4e56ddb47656eff5ae94c0a7.jpg"
        },
        b: {
          id: "b",
          user: userslist["a"],
          caption: "Mountains are calling.",
          image:
            "https://www.telegraph.co.uk/content/dam/Travel/ski/K2-mountain-Andrzej-Bargiel-first-ski-descent-by-Piotr-Pawlus-Red-Bull-Content-Pool.jpg?imwidth=450"
        },
        c: {
          id: "c",
          user: userslist["a"],
          caption: "Me at Mountains",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z7NSUt9T4GZSachE5uoAvHaoQEEEhqZG1srPFCenugb3_iqujw"
        },
        d: {
          id: "d",
          user: userslist["a"],
          caption: "Moving to the Mountains!",
          image: "https://static.toiimg.com/thumb/64560386/mountain-peaks-unconquered.jpg?width=748&height=499"
        }
      },
      b: {
        a: {
          id: "a",
          user: userslist["a"],
          caption: "Moving the World!",
          image: "https://d3ucjech6zwjp8.cloudfront.net/360x240/matrix-1735640_1920_crop-1ff3637c4e56ddb47656eff5ae94c0a7.jpg"
        },
        b: {
          id: "b",
          user: userslist["a"],
          caption: "Mountains are calling.",
          image:
            "https://www.telegraph.co.uk/content/dam/Travel/ski/K2-mountain-Andrzej-Bargiel-first-ski-descent-by-Piotr-Pawlus-Red-Bull-Content-Pool.jpg?imwidth=450"
        },
        c: {
          id: "c",
          user: userslist["a"],
          caption: "Me at Mountains",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z7NSUt9T4GZSachE5uoAvHaoQEEEhqZG1srPFCenugb3_iqujw"
        },
        d: {
          id: "d",
          user: userslist["a"],
          caption: "Moving to the Mountains!",
          image: "https://static.toiimg.com/thumb/64560386/mountain-peaks-unconquered.jpg?width=748&height=499"
        }
      }
};

let root = {
    user: function({ id }) {
      return userslist[id];
    },
    post: function({ user_id , post_id }) {
      return postslist[user_id][post_id];
    },
    posts: function({ user_id }){
      return Object.values(postslist[user_id]);
    }
};

let app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);
