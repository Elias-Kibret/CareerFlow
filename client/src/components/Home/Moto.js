import React from "react";

export const Moto = () => {
  return (
    <div className=" flex container mx-auto p-8  min-h-screen mt-40">
      <div className="w-[50%]">
        <h1 className="text-6xl font-bold">
          Find the Job of <br></br>your{" "}
          <span className="text-[#F2994A]">Dreams</span>
        </h1>
        <p className="mt-10 mb-20 text-gray-500">
          Find You New Job Today! New Job Postings
          <br></br> Everyday just for you, browse the job you want and apply
          wherever you want
        </p>

        <div>
          <h3 className="font-bold">Trending Jobs Keyword</h3>
          <div className="w-[70%]">
            <ul className="lsit-none flex justify-between mt-8 text-[#F2994A] font-semibold">
              <li>Web Designer</li>
              <li>UX/UI Designer</li>
              <li>Frontend</li>
              <li>Backend</li>
            </ul>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
