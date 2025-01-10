import React from 'react';
 

const Chat = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-blue-500 text-white p-4">
                <h2 className="text-lg font-semibold">Chat</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="mb-4">
                    <div className="bg-gray-200 p-3 rounded-lg inline-block">
                        <p>Hello! How are you?</p>
                        <span className="text-xs text-gray-500">10:00 AM</span>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <div className="bg-blue-500 text-white p-3 rounded-lg inline-block">
                        <p>I'm good, thanks! How about you?</p>
                        <span className="text-xs text-gray-200">10:01 AM</span>
                    </div>
                </div>
                {/* Add more messages here */}
            </div>
            <div className="p-4 bg-white flex">
                <input type="text" placeholder="Type a message..." className="flex-1 border border-gray-300 p-2 rounded-lg mr-2" />
                <button className="bg-blue-500 text-white p-2 rounded-lg">Send</button>
            </div>
        </div>
    );
};

export default Chat;