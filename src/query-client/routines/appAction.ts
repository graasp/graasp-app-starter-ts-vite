import { MUTATION_KEYS } from '../config/keys';
import createRoutine from './utils';

export const postAppActionRoutine = createRoutine(
  MUTATION_KEYS.POST_APP_ACTION[0],
);
