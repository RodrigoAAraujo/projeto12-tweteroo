import express from "express"
import cors from "cors"

const app = express() 
app.use(cors())

app.use(express.json())

const users = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const user = req.body

    if(user.username !== '' && user.avatar !== ''){
        users.push(user)
        res.status(201).send("OK")
        return
    }
    res.status(400).send("Todos os campos são obrigatórios!")

})

app.post("/tweets", (req, res)=>{
    const {tweet} = req.body
    const {user} = req.headers 

    if(tweet !== '' && user !== undefined){

        const userInfo =users.find(u => u.username == user)
        if(userInfo === undefined){
            res.status(401).send("Esse usuário não está cadastrado")
        }
        const body = {
            username: user,
            avatar: userInfo.avatar,
            tweet: tweet
        }
        tweets.push(body)
        res.status(201).send("OK")
        return
    }

    res.status(400).send("Todos os campos são obrigatórios!")
})

app.get("/tweets", (req,res)=>{
    const {page} = req.query
    const tweetsSend = []
    let counter = 0

    console.log(page)

    if (page !== undefined){
        if(page > 0){
            for(let i = (tweets.length - 1) - (page-1)*10; counter < 10 && i >= 0; i--){
                tweetsSend.push(tweets[i])
                counter ++
            }
            res.status(200).send(tweetsSend)
            return
        }else{
            res.status(400).send("Informe uma página válida!")
            return
        }
    }
    
    for(let i = tweets.length - 1; counter < 10 && i >= 0; i--){
        tweetsSend.push(tweets[i])
        counter ++
    }
    res.status(200).send(tweetsSend)
    
})

app.get("/tweets/:username", (req,res)=>{
    const {username} = req.params

    const tweetsUser = tweets.filter(t => t.username.toLowerCase() == username.toLowerCase())

    res.status(200).send(tweetsUser)
})

app.listen(5000)