import { createStore } from 'vuex';
import axios from 'axios';
import { decodeToken } from './util';
const API_LOGIN_URL = 'http://192.168.18.127:5016/api/login';
const API_CHAT_URL = 'http://192.168.18.127:5016/api/Chats';

interface User {
  userId: number;
  userMobileNo: string;
  userName: string;
  password: string;
}
interface Message {
  senderId: number;
  recieverId: number;
  message: string;
}
interface UserList {
  userId: number;
  userMobileNo: string;
  userName: string;
  isOnlineUser: boolean;
  newMsgCount: number;
  averageResponseTime: number;
}
interface UsersChat {
  chatId: number;
  senderId: number;
  recieverId: number;
  dateTime: String;
  isNew: boolean;
  isReveiveMsg: boolean;
  isSendMsg: boolean;
  msg: String;
}
interface IDs {
  receiveID: number;
  sendID: number;
}

type ChatState = {
  user: User;
  userToken: string;
  userLogged: User;
  connectionId: string;
  userId: number;
  usersChatList: UserList[];
  searchUsersList: UserList[];
  currentChatUser: UserList;
  loadedSearch: boolean;
  usersChat: UsersChat[];
  userSelected: boolean;
  skipRecords: number;
  getRecords: number;
  messages: Message;
  latestChat: UsersChat;
  recentChats: UsersChat[];
  idArray: IDs[];
  recentBool: boolean;
};

const state: ChatState = {
  user: {
    userId: 0,
    userMobileNo: '',
    userName: '',
    password: ''
  },
  userToken: '',
  userLogged: {
    userId: 0,
    userMobileNo: '',
    userName: '',
    password: ''
  },
  usersChatList: [],
  searchUsersList: [],
  currentChatUser: {} as UserList,
  connectionId: '',
  userId: 0,
  loadedSearch: false,
  usersChat: [],
  userSelected: false,
  skipRecords: 0,
  getRecords: 20,
  messages: {} as Message,
  latestChat: {} as UsersChat,
  recentChats: [],
  idArray: [],
  recentBool: false
};

