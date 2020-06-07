export default class BufferReader {
    buffer: Buffer
    offset: number

    constructor(buffer: Buffer) {
        this.buffer = buffer
        this.offset = 0
    }

    readString = (): string => {
        const length = this.readInt16()
        const r = this.buffer.slice(this.offset, this.offset + length)
        return r.toString("utf8")
    }

    readByte = (): number => {
        return this.buffer.readUInt8(this.offset++)
    }

    readInt16 = (): number => {
        const r = this.buffer.readInt16BE(this.offset)
        this.offset += 2
        return r
    }

    readInt32 = (): number => {
        const r = this.buffer.readInt32BE(this.offset)
        this.offset += 4
        return r
    }

    readInt64 = (): number => {
        const r = this.buffer.readBigInt64BE(this.offset)
        this.offset += 8
        return Number(r)
    }
}