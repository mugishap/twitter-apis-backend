const express = require('express')
const bodyParser = require('body-parser')
const res = require('express/lib/response')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
const PORT = process.env.PORT || 2000
app.listen(PORT, () => {
    console.log("Listening on port "+PORT)
})
const properties = require('./properties')
//api to get twitter user with screen name👏👏
app.get('/user/:screen_name', async (req, res) => {
    let neededUser = []
    for (let i = 0; i < properties.length; i++) {
        if (properties[i].user.screen_name.toLowerCase() == req.params.screen_name.toLowerCase()) {
            neededUser.push({
                "Screen name": properties[i].user.screen_name,
                "Full names": properties[i].user.name,
                "Followers": properties[i].user.followers_count,
                "Following": properties[i].user.following,
                "Friends count": properties[i].user.friends_count,
                "verified": properties[i].user.verified,
                "Favourites count": properties[i].user.favourites_count
            })
        }
    }
    return res.status(200).send(neededUser)
})
//api to get all tweets at the same time
app.get('/allTweets', (req, res) => {
    let tweets = []
    for (let i = 0; i < properties.length; i++) {
        tweets.push({
            "Count": i + 1,
            "Tweet was posted on": properties[i].created_at,
            "Tweet Id": properties[i].id,
            "User who tweeted": {
                "Name": properties[i].user.name,
                "Username": properties[i].user.screen_name
            },
            "Tweet caption": properties[i].text
        })
    }
    if (!tweets == []) {
        res.status(200).send(tweets)
    }
    else {
        res.status(200).send(tweets)
    }

})
// api to get tweetInfo
app.get('/tweetInfo/:id', (req, res) => {
    // console.log(req.params.id)
    let tweetInfo = []
    for (let i = 0; i < properties.length; i++) {
        if (properties[i].id == req.params.id) {
            // console.log(properties[i].id)
            tweetInfo.push({
                "Created at": properties[i].created_at,
                "User who posted the tweet": properties[i].user.name,
                "id of user": properties[i].user.id,
                "Tweet caption": properties[i].text,
                "Followers": properties[i].user.followers_count,
                "Following": properties[i].user.following,
                "Tweet Id": properties[i].id,
            })
        }
    }
    // if(!tweetInfo == []){
    //     res.status(400).send("No such user found")
    // }  else {    return res.status(200).send(tweetInfo)}  
    return res.status(200).send(tweetInfo)
})
//api to get all twitter users
app.get('/users', async (req, res) => {
    let users = []
    for (let i = 0; i < properties.length; i++) {
        // console.log(properties[i].user.name+"\n");
        users.push({
            "Name": properties[i].user.name,
            "Username": properties[i].user.screen_name
        })
    }
    return res.status(200).send(users)
})
//regex for links
let link = properties[1].user.entities.url.urls[0].url
console.log(link)
