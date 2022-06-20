<template>
  <div style="background: #00f">
    <div id="calender">
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
          :class="idx === activeDay ? 'active' : ''"
          :key="item.id"
        >
          <span class="text">{{ item }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'

export default defineComponent({
  setup () {
    const counter = ref(0)
    const year = ref(2022)
    const month = ref(0)
    const day = ref(11)
    const current = ref(new Date())
    const activeDay = ref(11) // 选中的日期
    const February = ref(1) // 每个月第一天是星期几
    const spaceDay = ref('') // 判断2月份的天数
    const weekList = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const monthDay = reactive([31, '', 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])

    // 判断月份的第一天是星期几
    const getMonthFisrtDay = () => {
      var firstDayOfCurrentMonth = new Date(year.value, month.value - 1, 1) // 某年某月的第一天
      if (firstDayOfCurrentMonth.getDay() === 0) {
        spaceDay.value = 6
      } else {
        spaceDay.value = firstDayOfCurrentMonth.getDay() - 1
      }
    }
    // 获取当前的日期
    const getTheCurrentDate = () => {
      year.value = current.value.getFullYear()
      month.value = current.value.getMonth() + 1
      day.value = current.value.getDate()
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

    const prev = () => {
      if (month.value === 1) {
        year.value--
        month.value = 12
      } else {
        month.value--
      }
      activeDay.value = 0
      getMonthFisrtDay()
    }
    const next = () => {
      if (month.value === 12) {
        year.value++
        month.value = 1
      } else {
        month.value++
      }
      activeDay.value = 0
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
      counter,
      year,
      month,
      day,
      current,
      activeDay,
      February,
      spaceDay,
      weekList,
      monthDay,

      getMonthFisrtDay,
      getTheCurrentDate,
      isLeapYear,
      initSomeData,
      setDay,
      prev,
      next
    }
  },
  name: 'calender',
  // created () {
  // this.current = new Date()
  // this.getTheCurrentDate()
  // this.getMonthFisrtDay()
  // this.February = this.isLeapYear(this.year) ? 28 : 29
  // this.monthDay.splice(1, 1, this.February)
  // },
  // watch: {
  // month () {
  //   if (this.month > 12 || this.month < 1) {
  //     console.log('请输入正确月份')
  //     return
  //   }
  //   this.getMonthFisrtDay()
  // },
  // year () {
  //   this.getMonthFisrtDay()
  // }
  // },
  methods: {}
})
</script>

<style lang="scss" scoped>
#calender {
  width: 80%;
  margin: 0 auto;
  border: 1px solid;
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
      .text{
        display: inline-block;
        width: 2.4rem;
        cursor: pointer;
      }
    }
  }
}
</style>
