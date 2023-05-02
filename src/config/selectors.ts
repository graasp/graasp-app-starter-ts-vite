export const GRAASP_LOGO_CYPRESS = 'graasp_logo';
export const TABLE_VIEW_TABLE_CYPRESS = 'table_view_table';
export const TABLE_VIEW_PANE_CYPRESS = 'table_view_pane';
export const SETTINGS_VIEW_PANE_CYPRESS = 'settings_view_pane';
export const PRESET_VIEW_PANE_CYPRESS = 'preset_view_pane_';
export const PLAYER_VIEW_CY = 'player-view';
export const BUILDER_VIEW_CY = 'builder-view';
export const ANALYTICS_VIEW_CY = 'analytics_view';
export const TAB_PRESET_VIEW_CYPRESS = 'tab_preset_view';
export const TAB_TABLE_VIEW_CYPRESS = 'tab_table_view';
export const TAB_SETTINGS_VIEW_CYPRESS = 'tab_settings_view';
export const TABLE_ROW_USERS_CYPRESS = 'table_row_users';
export const TABLE_VIEW_BODY_USERS_CYPRESS = 'table_view_body_users';
export const TABLE_VIEW_OPEN_REVIEW_BUTTON_CYPRESS =
  'table_view_open_review_button';
export const TABLE_VIEW_USER_REVIEW_DIALOG_CYPRESS =
  'table_view_user_review_dialog';
export const TABLE_VIEW_USERNAME_CELL_CYPRESS = 'table_view_username_cell';
export const TABLE_VIEW_HELP_NEEDED_CELL_CYPRESS =
  'table_view_help_needed_cell';
export const TABLE_VIEW_NB_COMMENTS_CELL_CYPRESS =
  'table_view_nb_comments_cell';
export const TABLE_VIEW_VIEW_COMMENTS_CELL_CYPRESS =
  'table_view_view_comments_cell';
export const TABLE_VIEW_REVIEW_DIALOG_CLOSE_BUTTON_CYPRESS =
  'table_view_review_dialog_close_button';

export const CUSTOM_DIALOG_TITLE_CYPRESS = 'custom_dialog_title';
export const CUSTOM_DIALOG_ACTIONS_CYPRESS = 'custom_dialog_actions';
export const CUSTOM_DIALOG_CONTENT_CY = 'custom_dialog_content';

export const NUMBER_OF_COMMENTS_CYPRESS = 'number_of_comments';
export const TABLE_NO_COMMENTS_CYPRESS = 'table_no_comments';
export const SETTINGS_SPEED_FAB_CYPRESS = 'settings_speed_fab';
export const DISPLAY_SETTINGS_FAB_CYPRESS = 'display_settings_fab';
export const CODE_SETTINGS_FAB_CYPRESS = 'code_settings_fab';
export const SETTINGS_DIALOG_CANCEL_BUTTON_CYPRESS =
  'settings_dialog_cancel_button';
export const SETTINGS_DIALOG_SAVE_BUTTON_CYPRESS =
  'settings_dialog_save_button';
export const PROGRAMMING_LANGUAGE_SELECT_ID = 'programmingLanguageSelect';
export const PROGRAMMING_LANGUAGE_SELECT_CYPRESS =
  'programming_language_select';
export const SETTINGS_CODE_DIALOG_WINDOW_CYPRESS =
  'settings_code_dialog_window';
export const SETTINGS_DISPLAY_DIALOG_WINDOW_CYPRESS =
  'settings_display_dialog_window';
export const SHOW_HEADER_SWITCH_CYPRESS = 'show_header_switch';
export const SHOW_TOOLBAR_SWITCH_CYPRESS = 'show_toolbar_switch';
export const SHOW_VERSION_NAVIGATION_SWITCH_CYPRESS =
  'show_version_navigation_switch';
export const SHOW_EDIT_BUTTON_SWITCH_CYPRESS = 'show_edit_button_switch';
export const SHOW_RUN_BUTTON_SWITCH_CYPRESS = 'show_run_button_switch';
export const SHOW_VISIBILITY_SWITCH_CYPRESS = 'show_visibility_switch';
export const ALLOW_COMMENTS_SWITCH_CYPRESS = 'allow_comments_switch';
export const ALLOW_REPLIES_SWITCH_CYPRESS = 'allow_replies_switch';
export const REVIEW_MODES_SELECT_CYPRESS = 'review_modes_select';

export const tableRowUserCypress = (id: string): string =>
  `${TABLE_ROW_USERS_CYPRESS}-${id}`;
