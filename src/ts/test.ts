import BufferReader from "./BufferReader"

const buffer = Buffer.alloc(12)
buffer.writeUInt16BE(10)
buffer.write("1234567890", 2)

const reader = new BufferReader(buffer)
console.log("test")
console.log(`>>${reader.readString()}<<`)