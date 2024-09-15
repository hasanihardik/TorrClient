import child_process from "node:child_process";

function showSelectFileDialog(cb = () => {}) {
  const platform = process.platform;
  let command;

  if (platform === "win32") {
    command =
      'powershell.exe -Command "Add-Type -AssemblyName System.windows.forms; $f = New-Object System.Windows.Forms.OpenFileDialog; $f.ShowDialog(); $f.FileName"';
  } else if (platform === "darwin") {
    command = `osascript -e 'POSIX path of (choose file with prompt "Select a file")'`;
  } else if (platform === "linux") {
    command = `zenity --file-selection`;
  }

  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      return;
    }
    const filePath = stdout.trim().split("\n")[1];
    cb(filePath);
  });
}

export default showSelectFileDialog;
