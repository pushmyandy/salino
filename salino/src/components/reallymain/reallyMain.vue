<template>
  <div class="main">
    <el-row>
      <el-col :span="24">
        <div class="nav">
          <ul class="navUl">
            <li class="greeting">{{greeting}}</li>
            <li>联系我啦</li>
            <li>萨利诺</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin: 5px" :gutter="20">
      <el-col :span="9">
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
        <div class="form hidden-lg-and-down">
          <el-form :model="form">
            <el-form-item label="随便写点啥吧">
              <el-input type="textarea" v-model="form.advice"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交</el-button>
              <el-button @click = "clear">取消</el-button>
            </el-form-item>
          </el-form>
          <div class="mess">
            <ul>
              <li>
                <div></div>
                <div></div>
              </li>
            </ul>
          </div>
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
      content: [],
      form: {
        advice: ''
      }
    }
  },
  mounted () {
    if(this.isChorme()) {
      $('.nav').addClass('navAni')
      $('.dir').addClass('dirAni')
      $('.form').addClass('dirAni')
      $('.router').addClass('contentAni')
    }
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
    },
    isChorme () {
      const USER_AGENT = navigator.userAgent.toLowerCase()
      const isChrome = /.*(chrome)\/([\w.]+).*/
      return isChrome.test(USER_AGENT)
    },
    clear () {
      this.form = {}
    }
  },
  computed: {
    greeting () {
      if(this.isChorme()) {
        return '谷歌浏览器好呀'
      } else {
        return '试试谷歌浏览器吧'
      }
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
  @-moz-keyframes navMoveIn
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
  @-moz-keyframes dirMoveIn
    0%
      left -500px
    50%
      left -250px
    100%
      left 5px
  @keyframes contentMoveIn
    0%
      right -500px
    50%
      right -250px
    100%
      right 0px
  @-moz-keyframes contentMoveIn
    0%
      right -500px
    50%
      right -250px
    100%
      right 0px
  .dirAni
    animation dirMoveIn 1s linear
    -moz-animation dirMoveIn 1s linear
  .navAni
    animation navMoveIn 1s linear
    -moz-animation navMoveIn 1s linear
  .contentAni
    animation contentMoveIn 1s linear
    -moz-animation contentMoveIn 1s linear
  .main
    background url("./imgs/mainBack.jpg") center no-repeat
    .nav
      position relative
      margin 5px
      border-radius 10px
      top 0
      left 0
      right 0
      background url("imgs/MidnightCity.jpg")
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
      background rgba(65,67,69,0.5)
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
              background #232526
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
              background #414345

    .form
      position relative
      box-sizing border-box
      padding 5px
      height 400px
      margin-top 15px
      background rgba(105,105,105,0.6)
      .mess
        box-sizing border-box
        padding 5px
        ul
          list-style none
          li
            display flex
    .router
      position relative
      box-sizing border-box
      background rgba(105,105,105,0.6)
      padding 5px
      height 600px
</style>
