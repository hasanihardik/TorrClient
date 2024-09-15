# TorrClient

A simple BitTorrent client built with Node.js. This client allows you to download torrents by interacting with both HTTP and UDP trackers.

## Features

- **HTTP and UDP Tracker Support**: Connects to both HTTP and UDP trackers for downloading torrents.
- **Progress Tracking**: Displays download progress in the terminal.
- **File Handling**: Creates and manages directories for downloaded files.
- **Peer Management**: Fetches and connects to peers for downloading data.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation

Clone the repo, install dependencies, and you're good to go..(do npm install and then download-torrent)

## Code Overview

- `TorrentDownloader.js`: Main class for handling torrent downloading and peer management.
- `TorrentMessageBuilder.js`: Builds messages used in the BitTorrent protocol.
- `HTTPTracker.js` and `UDPTracker.js`: Implementations for interacting with HTTP and UDP trackers.
- `createFiles.js`: Handles the creation of directories and files for the downloaded content.
## Contributing

Feel free to open issues and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


