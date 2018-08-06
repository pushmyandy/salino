<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="nav">
          <ul class="navUl">
            <li class="greeting">(◕ᴗ◕✿)我喜欢方方的</li>
            <li>联系我啦</li>
            <li>萨利诺</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin: 5px" :gutter="20">
      <el-col :span="8.8">
        <div class="dir">
          <ul class="dirUl">
            <li v-for="item in content" :key = item.id class="filterContainer" @click="handleLiClick(item.eng)">
              <div class="filter">
                <div class="front">{{item.mes}}</div>
                <div class="back">{{item.mes}}</div>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="router">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'reallyMain',
  data () {
    return {
      content: []
    }
  },
  mounted () {
    $('.nav').addClass('navAni')
    $('.dir').addClass('dirAni')
    this.init()
  },
  methods: {
    init () {
      axios.get('/api/torrent.json').then(this.handleGet)
    },
    handleGet (res) {
      if (res.data.ret) {
        this.content = res.data.data.content
      }
    },
    handleLiClick (val) {
      this.$router.push('/main/'+val)
    }
  }
}
</script>

<style scoped lang="stylus">
  @keyframes navMoveIn
    0%
      top -50px
    50%
      top -25px
    100%
      top 0
  @keyframes dirMoveIn
    0%
      left -500px
    50%
      left -250px
    100%
      left 5px
  .dirAni
    animation dirMoveIn 1s linear
  .navAni
    animation navMoveIn 1s linear
  .main
    background url("./imgs/mainBack.jpg") center no-repeat
    .nav
      position relative
      margin 5px
      border-radius 10px
      top 0
      left 0
      right 0
      background url("imgs/sexyBlue.jpg")
      height 50px
      .navUl
        margin 0
        padding 0
        display block
        height 50px
        color white
        list-style none
        li
          position relative
          display block
          cursor pointer
          box-sizing border-box
          padding 0 15px
          font-size 20px
          font-family '幼圆'
          line-height 50px
          float right
          &:hover
            transform rotate(360deg)
            color orange
            transition all 0.5s ease-in
        .greeting
          float left
          &:hover
            transform rotate(360deg)
            color orange
            transition all 0.5s ease-in
    .dir
      width 100%
      min-height 180px
      position relative
      margin 0
      box-sizing border-box
      padding 5px
      background rgba(255,255,255,0.5)
      display inline-block
      .dirUl
        float left
        padding 0
        list-style none
        margin 0
        .filterContainer
          display block
          box-sizing border-box
          width 150px
          height 150px
          margin 10px
          text-align center
          font-size 50px
          line-height 150px
          font-family '幼圆'
          color white
          cursor pointer
          float left
          -webkit-perspective 500
          -moz-perspective 500
          -ms-perspective 500
          perspective 500
          -ms-transform perspective(500px)
          -moz-transform perspective(500px)
          transform-style preserve-3d
          &:hover .filter
            transform rotateY(180deg)
          .filter
            position relative
            width 150px
            height 150px
            transition 0.6s
            transform-style preserve-3d
            .front
              position absolute
              left 0
              top 0
              bottom 0
              right 0
              backface-visibility hidden
              width 100%
              height 100%
              transform rotateY(0deg)
              z-index 2
              background #2193b0
            .back
              position absolute
              left 0
              top 0
              bottom 0
              right 0
              backface-visibility hidden
              width 100%
              height 100%
              transform rotateY(-180deg)
              background #6dd5ed

    .router
      box-sizing border-box
      background rgba(135,206,250,0.6)
      padding 5px
      height 600px
</style>
