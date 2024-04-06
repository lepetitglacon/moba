<script setup>

import {onMounted} from "vue";
import * as THREE from "three";
import Engine from "./composables/Engine.js";

const game = new Engine()

onMounted(() => {
  game.three.setSize(window.innerWidth, window.innerHeight)
  game.bindWindowEvents()
})

</script>

<template>
</template>

<style scoped>
</style>
