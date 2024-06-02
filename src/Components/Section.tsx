import React from 'react';
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  product: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, product }) => {
  const nav = useNavigate();
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-black font-bold text-3xl text-start ml-1">{title}</h2>
          <div className="text-[#279C61] flex" onClick={() => nav(`/${title}`)}>
            <p>view all</p>
            <ChevronRight />
          </div>
        </div>
        <div>
          {product}
        </div>    
      </div>
    </div>
  );
};

export default Section;
