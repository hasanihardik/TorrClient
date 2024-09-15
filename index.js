#!/usr/bin/env node
"use strict";
import TorrentDownloader from "./src/utils/TorrentDownloader.js";
import TorrentHelper from "./src/utils/TorrentHelper.js";
import path from "path";
import printFileInfo from "./src/utils/printFileInfo.js";
import showSelectFileDialog from "./src/utils/showSelectFileDialog.js";
import ansiColors from "ansi-colors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

showSelectFileDialog((torrentFilePath) => {
  if (!torrentFilePath) {
    console.log(ansiColors.red("Select .torrent file"));
  } else {
    if (path.extname(torrentFilePath) !== ".torrent") {
      console.log(ansiColors.red("Invalid .torrent file"));
    } else {
      const torrent = TorrentHelper.parseTorrent(torrentFilePath);
      printFileInfo(torrent);
      let torrentDownloader = new TorrentDownloader(
        path.resolve(__dirname, ".bt-client")
      );
      torrentDownloader.download(torrent, path.resolve(__dirname, "downloads"));
    }
  }
});
