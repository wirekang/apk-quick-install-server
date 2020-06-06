import net = require("net")
import fs = require("fs")
import SocketWriter from "./SocketWriter"
import BufferReader from "./BufferReader"

const BUFFER_SIZE = 1024

export default class Server {
    isConnected: boolean
    port: number
    server: net.Server
    client: net.Socket = null
    writer: SocketWriter

    constructor(port: number) {
        this.isConnected = false
        this.port = port
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

        this.writer = new SocketWriter(this.client)

        this.client.on("end", () => {
            this.log(`Disconnect(${this.getSocketAddress(this.client)})`)
            this.isConnected = false
            this.client = null
        })

        this.client.on("data", this.onClientData)
    }

    private onClientData = (data: Buffer) => {
        const length = data.readUInt8()
        const event = data.slice(1, length).toString()
        this.log(`Recieved ${data.byteLength} bytes`)
        this.onClientEvent(event, data.slice(length))
    }

    private onClientEvent = (event: string, data: Buffer) => {
        this.log(`Event "${event}"`)
        const reader = new BufferReader(data)
        switch (event) {
            case "file end":
                this.onClientRecieveFile(reader.readUInt32())
        }
    }

    private onClientRecieveFile = (fileSize: number) => {
        this.log(`Client recived ${fileSize} bytes`)
    }

    sendEmptyEvent = (event: string) => {
        this.writer.writeString(event)
    }

    transferFile = (fileName: string) => {
        this.log(`sendFile: ${fileName}`)
        if (!this.checkConnection()) return
        const stats = fs.statSync(fileName)
        this.log(`${stats.size} bytes`)
        this.sendFileStart(stats.size)

        const file = fs.readFileSync(fileName)
        const bytes = file.toJSON().data
        var left = stats.size
        var offset = 0
        var step = 0
        while (left > 0) {
            var send = BUFFER_SIZE
            var end = offset + send
            if (end > stats.size) {
                send -= end - stats.size
                end = stats.size
            }
            this.sendFile(offset, bytes.slice(offset, end))
            left -= send
            if (step++ % 123 == 0)
                this.log(`send: ${fileName}  ${end / stats.size * 100}%`)
            offset += send
        }
        this.log("send end")
    }

    private sendFileStart(fileSize: number) {
        this.writer.writeString("file start")
        this.writer.writeUInt32(fileSize)
    }

    private sendFile = (offset: number, bytes: number[]) => {
        this.writer.writeString("file")
        this.writer.writeUInt32(offset)
        this.writer.writeUInt16(bytes.length)
        bytes.forEach((byte) => {
            this.writer.writeUInt8(byte)
        })
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