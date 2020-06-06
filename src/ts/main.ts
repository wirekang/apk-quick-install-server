import fs = require("fs")
import readline = require("readline")
import Server from "./Server"
import FileWatcher from "./FileWatcher"

const config = initConfig()
initReadline(onLine)

const server = new Server(config.port)
new FileWatcher(config.file, onFileChange)

function onFileChange() {
    server.transferFile(config.file)
}

function onLine(line: string) {
    line = line.trim()
    const args = line.split(" ")
    switch (args[0]) {
        case "send":
            server.transferFile(config.file)
            break
        case "event":
            server.sendEmptyEvent(args[1])
            break
        case "exit": process.exit()
        case "help": console.log("send exit")

    }
}

function initConfig(): any {
    console.log("Reading config.json...")
    const config = JSON.parse(fs.readFileSync("config.json").toString())
    console.log(config)
    return config
}

function initReadline(listener: (line: string) => void) {
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on("line", listener).on("close", () => {
        process.exit()
    })
}