import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {CSS2DObject, CSS2DRenderer} from 'three/addons/renderers/CSS2DRenderer.js';

export default class ThreeApp {

    constructor({engine}) {
        this.engine = engine

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(200, 200, 200)
        this.camera = new THREE.PerspectiveCamera( 75, 0, 0.1, 1000 );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        document.body.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
    }

    addPlayer(player, sessionId) {
        console.log('player added')
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );

        let color = sessionId === this.engine.server.sessionId ? 0xffff00 : 0x00ff00
        let textColor = sessionId === this.engine.server.sessionId ? 'red' : 'black'

        const material = new THREE.MeshBasicMaterial( { color: color } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.set(player.x, player.y, player.z)
        this.scene.add( cube );

        const earthDiv = document.createElement( 'div' );
        earthDiv.className = 'label';
        console.log(player)
        earthDiv.textContent = sessionId;
        earthDiv.style.backgroundColor = 'transparent';
        earthDiv.style.color = textColor;
        earthDiv.style.pointerEvents = 'none';

        const earthLabel = new CSS2DObject( earthDiv );
        // earthLabel.position.copy(cube.position)
        earthLabel.position.y += 1
        cube.add( earthLabel );
    }

    animate() {
        requestAnimationFrame( () => this.animate() );

        console.log('test')
        this.controls.update()
        this.labelRenderer.render( this.scene, this.camera );
        this.renderer.render( this.scene, this.camera );
    }

    setSize(width, height) {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height)
        this.labelRenderer.setSize( width, height );
        document.body.appendChild( this.labelRenderer.domElement );
    }

}

