<template>
  <div class="searchDiv">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearch"
      class="transparent"
      popper-class="my-autocomplete"
      placeholder="Search Contacts."
      @select="handleSelect"
    >
      <template #suffix>
        <el-icon class="searchIcon" @click="handleIconClick"> <Search /> </el-icon>
      </template>
      <template #default="{ item }">
        <div class="value">{{ item.value }}</div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const state = ref('Tokyo');
const cities = ['New York', 'London', 'Tokyo', 'Paris']; // Dummy data

const querySearch = (queryString: string, cb: (arg0: { value: String }[]) => void) => {
  const results = cities.filter(
    (city) => city.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  );
  cb(results.map((value) => ({ value }))); // Wrapping cities in objects with 'value' property
};

const handleSelect = (item: { value: string }) => {
  state.value = item.value;
};

const handleIconClick = (ev: Event) => {
  console.log(ev);
};
</script>

<style>
.searchDiv {
  padding: 14px;
}
.transparent .el-input__inner {
  color: rgb(189, 189, 189);
  width: 240px;
  height: 40px;
}
.transparent .el-input__wrapper {
  border: 1px solid rgb(83, 83, 83);
  background-color: transparent;
  color: white;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.463);
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
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
  .searchDiv {
    padding: 6px;
    padding-left: 30px;
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
