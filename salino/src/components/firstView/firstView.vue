<template>
  <div style="width: 100%; height: 100%; position: absolute">
    <div style="width: 100%; height: 100%" class="firstImg">
      <div class="time">
        <p>{{time}}</p>
        <p style="font-size: 70px">{{greeting}}</p>
      </div>
    </div>
    <div class="go">
      <i class="iconfont">&#xe62d;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'firstView',
  data () {
    return {
      time: ''
    }
  },
  mounted () {
    this.refreshTime()
  },
  methods: {
    refreshTime () {
      setInterval(() => {
        let date = new Date()
        this.time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' +
          (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':' +
          (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds())
      }, 1000)
    }
  },
  computed: {
    greeting () {
      if (this.time.split(':')[0] >= 13 && this.time.split(':')[0] <= 24) {
        return 'good evening, let us have some drink'
      } else if (this.time.split(':')[0] >= 11 && this.time.split(':')[0] < 13) {
        return 'i should take a little sleep'
      } else {
        return 'i miss my old friend'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .firstImg
    display flex
    flex-direction row
    justify-content center
    align-items center
    background url("./imgs/firstview.jpg") fixed no-repeat
    .time
      color white
      text-align center
      margin 0 auto
      &:first-child
        font-size 100px
  .go
    position fixed
    background rgba(0,0,0,0.5)
    width 150px
    height 50px
    margin-left 48%
    text-align center
    color white
    font-size 30px
    cursor pointer
    box-sizing border-box
    bottom 0
    &:hover
      animation moveIcon 1s infinite ease-in
  @keyframes moveIcon
    0%
      padding-top 0
    50%
      padding-top 5px
    100%
      padding-top 10px
</style>
