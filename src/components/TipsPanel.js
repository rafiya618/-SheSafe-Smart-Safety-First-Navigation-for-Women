import React from 'react';
import { FaRegLightbulb } from 'react-icons/fa';

const TipsPanel = ({ weatherTips }) => {
  return (
    <div className="mt-8 bg-gradient-to-br from-[#f3f4f6] via-[#e0e7ff] to-[#bae6fd] rounded-3xl shadow-xl border-x-2 border-b-2 border-t-0 border-[#818cf8] backdrop-blur-md px-8 py-6">
      <h3 className="text-2xl font-extrabold text-[#6376d4] mb-3 flex items-center gap-2 drop-shadow-glow-purple">
        <FaRegLightbulb className="inline-block text-[#6376d4]" size={28} />
        Gemini Safety Tips
      </h3>
      <div
        className="text-gray-600 whitespace-pre-line font-medium"
        dangerouslySetInnerHTML={{ __html: weatherTips || "Tips will appear here after route is calculated." }}
      />
    </div>
  );
};

export default TipsPanel;