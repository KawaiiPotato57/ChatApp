<template>
  <div class="about">
    <h1>Messages</h1>
    <SearchBar />

  </div>
</template>
<script setup lang="ts">
import SearchBar from './SearchBar.vue';
</script>

<style>
.about {
  height: 80vh;
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: aliceblue;
}

@media (max-width: 1200px) {
  .about {
    height: 80vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: aliceblue;
  }
  h1 {
    font-size: 1.5em;
    font-weight: 500;
  }
}

/* Medium screens, typically tablets */
</style>
<!-- @media (max-width: 992px) {
  .about {
    height: 80vh;
    width: 25%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: aliceblue;
  }
  h1 {
    font-size: 1.5em;
    font-weight: 500;
  }
}

/* Small screens, typically large mobile devices */
@media (max-width: 768px) {

}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {

}

@media (max-width: 320px) {

} -->
