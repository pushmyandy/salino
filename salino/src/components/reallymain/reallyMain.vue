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
        <div class="form ">
          <el-form :model="form">
            <el-form-item label="随便写点啥吧">
              <el-input type="textarea" v-model="form.data" style="font-size: 20px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitMes">提交</el-button>
              <el-button @click = "clear">取消</el-button>
            </el-form-item>
          </el-form>
          <div class="mess">
            <ul>
              <li v-for="item in advice">
                <span class="iconfont" style="font-size: 20px">&#xe6ff;</span>
                <span style="margin-left: 5px">{{item.message}}</span>
                <span style="float: right; font-size: 10px; margin-right: 5px">{{item.time}}</span>
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
    <el-row>
      <el-col :span="24" >
        <div class="footer">
          <div class="music" >
            <audio src="../../../static/ReadyForIt.mp3" id="audio" ref="music"></audio>
            <div  class="run" @click="runMusic">
              <span class="iconfont runSpan">&#xe64c;</span>
            </div>
            <div class="audio" @click="audioControl">
              <span class="iconfont vol">&#xe64d;</span>
            </div>
            <div class="desc">
              <span>RAC,St. Lucia - Ready For It</span>
            </div>
            <div class="time">
              <span>{{time}}</span>
              <span>/</span>
              <span>{{duration}}</span>
            </div>
            <div class="line"></div>
            <div class="progress" @click="progressClick">
              <div class="inner"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'reallyMain',
  data () {
    return {
      content: [],
      form: {
        data: ''
      },
      duration: '2:47',
      current: '0:00',
      advice: []
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
      axios.get('../../static/mock/torrent.json').then(this.handleGet)
      axios.get('http://localhost:3000/getMes').then(this.handleGet)
      this.updateTime()
    },
    updateTime () {
      setInterval(() => {
        this.changeTime(this.current)
      }, 1000)
    },
    handleGet (res) {
      if (res.data.ret) {
        this.content = res.data.data.content
      } else {
        this.advice = res.data
        console.log(this.advice)
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
    submitMes () {
      let date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)
      const day = date.getDate()
      let time = year + '-' + month + '-' + day
      axios.post('http://localhost:3000/subMes', {
        "message": this.form.data,
        "time": time
      }).then((res) => {
        console.log('上传成功')
      })
    },
    clear () {
      this.form = {}
    },
    runMusic () {
      const music = $('#audio')[0]
      const progress = $('.inner')
      setInterval(() => {
        if(parseInt(music.currentTime)<10){
          this.current = '0:0' + parseInt(music.currentTime)
        } else if (parseInt(music.currentTime)>=10 && parseInt(music.currentTime) <60) {
          this.current = '0:' + parseInt(music.currentTime)
        } else {
          let min = parseInt (parseInt(music.currentTime) / 60)
          let sec = parseInt(music.currentTime) - (60*min)
          if(sec<10) {
            this.current = min + ':0' + sec
          } else {
            this.current = min + ':' + sec
          }
        }
       }, 1000)
      if(music.paused) {
        $('.runSpan').html('&#xe64a;')
        music.play()
        setInterval(() => {
          const percent = ((Math.round(music.currentTime) / Math.round(music.duration))*100).toString() + '%'
          progress.css("width", percent)
        }, 1000)
      } else if(music.played) {
        $('.runSpan').html('&#xe64c;')
        music.pause()
      }
    },
    progressClick (e) {
      const str = $('.progress').css('width')
      let percent = (e.offsetX / str.substr(0,str.length-2))
      const music = $('#audio')[0]
      music.currentTime = music.duration * percent
    },
    audioControl () {
      const music = $('#audio')[0]
      if(music.volume === 1) {
        $('.vol').css('color','yellow')
        music.volume = 0.5
      } else if(music.volume === 0.5) {
        $('.vol').css('color','black')
        music.volume = 0
      } else {
        $('.vol').css('color','green')
        music.volume = 1
      }
    },
    ...mapMutations(['changeTime'])
  },
  computed: {
    greeting () {
      if(this.isChorme()) {
        return '谷歌浏览器好呀'
      } else {
        return '试试谷歌浏览器吧'
      }
    },
    ...mapState(['time'])
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
      margin 15px
      border-radius 10px
      top 0
      left 0
      right 0
      background url("imgs/CoolBlues.jpg")
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
      background rgba(100,149,237,0.5)
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

    .form
      position relative
      box-sizing border-box
      padding 5px
      height 400px
      margin-top 15px
      background rgba(135,206,235,0.6)
      .mess
        height 200px
        box-sizing border-box
        padding 5px
        overflow auto
        ul
          margin 0
          padding 0
          display block
          width 100%
          height 100%
          list-style none
          li
            display block
            line-height 40px
            color whitesmoke
            font-size 20px
            height 40px
    .router
      position relative
      box-sizing border-box
      background rgba(0,191,255,0.6)
      padding 5px
      height 600px
    .footer
      position fixed
      bottom 0
      right 0
      left 0
      text-align right
      color white
      background rgba(100,149,237,0.5)
      margin 0 15px
      height 50px
      .music
        width 100%
        height 100%
        .run
          margin-top 5px
          cursor pointer
          display inline-block
          float left
          height 50px
          width 50px
          text-align center
          line-height 50px
          span
            font-size 30px
        .audio
          margin-top 5px
          cursor pointer
          display inline-block
          float left
          height 50px
          width 50px
          text-align center
          line-height 50px
          span
            font-size 30px
          .vol
            color lightgreen
        .desc
          margin-top 5px
          display inline-block
          float left
          height 50px
          width 250px
          text-align center
          line-height 50px
        .line
          display inline-block
          box-sizing border-box
          margin 5px
          float left
          width 0
          height 40px
          border 1px solid blue
        .time
          margin-top 5px
          margin-right 20px
          display inline-block
          float left
          height 50px
          width 100px
          text-align center
          line-height 50px
        .progress
          cursor pointer
          width 100%
          height 5px
          .inner
            width 0%
            height 100%
            border-top  3px solid coral
</style>
