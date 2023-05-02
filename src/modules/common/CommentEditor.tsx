import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  boldCommand,
  codeCommand,
  italicCommand,
  linkCommand,
  quoteCommand,
  useTextAreaMarkdownEditor,
} from 'react-mde';

import {
  Code,
  FormatBold,
  FormatItalic,
  FormatQuote,
  InsertLink,
} from '@mui/icons-material';
import {
  Box,
  FormHelperText,
  Stack,
  TextareaAutosize,
  styled,
} from '@mui/material';

import { Button } from '@graasp/ui';

import { SMALL_BORDER_RADIUS } from '@/config/layout';
import {
  COMMENT_EDITOR_BOLD_BUTTON_CYPRESS,
  COMMENT_EDITOR_CANCEL_BUTTON_CYPRESS,
  COMMENT_EDITOR_CODE_BUTTON_CYPRESS,
  COMMENT_EDITOR_CYPRESS,
  COMMENT_EDITOR_ITALIC_BUTTON_CYPRESS,
  COMMENT_EDITOR_LINE_INFO_TEXT_CYPRESS,
  COMMENT_EDITOR_LINK_BUTTON_CYPRESS,
  COMMENT_EDITOR_QUOTE_BUTTON_CYPRESS,
  COMMENT_EDITOR_SAVE_BUTTON_CYPRESS,
  COMMENT_EDITOR_TEXTAREA_CYPRESS,
  COMMENT_EDITOR_TEXTAREA_HELPER_TEXT_CY,
} from '@/config/selectors';
import { DEFAULT_MAX_COMMENT_LENGTH_SETTING } from '@/config/settings';
import { CommentType } from '@/interfaces/comment';

import ToolbarButton from '../layout/ToolbarButton';

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

type Props = {
  onCancel: () => void;
  onSend: (comment: string) => void;
  comment?: CommentType;
  maxTextLength?: number;
};

const CommentEditor: FC<Props> = ({
  onCancel,
  onSend,
  comment,
  maxTextLength = DEFAULT_MAX_COMMENT_LENGTH_SETTING,
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState(comment?.data.content ?? '');
  const [textTooLong, setTextTooLong] = useState('');
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: boldCommand,
      italic: italicCommand,
      code: codeCommand,
      link: linkCommand,
      quote: quoteCommand,
    },
  });

  // focus textarea on mount
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  });

  const handleTextChange = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    if (value.length < maxTextLength) {
      setText(value);
      setTextTooLong('');
    } else {
      setTextTooLong(t('COMMENT_TEXT_TOO_LONG', { max_length: maxTextLength }));
    }
  };

  return (
    <Box sx={{ p: 1 }} data-cy={COMMENT_EDITOR_CYPRESS}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <ToolbarButton
            dataCy={COMMENT_EDITOR_BOLD_BUTTON_CYPRESS}
            onClick={async () => {
              await commandController.executeCommand('bold');
            }}
          >
            <FormatBold fontSize="inherit" />
          </ToolbarButton>
          <ToolbarButton
            dataCy={COMMENT_EDITOR_ITALIC_BUTTON_CYPRESS}
            onClick={async () => {
              await commandController.executeCommand('italic');
            }}
          >
            <FormatItalic fontSize="inherit" />
          </ToolbarButton>
          <ToolbarButton
            dataCy={COMMENT_EDITOR_CODE_BUTTON_CYPRESS}
            onClick={async () => {
              await commandController.executeCommand('code');
            }}
          >
            <Code fontSize="inherit" />
          </ToolbarButton>
          <ToolbarButton
            dataCy={COMMENT_EDITOR_LINK_BUTTON_CYPRESS}
            onClick={async () => {
              await commandController.executeCommand('link');
            }}
          >
            <InsertLink fontSize="inherit" />
          </ToolbarButton>
          <ToolbarButton
            dataCy={COMMENT_EDITOR_QUOTE_BUTTON_CYPRESS}
            onClick={async () => {
              await commandController.executeCommand('quote');
            }}
          >
            <FormatQuote fontSize="inherit" />
          </ToolbarButton>
        </Stack>
        <TextArea
          data-cy={COMMENT_EDITOR_TEXTAREA_CYPRESS}
          placeholder={t('Type your comment')}
          minRows={1}
          maxRows={10}
          ref={ref}
          value={text}
          onChange={handleTextChange}
        />
        <FormHelperText data-cy={COMMENT_EDITOR_TEXTAREA_HELPER_TEXT_CY} error>
          {textTooLong || ' '}
        </FormHelperText>
        <Stack
          data-cy={COMMENT_EDITOR_LINE_INFO_TEXT_CYPRESS}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} justifyContent="end">
            <Button
              dataCy={COMMENT_EDITOR_CANCEL_BUTTON_CYPRESS}
              color="secondary"
              variant="outlined"
              onClick={() => onCancel()}
            >
              {t('Cancel')}
            </Button>
            <Button
              dataCy={COMMENT_EDITOR_SAVE_BUTTON_CYPRESS}
              color="primary"
              variant="outlined"
              onClick={() => onSend(text)}
            >
              {t('Send')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CommentEditor;
