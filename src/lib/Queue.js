"use strict";
import TorrentHelper from "../utils/TorrentHelper.js";

export default class Queue {
  #queue;
  constructor(torrent) {
    this.torrent = torrent;
    this.#queue = [];
    this.choked = true;
  }

  queue(pieceIndex) {
    const nBlocks = TorrentHelper.blocksPerPiece(this.torrent, pieceIndex);
    for (let i = 0; i < nBlocks; i++) {
      const pieceBlock = {
        index: pieceIndex,
        begin: i * TorrentHelper.BLOCK_LEN,
        length: TorrentHelper.getBlockLen(this.torrent, pieceIndex, i),
      };
      this.#queue.push(pieceBlock);
    }
  }

  deque() {
    return this.#queue.shift();
  }

  peek() {
    return this.#queue[0];
  }

  length() {
    return this.#queue.length;
  }
}
