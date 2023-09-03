import { SENTRY_DSN, SENTRY_ENV, VERSION } from './env';

type SentryConfigType = {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
  release: string;
  replaysSessionSampleRate: number;
  replaysOnErrorSampleRate: number;
};

export const generateSentryConfig = (): SentryConfigType => {
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  const DEV_TRACE_SAMPLE_RATE = 1.0;
  const DEV_REPLAY_SAMPLE_RATE = 0.1;
  const PROD_TRACE_SAMPLE_RATE = 0.1;
  const PROD_REPLAY_SAMPLE_RATE = 0.1;

  return {
    // dsn is set only when not running inside cypress
    dsn: (!window.Cypress && SENTRY_DSN) || '',
    environment: SENTRY_ENV,
    tracesSampleRate: import.meta.env.PROD
      ? PROD_TRACE_SAMPLE_RATE
      : DEV_TRACE_SAMPLE_RATE,
    // release is set only when building for production
    release: VERSION,

    replaysSessionSampleRate: import.meta.env.PROD
      ? PROD_REPLAY_SAMPLE_RATE
      : DEV_REPLAY_SAMPLE_RATE,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
  };
};
