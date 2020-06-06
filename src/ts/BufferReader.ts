export default class BufferReader {
    buffer: Buffer
    offset: number

    constructor(buffer: Buffer) {
        this.buffer = buffer
        this.offset = 0
    }

    readString = (): string => {
        const length = this.readUInt16()
        const r = this.buffer.slice(this.offset, this.offset + length)
        return r.toString("utf8")
    }

    readUInt8 = (): number => {
        return this.buffer.readUInt8(this.offset++)
    }

    readUInt16 = (): number => {
        const r = this.buffer.readUInt16BE(this.offset)
        this.offset += 2
        return r
    }

    readUInt32 = (): number => {
        const r = this.buffer.readUInt32BE(this.offset)
        this.offset += 3
        return r
    }
}