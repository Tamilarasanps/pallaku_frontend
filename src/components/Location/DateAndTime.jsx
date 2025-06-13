import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { useRef } from "react";
import { CiClock2 } from "react-icons/ci";
import { useTrip } from "../../Contexts/TripType";

const DateAndTime = () => {
  const dateRef = useRef();
  const { tripType, startDate, setStartDate } = useTrip();

  return (
    <div className="w-full flex flex-col items-center gap-12 mt-8 py-6">
      <h1 className="md:text-xl sm:text-md font-bold text-[#E43D12]">
        Tell me boss where should we go
      </h1>
      {(tripType === "onewaytrip" ? ["1"] : ["1", "2"]).map((_, index) => (
        <>
          <div className="relative md:w-96 w-[90%] border-2 h-12 px-2 border-gray-400 rounded-md flex items-center gap-2">
            {/* Top label text */}
            <span className="absolute -top-3.5 left-3 text-[#E43D12] bg-white px-1 text-sm  font-semibold">
              {index === 0 ? "Departure" : "Arrival"}
            </span>

            <CiCalendarDate
              color="#E43D12"
              size={24}
              className="cursor-pointer"
              onClick={() => {
                dateRef?.current?.focus();
              }}
            />
            <DatePicker
              ref={dateRef}
              className="outline-none"
              selected={startDate[index]}
              onChange={(date) =>
                setStartDate((prev) => {
                  const updated = [...prev];
                  updated[index] = date;
                  return updated;
                })
              }
            />
          </div>

          {/* <div className="relative md:w-96 w-[90%] border-2 h-12 px-2 border-2 border-gray-400 rounded-md flex items-center gap-2">
            <CiClock2 color="#E43D12" size={32} className="cursor-pointer" />
            <input type="text" className="w-full h-full outline-none" />
            <select className="outline-none cursor-pointer px-4 flex items-center justify-center">
              <option className="cursor-pointer">AM</option>
              <option className="cursor-pointer">PM</option>
            </select>
          </div> */}
        </>
      ))}
    </div>
  );
};

export default DateAndTime;