export default createStore({
  state,
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.userToken = token;
    },
    setUserLogged(state, user) {
      console.log('IN USER LOGGED IN MUTATION');
      state.userLogged = user;
      console.log('User State Logged in:', state.userLogged);
    },
    setConnectionId(state, connectionId) {
      state.connectionId = connectionId;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUsersList(state, usersList) {
      state.usersChatList = usersList;
      console.log('Users List in mutation:', state.usersChatList);
    },
    setCurrentChatUser(state, user) {
      state.currentChatUser = user;
      console.log('Current Chat User in mutation:', state.currentChatUser);
    },
    setSearchUsersList(state, usersList) {
      state.searchUsersList = usersList;
      console.log('Search Users List in mutation:', state.searchUsersList);
    },
    setLoadedSearch(state, loaded) {
      state.loadedSearch = loaded;
    },
    setUsersChat(state, newChats) {
      if (newChats.length == 0) {
        console.log('No more chats to show');
      } else {
        let chats = newChats;
        chats = chats.reverse();
        state.usersChat = chats;
        state.latestChat = state.usersChat[0];
        console.log('Users Chat List in mutation:', state.usersChat);
      }
    },
    setUserSelected(state, selected) {
      state.userSelected = selected;
      console.log('User Selected in mutation:', state.userSelected);
    },
    updatePaginationState(state) {
      state.getRecords += 10;
    },
    setIDs(state, IDs) {
      state.idArray.push(IDs);
    },
    setRecentChats(state, chats) {
      state.recentChats = [...state.recentChats, ...chats];
    },
    setRecentBool(state, bool) {
      state.recentBool = bool;
    }
  },
  actions: {
    async registerUser({ commit }, user: User) {
      try {
        const response = await axios.post(`${API_LOGIN_URL}/RegisterUser`, user);
        if (response.data) {
          console.log('User registered:', response.data);
          commit('setUser', user);
        }
      } catch (error) {
        console.log('An error occurred in Registeration:', error);
      }
    },

    async loginUser({ commit, dispatch }, user: User) {
      try {
        const response = await axios.post(`${API_LOGIN_URL}/Index`, user);
        if (response.data) {
          const data = response.data;
          console.log('User Logged in:', data.token);
          commit('setToken', data.token);
          const userData = decodeToken(data.token);
          const userObj = {
            userId: userData.userId,
            userName: userData.userName,
            userMobileNo: userData.userMobileNo
          };
          commit('setUserLogged', userObj);
        }
      } catch (error) {
        console.log('An error occurred in Login:', error);
      }
    },
    async saveConnectionId({ commit, dispatch }) {
      try {
        const data = {
          userId: state.userLogged.userId,
          userConnectionId: state.connectionId
        };
        console.log('Data :', data);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(`${API_CHAT_URL}/SaveUserConnectionId`, data, {
          headers
        });
        if (response.data) {
          console.log('User connection id saved:', response.data);
          dispatch('getUserChatList');
        }
      } catch (error) {
        console.log('An error occurred in saving connection id:', error.message);
      }
    },
    async removeConnectionId({ commit }) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.get(
          `${API_CHAT_URL}/RemoveUserConnectionId?ConnectionId=${state.connectionId}`,
          {
            headers
          }
        );
        if (response.data) {
          commit('setConnectionId', '');
          commit('setUserLogged', {});
          commit('setToken', '');
          console.log('User connection id removed:', response.data);
        }
      } catch (error) {
        console.log('An error occurred in removing connection id:', error.message);
      }
    },
    async getUserChatList({ commit, dispatch }) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(
          `${API_CHAT_URL}/CurrentUserWithChatUserslist?UserId=${state.userLogged.userId}`,
          {},
          { headers }
        );
        if (response.data) {
          console.log('Users List Fetched:', response.data);
          commit('setUsersList', response.data);
          if (state.usersChatList) {
            await dispatch('getIds');
          }
          console.log('THE FUKING RECENT CHATS:', state.recentChats);
          console.log('THE FUKING BOOLEAN:', state.recentBool);
        }
      } catch (error) {
        console.log('An error occurred in fetching user list:', error);
      }
    },
    async searchUsers({ commit }, searchKey) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(
          `${API_CHAT_URL}/SearchUserToAddInChat?mobilkeNumber=${searchKey}`,
          {},
          { headers }
        );
        if (response.data) {
          console.log('Users Search List Fetched:', response.data);
          commit('setSearchUsersList', response.data);
          commit('setLoadedSearch', true);
        }
      } catch (error) {
        console.log('An error occurred in fetching user SEARCH list:', error);
      }
    },

    async addUserInChatList({ commit, dispatch }) {
      try {
        const data = {
          receiverUserId: state.userLogged.userId,
          senderUserId: state.currentChatUser.userId
        };
        console.log('THE CAP CHECK: ', data);
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(`${API_CHAT_URL}/AddUserInCurrentUserChat`, data, {
          headers
        });
        if (response.data) {
          console.log('User added in the chat list:', response.data);
        }
      } catch (error) {
        console.log('An error occurred in adding user to list:', error);
      }
    },
    async getChatsWithUser({ commit, dispatch }, bool: boolean) {
      try {
        // const data = {
        //   receiverId: state.currentChatUser.userId,
        //   senderId: state.userLogged.userId,
        //   skipRecords: state.skipRecords,
        //   getRecords: state.getRecords
        // };
        console.log('IN FOKING CHATS');
        const data = {
          receiverId: state.currentChatUser.userId,
          senderId: state.userLogged.userId,
          skipRecords: state.skipRecords,
          getRecords: state.getRecords
        };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(`${API_CHAT_URL}/GetUserChatWithCurrentUser`, data, {
          headers
        });
        if (response.data) {
          console.log('Getting all the 30 chats of users: ', response.data.userChat);
          commit('setUsersChat', response.data.userChat);
          if (bool) {
            commit('updatePaginationState');
          }
        }
      } catch (error) {
        console.log('An error occurred in getting chats of users: ', error);
      }
    },
    async sendMessage({ commit, dispatch }, message1) {
      try {
        const data = {
          receiverId: state.currentChatUser.userId,
          senderId: state.userLogged.userId,
          message: message1
        };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(`${API_CHAT_URL}/SendMessage`, data, {
          headers
        });
        if (response.data) {
          console.log('Message Sent: ', response.data);
          // commit('setUsersChat', response.data.userChat);
          // commit('updatePaginationState');
        }
      } catch (error) {
        console.log('An error occurred in sending message: ', error);
      }
    },
    async getRecentChatsWithUser({ commit, dispatch }, IDs) {
      try {
        console.log('IN FOKING CHATS');
        const data = {
          receiverId: IDs.receiveID,
          senderId: IDs.sendID,
          skipRecords: 0,
          getRecords: 1
        };
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.userToken}`,
          'Access-Control-Allow-Origin': '*'
        };
        const response = await axios.post(`${API_CHAT_URL}/GetUserChatWithCurrentUser`, data, {
          headers
        });
        if (response.data) {
          console.log('Getting recent chats of users: ', response.data.userChat);
          commit('setRecentChats', response.data.userChat);
        }
      } catch (error) {
        console.log('An error occurred in getting RECENT chats of users: ', error);
      }
    },
    saveConnectionState({ commit, dispatch }, conId) {
      commit('setConnectionId', conId);
      console.log('connectionId in store: ', state.connectionId);
    },
    setCurrentUser({ commit, dispatch }, user) {
      commit('setCurrentChatUser', user);
      commit('setUserSelected', true);
      console.log('Current Chat User:', state.currentChatUser);
    },
    async getIds({ commit, dispatch }) {
      const userLoggedId = state.userLogged.userId;
      // console.log('THE USER LOGGED IN ID: ', state.usersChatList.currentUserWithUsersChatlist);
      const newArrayOfObjects = state.usersChatList.currentUserWithUsersChatlist.map((user) => {
        return {
          receiveID: user.userId, // Replace 'id' with the actual key containing the user's ID
          sendID: userLoggedId
        };
      });
      commit('setIDs', newArrayOfObjects);
      console.log('THE NEW ARRAY OF IDs: ', state.idArray);
      for (const IDs of newArrayOfObjects) {
        console.log('THE ID:', IDs);
        await dispatch('getRecentChatsWithUser', IDs);
      }
      commit('setRecentBool', true);
    }
  },

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.userToken
  }
});
