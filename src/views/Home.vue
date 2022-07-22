<template>
  <div class="home">
    <h2>this is home </h2>
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>
