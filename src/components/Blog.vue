<template>
  <div class="container">
    <div class ='col-sm-8'>
      <div class="title">
        <h3>最受欢迎的影评</h3>
       <router-link :to="'/post/'"><h5 class ="post"> 我要写影评</h5></router-link>
      </div>
      <hr>
      <div v-for="item in blogs" :key="item.id" >
        <section  v-for="blog in item" :key="blog._id">
          <h5>{{ blog.title }}</h5>
          <p>{{blog.body}}<router-link :to="'/blogs/' + blog._id" class="btn btn-link">read more</router-link></p>
          <hr>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data(){
    return {
      start: 0, //开始下标
      count: 15, //每次拉取的博客数目
      blogs: [], //存放博客
      noMore: false,
      isAchiveBottom: false,
    }
  },
  methods:{
    getData(){
      this.$http.get("http://127.0.0.1:9090/blogs/",{params:{start:this.start,count:this.count}})
          .then(response => response.json() , error => console.log(error))
          .then(json => {
            if(json.data!=='There is no blogs') {
              this.blogs.push(json);
            } else {
              this.noMore = true;
            }
          },
              error => console.log(error));
    },
    numberIncrement(){
      this.start+=this.count;
    }
  },
  created(){
    this.getData();
    this.numberIncrement()
    window.onscroll = () => {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件(距底部20px时触发加载)
        if (((scrollHeight - scrollTop - windowHeight) <= 20) && !this.isAchiveBottom && !this.noMore
        ) {
          this.isAchiveBottom = true;
          setTimeout(() => {
            //后端需要进行分页，然后前端从后端拿来实现滚动加载
              this.numberIncrement();
              this.getData();
              this.isAchiveBottom = false;
          }, 500);
        }
    };
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
.title{
  display: inline-flex;
}
.post{
  margin:auto 1em;
  padding:0.2em 0.4em;
  color: cadetblue;
}
</style>
