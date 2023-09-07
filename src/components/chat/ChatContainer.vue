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
      <h2>Select Or Search contacts to start chatting</h2>
      <img class="tempImg" :src="ChatA" />
    </div>

    <!-- Input Area -->
    <ChatTextField />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick, watchEffect } from 'vue';
import ChatA from '@/assets/chatA.png';
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
const currentChatUser = computed(() => store.state.currentChatUser);
const userChanged = computed(() => store.state.userChanged);
watch(
  currentChatUser,
  (newVal) => {
    contacts.value = newVal;
    console.log('The contacts loaded : ', typeof contacts.value);
    console.log('In the contacts container before : ');
    if (Object.keys(contacts.value).length !== 0) {
      console.log('In the contacts container TRUE : ');
      contactsCheck.value = true;
    } else {
      console.log('In the contacts container False : ');
      contactsCheck.value = false;
    }
  },
  { immediate: true } // Run immediately when setting up the watcher
);

const newApiMessages: ApiMessage[] = computedChats.value;
console.log('The newApiMessages : ', newApiMessages);
let currentScrollPosition = 0;
const updateChatMessages = (newApiMessages: ApiMessage[]) => {
  if (chatArea.value) {
    currentScrollPosition = chatArea.value.scrollHeight - chatArea.value.scrollTop;
  }
  chatMessages.value = newApiMessages.map((apiMsg) => ({
    id: apiMsg.chatId,
    sender: apiMsg.isSendMsg ? 'me' : 'them',
    content: apiMsg.msg,
    time: new Date(apiMsg.dateTime).toLocaleTimeString()
  }));
  nextTick(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight - currentScrollPosition;
    }
  });
};
updateChatMessages(newApiMessages);
console.log('User connection id saved:', localStorage.getItem('userToken'));

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
const loadMoreMessages = () => {
  console.log('IN LOAD MORE MESSAGES');
  store.dispatch('getChatsWithUser', true).then(() => {});
};

const handleScroll = (e: Event) => {
  console.log('IN HANDLE SCROLL');
  const target = e.target as HTMLElement;
  // Change 500000 to the scroll position at which you want to trigger the function
  console.log('The target : ', target.scrollTop, 'CHAT AREA', chatArea.value?.scrollHeight);
  if (target.scrollTop == 0) {
    loadMoreMessages();
  }
};

watch(
  () => store.state.messageSent,
  (newMessageSent) => {
    if (chatArea.value) {
      // Scroll to the bottom when a new message is sent
      chatArea.value.scrollTop = chatArea.value.scrollHeight;
    }
  }
);
watch(
  computedChats,
  (newChats) => {
    if (newChats) {
      console.log('IN chat if');
      updateChatMessages(newChats);
      if (newChats.length <= 0) {
        updateChatMessages(dummyMessage);
      }
    }
  },
  { immediate: true, deep: true } // Run immediately when setting up the watcher
);

watch(
  userChanged,
  (newVal) => {
    if (newVal === false) {
      if (chatArea.value) {
        console.log('Removing scroll');
        chatArea.value.removeEventListener('scroll', handleScroll);
      }
    }
  },
  { immediate: true }
);

watchEffect(() => {
  if (contactsCheck.value) {
    chatArea.value = document.querySelector('.chatArea') as HTMLElement | null;
  } else {
    chatArea.value = null;
  }

  if (chatArea.value) {
    chatArea.value.addEventListener('scroll', handleScroll);
    // chatArea.value.scrollTop = 540;
  }
});

// onUnmounted(() => {
//   if (chatArea.value) {
//     console.log('Removing scroll');
//     chatArea.value.removeEventListener('scroll', handleScroll);
//   }
// });
</script>

<style scoped>
.chatContainer {
  width: 80%;
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}
.chatAreaNull {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.chatAreaNull > h2 {
  margin: 20px;
  text-align: center;
}
.tempImg {
  width: 30%;
  height: 70%;
}
.chatHeader {
  display: flex;
  align-items: center;
  padding: 10px;
}

.chatArea {
  display: flex;
  flex-direction: column;
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
@media (max-width: 768px) {
  .messageContent {
    background: rgb(135, 132, 132);
    padding: 10px;
    border-radius: 5px;
    color: white;
    max-width: 70%;
  }
  .chatAreaNull > h2 {
    margin: 20px;
    text-align: center;
  }
  .tempImg {
    width: 20%;
    height: 70%;
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
  .chatAreaNull > h2 {
    margin: 20px;
    text-align: center;
    font-size: 16px;
  }
  .tempImg {
    width: 55%;
    height: 60%;
  }

}
</style>

<!-- @media (max-width: 1200px) {
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
} -->
