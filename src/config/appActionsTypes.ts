export enum APP_ACTIONS_TYPES {
  RUN_CODE = 'run_code',
  SAVE_CODE = 'save_code',
  CLEAR_OUTPUT = 'clear_output',
  OPEN_FIGURE = 'open_figure',
  STOP_EXECUTION_DURING_PROMPT = 'stop_execution_during_prompt',
  STOP_EXECUTION = 'stop_execution',
  SUBMITTED_INPUT = 'submitted_input',
  CANCEL_PROMPT = 'cancel_prompt',
  INITIALIZE_EXECUTION = 'initialize_execution',
  NEW_FIGURE = 'new_figure',
  SEND_PROMPT = 'send_prompt',

  // Review actions
  CREATE_COMMENT = 'create_comment',
  EDIT_COMMENT = 'edit_comment',
  REPORT_COMMENT = 'report_comment',
  DELETE_COMMENT = 'delete_comment',
  RESPOND_COMMENT = 'respond_comment',
}
