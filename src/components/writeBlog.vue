<template>
  <div class="container">
    <div class="col-sm-6">
      <div class="bar">
        <h3>标题</h3>
        <span class="tip" ref="tip1"></span>
      </div>
      <hr>
      <input id='title' type="text" ref="title_" v-on:blur="check_1"  placeholder="请在这里输入标题" autocomplete="off">
      <hr>
      <div class="bar">
        <h3>博客内容</h3>
        <span class="tip" ref="tip2"></span>
      </div>
      <hr>
      <textarea name="text" id="content" ref="content_" v-on:blur="check_2" placeholder="请在这里输入内容"></textarea>
      <br>
      <button  v-bind:class="{'btn-primary':(!isSuccess),'btn-success':isSuccess}"  v-on:click="post" ref="commit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'writeBlog',
  data(){
    return{
      isSuccess: false,
    }
  },
  methods: {
    getTitle() {
      return this.$refs.title_.value
    },
    getContent() {
      return this.$refs.content_.value
    },
    post() {
      this.$http.post('http://127.0.0.1:9090/blogs',
          {"userId": 7, "title": this.getTitle(), "content": this.getContent()})
          .then( response=>{
            if(response.data==='new blog added'){
              this.isSuccess=true;
              this.$refs.commit.disabled="disabled"
              setTimeout(()=>{
                this.$router.replace('/')
              },1000)
            }
            },
              error => console.log(error))
    },
    check_1(){
      if(this.getTitle()===''){
        this.$refs.tip1.innerHTML="<p style='color: red; font-size: 1em'>标题不能为空</p>"
      }else{
        this.$refs.tip1.innerHTML="<p style='color: green; font-size: 1em'> OK </p>"
      }
    },
    check_2(){
      if(this.getContent()===''){
        this.$refs.tip2.innerHTML="<p style='color: red; font-size: 1em'>内容不能为空</p>"
      }else {
        this.$refs.tip2.innerHTML="<p style='color: green; font-size: 1em'> OK </p>"
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p{

  font-size: 1em ;

  color: darkslategrey;
}
h5{
  font-family: songti;
}
#title{
  width: 90%;
  min-width: 300px;
}
#content{
  width: 90%;
  min-width: 300px;
  min-height: 300px;
}
.bar{
  display: inline-flex;
}
.tip{
  margin: auto 1em;
  padding-top: 3px;
}
</style>
