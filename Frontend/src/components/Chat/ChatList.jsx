import React, { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore.js';
import UserLodingSkeleton from '../../components/Chat/UserLoadingSkeleton';
import NoChatsFound from '../../components/Chat/NoChatsFound';

function ChatList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);
  if (isUsersLoading) {
    return <UserLodingSkeleton/>
  }
  if (chats.length === 0) return <NoChatsFound />
  // console.log(chats)
  return (
    <>
      {chats.map((chat) => (
        <div key={chat._id}
          className='bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors'
          onClick={()=>setSelectedUser(chat)}
        >
          <div className='flex items-center gap-3'>
            {/* TODO: Socket.IO */}
            <div className={`avatar online`}>
              <div className='size-12 rounded-full'>
                <img src={chat.profilePic || '/avatar.png'} alt={chat.fullName} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
          </div>

        </div>
      ))}
    </>
  )
}

export default ChatList
