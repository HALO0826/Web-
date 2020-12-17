<template>
  <div id="app">
    <div class="container">
      <nav class="navbar" >
        <a href="#" class="navbar-brand">
            <img class ="logo" src="./assets/logo.png" alt="">
        </a>
        <form class="form-inline">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search">
            <div class="input-group-append">
              <button type="button" class="btn btn-secondary"><i class="fa fa-search"></i></button>
            </div>
          </div>
        </form>
        <ul class="list-inline">
          <li class="list-inline-item"><router-link to="/">Home</router-link></li>
          <li class="list-inline-item"><router-link to="/post/">publish</router-link></li>
          <li class="list-inline-item"><a href="#">联系</a></li>
        </ul>
          <a href="#" class="nav-item nav-link">Login</a>
      </nav>
      <hr>
    </div>
    <div class ="container">
      <router-view></router-view>
    </div>
  </div>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}
a{
  color:black
}
nav{
  max-width: 900px;
  min-width: 300px;
  height: 100%;
}
.list-inline{
  font-size: 1.5em;
  margin-top: 0.5em;
}
.logo{
  height: 2em;
}
#logoText{
  font-family: "Times New Roman",Georgia,Serif;
  font-size: 1em;
}
</style>
