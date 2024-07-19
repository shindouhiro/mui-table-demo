import { useState } from "react";

// 随机石
interface good {
  good: string;
  id: number;
}
function App() {
  const [state, setState] = useState<good[]>([{
    good: '123',
    id: 123
  }])
  return (
    <div>helo good</div>
  )
}
export default App
