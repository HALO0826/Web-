<template>
  <div class="container">
    <div class="col-sm-7">
      <h3>{{blog.title}}</h3>
      <hr>
      <p id="content">{{blog.body}}</p>
      <hr>
      <h5>评论区</h5>
      <hr>
      <div class="commentList" v-if="hasComment">
        <div v-for="item in comments" :key="item.id">
          <p class="tag">   {{item.cid}}楼</p>
          <p class ="comment">
            {{item.body}}
          </p>
        </div>
      </div>
      <div v-if="!hasComment">
        <p>仍然没有评论...</p>
      </div>
      <br>
      <h5>发表评论</h5>
      <textarea ref="inputArea" placeholder="快来发表你的看法吧"></textarea>
      <button ref="commit" v-bind:class ="{'btn-primary':(!isSuccess), 'btn-success':isSuccess,but:true}" v-on:click="commitClick">发表</button>
      <button  class="btn-warning but" v-on:click="cancelClick">取消</button>

    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBlog",
  data(){
    return{
      blog:{},
      id: 0,
      comments:[],
      hasComment:true,
      isSuccess:false
    }
  },
  methods:{
    getBlog(){
      this.$http.get('http://127.0.0.1:9090/blogs/'+ this.id)
          .then(response=>{this.blog=response.data[0]}, error=>console.log(error))
    },
    getComments(){
      this.$http.get('http://127.0.0.1:9090/comments/'+this.id)
          .then(response=>{
            if (response.data!=='no comment'){
              this.comments=(response.data);
            }else{
              this.hasComment = false;
            }
          }, error=>console.log(error))
    },
    cancelClick(){
      this.$refs.inputArea.value=''
    },
    commitClick(){
      this.$http.post('http://127.0.0.1:9090/comments/'+this.id, {"id":this.id,"body":this.$refs.inputArea.value})
      this.comments.push({"id":this.id,"cid":this.comments.length,"body":this.$refs.inputArea.value})
      this.cancelClick();
      this.hasComment = true;
      this.isSuccess=true;
    }
  },
  created() {
    this.id = this.$route.params["id"];
    this.getBlog();
    this.getComments();
  },
}
</script>

<style scoped>
h5 {
  background: cadetblue;
}
#content{
  border: #42b983 2px solid;
}
.comment{
  font-size: 0.6em;
  margin-top: 5px;
  margin-left: 5px;
  max-width: 90%;
}
.tag{
  color:gray;
  background-color:lightgrey;
  font-size: 0.4em;
}
.commentList{
  border: lightgray 1px solid;
}
textarea{
  width: 100%;
  height: auto;
  min-height: 150px;
  min-width: 300px;
}
.but{
  float: right;
}
</style>