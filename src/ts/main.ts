import fs = require("fs")
import readline = require("readline")

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

function initReadline(listener: (line: string) => void) {
    readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }).on("line", listener).on("close", () => {
        process.exit()
    })
}