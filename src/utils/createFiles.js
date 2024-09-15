import fs from "fs-extra";

export default function createFiles(tempfilepath, files = []) {
  let outputFile = fs.openSync(tempfilepath, "r");
  let totalOffset = 0;
  for (let file of files) {
    let buf = Buffer.alloc(file.size);
    fs.readSync(outputFile, buf, 0, buf.length, totalOffset);
    fs.ensureFileSync(file.path);
    let curFd = fs.openSync(file.path, "w");
    fs.writeSync(curFd, buf, 0, buf.length, 0);
    fs.closeSync(curFd);
    totalOffset += file.size;
  }
  fs.closeSync(outputFile);
}
