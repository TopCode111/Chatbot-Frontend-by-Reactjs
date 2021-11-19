import React, { useEffect, useState } from "react";
import useAsync from "../../../hooks/useAsync";
import Message from "./Message";
import { interceptor } from "../../../utils/interceptor";
import {Nu} from "react-flags-select";

const axiosInstance = interceptor();

const BotChat = ({ steps, triggerNextStep,voiceText }) => {
  const { data, status, error, setData, run } = useAsync();
  const [audio, setAudio] = useState(null);
  const [questionResponse, setQuestionResponse] = useState(null);

  const loading = status === "idle" || status === "pending";
  let textInput = document.querySelector(".rsc-input").getAttribute('id')
  console.log('ohayo',steps)
  const search = steps?.search?.value ? steps?.search?.value :  textInput


  useEffect(() => {
    if (search) {
      let index = document.querySelector(".rsc-input").getAttribute('index')


    console.log('query',document.querySelector('.rsc-ts-bubble'))
      const getChatResponse = (userMessage) => {
        return axiosInstance
          .post("/api/chatbot/respond", { question: userMessage })
          .then((response) => {
            if (response) {
              setQuestionResponse(response.data);
              let text =   document.querySelectorAll('.rsc-ts-bubble');
              document.querySelectorAll('.rsc-ts-bubble')[text.length -1].innerHTML = document.querySelector(".rsc-input").getAttribute('id')
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
        <Message message={status === "resolved" ? document.querySelector(".rsc-input").getAttribute('id') : error} audio={audio} />
      )}
    </>
  );
};

export default BotChat;
