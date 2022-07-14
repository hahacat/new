<template>
<div>
  <button @click="chageShow">TeleportTest bag</button>
  <teleport to="body">
    <div v-if="show" @click="$emit('click', 12)">bag</div>
  </teleport>
</div>

</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    modelValue: Number
  },
  setup (props) {
    console.log(props.modelValue)
    const show = ref(false)
    const chageShow = () => {
      show.value = !show.value
    }
    return {
      show,
      chageShow
    }
  },
  emits: ['click']
}
</script>
