import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { useChatStore } from '../store/useChatStore.js';
import ProfileHeader from '../components/Chat/ProfileHeader';
import ActiveTabSwitch from '../components/Chat/ActiveTabSwitch';
import ChatList from '../components/Chat/ChatList';
import ContactList from '../components/Chat/ContactList';
import NoConversationPlaceHolder from '../components/Chat/NoConversationPlaceHolder';
import ChatContainer from '../components/Chat/ChatContainer.jsx';

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-[800px'>
      <BorderAnimatedContainer>

        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <ProfileHeader />
          <ActiveTabSwitch />
          
          <div className='flex-1 overflow-y-auto p-4  space-y-2'>
            {activeTab=='chats'?<ChatList/>:<ContactList/>}
          </div>

        </div>

        <div className='flex-1 flex flex-col bg-slate-900/50'>
          {selectedUser?<ChatContainer/>:<NoConversationPlaceHolder/>}
        </div>

      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage
