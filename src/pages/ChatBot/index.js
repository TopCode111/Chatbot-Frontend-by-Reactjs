import React, {useState, useEffect, useRef} from "react";
import ChatBot from "react-simple-chatbot";
import { Box, ListItem } from "@material-ui/core";
import SearchBar from "../../components/SearchBar";
import BotChat from "./components/BotChat";
import VoiceRecord from "./components/VoiceRecord/VoiceRecord";
import { makeStyles } from "@material-ui/core/styles";
import LocalStorageService from "../../utils/localStorageService";
// import { useFetchAllUsers } from "../../hooks/users/useUsers";
// import { useCurrentUser } from "../../hooks/auth/useCurrentUser";

const localStorageService = LocalStorageService.getService();
const useStyles = makeStyles((theme) => ({
  searchBarContainer: {
    position: "absolute",
    top: "83px",
    zIndex: 10000000,
    right: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
  },
}));

const BotRedirect = ({ url, message }) => {
  return (
    <div>
      <a href={url} target="_blank">
        {message}
      </a>
    </div>
  );
};

const ChatPage = () => {
  const currentUser = localStorageService.getCurrentUser();
  const [voiceText, setVoiceText] = useState('')
    const [index, setindex] = useState('0')
  // const classes = useStyles();
                    const inputRef = useRef(null)
  useEffect(()=>{
    if(document.querySelector(".rsc-input")) {
                let textInput = document.querySelector(".rsc-input")
                   textInput.setAttribute('value','')
      console.log('textInput',textInput)
      }

  },[])
   useEffect(()=>{
        if(document.querySelector(".rsc-input")) {
              let textInput = document.querySelector(".rsc-input")
           textInput.focus();    
          textInput.setAttribute('value',voiceText)
          textInput.setAttribute('id',voiceText)
            if(index == 0){

               textInput.setAttribute('index',index+1)
            }else {
                 textInput.setAttribute('index',index+2)
            }

            console.log(steps)

        }
   },[voiceText])

  const steps = [
    {
      id: "1",
      message: "おはよう！",
      trigger: "search",
    },
    {
      id: "search",
      user: true,
      validator: (value) => {
        let textInput = document.querySelector(".rsc-input")
       textInput.setAttribute('value',voiceText)  
        if (value || textInput) {
          return true;

        }else {
          return "入力してください！";
        }

      },
      trigger: "3",
    },
    {
      id: "3",
      component: <BotChat voiceText={voiceText}/>,
      waitAction: true,
      trigger: "search",
    },
  ];

  var userImageURL = "";
  if (currentUser?.profile?.avatar?.length === 0) {
    userImageURL = "/man.png";
  } else {
    userImageURL = currentUser.profile.avatar;
  }

  const handleAddText = () => {
    debugger


      (async ()=>{
        let ls = await localStorage.getItem("speechResponse");
        let textInput = await document.querySelector(".rsc-input");
        console.log('validator',textInput)
        if (ls !== "") {
          if(textInput && ls ){
            setVoiceText(ls)
            console.log(textInput)
          }

        }
      })()






  };
         console.log('koni',voiceText)
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <ChatBot
        // recognitionEnable={true}
        steps={steps}
        voiceText = {voiceText}
        recognitionEnable={false}
        hideHeader={true}
        classeName={"myclassname"}
        avatarStyle={{ background: "none", boxShadow: "none" }}
        bubbleStyle={{
          background: "#e7e6e6",
          borderRadius: "10px",
          color: "black",
          border: "1px solid",
          borderColor: "#b9b6b6",
          overflowWrap: "anywhere",
        }}
        inputStyle={{
          border: "1px solid",
          borderColor: "#31538f",
          borderRadius: "0px",
        }}
        submitButtonStyle={{
          backgroundColor: "#4472c4",
          borderRadius: "0px",
          height: "100%",
        }}
        style={{
          border: "none",
          borderRadius: "0px",
          boxShadow: "none",
          width: "650px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        customStyle={{
          background: "none",
          boxShadow: "none",
          display: "flex",
          justifyContent: "flex-start",
          margin: 0,
          padding: 0,
        }}
        botAvatar="/bot_avatar.svg"
        // userAvatar={userImageURL}
        placeholder="入力してください。"
        contentStyle={{ flexGrow: 1 }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Voice Recorder Component */}
        <VoiceRecord handleAddText={handleAddText} />
      </div>
    </Box>
  );
};

export default ChatPage;
