import net = require("net")
import fs = require("fs")
import readline = require("readline")
import SocketWriter from "./SocketWriter"

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
        this.sendFile(file.buffer)
    }

    private sendFileStart = (fileSize: number) => {
        this.writer.writeString("file start")
        this.writer.writeInt64(fileSize)
    }

    private sendFile = (bytes: ArrayBuffer) => {
        this.writer.writeString("file")
        this.writer.socket.write(new Uint8Array(bytes), () => { this.log("send end") })
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