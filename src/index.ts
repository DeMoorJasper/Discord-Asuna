import { Server } from './server';

export class Index {
  static server: Server;

  constructor() {
    // Start the server
    Index.server = new Server();
  }
}

// Initiate the program
const index = new Index();