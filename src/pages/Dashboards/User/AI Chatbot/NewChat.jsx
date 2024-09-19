import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Typewriter from 'typewriter-effect';
import { FaCamera, FaPaperclip, FaPaperPlane, FaUser, FaRobot, FaMoon, FaSun } from 'react-icons/fa';

const NewChat = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const apiKey = `${import.meta.env.VITE_REACT_APP_GEMINI_API}`;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile && !selectedImage) return;
    setLoading(true);

    try {
      const chatSession = model.startChat({ generationConfig, history: [] });
      let result;

      if (selectedImage) {
        const imageParts = await fileToGenerativePart(selectedImage);
        result = await chatSession.sendMessageStream([message, imageParts]);
      } else if (selectedFile) {
        const fileParts = await fileToGenerativePart(selectedFile);
        result = await chatSession.sendMessageStream([message, fileParts]);
      } else {
        result = await chatSession.sendMessageStream(message);
      }

      let fullResponse = '';
      for await (const chunk of result.stream) {
        fullResponse += chunk.text();
      }

      setMessageHistory([...messageHistory, { user: message, ai: fullResponse, image: selectedImage, file: selectedFile }]);
      setMessage('');
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageHistory]);

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Chat Assistant</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-indigo-700 transition-colors duration-200"
        >
          {darkMode ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
        </button>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
        {messageHistory.map((msg, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-end justify-end mb-2">
              <div className="bg-indigo-500 text-white rounded-lg py-2 px-4 max-w-xs lg:max-w-md">
                <p>{msg.user}</p>
                {msg.image && <img src={URL.createObjectURL(msg.image)} alt="Uploaded" className="mt-2 rounded-md max-w-full h-auto" />}
                {msg.file && <p className="mt-2">File: {msg.file.name}</p>}
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center ml-2">
                <FaUser className="text-white" />
              </div>
            </div>
            <div className="flex items-end mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center mr-2">
                <FaRobot className="text-white" />
              </div>
              <div className={`rounded-lg py-2 px-4 max-w-xs lg:max-w-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <p>{msg.ai}</p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-end mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center mr-2">
              <FaRobot className="text-white" />
            </div>
            <div className={`rounded-lg py-2 px-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <Typewriter
                options={{
                  strings: ['Thinking...'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </div>
        )}
      </main>

      {/* Input area */}
      <footer className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 rounded-l-full py-2 px-4 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            disabled={loading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => imageInputRef.current.click()}
            className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors duration-200`}
          >
            <FaCamera className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors duration-200`}
          >
            <FaPaperclip className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-500 text-white rounded-r-full py-2 px-4 font-bold hover:bg-indigo-600 transition-colors duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : <FaPaperPlane />}
          </button>
        </form>
        {selectedFile && <p className="mt-2 text-sm">File selected: {selectedFile.name}</p>}
        {selectedImage && <p className="mt-2 text-sm">Image selected: {selectedImage.name}</p>}
      </footer>
    </div>
  );
};

export default NewChat;