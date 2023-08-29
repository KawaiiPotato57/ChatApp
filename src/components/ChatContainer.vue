<template>
  <div class="chatContainer">
    <!-- Chat Header -->
    <ChatHeader />

    <!-- Chat Area -->
    <div class="chatArea">
      <div
        v-for="message in chatMessages"
        :key="message.id"
        :class="['chatMessage', message.sender]"
      >
        <div class="messageContent">{{ message.content }}</div>
        <div class="messageTime">{{ message.time }}</div>
      </div>
    </div>

    <!-- Input Area -->
    <ChatTextField />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ChatTextField from './ChatTextField.vue';
import ChatHeader from './ChatHeader.vue';

interface Message {
  id: number;
  sender: 'me' | 'them';
  content: string;
  time: string;
}

const chatMessages = ref<Message[]>([
  {
    id: 1,
    sender: 'me',
    content:
      'Hi! loream ipsum dolor sit amet, consectetur adipiscing elit. loream ipsum dolor sit amet, consectetur adipiscing elit.loream ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '11:30 AM'
  },
  {
    id: 2,
    sender: 'them',
    content:
      'Hello!  loream ipsum dolor sit amet, consectetur adipiscing elit. loream ipsum dolor sit amet, consectetur adipiscing  loream ipsum dolor sit amet, consectetur adipiscing elit. loream ipsum dolor sit amet, consectetur adipiscing loream ipsum dolor sit amet, consectetur adipiscing elit. loream ipsum dolor sit amet, consectetur adipiscing loream ipsum dolor sit amet, consectetur adipiscing elit. loream ipsum dolor sit amet, consectetur adipiscing',
    time: '11:31 AM'
  }
]);

// Load more messages (here, I am generating mock messages; you can replace this with API calls)
const loadMoreMessages = () => {
  const lastId = chatMessages.value.length
    ? chatMessages.value[chatMessages.value.length - 1].id
    : 0;

  const newMessages: Message[] = Array.from({ length: 20 }, (_, i) => ({
    id: lastId + i + 1,
    sender: i % 2 === 0 ? 'me' : 'them',
    content: `Message ${lastId + i + 1}`,
    time: '12:00 PM'
  }));

  chatMessages.value = [...newMessages, ...chatMessages.value];
};
loadMoreMessages();

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.scrollTop < 500000) {
    // adjust the value as you see fit
    // loadMoreMessages();
  }
};

onMounted(() => {
  const chatArea = document.querySelector('.chatArea');
  chatArea?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  const chatArea = document.querySelector('.chatArea');
  chatArea?.removeEventListener('scroll', handleScroll);
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
  overflow-y: auto;
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
