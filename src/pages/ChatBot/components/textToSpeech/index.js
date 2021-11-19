import React, {Fragment,useEffect, useState} from "react";
import "./styles.css";
import { interceptor } from "../../../../utils/interceptor";

const axiosInstance = interceptor();
const TextToSpeech = ({audio,message }) => {
    const [speechStatus, setSpeechStatus] = useState(false);
    const [audios, setAudios] = useState(null);




    function loadVideo(url) {
        return fetch(url)
            .then(resp => resp.blob())
            .then(blob => URL.createObjectURL(blob));
    }


    const toggleAudio = async (event) => {

        var speech = document.getElementById("audio");

            setSpeechStatus(!speechStatus);


            try {
                const payload = {
                    text: message,
                };
                const res = await axiosInstance.post(`/api/chatbot/texttospeech`, payload)
                let voice = await res?.data?.audio_file;





                     let sources = document.getElementsByTagName('audio');
                await     Array.from(sources).forEach((el)=>{

                         if(el.getAttribute('data-key') == message){


                             loadVideo(voice)
                                 .then(blobUrl => { // now it's loaded
                                     document.body.className = 'loaded';

                                     el.src = blobUrl; // we just set our mediaElement's src to this blobURL
                                     el.onload = () => URL.revokeObjectURL(blobUrl);
                                     el.load()
                                     el.play()



                                     el.addEventListener("ended", () => {
                                         setSpeechStatus(false);

                                     });
                                 }).catch((err) => console.log(err));


                         }else{
                             el.setAttribute('src','')
                         }
                     })








            } catch (err) {
                console.log(err)
            }






    };
    const audioComp =  ()=> {
        return(
              <>
                <audio   type='audio/wav'    preload='none'    data-key={message} id="audio" />

                <i
                    data-key={message}
                    className={speechStatus  ? "fas fa-pause" : "fas fa-play"}
                    style={{ fontSize: "1rem" }}
                    onClick={toggleAudio}
                />
        </>
        )
    }
    function handleClick1(){
        let element = document.getElementById('audio')
        element.src =audio
        element.play()
    }

    function handleClick2(){
        let element = document.getElementById('audio')
        element.src ='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        element.play()
    }

    return (
        <>
        <div className="text-speech" data-key={message}>
            {audioComp()}

        </div>

        </>
    );
};
export default TextToSpeech;
