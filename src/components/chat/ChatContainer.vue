<template>
  <div class="chatContainer">
    <!-- Chat Header -->
    <ChatHeader />

    <!-- Chat Area -->
    <div class="chatArea" v-if="contactsCheck">
      <div
        v-for="message in chatMessages"
        :key="message.id"
        :class="['chatMessage', message.sender]"
      >
        <div class="messageContent">{{ message.content }}</div>
        <div class="messageTime">{{ message.time }}</div>
      </div>
    </div>

    <div class="chatAreaNull" v-else>
      <h1>Search and then Select contacts to start chatting</h1>
    </div>

    <!-- Input Area -->
    <ChatTextField />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick, watchEffect } from 'vue';
import ChatTextField from './ChatTextField.vue';
import ChatHeader from './ChatHeader.vue';
import { useStore } from 'vuex';
const store = useStore();
interface UserList {
  userId: number;
  userMobileNo: string;
  userName: string;
  isOnlineUser: boolean;
  newMsgCount: number;
  averageResponseTime: number;
}
interface ApiMessage {
  chatId: number;
  senderId: number;
  receiverId: number;
  dateTime: string;
  isNew: boolean;
  isReveiveMsg: boolean;
  isSendMsg: boolean;
  msg: string;
}
interface Message {
  id: number;
  sender: 'me' | 'them';
  content: string;
  time: string;
}
let contacts = ref<UserList>();
let contactsCheck = ref(false);
const chatArea = ref<HTMLElement | null>(null);
const chatMessages = ref<Message[]>([]);
const computedChats = computed(() => store.state.usersChat);
watch(
  () => store.state.currentChatUser,
  (newVal) => {
    contacts.value = newVal;
    if (contacts.value) {
      contactsCheck.value = true;
    } else {
      contactsCheck.value = false;
    }
  }
);

const newApiMessages: ApiMessage[] = computedChats.value;

const updateChatMessages = (newApiMessages: ApiMessage[]) => {
  chatMessages.value = newApiMessages.map((apiMsg) => ({
    id: apiMsg.chatId,
    sender: apiMsg.isSendMsg ? 'me' : 'them',
    content: apiMsg.msg,
    time: new Date(apiMsg.dateTime).toLocaleTimeString()
  }));
};
updateChatMessages(newApiMessages);

const dummyMessage: ApiMessage[] = [
  {
    chatId: 39,
    senderId: 2,
    receiverId: 1,
    msg: '(System: There are no chats with this user, Start chatting now.😀)',
    dateTime: '2023-08-29T21:24:02.3400791',
    isReveiveMsg: false,
    isSendMsg: true,
    isNew: false
  }
];
watch(
  computedChats,
  (newChats) => {
    if (newChats) {
      updateChatMessages(newChats);
      if (newChats.length <= 0) {
        updateChatMessages(dummyMessage);
      }
    }
  },
  { immediate: true } // Run immediately when setting up the watcher
);

const loadMoreMessages = () => {
  store.dispatch('getChatsWithUser', true);
};

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  // Change 500000 to the scroll position at which you want to trigger the function
  if (target.scrollTop < 100000000) {
    loadMoreMessages();
  }
};
watchEffect(() => {
  if (contactsCheck.value) {
    chatArea.value = document.querySelector('.chatArea') as HTMLElement | null;
  } else {
    chatArea.value = null;
  }

  if (chatArea.value) {
    chatArea.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (chatArea.value) {
    chatArea.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.chatContainer {
  width: 80%;
  max-height: 80vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}
.chatAreaNull {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.chatHeader {
  display: flex;
  align-items: center;
  padding: 10px;
}

.chatArea {
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  padding: 20px;
  overflow-y: scroll;
}

.chatMessage {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.chatMessage.them {
  justify-content: flex-start;
}

.chatMessage.them > .messageContent {
  background: rgb(0, 72, 90);
  padding: 10px;
  border-radius: 5px;
}

.messageContent {
  background: rgb(135, 132, 132);
  padding: 10px;
  border-radius: 5px;
  color: white;
  max-width: 40%;
}

.messageTime {
  margin-left: 10px;
  font-size: 0.8em;
  align-self: flex-end;
}
@media (max-width: 1200px) {
  .messageContent {
    background: rgb(135, 132, 132);
    padding: 10px;
    border-radius: 5px;
    color: white;
    max-width: 40%;
  }
}

/* Medium screens, typically tablets */
@media (max-width: 992px) {
  .messageContent {
    background: rgb(135, 132, 132);
    padding: 10px;
    border-radius: 5px;
    color: white;
    max-width: 60%;
  }
}

/* Small screens, typically large mobile devices */
@media (max-width: 768px) {
  .messageContent {
    background: rgb(135, 132, 132);
    padding: 10px;
    border-radius: 5px;
    color: white;
    max-width: 70%;
  }
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
  .messageContent {
    background: rgb(135, 132, 132);
    padding: 10px;
    border-radius: 5px;
    color: white;
    max-width: 70%;
  }
}

@media (max-width: 320px) {
}
</style>

<!-- @media (max-width: 1200px) {
}

/* Medium screens, typically tablets */
@media (max-width: 992px) {
}

/* Small screens, typically large mobile devices */
@media (max-width: 768px) {
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
}

@media (max-width: 320px) {
} -->
