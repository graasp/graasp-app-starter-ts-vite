import { Stack, Typography } from '@mui/material';

export const NetworkErrorToast = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}): JSX.Element => (
  <Stack>
    <Typography fontWeight="bold">{title}</Typography>
    <Typography>{description}</Typography>
  </Stack>
);

export const InfoToast = ({
  type,
  payload,
}: {
  type: string;
  payload: unknown;
}): JSX.Element => (
  <Stack>
    <Typography fontWeight="bold">{type}</Typography>
    <Typography variant="caption">
      {JSON.stringify(payload, null, 2)}
    </Typography>
  </Stack>
);
