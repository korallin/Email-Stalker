import { serve, Reponse } from "https://deno.land/std@0.106.0/http/server.ts";
import { EmailControl } from "./email.ts";
//Create the const
const _EmailControl = new EmailControl();
const server = serve({hostname: "0.0.0.0", port: 6666 });

//start the server
console.log(`Webserver running. Access it at: 0.0.0.0:6666`);

//First send the EMAIL
const BASE_IMG = "picture"
const EXT_IMG = ".jpg"
const to = "exemple.com"
const subject = "Test"
const EmailNameTag = "testing"

//Create the encoded data
let encoded = btoa(BASE_IMG+"__"+to+"__"+EmailNameTag)
let content = Deno.readTextFileSync("./email.html")

//Send the Email
await _EmailControl.send(subject, content.replace('__NAME__', encoded+EXT_IMG), to)
console.log(`[${Date.now()}] - send EMAIL: ${to} | nameTag: ${EmailNameTag} | SUCCESS`)
console.log("~~Waiting client to open email...")

async function main(request) {
    let response:Reponse = {}

    if(request.url.startsWith("/email/assets/")){
        let tmp = request.url.replace('/email/assets/', "")
        let data = atob(tmp.split('.')[0]).split('__')
        let img = data[0]
        let email = data[1]
        let nameTag = data[2]
        console.log(`[${Date.now()}] - ${email} open the EMAIL | nameTag: ${nameTag}`)
        response.body = Deno.readFileSync(`./${img}.${tmp.split('.')[1]}`)
    }
    
    try{
        response.body = Deno.readFileSync(`./picture.jpg`)
    } catch(err){}

    request.respond(response)
}

for await (const req of server) { main(req) }