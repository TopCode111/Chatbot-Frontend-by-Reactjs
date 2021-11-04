import React, { useEffect, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import Message from "./Message";
import { interceptor } from "../../../utils/interceptor";

const axiosInstance = interceptor();

const BotChat = ({ steps, triggerNextStep }) => {
  const { data, status, error, setData, run } = useAsync();
  const [audio, setAudio] = useState(null);
  const [questionResponse, setQuestionResponse] = useState(null);

  const loading = status === "idle" || status === "pending";
  const search = steps?.search?.value;
  useEffect(() => {
    if (search) {
      const getChatResponse = (userMessage) => {
        return axiosInstance
          .post("/api/chatbot/respond", { question: userMessage })
          .then((response) => {
            if (response) {
              setQuestionResponse(response.data);
              return response.data;
            } else return "もう一度入力してください！";
          })
          .catch((error) => "ネットワークエラー!もう一度入力してください。");
      };
      run(getChatResponse(search));
    }
  }, [run]);

  useEffect(() => {
    if (questionResponse) {
      const payload = {
        text: questionResponse,
      };
      axiosInstance
        .post(`/api/chatbot/texttospeech`, payload)
        .then((response) => {
          let voice = response?.data?.audio_file;
          setAudio(voice);
        })
        .catch((error) => console.log(error));
    }
  }, [questionResponse]);

  useEffect(() => {
    if (!loading) {
      triggerNextStep();
    }
  }, [loading]);

  return (
    <>
      {loading ? null : (
        <Message message={status === "resolved" ? data : error} audio={audio} />
      )}
    </>
  );
};

export default BotChat;
