<template>
  <!-- <div class="type-child"> -->
    <button @click="chageShow">TeleportTest type</button>
    <teleport to="#app">
      <div v-if="show">
        <button @click="$emit('update:count', 6)">-</button>
        <span>{{count}}</span>
        <button @click="$emit('update:count', 8)">+</button>
        <span>{{title}}</span>
      </div>
    </teleport>
  <!-- </div> -->
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  props: {
    title: String,
    count: Number
  },
  emits: ['update:count'],
  setup (props) {
    const show = ref(false)
    const chageShow = () => {
      show.value = !show.value
    }
    const logTitle = () => {
      console.log(props.title)
    }
    onMounted(logTitle)
    return {
      show,
      chageShow,
      logTitle
    }
  }
}
</script>
