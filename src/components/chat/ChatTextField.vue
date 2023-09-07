<template>
  <div class="inputArea">
    <input
      type="text"
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
    />
    <button @click="sendMessage" class="sendButton">
      <el-icon><Promotion /></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Promotion } from '@element-plus/icons-vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const newMessage = ref('');
const userSelected = computed(() => store.state.userSelected);

const sendMessage = () => {
  if (userSelected.value == false) {
    newMessage.value = '';
    return;
  }
  if (newMessage.value == '') {
    newMessage.value = '';
    return;
  } else {
    store.dispatch('sendMessage', newMessage.value).then(() => {
      store.dispatch('getChatsWithUser', false).then(() => {
        store.commit('setRecentChatsReset');
        for (const IDs of store.state.idArray) {
          console.log('THE ID in search:', IDs);
          store.dispatch('getRecentChatsWithUser', { IDs, bool: false });
        }
      });
    });
    newMessage.value = '';
  }
};
</script>

<style scoped>
.inputArea {
  display: flex;
  padding: 10px;
  height: 70px;
}
.sendButton {
  background-color: blue;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 1.5em;
  height: unset;
}
input[type='text'] {
  flex-grow: 1;
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
