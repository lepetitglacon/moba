import { Client, Room } from "colyseus.js";

export default class ColyseusRoom {

    constructor({engine}) {
        this.engine = engine
        this.client = new Client("ws://localhost:2567");

        console.log(this.client.id)

        this.sessionId = null
        this.room = null
        this.playerEntities = {}

        this.connect()
    }

    async connect() {

        try {
            this.room = await this.client.joinOrCreate("my_room");
            this.sessionId = this.room.sessionId
            console.log("Joined successfully!");
        } catch (e) {
            console.error(e);
        }

        this.room.state.players.onAdd((player, sessionId) => {
            console.log("A player has joined! Their unique session id is", sessionId);
            const event = new CustomEvent('server/player/connect', {
                detail: {
                    player: player,
                    sessionId: sessionId
                }
            })
            console.log(event)
            this.engine.dispatchEvent(event)
        });

        this.room.state.players.onRemove((player, sessionId) => {
            // const entity = playerEntities[sessionId];
            // if (entity) {
            //     entity.removeFromParent()
            //     delete playerEntities[sessionId];
            // }
        });
    }

}