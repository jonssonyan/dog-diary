"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import request from "@/utils/axios";
import { formatDateToChinese } from "@/utils/time";

const useRanking = () => {
  const [rankings, setRankings] = useState<RankingItem[]>([]);

  useEffect(() => {
    listRanking();
  }, []);

  const listRanking = async () => {
    const { data } = await request({
      url: "/api/list-ranking",
      method: "get",
    });
    setRankings(data);
  };

  return { rankings };
};

const RankingPage = () => {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { rankings } = useRanking();

  const handleSubmit = async () => {
    if (!username.trim()) {
      toast.error("请输入你的称呼");
      return;
    }
    if (!text.trim()) {
      toast.error("请输入日记内容");
      return;
    }

    setIsSubmitting(true);
    try {
      const params = {
        dateWeek: formatDateToChinese(new Date()),
        text,
        username,
      };
      await request({
        url: "/api/save-message",
        method: "post",
        data: params,
      });
      toast.success("日记已提交，等待审核通过！");
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="max-w-4xl mx-auto p-4 py-6">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-center mb-6">提交新日记</h2>
          <div className="space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="你的称呼"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              disabled={isSubmitting}
              style={{ outline: "none" }}
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="写下你的舔狗日记..."
              rows={4}
              disabled={isSubmitting}
              style={{ outline: "none" }}
            />
            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`w-full bg-pink-500 text-white py-2 rounded-lg transition
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"}`}
            >
              {isSubmitting ? "提交中..." : "提交日记"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">舔狗排行榜</h2>
          <div className="space-y-4">
            {rankings.map((item) => (
              <div
                key={item.username}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  item.rank <= 3 ? "bg-gradient-to-r from-pink-50 to-purple-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-2xl font-bold ${
                      item.rank === 1
                        ? "text-yellow-500"
                        : item.rank === 2
                          ? "text-gray-400"
                          : item.rank === 3
                            ? "text-yellow-600"
                            : "text-gray-500"
                    }`}
                  >
                    {item.rank}
                  </span>
                  <span className="font-semibold">{item.username}</span>
                </div>
                <div className="text-gray-600">提交数：{item.submissions}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
