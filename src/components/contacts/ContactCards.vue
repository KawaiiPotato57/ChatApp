@ts-ignore
<template>
  <div class="chatBar" v-if="contactsCheck">
    <div
      class="contactCard"
      @click="selectUser(contact)"
      v-for="contact in loadContacts"
      :key="contact.userId"
    >
      <!-- above will be an on click, which will dispatch an action in the store to change the current chat
         and in the chat container it will receive the data using the getter or store.state -->
      <div class="imageWrapper">
        <img :src="chatIcon" alt="contact avatar" class="contactImage" />
        <div class="statusDot" v-if="contact.isOnlineUser"></div>
      </div>
      <div class="contactDetails">
        <div class="contactName">{{ contact.userMobileNo }}</div>
        <!-- <div class="lastMessage">{{ latestMsg }}</div> -->
      </div>
      <div class="latestDiv">
        <div class="lastMessage">
          {{ mappedLatestMsg[contact.userId]?.msg || 'Hey Call me..!' }}
        </div>
        <div class="messageTime">{{ mappedLatestMsg[contact.userId]?.dateTime || '12.00 pm' }}</div>
      </div>
      <!-- <div class="messageTime">{{ localTime }}</div> -->
    </div>
  </div>
  <div class="chatBar" v-else>
    <h4 style="font-size: medium; font-weight: 400; padding-top: 40%; padding-right: 10%">
      Search contacts to start chatting
    </h4>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import chatIcon from '@/assets/chatIcon.png';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  isValue: Boolean
});
const isValueComputed = computed(() => props.isValue);
const loadContacts = computed(() => contacts.value);
const loadedSearch = computed(() => store.state.loadedSearch);
const boolChan = computed(() => store.state.recentBool);
const latestMsg1 = ref();
const recentChats = computed(() => store.state.recentChats);

let isInitialRun = true;
const getTheChats = () => {
  latestMsg1.value = latestMsg1.value.map((chat: any) => {
    return {
      receiverID: chat.receiverId,
      dateTime: toLocalDate(chat.dateTime),
      msg: chat.msg
    };
  });
  console.log('MSG1:', latestMsg1.value);
};
const recentMap = ref({});
const mappedLatestMsg = computed(() => {
  console.log('THE RECALCULATION');
  const map = {};
  latestMsg1.value.forEach((msg) => {
    map[msg.receiverID] = msg; // Assuming 'userId' is a common attribute between latestMsg1 and contact.
  });
  return map;
});

const toLocalDate = (msgTime) => {
  const dateObject = new Date(msgTime);
  return dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
interface UserList {
  userId: number;
  userMobileNo: string;
  userName: string;
  isOnlineUser: boolean;
  newMsgCount: number;
  averageResponseTime: number;
}
const contacts = ref<UserList[]>([]);
const contactsCheck = ref(false);
const selectUser = (contact: UserList) => {
  store
    .dispatch('setCurrentUser', contact)
    .then(() => {
      store.dispatch('addUserInChatList').then(() => {
        store.dispatch('getUserChatList');
      });
    })
    .then(() => {
      store.dispatch('getChatsWithUser', false);
    });
};
watch(
  () => store.state.receivedMessage,
  (newVal) => {
    console.log('NARUTO', newVal);
    store.dispatch('getUserChatList');
  }
);
watch(
  () => store.state.recentChats,
  (newVal) => {
    latestMsg1.value = newVal;

    console.log('THE RECENT', newVal);
    getTheChats();
    recentMap.value = mappedLatestMsg.value;
  }
);

watch(
  [() => store.state.usersChatList, isValueComputed, loadedSearch, boolChan],
  ([newVal, isValue, loadSearch, boolChan], [oldVal, oldIsValue, oldLoadSearch, oldBoolChan]) => {
    if (isValue && loadSearch) {
      if (loadedSearch.value) {
        console.log('IN ELSEs IFFFF');

        contacts.value = store.state.searchUsersList.usersList;
        contactsCheck.value = true;
        console.log('The SEARCH contacts loaded : ', contacts.value);
      } else {
        contacts.value = store.state.usersChatList.currentUserWithUsersChatlist;
        console.log('The contacts ELSE loaded : ', contacts.value);
        // contactsCheck.value = contacts.value.length > 0;
        contactsCheck.value = true;
      }
    } else {
      console.log('IN IF', store.state.usersChatList);
      contacts.value = store.state.usersChatList.currentUserWithUsersChatlist;

      console.log('The contacts loaded : ', contacts.value);
      // contactsCheck.value = contacts.value.length > 0;
      contactsCheck.value = true;
      if (boolChan) {
        // console.log('OLD RECENTS: ', oldRecents, 'RECENTS: ', recents);
        // if (isInitialRun) {
        //   latestMsg1.value = store.state.recentChats;
        //   console.log('THE RECENT', latestMsg1.value);
        //   getTheChats();
        //   recentMap.value = mappedLatestMsg.value;
        //   isInitialRun = false;
        // } else {
        //   latestMsg1.value = store.state.recentChats;
        //   console.log('THE NEW RECENT', latestMsg1.value);
        //   getTheChats();
        //   recentMap.value = mappedLatestMsg.value;
        // }
      }
    }
  },
  { immediate: true }
);
</script>

<style>
.chatBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
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
  cursor: pointer;
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
  position: relative;
}

.contactName {
  font-weight: bold;
  padding-bottom: 20px;
}

.latestDiv {
  position: relative;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column; /* changed from row to column */
  align-items: flex-end;
}
.lastMessage {
  position: absolute;
  bottom: 0;
  right: 220px;
  top: 0px;
  color: rgb(48, 48, 48);
  white-space: nowrap; /* Prevent wrapping to next line */
  text-overflow: ellipsis; /* Show ellipsis when text is too long */
  overflow: hidden; /* Hide the overflow */
  max-width: 60px;
}

.messageTime {
  margin-left: auto;
  justify-content: flex-end;
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
