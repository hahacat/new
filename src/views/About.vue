<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="bag">
      <teleport-test @click="bagClick" v-model="count"></teleport-test>
    </div>
    <div id="type">
      <teleport-test-b v-model:title="bTitle" v-model:count="count"></teleport-test-b>
    </div>
    <div ref="jjj">
      <p v-for="item in list" :key="item" :ref="setItemRef">{{ item }}</p>
      <button @click="showRef">click Ref</button>
    </div>
    <async-comp />
    <p v-yellow="'yellow'">yellow</p>
  </div>
</template>

<script>
import TeleportTest from '../components/TeleportTest.vue'
import TeleportTestB from '../components/TeleportTestB.vue'
import { defineAsyncComponent, ref } from 'vue'

const AsyncComp = defineAsyncComponent(
  () => import('../components/AsyncComp.vue')
  // new Promise((resolve, reject) => {
  //   resolve({
  //     template: '<div>I am async!</div>'
  //   })
  // })
)

export default {
  components: { TeleportTest, TeleportTestB, AsyncComp },
  name: 'About',
  setup () {
    const bTitle = ref('b-title')
    const count = ref(7)
    return {
      bTitle, count
    }
  },
  data () {
    return {
      list: [1, 2, 4],
      itemRef: []
    }
  },
  methods: {
    showRef () {
      console.log(this.$refs, 'ref', this.itemRef)
    },
    setItemRef (el) {
      if (el) {
        this.itemRef.push(el)
      }
    },
    bagClick (n) {
      console.log('bagClick', n)
    }
  },
  directives: {
    yellow: {
      created (el, binding, vnode, prevVnode) {
        console.log('created', el, binding, vnode, prevVnode)
        el.style.background = 'yellow'
      }, // 新增
      beforeMount () {
        console.log('beforeMount')
      },
      mounted () {
        console.log('mounted')
      }
      // beforeUpdate () {
      //   console.log('beforeUpdate')
      // }, // 新增
      // updated () {
      //   console.log('updated')
      // },
      // beforeUnmount () {
      //   console.log('beforeUnmount')
      // }, // 新增
      // unmounted () {
      //   console.log('unmounted')
      // }
    }
  }
}
</script>
