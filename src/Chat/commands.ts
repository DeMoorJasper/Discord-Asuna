import { Clear } from './Commands/Clear';
import { Help } from './Commands/Help';
import { Meme } from './Commands/Meme';
import { Pause } from './Commands/Pause';
import { Ping } from './Commands/Ping';
import { Play } from './Commands/Play';
import { Request } from './Commands/Request';
import { Skip } from './Commands/Skip';
import { Stats } from './Commands/Stats';
import { Stop } from './Commands/Stop';

export class Commands {
    private client: any;
    private commands: any;
    
    constructor(client) {
        this.client = client;
        this.commands = {
            Clear: new Clear(client),
            Help: new Help(client),
            Meme: new Meme(client),
            Pause: new Pause(client),
            Ping: new Ping(client),
            Play: new Play(client),
            Request: new Request(client),
            Skip: new Skip(client),
            Stats: new Stats(client),
            Stop: new Stop(client)
        }
    }

    executeCommand(command: string, msg: any) {
        if (this.commands[command]) {
            return this.commands[command].execute(msg);
        }
        return "Command doesn't exist";
    }
}