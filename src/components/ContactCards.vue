<template>
  <div class="chatBar">
    <div class="contactCard" v-for="contact in contacts" :key="contact.id">
      <!-- above will be an on click, which will dispatch an action in the store to change the current chat
         and in the chat container it will receive the data using the getter or store.state -->
      <div class="imageWrapper">
        <img :src="contact.image" alt="contact avatar" class="contactImage" />
        <div class="statusDot" v-if="contact.isOnline"></div>
      </div>
      <div class="contactDetails">
        <div class="contactName">{{ contact.name }}</div>
        <div class="lastMessage">{{ contact.lastMessage }}</div>
      </div>
      <div class="messageTime">{{ contact.time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import chatIcon from '../assets/chatIcon.png';

interface Contact {
  id: number;
  image: string;
  name: string;
  lastMessage: string;
  time: string;
  isOnline: boolean; // Add this property
}

const contacts = ref<Contact[]>([
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: true
  },
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: false
  },
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: true
  },
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: false
  },
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: true
  },
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: false
  },
  {
    id: 1,
    image: chatIcon,
    name: 'John Doe',
    lastMessage: 'Hello there!',
    time: '11:30 AM',
    isOnline: true
  }
  // Add more contacts as needed
]);
</script>

<style>
.chatBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}
.chatBar::-webkit-scrollbar {
  width: 5px; /* Width of the scrollbar */
}

.chatBar::-webkit-scrollbar-thumb {
  background-color: darkgrey; /* Color of the scroll thumb */
  outline: 1px solid slategrey; /* 1px border around thumb */
}

.chatBar::-webkit-scrollbar-thumb:hover {
  background: grey; /* Color of thumb when hovered */
}

.chatBar::-webkit-scrollbar-track {
  background: lightgrey; /* Color of the track */
}
.contactCard {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  height: 10vh;
  width: 25vw;
  color: black;
}
.contactCard:hover {
  background-color: rgba(202, 202, 202, 0.568);
}
.contactCard::after {
  content: '';
  position: absolute;
  left: 1;
  bottom: 0;
  width: 90%;
  height: 1px;
  background-color: rgb(72, 72, 72);
}

.contactImage {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 1px;
}

.contactDetails {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.contactName {
  font-weight: bold;
}

.lastMessage {
  color: rgb(48, 48, 48);
}

.messageTime {
  margin-left: auto;
  color: rgb(48, 48, 48);
}
.imageWrapper {
  position: relative;
  margin: 5px;
}

.statusDot {
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
}

@media (max-width: 1200px) {
  .contactCard {
    height: 8vh;
    width: 45vw;
  }
  .contactCard:hover {
    background-color: rgba(202, 202, 202, 0.568);
  }
  .contactCard::after {
    width: 80%;
    height: 1px;
  }
  .contactImage {
    width: 40px;
    height: 40px;
  }

  .contactName {
    font-size: small;
  }

  .lastMessage {
    font-size: small;
  }

  .messageTime {
    font-size: small;
  }
  .statusDot {
    width: 8px;
    height: 8px;
  }
}
@media (max-width: 768px) {
  .contactCard {
    height: 14vh;
    width: 60vw;
  }
  .contactCard:hover {
    background-color: rgba(202, 202, 202, 0.568);
  }
  .contactCard::after {
    width: 80%;
    height: 1px;
  }
  .contactImage {
    width: 40px;
    height: 40px;
  }

  .contactName {
    font-size: small;
  }

  .lastMessage {
    font-size: small;
  }

  .messageTime {
    font-size: small;
  }
  .statusDot {
    width: 8px;
    height: 8px;
  }
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
  .contactCard {
    height: 14vh;
    width: 60vw;
  }
  .contactCard:hover {
    background-color: rgba(202, 202, 202, 0.568);
  }
  .contactCard::after {
    width: 80%;
    height: 1px;
  }
  .contactImage {
    width: 40px;
    height: 40px;
  }

  .contactName {
    font-size: small;
  }

  .lastMessage {
    font-size: small;
  }

  .messageTime {
    font-size: small;
  }
  .statusDot {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 320px) {
  .contactCard {
    height: 14vh;
    width: 40vw;
  }
  .contactCard:hover {
    background-color: rgba(202, 202, 202, 0.568);
  }
  .contactCard::after {
    width: 80%;
    height: 1px;
  }
  .contactImage {
    width: 40px;
    height: 40px;
  }

  .contactName {
    font-size: small;
  }

  .lastMessage {
    font-size: small;
  }

  .messageTime {
    font-size: small;
  }
  .statusDot {
    width: 8px;
    height: 8px;
  }
}

/* Medium screens, typically tablets */

/* Small screens, typically large mobile devices */
</style>
<!--  -->
