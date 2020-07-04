import parser from './index.js'

import { createHash } from 'crypto'
import { readFileSync } from 'fs'


function test_sidx() {
    const f = "/Users/admin/Downloads/140.mp4"
    const file = readFileSync(f)
    console.info(file.length)
    var md5file = createHash('md5');
    md5file.update(file)
    console.info(md5file.digest("hex"))
    const start = 668;
    const maxlen = 236;
    let data1 = file.slice(start, start + maxlen);
    var md5sum = createHash('md5');
    md5sum.update(data1)
    console.info(md5sum.digest("hex"))
    console.info("parse len", data1.length)
    const data = new DataView(data1.buffer, start, maxlen)
    console.info("byteLength", data.byteLength)
    console.info(new parser(data, true).parse())
}


function test_ebml() {
    const f = "/tmp/12"
    const file = readFileSync(f)
    console.info(file.length)
    var md5file = createHash('md5');
    md5file.update(file)
    console.info(md5file.digest("hex"))
    console.info("parse len", file.length, file.byteOffset)
    const data = new DataView(file.buffer, file.byteOffset, file.length)
    console.info(file, file.buffer)
    console.info("byteLength", data.byteLength)
    console.info(data.getUint32())
    const r = readUInt(data,5,0)
    console.info(r)
    console.info(new parser(data).parse())
}

function readUInt(data,length,pos) {
    let value = 0;
    for (let i = 0; i < length; i++) {
        value *= 2**8;
        value += data.getUint8(pos + i);
    }
    return value;
}

// test_sidx();
test_ebml();

