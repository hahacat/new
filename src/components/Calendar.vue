<template>
  <div>
    <div class="calender">
      <div class="txt-c p-10">
        <span @click="prev"> ⬅️ </span>
        <input type="text" v-model="year" />年
        <input type="text" v-model="month" class="month" />月
        <span @click="next"> ➡️️️️ </span>
      </div>
      <div class="weekDay flex jc-sb p-5 day">
        <p v-for="item in weekList" :key="item.id">{{ item }}</p>
      </div>
      <div class="weekDay flex p-5 day">
        <p v-for="item in spaceDay" :key="item.id"></p>
        <p
          v-for="(item, idx) in monthDay[month - 1] || 30"
          @click="setDay(idx)"
          :class="[idx === activeDay ? 'active' : '', curDay === idx + 1 ? 'cureent' : '']"
          :key="item.id"
        >
          <span class="text">{{ item }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch, computed } from 'vue'

export default defineComponent({
  setup () {
    const year = ref(0) // 年
    const month = ref(0) // 月
    const day = ref(0) // 日
    const current = new Date()
    const activeDay = ref(11) // 选中的日期
    const February = ref(1) // 每个月第一天是星期几
    const spaceDay = ref('') // 判断2月份的天数
    const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const monthDay = reactive([31, '', 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
    let currentYear = 2022
    let currentMonth = 6
    let currentDay = 1

    const curDay = computed(() => {
      if (currentYear === year.value && month.value === currentMonth) {
        return activeDay.value
      }
      return -1
    })

    // 判断月份的第一天是星期几
    const getMonthFisrtDay = () => {
      var firstDayOfCurrentMonth = new Date(year.value, month.value - 1, 1) // 某年某月的第一天
      if (firstDayOfCurrentMonth.getDay() === 0) {
        spaceDay.value = 6
      } else {
        spaceDay.value = firstDayOfCurrentMonth.getDay() - 1
      }
      // 当天变色
      // if (currentYear === year.value && month.value === currentMonth) {
      //   activeDay.value = currentDay
      // }
    }
    // 获取当前的日期
    const getTheCurrentDate = () => {
      console.log(typeof current, 'current', `${current.toLocaleDateString()}--${current.toLocaleTimeString()}`)
      year.value = current.getFullYear()
      month.value = current.getMonth() + 1
      day.value = current.getDate()
      currentYear = current.getFullYear()
      currentMonth = current.getMonth() + 1
      currentDay = current.getDate()

      activeDay.value = day.value
    }

    // 判断是否是闰年
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    }
    // 初始化一些数据
    const initSomeData = () => {
      February.value = isLeapYear(year) ? 28 : 29
      monthDay.splice(1, 1, February.value)
    }

    // 选取特定天数
    const setDay = (idx) => {
      activeDay.value = idx
      day.value = idx + 1
      console.log(
        '选择的日期是' + year.value + ' ' + month.value + ' ' + day.value
      )
    }
    // 上一月
    const prev = () => {
      if (month.value === 1) {
        year.value--
        month.value = 12
      } else {
        month.value--
      }
      activeDay.value = -1
      getMonthFisrtDay()
    }
    // 下一月
    const next = () => {
      if (month.value === 12) {
        year.value++
        month.value = 1
      } else {
        month.value++
      }
      activeDay.value = -1
      getMonthFisrtDay()
    }

    onMounted(getMonthFisrtDay)
    onMounted(getTheCurrentDate)
    onMounted(initSomeData)

    watch(month, (newValue, oldValue) => {
      if (newValue > 12 || newValue < 1) {
        console.log('请输入正确月份')
        return
      }
      getMonthFisrtDay()
    })

    watch(year, (newValue) => {
      getMonthFisrtDay()
    })

    return {
      year,
      month,
      day,
      current,
      activeDay,
      February,
      spaceDay,
      weekList,
      monthDay,

      currentYear,
      currentMonth,
      currentDay,

      curDay, // 计算属性

      getMonthFisrtDay,
      getTheCurrentDate,
      isLeapYear,
      initSomeData,
      setDay,
      prev,
      next
    }
  },
  name: 'calender'
})
</script>

<style lang="scss" scoped>
.calender {
  width: 80%;
  margin: 0 auto;
  border: 1px solid;
  background: #efccef;
  .txt-c {
    text-align: center;
  }
  .p-10 {
    padding: 2rem;
  }
  .p-5 {
    padding: 1rem;
  }
  .flex {
    display: flex;
  }
  .jc-sb {
    justify-content: space-between;
  }
  input {
    width: 50px;
    &.month {
      width: 30px;
    }
  }
  .day {
    flex-wrap: wrap;
    p {
      width: 14.28%;
      /*flex: 0 0 0 ;*/
      text-align: center;
      line-height: 2.4rem;
      height: 2.4rem;
      position: relative;
      z-index: 100;
      &.active {
        color: #fff;
      }
      &.active:before {
        content: "";
        height: 2.4rem;
        width: 2.4rem;
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        background: #e97163;
        color: #fff;
      }
      .current {
        color: #fff;
      }
      .text{
        display: inline-block;
        width: 2.4rem;
        cursor: pointer;
      }
    }
  }
}
</style>
