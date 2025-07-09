"use client";

import React, { useEffect, useState } from "react";
import { Copy, Heart, RefreshCw } from "lucide-react";
import Image from "next/image";
import request from "@/utils/axios";
import toast from "react-hot-toast";
import Social from "@/components/social";
import { WEATHER_OPTIONS } from "@/configs/weather";
import { MOOD_OPTIONS } from "@/configs/mood";

const RootPage = () => {
  const [message, setMessage] = useState<Message>({
    id: "0",
    dateWeek: "",
    text: "",
    likeNum: 0,
    username: "",
    weather: "",
    mood: "",
  });

  useEffect(() => {
    getMessageRand();
  }, []);

  const getMessageRand = async () => {
    const { data } = await request({
      url: "/api/get-message-rand",
      method: "get",
    });
    setMessage(data);
  };

  const handleLike = async () => {
    try {
      const params = {
        messageId: message.id,
      };
      await request({
        url: "/api/save-like",
        method: "post",
        data: params,
      });
      setMessage((prevMessage) => ({
        ...prevMessage,
        likeNum: prevMessage.likeNum + 1,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      toast.success("复制成功！");
    } catch (e) {
      console.error(e);
      toast.error("复制失败，请重试");
    }
  };

  const getWeatherDisplay = (weatherValue: string) => {
    const weather = Object.values(WEATHER_OPTIONS).find(
      (w) => w.value === weatherValue?.toLowerCase()
    );
    if (!weather) return null;

    return (
      <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
        <span className="text-lg">{weather.icon}</span>
        <span className="text-sm text-gray-600">{weather.label}</span>
      </div>
    );
  };

  const getMoodDisplay = (moodValue: string) => {
    const mood = Object.values(MOOD_OPTIONS).find((m) => m.value === moodValue?.toLowerCase());
    if (!mood) return null;

    return (
      <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-full">
        <span className="text-lg">{mood.icon}</span>
        <span className="text-sm text-gray-600">{mood.label}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-pink-100 to-purple-200 flex items-center justify-center overflow-auto py-8">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 text-center transform transition-all hover:scale-105">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image src="/favicon.ico" alt="舔狗日记" width={32} height={32} className="w-8 h-8" />
              <h1 className="text-3xl font-bold text-gray-800">舔狗日记</h1>
            </div>
            <div className="bg-red-50 rounded-xl p-4 shadow-inner">
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="text-md italic text-gray-700">{message.dateWeek}</p>
                <div className="flex items-center space-x-2">
                  {message.weather && getWeatherDisplay(message.weather)}
                  {message.mood && getMoodDisplay(message.mood)}
                </div>
              </div>
              <p className="text-xl italic text-gray-700 mb-4 break-words whitespace-pre-wrap">
                {message.text}
              </p>
              {message.username && <p className="text-md text-gray-500">- {message.username}</p>}
            </div>
          </div>

          <div className="flex justify-between space-x-2 mt-6">
            <button
              onClick={handleCopy}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            >
              <Copy className="mr-2" size={20} />
            </button>
            <button
              onClick={getMessageRand}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
            >
              <RefreshCw className="mr-2" size={20} />
            </button>
            <button
              onClick={handleLike}
              className="flex-1 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition flex items-center justify-center"
            >
              <Heart className="mr-2" size={20} />
              {message.likeNum}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>舔狗舔到最后一无所有</p>
        </div>
        <Social />
      </div>
    </div>
  );
};

export default RootPage;
