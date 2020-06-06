import net = require("net")
export default class SocketWrapper {
    socket: net.Socket
    constructor(socket: net.Socket) {
        this.socket = socket
    }

    writeString = (str: string) => {
        this.writeUInt16(str.length)
        this.socket.write(str)
    }

    writeUInt8 = (int: number) => {
        const buffer = Buffer.alloc(1)
        buffer.writeUInt8(int)
        this.socket.write(buffer)
    }

    writeUInt16 = (int: number) => {
        const buffer = Buffer.alloc(2)
        buffer.writeUInt16BE(int)
        this.socket.write(buffer)
    }

    writeUInt32 = (int: number) => {
        const buffer = Buffer.alloc(4)
        buffer.writeUInt32BE(int)
        this.socket.write(buffer)
    }

}