export const CODE_REVIEW_CONTAINER_CYPRESS = 'code_review_container';
export const CODE_REVIEW_ADD_BUTTON_CYPRESS = 'code_review_add_button';
export const CODE_REVIEW_LINE_CYPRESS = 'code_review_line';
export const CODE_REVIEW_LINE_CONTENT_CYPRESS = 'code_review_line_content';
export const buildAddButtonDataCy = (index: number): string =>
  `${CODE_REVIEW_ADD_BUTTON_CYPRESS}-${index}`;

export const CODE_REVIEW_CHATBOT_PROMPT_COMMENT_CY =
  'code_review_chatbot_prompt_comment';

export const COMMENT_EDITOR_CYPRESS = 'comment_editor';
export const COMMENT_EDITOR_CANCEL_BUTTON_CYPRESS =
  'comment_editor_cancel_button';
export const COMMENT_EDITOR_SAVE_BUTTON_CYPRESS = 'comment_editor_save_button';
export const COMMENT_EDITOR_BOLD_BUTTON_CYPRESS = 'comment_editor_bold_button';
export const COMMENT_EDITOR_ITALIC_BUTTON_CYPRESS =
  'comment_editor_italic_button';
export const COMMENT_EDITOR_CODE_BUTTON_CYPRESS = 'comment_editor_code_button';
export const COMMENT_EDITOR_LINK_BUTTON_CYPRESS = 'comment_editor_link_button';
export const COMMENT_EDITOR_QUOTE_BUTTON_CYPRESS =
  'comment_editor_quote_button';
export const COMMENT_EDITOR_LINE_INFO_TEXT_CYPRESS =
  'comment_editor_line_info_text';
export const COMMENT_EDITOR_TEXTAREA_CYPRESS = 'comment_editor_textarea';
export const COMMENT_EDITOR_TEXTAREA_HELPER_TEXT_CY =
  'comment_editor_textarea_helper_text';
export const CODE_REVIEW_TOOLBAR_CYPRESS = 'comment_review_toolbar';
export const TOOLBAR_USER_SELECT_CYPRESS = 'toolbar_user_select';
export const TOOLBAR_VERSION_SELECT_CYPRESS = 'toolbar_version_select';
export const TOOLBAR_COMMIT_INFO_BUTTON_CYPRESS = 'toolbar_commit_info';
export const TOOLBAR_EDIT_CODE_BUTTON_CYPRESS = 'toolbar_edit_code_button';
export const TOOLBAR_VISIBILITY_BUTTON_CYPRESS = 'toolbar_visibility_button';
export const TOOLBAR_RUN_CODE_BUTTON_CYPRESS = 'toolbar_run_code_button';
export const COMMENT_CONTAINER_CYPRESS = 'comment_container';
export const CHATBOT_PROMPT_CONTAINER_CY = 'chatbot_prompt_container';
export const COMMENT_RESPONSE_BOX_CY = 'comment-response-box';
export const buildCommentContainerDataCy = (id: string): string =>
  `${COMMENT_CONTAINER_CYPRESS}-${id}`;
export const buildChatbotPromptContainerDataCy = (id: string): string =>
  `${CHATBOT_PROMPT_CONTAINER_CY}-${id}`;
export const buildCommentResponseBoxDataCy = (id: string): string =>
  `${COMMENT_RESPONSE_BOX_CY}-${id}`;

export const COMMENT_THREAD_CONTAINER_CYPRESS = 'comment_thread_container';
export const ORPHAN_BUTTON_CYPRESS = 'orphan_button';
export const CODE_EXECUTION_CONTAINER_CYPRESS = 'code_execution_container';
export const CODE_EDITOR_ID_CY = 'code_editor';
export const CODE_EDITOR_CONTAINER_CYPRESS = 'code_editor_container';
export const CODE_EDITOR_LANGUAGE_SELECT_CYPRESS =
  'code_editor_language_select';
export const CODE_EDITOR_COMMIT_MESSAGE_CYPRESS = 'code_editor_commit_message';
export const CODE_EDITOR_COMMIT_DESCRIPTION_CYPRESS =
  'code_editor_commit_description';
export const CODE_EDITOR_SUBMIT_BUTTON_CYPRESS = 'code_editor_submit_button';
export const CODE_EDITOR_CANCEL_BUTTON_CYPRESS = 'code_editor_cancel_button';

