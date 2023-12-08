/**
 * イベントの送信およびブロードキャスト時に使用される型定義
 */
export type ServerToClientEvents = {
  message: (message: object) => void;
  receiveMessage: (message: object) => void;
  userStatus: (receiverId: string, status: 'online' | 'offline') => void;
  Error: (message: object) => void;
};

/**
 * イベント受信時に使用する型定義
 */
export type ClientToServerEvents = {
  message: (message: object) => void;
  sendNotification: (message: object) => void;
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
};

export type ErrorWebSocket = {
  message: string;
  subStatusCode: number;
};
