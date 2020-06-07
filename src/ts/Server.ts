import net = require("net")
import fs = require("fs")
import readline = require("readline")
import SocketWriter from "./SocketWriter"

const BUFFER_SIZE = 1024

export default class Server {
    isConnected: boolean
    port: number
    server: net.Server
    client: net.Socket = null
    writer: SocketWriter
    buffer: Buffer

    constructor(port: number) {
        this.isConnected = false
        this.port = port
        this.buffer = Buffer.alloc(0)
        this.server = net.createServer(this.onConnection)
        this.listen()
    }

    private listen = () => {
        this.log("Listening...")
        this.server.listen(this.port)
    }

    private onConnection = (socket: net.Socket) => {
        this.log(`Connection ${this.getSocketAddress(socket)}`)
        this.isConnected = true

        if (this.client != null) {
            this.log("Connection exists.")
            this.client.removeAllListeners()
            this.client.destroy()
        }

        this.client = socket
        this.client.setKeepAlive(true)
        this.client.setNoDelay(true)

        this.writer = new SocketWriter(this.client)

        this.client.on("end", () => {
            this.log(`Disconnect(${this.getSocketAddress(this.client)})`)
            this.isConnected = false
            this.client = null
        })

        this.client.on("error", (err: Error) => {
            this.log(`Error (${err})`)
            this.isConnected = false
            this.client = null
        })
    }

    transferFile = (fileName: string) => {
        this.log(`sendFile: ${fileName}`)
        if (!this.checkConnection()) return
        const stats = fs.statSync(fileName)
        this.log(`${stats.size} bytes`)
        this.sendFileStart(stats.size)

        const file = fs.readFileSync(fileName)
        const bytes = file.buffer
        var left = stats.size
        var offset = 0
        console.log("This line will be ignored")
        while (left > 0) {
            var send = BUFFER_SIZE
            var end = offset + send
            if (end > stats.size) {
                send -= end - stats.size
                end = stats.size
            }
            this.sendFile(offset, bytes.slice(offset, end))
            left -= send
            readline.moveCursor(process.stdout, 0, -1)
            this.log(`send: ${end} / ${stats.size} (${Math.round(end / stats.size * 100)}%)`)
            offset += send
        }
        this.log("send end")
    }

    private sendFileStart = (fileSize: number) => {
        this.writer.writeString("file start")
        this.writer.writeInt64(fileSize)
    }

    private sendFile = (offset: number, bytes: ArrayBuffer) => {
        this.writer.writeString("file")
        this.writer.writeInt64(offset)
        this.writer.writeInt16(bytes.byteLength)
        this.writer.socket.write(new Uint8Array(bytes))
    }

    private getSocketAddress = (socket: net.Socket): string => {
        return socket.remoteAddress
    }

    private checkConnection = (): boolean => {
        if (!this.isConnected)
            this.log("Not connected")
        return this.isConnected
    }

    private log = (str: string) => {
        console.log(`[${this}] ${str}`)
    }

    toString = (): string => {
        return `Server:${this.port}`
    }
}