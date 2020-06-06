import fs = require("fs")
import readline = require("readline")

const config = initConfig()
initReadline(onLine)

function onLine(line: string) {
    line = line.trim()
    const args = line.split(" ")
    switch (args[0]) {
        case "exit": process.exit()
            break
        case "help": console.log("exit")

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