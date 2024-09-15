import ansiColors from "ansi-colors";
import TorrentHelper from "./TorrentHelper.js";
import { filesize } from "filesize";

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(date) {
  const day = date.getUTCDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${day}${getOrdinalSuffix(
    day
  )} ${month}, ${year} at ${hours}:${formattedMinutes}${suffix}`;
}
function printRow(key, value) {
  console.log(ansiColors.yellow(key), value);
}
export default function printFileInfo(torrent) {
  printRow("\nName: ", torrent.info.name.toString("utf8"));
  printRow(
    "Size: ",
    filesize(TorrentHelper.getSize(torrent), { standard: "jedec" })
  );
  if (torrent["creation date"]) {
    printRow("Created At: ", formatDate(new Date(torrent["creation date"])));
  }
  if (torrent["created by"]) {
    printRow("Created By: ", torrent["created by"].toString("utf8"));
  }
  printRow(
    "Pieces: ",
    `${torrent.info["pieces"].length / 20} X ${filesize(
      torrent.info["piece length"],
      { standard: "jedec" }
    )}\n`
  );
}
