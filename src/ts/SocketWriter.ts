import net = require("net")
export default class SocketWriter {
    socket: net.Socket
    constructor(socket: net.Socket) {
        this.socket = socket
    }

    writeString = (str: string) => {
        this.writeInt16(str.length)
        this.socket.write(str, "utf8")
    }

    writeByte = (int: number) => {
        const buffer = Buffer.alloc(1)
        buffer.writeUInt8(int)
        this.socket.write(buffer)
    }

    writeInt16 = (int: number) => {
        const buffer = Buffer.alloc(2)
        buffer.writeInt16BE(int)
        this.socket.write(buffer)
    }

    writeInt32 = (int: number) => {
        const buffer = Buffer.alloc(4)
        buffer.writeInt32BE(int)
        this.socket.write(buffer)
    }

    writeInt64 = (int: number) => {
        const buffer = Buffer.alloc(8)
        buffer.writeBigInt64BE(BigInt(int))
        this.socket.write(buffer)
    }

}