import * as signalR from '@microsoft/signalr';
import store from '../store/index';

const base64UrlDecode = (str) => {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
};
interface decodedToken {
  userId: number;
  userName: string;
  userMobileNo: string;
}

const decodedUser: decodedToken = {
  userId: 0,
  userName: '',
  userMobileNo: ''
};
export const decodeToken = (token: String) => {
  const [header, payload, signature] = token.split('.');
  const decodedPayload = base64UrlDecode(payload);
  decodedUser.userId = parseInt(decodedPayload.Id);
  decodedUser.userName = decodedPayload.sub;
  decodedUser.userMobileNo = decodedPayload.email;
  signalRConnection();
  return {
    userId: parseInt(decodedPayload.Id),
    userName: decodedPayload.sub,
    userMobileNo: decodedPayload.email
  };
};

const signalr = new signalR.HubConnectionBuilder()
  .withUrl(`http://192.168.18.127:5016/signalr`, { withCredentials: false })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const signalRConnection = async () => {
  signalr
    .start()
    .then(() => {
      store.dispatch('saveConnectionState', signalr.connectionId).then(() => {
        store.dispatch('saveConnectionId');
      });
      signalr.on('OnlineUser', (data) => {
        console.log('User online');
      });
      signalr.on('ReceiveMessage', (data) => {
        store.commit('setReceivedMessage', data);
        // console.log('data', data);
        store.dispatch('getChatsWithUser', false);
      });
    })
    .catch((err) => {
      console.error('Error while establishing connection: ', err);
    });
};
