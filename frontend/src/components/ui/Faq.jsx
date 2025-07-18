import datas from "./data";
import { useState } from "react";
import { Plus } from "lucide-react";

export function FaqAccordion() {
  const [selection, setSelection] = useState(null);

  function toggle(id) {
    if (selection === id) {
      setSelection(null); 
    } else {
      setSelection(id);   
    }
  }

  function renderItem(data) {
    return (
      <div key={data.id}>
        <div className="flex justify-between my-4 transition delay-50 duration-300 hover:bg-gray-100" onClick={function () { toggle(data.id); }}>
          <div className="font-bold mx-2 md:mx-40 lg:mx-[500px]" >{data.title}</div>
          <button>
            <Plus />
          </button>
        </div>

        {selection === data.id ? (
          <div className="mx-2">
            {data.description}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      {datas.map(function (data) {
        return renderItem(data);
      })}
    </div>
  );
}
