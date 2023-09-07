<template>
  <!-- <div class="searchDiv">
    <el-autocomplete
      v-model="state"
      class="transparent"
      placeholder="Search Contacts."
      @select="handleSelect"
    >
      <template #suffix>
        <el-icon class="searchIcon" @click="handleIconClick" @keydown.enter="handleIconClick">
          <Search />
        </el-icon>
      </template>
      <template #default="{ item }">
        <div class="value">{{ item.value }}</div>
      </template>
    </el-autocomplete>
  </div> -->
  <div style="display: flex; flex-direction: column">
    <div class="searchDiv">
      <el-input
        v-model="state"
        class="transparent"
        @input="changeCards"
        size="large"
        placeholder="Enter Number : 03001234567"
        :suffix-icon="'el-icon-search'"
      >
      </el-input>
      <button
        class="searchButton"
        :icon="Search"
        @click="handleIconClick"
        @keyup.enter="handleIconClick"
      >
        Search
      </button>
    </div>
    <p style="color: brown; margin: 10px" v-if="showError">
      Please enter the contact number then search
    </p>
  </div>
  <ContactCards :isValue="isValue" />
</template>

<script setup lang="ts">
import ContactCards from './ContactCards.vue';
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
const store = useStore();

const state = ref('');
const showError = ref(false);
const isValue = ref(false);
const changeCards = () => {
  if (state.value == '' || state.value == null || state.value == undefined) {
    isValue.value = false;
  }
};
const handleIconClick = (ev: Event) => {
  if (state.value == '') {
    showError.value = true;
    isValue.value = false;
  } else {
    showError.value = false;
    isValue.value = true;
    store.dispatch('searchUsers', state.value);
  }
};
</script>

<style>
.searchDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 14px;
}

.searchButton {
  background-color: #121212;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  width: 100px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
}

.searchButton:hover {
  background-color: #9d9d9d;
  color: rgb(31, 31, 31);
}
.transparent .el-input__inner {
  color: rgb(61, 61, 61);
}
.transparent .el-input__inner[type='text'] {
  font-size: 14px;
}
.transparent .el-input__wrapper {
  border: 1px solid rgb(83, 83, 83);
  background-color: transparent;
  color: rgb(51, 51, 51);
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.463);
  width: 100px;
  height: 40px;
}
.transparent .el-input__suffix-inner {
  font-size: 50px;
  color: rgb(31, 31, 31);
}
.my-autocomplete.el-popper {
  background-color: #1212126d;
  color: white;

  border-radius: 10px;
}
.el-autocomplete-suggestion__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default {
  background-color: #9797976d;
  border-radius: 10px;
}
.my-autocomplete.el-popper li {
  line-height: normal;
  padding: 8px;
  margin: 8px;
}
.my-autocomplete.el-popper li:hover {
  line-height: normal;
  padding: 7px;
  color: rgb(31, 31, 31);
}

@media (max-width: 1200px) {
  .searchDiv {
    padding: 12px;
  }
  .transparent .el-input__inner {
    width: 180px;
    height: 35px;
  }
  .my-autocomplete.el-popper li {
    padding: 7px;
    margin: 7px;
  }
  .transparent .el-input__inner[type='text'] {
    font-size: 13px;
  }
}

/* Medium screens, typically tablets */
@media (max-width: 992px) {
  .searchDiv {
    padding: 10px;
  }
  .transparent .el-input__inner {
    width: 100px;
    height: 30px;
  }
  .my-autocomplete.el-popper li {
    padding: 6px;
    margin: 6px;
  }
  .transparent .el-input__inner[type='text'] {
    font-size: 12px;
  }
}

/* Small screens, typically large mobile devices */
@media (max-width: 768px) {
  .searchDiv {
    padding: 8px;
    padding-left: 50px;
  }
  .transparent .el-input__inner {
    width: 100px;
    height: 45px;
  }
  .my-autocomplete.el-popper li {
    padding: 5px;
    margin: 5px;
  }
  .transparent .el-input__inner[type='text'] {
    font-size: 12px;
  }
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
  .searchDiv {
    padding: 6px;
  }
  .transparent .el-input__inner {
    width: 150px;
    height: 45px;
  }
  .my-autocomplete.el-popper {
    background-color: #0000004d;
    width: 300px;
  }
  .my-autocomplete.el-popper li {
    padding: 4px;
    margin: 4px;
  }
  .my-autocomplete.el-popper li:hover {
    padding: 3px;
  }
  .transparent .el-input__inner[type='text'] {
    font-size: 12px;
    margin-left: 30px;
  }
}

@media (max-width: 320px) {
  .searchDiv {
    padding: 6px;
    padding-left: 5px;
  }
  .transparent .el-input__inner {
    width: 200px;
    height: 40px;
  }
  .my-autocomplete.el-popper {
    background-color: #0000004d;
    width: 260px;
  }
  .my-autocomplete.el-popper li {
    padding: 4px;
    margin: 4px;
  }
  .my-autocomplete.el-popper li:hover {
    padding: 3px;
  }
}
</style>
