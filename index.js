import express from "express"
import cors from "cors"

const app = express() 
app.use(cors())

app.use(express.json())

const users = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const user = req.body
    console.log(user)

    if(user.username !== undefined && user.avatar !== undefined){
        users.push(user)
        res.status(201).send("OK")
        return
    }
    res.status(400).send("Todos os campos são obrigatórios!")

})

app.post("/tweets", (req, res)=>{
    const tweet = req.body

    

    if(tweet.username !== undefined && tweet.tweet !== undefined){

        const userInfo =users.find(u => u.username == tweet.username)
        const body = {
            username: tweet.username,
            avatar: userInfo.avatar,
            tweet: tweet.tweet
        }
        console.log(body)
        tweets.push(body)
        res.status(201).send("OK")
        return
    }

    res.status(400).send("Todos os campos são obrigatórios!")
})

app.get("/tweets", (req,res)=>{
    const {pages} = req.params

    if (pages !== undefined && pages > 0){
        const tweets10 =tweets.slice(
            tweets.length - 1 - (pages*10 -10),
            tweets.length - 1 - (pages*10 -1)
            )
        res.send(tweets10)
        return
    }else{
        const tweets10 = tweets.slice(tweets.length -10 , tweets.length -1)
        res.send(tweets10)
        return
    }
})

app.get("/tweets/:username", (req,res)=>{
    const {username} = req.params

    const tweetsUser = tweets.find((t)=> {
        if(t.username == username){
            return t.avatar
        }
    })

    res.status(200).send(tweetsUser)
})

app.listen(5000)