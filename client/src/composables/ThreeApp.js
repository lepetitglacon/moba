import * as THREE from "three";

export default class ThreeApp {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, 0, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.z = 5;
    }

    addPlayer(player) {
        console.log('player added')
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );
    }

    animate() {
        requestAnimationFrame( () => this.animate() );
        this.renderer.render( this.scene, this.camera );
    }

    setSize(width, height) {
        this.camera.aspect = width / height
        this.renderer.setSize(width, height)
    }

}

