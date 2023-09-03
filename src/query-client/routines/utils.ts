const createRoutine = (type: string) =>
  ({
    TRIGGER: `${type}/TRIGGER`,
    REQUEST: `${type}/REQUEST`,
    FAILURE: `${type}/FAILURE`,
    SUCCESS: `${type}/SUCCESS`,
    FULFILL: `${type}/FULFILL`,
  } as const);

export default createRoutine;
