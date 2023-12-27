/**
 * イベントの送信およびブロードキャスト時に使用される型定義
 */
export type ServerToClientEvents = {
  message: (message: object) => void;
  receiveMessage: (message: object) => void;
  userStatus: (receiverId: string, status: 'online' | 'offline') => void;
  Error: (message: object) => void;
  me: (message: string) => void;
  callEnded: () => void;
  callUser: (message: object) => void;
  callAccepted: (message: string) => void;
};

/**
 * イベント受信時に使用する型定義
 */
export type ClientToServerEvents = {
  message: (message: object) => void;
  sendNotification: (message: object) => void;
  callUser: (message: SocketData) => void;
  answerCall: (message: SocketData) => void;
};

export type InterServerEvents = {
  ping: () => void;
};

export type SocketData = {
  userId: string;
  role: string;
  message: string;
  isTyping: boolean;
  receiver: string;
  sender: string;
  sessionId: string;
  discussionId: string;
  messageId: string;
  to: string;
  userToCall: string;
  signalData: string;
  from: string;
  name: string;
  signal: string;
  userToCall: string;
};

export type ErrorWebSocket = {
  message: string;
  subStatusCode: number;
};
