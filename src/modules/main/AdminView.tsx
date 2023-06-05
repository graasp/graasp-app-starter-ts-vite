import React, { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Settings, TableChart } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

import {
  SETTINGS_VIEW_PANE_CYPRESS,
  TABLE_VIEW_PANE_CYPRESS,
  TAB_SETTINGS_VIEW_CYPRESS,
  TAB_TABLE_VIEW_CYPRESS,
} from '@/config/selectors';

import TableView from '../common/TableView';
import SettingsFab from '../settings/SettingsFab';
import SettingsView from '../settings/SettingsView';

enum Tabs {
  TABLE_VIEW = 'TABLE_VIEW',
  SETTINGS_VIEW = 'SETTINGS_VIEW',
}

const AdminView: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(Tabs.TABLE_VIEW);

  const renderTable = (): ReactElement => (
    <TabContext value={activeTab}>
      <TabList
        textColor="secondary"
        indicatorColor="secondary"
        onChange={(_, newTab: Tabs) => setActiveTab(newTab)}
        centered
      >
        <Tab
          data-cy={TAB_TABLE_VIEW_CYPRESS}
          value={Tabs.TABLE_VIEW}
          label={t('Table View')}
          icon={<TableChart />}
          iconPosition="start"
        />
        <Tab
          data-cy={TAB_SETTINGS_VIEW_CYPRESS}
          value={Tabs.SETTINGS_VIEW}
          label={t('Settings View')}
          icon={<Settings />}
          iconPosition="start"
        />
      </TabList>
      <TabPanel value={Tabs.TABLE_VIEW} data-cy={TABLE_VIEW_PANE_CYPRESS}>
        <TableView />
      </TabPanel>
      <TabPanel value={Tabs.SETTINGS_VIEW} data-cy={SETTINGS_VIEW_PANE_CYPRESS}>
        <SettingsView />
      </TabPanel>
    </TabContext>
  );

  return (
    <>
      {renderTable()}
      <SettingsFab />
    </>
  );
};

export default AdminView;
