import { Tabs as LibTabs, Tab } from '@mui/material';
import { TABS } from '../../constants';

const Tabs = ({ value, onChange, isSmallScreen }) => {
  return (
    <LibTabs
      variant="scrollable"
      scrollButtons="auto"
      orientation={isSmallScreen ? 'vertical' : 'horizontal'}
      value={value}
      onChange={onChange}
      aria-label="Tabs"
      sx={{
        minWidth: 'max-content',
        mb: 2,
      }}
    >
      {TABS.map((tabName) => (
        <Tab key={tabName} value={tabName} label={tabName} sx={{ minWidth: 64, p: 1 }} />
      ))}
    </LibTabs>
  );
};

export default Tabs;
