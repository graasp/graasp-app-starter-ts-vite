import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardContent, CardHeader } from '@mui/material';

import { APP_ACTIONS_TYPES } from '@/config/appActionsTypes';
import { APP_DATA_TYPES, COMMENT_APP_DATA_TYPES } from '@/config/appDataTypes';
import { GENERAL_SETTINGS_NAME } from '@/config/appSettingsTypes';
import { DEFAULT_BOT_USERNAME, INSTRUCTOR_CODE_ID } from '@/config/constants';
import { MUTATION_KEYS, useMutation } from '@/config/queryClient';
import {
  buildChatbotPromptContainerDataCy,
  buildCommentResponseBoxDataCy,
} from '@/config/selectors';
import { DEFAULT_GENERAL_SETTINGS } from '@/config/settings';
import { UserDataType, useChatbotApi } from '@/hooks/useChatbotApi';
import {
  ChatCompletionMessage,
  ChatCompletionMessageRoles,
  GeneralSettingsKeys,
} from '@/interfaces/settings';

import { useAppDataContext } from '../context/AppDataContext';
import { useLoadingIndicator } from '../context/LoadingIndicatorContext';
import { useSettings } from '../context/SettingsContext';
import CommentContainer from '../layout/CommentContainer';
import CustomCommentCard from '../layout/CustomCommentCard';
import ChatbotAvatar from './ChatbotAvatar';
import CommentBody from './CommentBody';
import CommentEditor from './CommentEditor';
import ResponseBox from './ResponseBox';

const ChatbotPrompt: FC = () => {
  const { t } = useTranslation();
  const { postAppDataAsync, appData } = useAppDataContext();
  const [openEditor, setOpenEditor] = useState(false);
  const { mutate: postAction } = useMutation<
    unknown,
    unknown,
    { data: unknown; type: string }
  >(MUTATION_KEYS.POST_APP_ACTION);
  // if a message already exists with the prompt id we should not display this prompt
  const {
    chatbotPrompt,
    [GENERAL_SETTINGS_NAME]: generalSettings = DEFAULT_GENERAL_SETTINGS,
  } = useSettings();
  const { startLoading, stopLoading } = useLoadingIndicator();

  const { callApi } = useChatbotApi(
    (completion: ChatCompletionMessage, data: UserDataType) => {
      const newData = { ...data, content: completion };
      // post comment from bot
      postAppDataAsync({
        data: newData,
        type: APP_DATA_TYPES.BOT_COMMENT,
      })?.then(() => stopLoading());
      postAction({ data: newData, type: APP_ACTIONS_TYPES.CREATE_COMMENT });
    },
  );

  const comments = appData.filter((c) =>
    COMMENT_APP_DATA_TYPES.includes(c.type),
  );

  const realChatbotPromptExists = comments.find(
    (c) => c.data.chatbotPromptSettingId !== undefined,
  );
  const handleNewDiscussion = (newUserComment: string): void => {
    const chatbotMessage = chatbotPrompt?.data.chatbotPrompt;
    startLoading();
    const newData = {
      parent: null,
      codeId: INSTRUCTOR_CODE_ID,
      content: chatbotMessage,
      chatbotPromptSettingId: chatbotPrompt?.id,
    };
    // post chatbot comment as app data with async call
    postAppDataAsync({
      data: newData,
      type: APP_DATA_TYPES.BOT_COMMENT,
    })?.then((botComment) => {
      const userData = {
        parent: botComment.id,
        codeId: INSTRUCTOR_CODE_ID,
        content: newUserComment,
      };
      // post new user comment as appdata with normal call
      postAppDataAsync({
        data: userData,
        type: APP_DATA_TYPES.COMMENT,
      })?.then((userMessage) => {
        const fullPrompt = [
          ...(chatbotPrompt?.data.initialPrompt || []),
          {
            role: 'assistant' as ChatCompletionMessageRoles,
            content: chatbotMessage,
          },
          {
            role: 'user' as ChatCompletionMessageRoles,
            content: newUserComment,
          },
        ];
        callApi(fullPrompt, {
          parent: userMessage.id,
          codeId: INSTRUCTOR_CODE_ID,
        });
        postAction({
          data: { prompt: fullPrompt },
          type: APP_ACTIONS_TYPES.SEND_PROMPT,
        });
      });
      postAction({ data: userData, type: APP_ACTIONS_TYPES.CREATE_COMMENT });
    });
    postAction({ data: newData, type: APP_ACTIONS_TYPES.CREATE_COMMENT });

    // close editor
    setOpenEditor(false);
  };

  // display only if real chatbot prompt does not exist yet
  if (!realChatbotPromptExists) {
    // console.log(chatbotPrompt);
    // if (chatbotPrompt?.data?.chatbotPrompt === '') {
    //   return <>Please configure the chatbot prompt.</>;
    // }
    return (
      <CommentContainer>
        <CustomCommentCard
          elevation={0}
          data-cy={buildChatbotPromptContainerDataCy(chatbotPrompt?.id)}
        >
          <CardHeader
            title={DEFAULT_BOT_USERNAME}
            subheader={t('just now')}
            avatar={<ChatbotAvatar />}
          />
          <CardContent sx={{ p: 2, py: 0, '&:last-child': { pb: 0 } }}>
            <CommentBody>{chatbotPrompt?.data?.chatbotPrompt}</CommentBody>
          </CardContent>
        </CustomCommentCard>

        {openEditor ? (
          <CommentEditor
            maxTextLength={
              generalSettings[GeneralSettingsKeys.MaxCommentLength]
            }
            onCancel={() => setOpenEditor(false)}
            onSend={handleNewDiscussion}
          />
        ) : (
          <ResponseBox
            dataCy={buildCommentResponseBoxDataCy(chatbotPrompt?.id)}
            onClick={() => setOpenEditor(true)}
            commentId={chatbotPrompt?.id}
          />
        )}
      </CommentContainer>
    );
  }
  return null;
};
export default ChatbotPrompt;
