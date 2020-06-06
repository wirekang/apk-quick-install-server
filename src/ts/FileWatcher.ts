import fs = require("fs")
import md5 = require("md5")

const WATCH_DELAY = 1000

enum WatchMode {
    NEW, CHANGE
}

export default class {
    fileName: string
    preHash: string
    mode: WatchMode
    onChange: Function

    constructor(file: string, onChange: () => void) {
        this.fileName = file
        this.onChange = onChange
        this.mode = fs.existsSync(this.fileName) ? WatchMode.CHANGE : WatchMode.NEW
        this.watch()
    }

    private watch = () => {
        switch (this.mode) {
            case WatchMode.NEW:
                this.log("Waiting for file to be created...")
                this.watchNew()
                break
            case WatchMode.CHANGE:
                this.log("Waiting for file to be changed...")
                this.setPreHash()
                this.watchChange()
                break
        }
    }

    private watchNew = () => {
        if (fs.existsSync(this.fileName)) {
            this.log("File created")
            this.onChange()
            this.mode = WatchMode.CHANGE
            this.watch()
        } else
            setTimeout(this.watchNew, WATCH_DELAY)
    }

    private watchChange = () => {
        var hash: string
        this.getHash().then((result) => {
            hash = result
            if (hash !== this.preHash) {
                this.log("File changed")
                this.onChange()
            }
            this.preHash = hash
            setTimeout(this.watchChange, WATCH_DELAY)
        })
    }

    private setPreHash = () => {
        this.getHash().then((result) => {
            this.preHash = result
        })
    }

    private getHash = (): Promise<string> => {
        return new Promise((resolve) => {
            resolve(md5(fs.readFileSync(this.fileName)))
        })
    }

    toString = (): string => {
        return `FileWatcher`
    }

    private log = (str: string) => {
        console.log(`[${this}] ${str}`)
    }
}