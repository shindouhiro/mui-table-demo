import { useEffect, useState } from "react";

function Hello() {
  const [state, setState] = useState<number[]>([]);
  useEffect(() => {
    setState([1, 2, 3])
  }, []);
  return (
    <div className="flex flex-col">
      {
        state.map(s => (
          <div>
            {s}
          </div>
        ))
      }
    </div>
  );
}

export default Hello

