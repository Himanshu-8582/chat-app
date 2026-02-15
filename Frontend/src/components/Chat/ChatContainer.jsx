import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from '../../store/useAuthStore';
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";


function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);
  // console.log(messages);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  })
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="flex-1 ps-6 overflow-y-auto py-8">
            {messages.map(msg => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${msg.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"}`}
                >
                  {msg.image && (<img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />)}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  <p>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* auto scroll target */}
            <div ref={ messageEndRef } />
          </div>
        ): isMessagesLoading?<MessageLoadingSkeleton/>: (
            <NoChatHistoryPlaceHolder name={ selectedUser.fullName } />
        )}
      </div>

      <MessageInput/>
    </>
  )
}

export default ChatContainer
