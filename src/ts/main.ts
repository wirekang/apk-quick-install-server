import fs = require("fs")
import readline = require("readline")
import Server from "./Server"
import FileWatcher from "./FileWatcher"

var server: Server
const config = initConfig()
initReadline(onLine)

if (config !== null) {
    server = new Server(config.port)
    new FileWatcher(config.file, onFileChange)
}

function onFileChange() {
    server.transferFile(config.file)
}

function onLine(line: string) {
    if (config === null) {
        console.log(">>>Please modify config.json and restart<<<")
        return
    }
    try {
        line = line.trim()
        const args = line.split(" ")
        switch (args[0]) {
            case "send":
                server.transferFile(config.file)
                break
            case "exit": process.exit()
            case "help": console.log("send exit")
        }
    } catch (e) {
        console.log(e)
    }
}

function initConfig(): any {
    if (fs.existsSync("config.json")) {
        console.log("Reading config.json...")
        const config = JSON.parse(fs.readFileSync("config.json").toString())
        console.log(config)
        return config
    } else {
        console.log("Config file not found. Create a new one.")
        const config = { "file": "C:/example/debug/app-debug.apk", "port": 5123 }
        fs.writeFileSync("config.json", JSON.stringify(config))
        console.log(">>>Please modify config.json and restart<<<")
        return null
    }

}

function initReadline(listener: (line: string) => void) {
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on("line", listener).on("close", () => {
        process.exit()
    })
}