import React, { FC } from 'react';

import { Box, Stack, styled, useTheme } from '@mui/material';

import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';

import { SMALL_BORDER_RADIUS } from '@/config/layout';
import { CODE_EDITOR_ID_CY } from '@/config/selectors';

const StyledEditorContainer = styled(Box)({
  border: 'solid silver 1px',
  borderRadius: SMALL_BORDER_RADIUS,
  maxHeight: '40vh',
  overflow: 'hidden',
});

type Props = {
  value: string;
  readOnly?: boolean;
  onChange?: (newValue: string) => void;
};

const CodeEditor: FC<Props> = ({ value, readOnly, onChange }) => {
  const theme = useTheme();

  return (
    <Stack display="flex" direction="column" spacing={1} maxHeight="100%">
      <StyledEditorContainer>
        <CodeMirror
          id={CODE_EDITOR_ID_CY}
          onChange={onChange}
          height="100%"
          style={{
            height: '100%',
          }}
          value={value}
          theme={theme.palette.mode}
          basicSetup
          extensions={[javascript()]}
          readOnly={readOnly}
        />
      </StyledEditorContainer>
    </Stack>
  );
};

export default CodeEditor;
