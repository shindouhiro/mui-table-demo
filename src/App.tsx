import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FixedSizeList as List, VariableSizeList } from 'react-window';

// Define types for data structures
interface PanelData {
  panel: number;
  items: string[];
}

// Define types for function parameters
type FetchMockPanels = (start: number, limit: number) => Promise<PanelData[]>;
type FetchMockItems = (panel: number, start: number, limit: number) => Promise<string[]>;

const fetchMockPanels: FetchMockPanels = (start, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Array.from({ length: limit }, (_, index) => ({
        panel: start + index + 1,
        items: Array.from({ length: 20 }, (_, idx) => `Item ${start + index + 1}-${idx + 1}`),
      }));
      resolve(data);
    }, 1500); // Simulate network delay
  });
};

const fetchMockItems: FetchMockItems = (panel, start, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = Array.from({ length: limit }, (_, index) => `Item ${panel}-${start + index + 1}`);
      resolve(items);
    }, 1500); // Simulate network delay
  });
};

const PanelContent: React.FC<{ panel: number; loadMoreItems: (panel: number) => void; items: string[] }> = ({
  panel,
  loadMoreItems,
  items,
}) => {
  const listRef = useRef<VariableSizeList>(null);

  const handleScroll = ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }: { scrollDirection: string; scrollOffset: number; scrollUpdateWasRequested: boolean }) => {
    if (!scrollUpdateWasRequested && scrollDirection === 'forward') {
      const list = listRef.current;
      if (list && list._outerRef.scrollTop + list._outerRef.clientHeight >= list._outerRef.scrollHeight - 5) {
        loadMoreItems(panel);
      }
    }
  };

  return (
    <VariableSizeList
      height={200}
      itemCount={items.length + 1}
      itemSize={() => 35}
      width="100%"
      onScroll={handleScroll}
      ref={listRef}
      itemData={items}
    >
      {({ index, style }) => {
        if (index === items.length) {
          return (
            <div style={style}>
              <CircularProgress size={24} />
            </div>
          );
        }
        return (
          <Typography key={index} variant="body2" style={style}>
            {items[index]}
          </Typography>
        );
      }}
    </VariableSizeList>
  );
};

const Panel: React.FC<{ index: number; style: React.CSSProperties; data: PanelData[]; loadMoreItems: (panel: number) => void }> = ({
  index,
  style,
  data,
  loadMoreItems,
}) => {
  const panelData = data[index];
  const [items, setItems] = useState(panelData.items);

  const loadMore = async (panel: number) => {
    const newItems = await fetchMockItems(panel, items.length, 10);
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  return (
    <div style={style}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{`Collapsible Panel ${panelData.panel}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PanelContent panel={panelData.panel} loadMoreItems={loadMore} items={items} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const InfiniteScrollPanels: React.FC = () => {
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef<List>(null);
  const panelHeight = 300; // Height of each panel

  const loadMorePanels = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const newPanels = await fetchMockPanels(panels.length, 5); // Load 5 panels each time
    setPanels((prevPanels) => [...prevPanels, ...newPanels]);
    if (newPanels.length < 5) {
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore, panels.length]);

  const handleScroll = useCallback(
    ({ scrollDirection, scrollOffset, scrollUpdateWasRequested }: { scrollDirection: string; scrollOffset: number; scrollUpdateWasRequested: boolean }) => {
      if (!scrollUpdateWasRequested && scrollDirection === 'forward') {
        const list = listRef.current;
        if (list && list._outerRef.scrollTop + list._outerRef.clientHeight >= list._outerRef.scrollHeight - 5) {
          loadMorePanels();
        }
      }
    },
    [loadMorePanels]
  );

  useEffect(() => {
    loadMorePanels();
  }, [loadMorePanels]);

  return (
    <Container style={{ height: '100vh', overflow: 'auto' }}>
      <List
        height={window.innerHeight}
        itemCount={hasMore ? panels.length + 1 : panels.length}
        itemSize={panelHeight}
        width="100%"
        onScroll={handleScroll}
        ref={listRef}
        itemData={panels}
      >
        {({ index, style }) => {
          if (index === panels.length) {
            return (
              <div style={style}>
                <CircularProgress size={24} />
              </div>
            );
          }
          return <Panel index={index} style={style} data={panels} loadMoreItems={loadMorePanels} />;
        }}
      </List>
      {!hasMore && (

        <div style={{ textAlign: 'center', padding: 16 }}>
          <Typography variant="body2">No more panels</Typography>
        </div>
      )}
    </Container>
  );
};

export default InfiniteScrollPanels;
