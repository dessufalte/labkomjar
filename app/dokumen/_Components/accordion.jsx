"use client";
import { useState } from "react";

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-slate-400">
      <div
        className="flex justify-between items-center p-4 cursor-pointer bg-slate-600 text-white"
        onClick={onToggle}
      >
        <h2 className="text-sm font-semibold">{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out bg-slate-700 text-slate-300 text-sm px-1 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="list-disc pl-5 py-2">
          {children.map((item) => (
            <li key={item.id} className="py-1">
              <a href={item.url} className="text-blue-400 hover:underline">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(items);
  return (
    <div className="bg-slate-800 rounded-md">
      {items.map((item) => (
        <AccordionItem
          key={item.id} 
          title={item.name}
          children={item.dokumen}
          isOpen={openIndex === item.id}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};

export default Accordion;