export const COMMIT_INFO_DIALOG_CYPRESS = 'commit_info_dialog';
export const COMMIT_INFO_FIELD_CYPRESS = 'commit_info_field';
export const buildCommitFieldDataCy = (fieldName: string): string =>
  `${COMMIT_INFO_FIELD_CYPRESS}-${fieldName}`;

export const REPL_CONTAINER_CY = 'repl_container';
export const REPL_EDITOR_ID_CY = 'repl_editor';

export const APP_MODE_EXECUTE_BUTTON_CY = 'app_mode_execute';
export const APP_MODE_REVIEW_BUTTON_CY = 'app_mode_review';
export const APP_MODE_COLLABORATE_BUTTON_CY = 'app_mode_collaborate';
export const APP_MODE_EXPLAIN_BUTTON_CY = 'app_mode_explain';

export const SETTING_APP_MODE_SELECT_FORM_LABEL_CY =
  'setting_app_mode_select_label';
export const SETTING_APP_MODE_SELECT_NAME_CY = 'setting_app_mode_select_label';
export const SETTING_MAIN_CODE_EDITOR_CY = 'setting_main_code_editor';
export const SETTING_HEADER_CODE_EDITOR_CY = 'setting_header_code_editor';
export const SETTING_FOOTER_CODE_EDITOR_CY = 'setting_footer_code_editor';
export const SETTING_CHATBOT_PROMPT_CODE_EDITOR_CY =
  'setting_chatbot_prompt_code_editor';
export const SETTING_INITIAL_PROMPT_CODE_EDITOR_CY =
  'setting_initial_prompt_code_editor';
export const SETTING_CHATBOT_PROMPT_LINE_NUMBER_CY =
  'setting_chatbot_prompt_line_number';
export const SETTING_MAX_COMMENT_LENGTH = 'setting_max_comment_length';
export const SETTING_ADD_CHATBOT_PROMPT_CY = 'setting_add_chatbot_prompt';

export const REPL_RUN_CODE_BUTTON_CY = 'repl_run_code_button';
export const REPL_OUTPUT_CONSOLE_CY = 'repl_output_console_area';
export const REPL_STATUS_INDICATOR_CY = 'repl_status_indicator';
export const REPL_SAVE_BUTTON_CY = 'repl_save_button';
export const REPL_STOP_BUTTON_CY = 'repl_stop_button';
export const REPL_CLEAR_BUTTON_CY = 'repl_clear_button';
export const REPL_FULL_SCREEN_BUTTON_CY = 'repl_full_screen_button';
export const REPL_INPUT_DIALOG_BUTTON_CONTAINER_CY = 'repl_input_container';
export const REPL_INPUT_DIALOG_CANCEL_BUTTON_CY = 'repl_input_cancel_button';
export const REPL_INPUT_DIALOG_SUBMIT_BUTTON_CY = 'repl_input_submit_button';
export const REPL_INPUT_DIALOG_PROMPT_TEXT_CY = 'repl_input_prompt_text';
export const REPL_INPUT_DIALOG_TEXTFIELD_CY = 'repl_input_textfield';

export const DOWNLOAD_ACTIONS_BUTTON_CY = 'download_actions_button';

export const DOWNLOAD_DATA_BUTTON_CY = 'download_data_button';

export const DIFF_VIEW_CONTAINER_CY = 'diff_view_container';
export const DIFF_VIEW_COMPONENT_CY = 'diff_view_component';

export const SETTING_DIFF_VIEW_OLD_CODE_CY = 'setting_diff_view_old_code';
export const SETTING_DIFF_VIEW_NEW_CODE_CY = 'setting_diff_view_new_code';

export const buildDataCy = (selector: string): string =>
  `[data-cy=${selector}]`;
export const buildTableRowCypress = (selector: string): string =>
  `[data-cy=${selector}]`;
export const buildCommitFieldCypress = (selector: string): string =>
  `[data-cy=${selector}]`;
export const settingKeyDataCy = (key: string): string => `setting-${key}`;

// keys for save buttons and tests
export const EXECUTION_MODE_SETTINGS_KEY = 'EXECUTION_MODE_SETTINGS_KEY';
export const REVIEW_MODE_SETTINGS_KEY = 'REVIEW_MODE_SETTINGS_KEY';
export const EXPLAIN_MODE_SETTINGS_KEY = 'EXPLAIN_MODE_SETTINGS_KEY';
export const SETTING_NEW_CHATBOT_PROMPT_KEY = 'NEW_CHATBOT_PROMPT_KEY';
