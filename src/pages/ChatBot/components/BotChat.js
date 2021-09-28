import React, { useEffect, useState } from 'react';
import useAsync from '../../../hooks/useAsync';
import Message from './Message';
import { interceptor } from "../../../utils/interceptor";

const axiosInstance = interceptor();

const BotChat = ({steps, triggerNextStep}) => {
    const { data, status, error, setData, run} = useAsync();

    const loading = (status === 'idle' || status === 'pending');

    const search = steps.search.value;

    useEffect(() => {
        if (search) {
            const getChatResponse = (userMessage) => {
                return axiosInstance.post('/api/chatbot/respond', { question: userMessage })
                .then((response) => {
                    if (response)
                        return response.data
                    else return 'もう一度入力してください！'
                })
                .catch((error) => ('ネットワークエラー!もう一度入力してください。'))
            }
            run(getChatResponse(search))
        }
    }, [run])

    useEffect(() => {
        if (!loading) {
            triggerNextStep();
        }
    }, [loading])

    return (
        <>
        { loading?
            null
            :
            <Message message={status==='resolved'? data: error} />
        }
        </>
    );
}

export default BotChat;