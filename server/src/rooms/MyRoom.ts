import { Room, Client } from "@colyseus/core";
import {MyRoomState, Player} from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
    });

    this.onMessage("click", (client, data) => {
      console.log(data)

    });
  }

  onJoin (client: Client, options: any) {

    console.log(client.sessionId, "joined!");

    const mapWidth = 800;
    const mapHeight = 600;

    // create Player instance
    const player = new Player();

    // place Player at a random position
    player.x = this.getRandomInt(10)
    player.y = 0
    player.z = this.getRandomInt(10)

    // place player in the map of players by its sessionId
    // (client.sessionId is unique per connection!)
    this.state.players.set(client.sessionId, player);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}
