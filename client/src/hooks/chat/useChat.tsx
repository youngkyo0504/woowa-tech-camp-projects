import { ChatEvent, IMessage, SendChatDto } from '@customTypes/chat';
import { useUser } from '@queries/useUser';
import { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export default function useChat(chatRoomId: number, initialMessages: IMessage[]) {
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useUser();

  const receiveMessage = (newMessage: IMessage) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  const socket = useMemo(() => io('ws://localhost:8080/goldMarket'), []);
  useEffect(() => {
    socket.on(ChatEvent.CONNECT, () => {
      setIsConnected(true);
    });

    socket.on(ChatEvent.LEAVE, () => {
      setIsConnected(false);
    });

    socket.on(ChatEvent.RECIEVE_MESSAGE, (newMessage: IMessage) => {
      receiveMessage(newMessage);
    });
    socket.emit(ChatEvent.ENTER, { chatRoomId, userId: user.id });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive');
    };
  }, []);

  const sendMessage = (message: Partial<SendChatDto>) => {
    if (message.content?.length) {
      socket.emit(ChatEvent.SEND_MESSAGE, { ...message, chatRoomId });
    }
  };

  return { sendMessage, messages };
}
