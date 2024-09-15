import axios from "axios";
import TorrentHelper from "../utils/TorrentHelper.js";
import IDGenerator from "./IDGenerator.js";
import bencode from "bencode";
import urlEncodeBytes from "../utils/urlEncodeBytes.js";

export default class HTTPTracker {
  #torrentUrl;
  #parsePeers(peers) {
    const result = [];
    for (let i = 0; i < peers.length; i += 6) {
      const ip = `${peers[i]}.${peers[i + 1]}.${peers[i + 2]}.${peers[i + 3]}`;
      const port = (peers[i + 4] << 8) + peers[i + 5];
      result.push({ ip, port });
    }
    return result;
  }
  #parseResponse(data) {
    const decoded = bencode.decode(data);
    decoded.peers = this.#parsePeers(decoded.peers);
    return decoded;
  }

  #getRequestParams(port = 6883) {
    const params = {
      info_hash: urlEncodeBytes(TorrentHelper.getInfoHash(this.torrent)),
      peer_id: urlEncodeBytes(IDGenerator.generate()),
      port: port,
      uploaded: 0,
      downloaded: 0,
      left: TorrentHelper.getSize(this.torrent),
      compact: 1,
      event: "started",
      numwant: 200,
    };
    let queryString = "";
    for (let param in params) {
      queryString += "&";
      queryString += param;
      queryString += "=";
      queryString += params[param];
    }
    return queryString.substring(1);
  }
  constructor(torrent) {
    this.torrent = torrent;
    this.#torrentUrl = new URL(torrent.announce.toString("utf8"));
  }
  getPeerList(callback = () => {}) {
    axios
      .get(`${this.#torrentUrl}?${this.#getRequestParams()}`, {
        responseType: "arraybuffer",
      })
      .then((data) => callback(this.#parseResponse(data.data).peers))
      .catch((_) => {});
  }
}
