import { toast } from 'react-toastify';

import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';

import {
  SUCCESS_MESSAGE,
  UNEXPECTED_ERROR_MESSAGE,
} from '@/constants/messages';

const showErrorToast = (payload: string | { message: string }): void => {
  let message = UNEXPECTED_ERROR_MESSAGE;
  if (isString(payload)) {
    message = payload;
  } else if (isObject(payload)) {
    if (payload.message) {
      ({ message } = payload);
    }
  }

  toast.error(message, {
    toastId: message,
    position: 'bottom-right',
  });
};

const showSuccessToast = (payload: string | { message: string }): void => {
  let message = SUCCESS_MESSAGE;
  if (isString(payload)) {
    message = payload;
  } else if (isObject(payload)) {
    if (payload.message) {
      ({ message } = payload);
    }
  }

  toast.success(message, {
    toastId: message,
    position: 'bottom-right',
  });
};

export { showErrorToast, showSuccessToast };
