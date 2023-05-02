import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormLabel,
  Stack,
  TextareaAutosize,
  Typography,
  styled,
} from '@mui/material';

import { CHATBOT_PROMPT_SETTINGS_NAME } from '@/config/appSettingsTypes';
import { SMALL_BORDER_RADIUS } from '@/config/layout';
import {
  SETTING_CHATBOT_PROMPT_CODE_EDITOR_CY,
  SETTING_NEW_CHATBOT_PROMPT_KEY,
} from '@/config/selectors';
import CodeEditor from '@/modules/common/CodeEditor';
import { useSettings } from '@/modules/context/SettingsContext';
import CustomDialog from '@/modules/layout/CustomDialog';
import SubmitButtons from '@/modules/settings/SubmitButtons';
import { showErrorToast } from '@/utils/toast';

const TextArea = styled(TextareaAutosize)(({ theme }) => ({
  borderRadius: SMALL_BORDER_RADIUS,
  padding: theme.spacing(2),
  fontSize: '1rem',
  boxSizing: 'border-box',
  resize: 'vertical',
  border: 0,
  outline: 'solid rgba(80, 80, 210, 0.5) 1px',
  width: '100%',
  minWidth: '0',
  minHeight: `calc(1rem + 2*${theme.spacing(2)})`,
  transition: 'outline 250ms ease-in-out',
  '&:focus': {
    outline: 'solid var(--graasp-primary) 2px !important',
  },
  '&:hover': {
    outline: 'solid var(--graasp-primary) 1px ',
  },
}));

const CodeReviewSettings: FC = () => {
  const { t } = useTranslation();
  const { chatbotPrompt, saveSettings } = useSettings();
  const [openModal, setOpenModal] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const initialPrompt = chatbotPrompt?.data?.initialPrompt || [];
  const stringifiedJsonPrompt = JSON.stringify(initialPrompt);
  const chatbotCue = chatbotPrompt?.data?.chatbotPrompt || '';
  const [newChatbotPrompt, setNewChatbotPrompt] = useState(
    stringifiedJsonPrompt,
  );
  const [newChatbotCue, setNewChatbotCue] = useState(chatbotCue);

  const closeModal = (): void => {
    setOpenModal(false);
  };

  const handleChangeChatbotPrompt = (value: string): void => {
    setNewChatbotPrompt(value);
    setUnsavedChanges(true);
  };

  const handleChangeChatbotCue = (value: string): void => {
    setNewChatbotCue(value);
    setUnsavedChanges(true);
  };

  const handleSave = (): void => {
    try {
      const jsonNewChatbotPrompt = JSON.parse(newChatbotPrompt);
      const data = {
        initialPrompt: jsonNewChatbotPrompt,
        chatbotPrompt: newChatbotCue,
      };
      saveSettings(CHATBOT_PROMPT_SETTINGS_NAME, data);
      closeModal();
    } catch (e) {
      // do something
      showErrorToast('Prompt has to be in JSON format.');
    }
  };

  return (
    <Stack spacing={1}>
      <FormLabel>{t('Chatbot Prompt')}</FormLabel>
      <Stack spacing={1}>
        <Card elevation={0} variant="outlined">
          <CardContent sx={{ pb: 0 }}>
            <Stack direction="row" spacing={1}>
              <FormLabel>{t('Prompt')}:</FormLabel>
              <CodeEditor value={stringifiedJsonPrompt} readOnly />
            </Stack>
            <Stack direction="row" spacing={1}>
              <FormLabel>{t('Cue')}:</FormLabel>
              <Typography>{chatbotCue}</Typography>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {t('Edit')}
            </Button>
          </CardActions>
        </Card>
      </Stack>
      <CustomDialog
        open={openModal}
        onClose={closeModal}
        title={t('Chatbot Prompt')}
        content={
          <Stack>
            <Box>
              <FormLabel>{t('Prompt')}</FormLabel>
              <CodeEditor
                value={newChatbotPrompt}
                onChange={(value: string) => handleChangeChatbotPrompt(value)}
              />
            </Box>
            <Box>
              <FormLabel>{t('Cue')}</FormLabel>
              <TextArea
                id={SETTING_CHATBOT_PROMPT_CODE_EDITOR_CY}
                value={newChatbotCue}
                onChange={({ target: { value } }) =>
                  handleChangeChatbotCue(value)
                }
              />
            </Box>
          </Stack>
        }
        actions={
          <SubmitButtons
            onCancel={() => {
              setNewChatbotPrompt(stringifiedJsonPrompt);
              setNewChatbotCue(chatbotCue);
              closeModal();
            }}
            onSave={handleSave}
            settingKey={SETTING_NEW_CHATBOT_PROMPT_KEY}
            unsavedChanges={unsavedChanges}
          />
        }
      />
    </Stack>
  );
};
export default CodeReviewSettings;
