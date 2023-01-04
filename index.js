try{
    const Quickdb = require('quick.db')    
    const db = new Quickdb.QuickDB()
    const express = require('express')
    const app = express()
    app.listen(8080, () =>console.log("http://localhost:8080/"))
    
    function idGen(){  
        let text = "";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz12234567890"
        const gen = () =>{
            text += letters.charAt(Math.floor(Math.random() * letters.length))
        }
        var i = 0
        while(i !== 5){
            gen()
            i++
        }
        return text
    }
    
    app.get("/style.css", (req,res) => res.sendFile(__dirname+"/style.css"))
    app.get("/script.js", (req,res) => res.sendFile(__dirname+"/script.js"))

    app.get("/", (req, res) =>{   
        res.sendFile(__dirname + "/index.html")
    })
    
    app.get("/redirect/:id", async(req, res) => {
        const id = req.params.id
        if(!id) return res.redirect("/");
        const link = await db.get(id)
        if(!link) return res.redirect("/")
        res.redirect(link)
    })
    
    app.get("/create", async(req, res) => {
        const url = req.query.url
        if(!url) return res.send({"error": "No URL Param found"})
        let id = idGen()
        let thereIs = true
        while(thereIs !== false){
            const check = await db.has(id)  
            if(check) return id = idGen()
            thereIs = false
        }    
        await db.set(id, url)
        res.send({"link": `http://localhost:8080/redirect/${id}`})
    })
}catch(e) {console.log(e)}
