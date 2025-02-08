"use client";
import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export default function ChatInput({acceptEmoji,hideEmoji}) {
  const handleEmojiSelect = (emoji) => {
     acceptEmoji(emoji.native);
  };

  return (
    <div className="flex flex-col items-center absolute z-50 bottom-40 ">
      <Picker data={data} onEmojiSelect={handleEmojiSelect} onClickOutside={hideEmoji} />
       
    </div>
  );
}