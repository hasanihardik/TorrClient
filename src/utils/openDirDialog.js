import child_process from "node:child_process";

export default function openDirDialog(dirPath) {
  let command = "";
  switch (process.platform) {
    case "darwin":
      command = "open";
      break;
    case "win32":
      command = "explorer";
      break;
    default:
      command = "xdg-open";
      break;
  }
  return child_process.exec(`${command} "${dirPath}"`, () => {});
}
