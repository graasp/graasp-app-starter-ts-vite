import { useEffect, useState } from 'react';

import { OPEN_AI_API_URL } from '@/config/env';
import { ChatCompletionMessage } from '@/interfaces/settings';

export type UserDataType = { [key: string]: unknown };
type CallbackType = (
  completion: ChatCompletionMessage,
  data: UserDataType,
) => void;
type ReturnType = {
  isLoading: boolean;
  callApi: (prompt: ChatCompletionMessage[], userData: UserDataType) => void;
};
export const useChatbotApi = (callback: CallbackType): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [prompt, setPrompt] = useState<ChatCompletionMessage[]>([]);
  const [data, setData] = useState<UserDataType>({});

  useEffect(
    () => {
      async function fetchApi(): Promise<void> {
        setIsLoading(true);
        fetch(OPEN_AI_API_URL, {
          method: 'POST',
          body: JSON.stringify({ prompt }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return { completion: 'Sorry, an error occured' };
          })
          .then((json) => {
            const { completion } = json;
            callback(completion, data);
            setIsLoading(false);
            setShouldFetch(false);
          });
      }
      if (prompt && shouldFetch) {
        fetchApi();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldFetch],
  );

  const callApi = (
    chatbotPrompt: ChatCompletionMessage[],
    userData: { [key: string]: unknown },
  ): void => {
    setPrompt(chatbotPrompt);
    setData(userData);
    setShouldFetch(true);
  };

  return {
    isLoading,
    callApi,
  };
};
