export interface User {
  userId: number;
  userMobileNo: string;
  userName: string;
  password: string;
}
export interface Message {
  senderId: number;
  recieverId: number;
  message: string;
}
export interface receivedMessage {
  userId: number;
  messageText: string;
}
export interface UserList {
  userId: number;
  userMobileNo: string;
  userName: string;
  isOnlineUser: boolean;
  newMsgCount: number;
  averageResponseTime: number;
}
export interface UsersChat {
  chatId: number;
  senderId: number;
  recieverId: number;
  dateTime: String;
  isNew: boolean;
  isReveiveMsg: boolean;
  isSendMsg: boolean;
  msg: String;
}
export interface IDs {
  receiveID: number;
  sendID: number;
}
