import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Tab, useMediaQuery } from '@mui/material';
import { useSelectSneakers } from '../../hooks/useSelectSneakers';
import { useScrollTop } from '../../hooks/useScrollTop';
import { ItemPageHelmet } from '../../components/Helmets';
import { TABS } from '../../constants';
import BaseInfoTab from './InfoTab';
import DescriptionTab from './DescriptionTab';
import CharacteristicsTab from './CharacteristicsTab';
import TabPanel from './TabPanel';
import Tabs from './Tabs';

const Item = () => {
  useScrollTop();

  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let tab = queryParams.get('tab') || 'info';

    if (!TABS.includes(tab)) {
      tab = 'info';
      queryParams.set('tab', tab);
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }

    setActiveTab(tab);
  }, [location.search, location.pathname, navigate]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);

    const newUrl = new URLSearchParams(location.search);
    newUrl.set('tab', newValue);
    navigate(`${location.pathname}?${newUrl.toString()}`);
  };

  const queryParams = new URLSearchParams(location.search);

  const { items } = useSelectSneakers();

  const id = queryParams.get('id');
  const size = queryParams.get('size') || '';

  const item = items?.find((item) => item._id === id);
  const isValidSize = item?.sizes.some((sizeObj) => sizeObj.value === size);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const renderContent = () => {
    if (!items) {
      return <p>Loading...</p>;
    }

    if (!item) {
      return <p>This item does not exist.</p>;
    }

    return (
      <>
        <ItemPageHelmet title={item.name} description={item.name} />

        <Box
          width={1}
          display={'flex'}
          gap={2}
          sx={{
            '@media (max-width: 600px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Tabs value={activeTab} onChange={handleChange} isSmallScreen={isSmallScreen}>
            {TABS.map((tabName) => (
              <Tab key={tabName} value={tabName} label={tabName} />
            ))}
          </Tabs>

          <Box flexGrow={1} px={2}>
            <TabPanel value={activeTab} name={TABS[0]}>
              <BaseInfoTab item={item} size={isValidSize ? size : ''} />
            </TabPanel>

            <TabPanel value={activeTab} name={TABS[1]}>
              <DescriptionTab item={item} />
            </TabPanel>

            <TabPanel value={activeTab} name={TABS[2]}>
              <CharacteristicsTab item={item} />
            </TabPanel>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Container maxWidth="xl">
      <Box my={3}>{renderContent()}</Box>
    </Container>
  );
};

export default Item;
