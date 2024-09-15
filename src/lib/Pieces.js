"use strict";
import TorrentHelper from "../utils/TorrentHelper.js";
import fs from "fs-extra";

export default class Pieces {
  #requested;
  #received;
  #metadataPath;
  #totalBlocks;
  #updateState() {
    try {
      const jsonString = fs.readFileSync(this.#metadataPath, "utf8");
      const oldState = JSON.parse(jsonString);
      this.#requested = oldState.requested;
      this.#received = oldState.received;
    } catch (error) {}
  }
  constructor(torrent, metadataPath) {
    function buildPiecesArray() {
      const nPieces = torrent.info.pieces.length / 20;
      const arr = new Array(nPieces).fill(null);
      return arr.map((_, i) => 
        new Array(TorrentHelper.blocksPerPiece(torrent, i)).fill(false)
      );
    }
    this.#metadataPath = metadataPath;
    this.#requested = buildPiecesArray();
    this.#received = buildPiecesArray();
    this.#totalBlocks = this.#received.reduce((totalBlocks, blocks) => {
      return blocks.length + totalBlocks;
    }, 0);
    this.#updateState();
  }
  serializeToFile() {
    const state = {
      requested: this.#requested,
      received: this.#received,
    };
    const jsonString = JSON.stringify(state, null, 2);
    fs.writeFileSync(this.#metadataPath, jsonString, "utf8");
  }
  addRequested(pieceBlock) {
    const blockIndex = pieceBlock.begin / TorrentHelper.BLOCK_LEN;
    this.#requested[pieceBlock.index][blockIndex] = true;
  }

  addReceived(pieceBlock) {
    const blockIndex = pieceBlock.begin / TorrentHelper.BLOCK_LEN;
    this.#received[pieceBlock.index][blockIndex] = true;
  }

  needed(pieceBlock) {
    if (this.#requested.every((blocks) => blocks.every((i) => i))) {
      this.#requested = this.#received.map((blocks) => blocks.slice());
    }
    const blockIndex = pieceBlock.begin / TorrentHelper.BLOCK_LEN;
    return !this.#requested[pieceBlock.index][blockIndex];
  }

  isDone() {
    return this.#received.every((blocks) => blocks.every((i) => i));
  }
  getTotalBlockCount() {
    return this.#totalBlocks;
  }
  getDownloadedBlockCount() {
    const downloaded = this.#received.reduce((totalBlocks, blocks) => {
      return blocks.filter((i) => i).length + totalBlocks;
    }, 0);
    return downloaded;
  }
  free() {
    fs.unlinkSync(this.#metadataPath);
  }
}
