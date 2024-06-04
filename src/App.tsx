import { useState } from 'react'
import { Button } from '@mui/material';
import HttpIcon from '@mui/icons-material/Http';
import PluginCreate from './components/PluginCreate'
import InfiniteScroll from 'react-infinite-scroll-component';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const generateItems = (start, end) => {
  const items = [];
  for (let i = start; i < end; i++) {
    items.push(`Item ${i + 1}`);
  }
  return items;
};
function App() {
  const [pluginVisible, setPluginVisible] = useState(false)
  const [items, setItems] = useState(generateItems(0, 20));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // if (items.length >= 1000) { // 假设最多加载1000项
    //   setHasMore(false);
    //   return;
    // }
    // 模拟数据加载
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...generateItems(prevItems.length, prevItems.length + 20),
      ]);
    }, 1500);
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div className="flex w-200 overflow-hidden whitespace-nowrap text-ellipsis">
        <div >xxxxxxxxbbbbssssssssssssss(大法师打发第三方水岸)</div>
        <div className="ml-2  overflow-hidden whitespace-nowrap text-ellipsis">
          |ssssssssssssssssssssssssssssssssssssssssssssssssssssssssdafdasfdafasdfadadfadfadfadsfda
        </div>

      </div>
      <PluginCreate open={pluginVisible} onClose={() => setPluginVisible(false)} />
      <Typography variant="h1" component="h2">
        Welcome to MUI with Vite
      </Typography>
      <Button variant="contained" color="primary" startIcon={<HttpIcon />}
        onClick={() => setPluginVisible(true)}
      >
        Click Me
      </Button>


      <div style={{ padding: 20, height: '200px', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
        >
          {items.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{`Details for ${item}`}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default App
