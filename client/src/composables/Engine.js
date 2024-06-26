import ThreeApp from "./ThreeApp.js";
import ColyseusRoom from "./ColyseusRoom.js";

export default class Engine extends EventTarget {


    constructor() {
        super();
        this.three = new ThreeApp({engine: this})
        this.server = new ColyseusRoom({engine: this})

        this.bind()

    }

    bind() {
        this.addEventListener('server/player/connect', (e) => {
            console.log(e)
            this.three.addPlayer(e.detail.player, e.detail.sessionId)
        })
    }

    bindWindowEvents() {
        window.addEventListener('click', (e) => {
            if (e.button === 0) {
                this.server.room.send('click', {x: e.clientX, y: e.clientY});
            }
        })
        this.three.animate()
    }

}