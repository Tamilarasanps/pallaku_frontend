import { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendarDate } from "react-icons/ci";
import { useTrip } from "../../Contexts/TripType";
import { toast } from "react-toastify";

const DateAndTime = () => {
  const dateRef = useRef();
  const { tripType, startDate, setStartDate } = useTrip();

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateChange = (date, index) => {
    if (!isFutureDate(date)) {
      toast.warning("Please select a valid date from today or future.");
      return;
    }

    setStartDate((prev) => {
      const updated = [...prev];
      updated[index] = date;
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-12 mt-8 py-6 ">
      <h1 className="md:text-xl sm:text-md font-bold text-[#ff1d58]">
        Tell me boss when should we go
      </h1>
{/* ok */}
      {(tripType === "onewaytrip" ? ["1"] : ["1", "2"]).map((_, index) => (
        <div
          key={index}
          className="relative md:w-96 w-[90%] h-12 px-3 border-2 border-gray-400 rounded-lg flex items-center gap-3 bg-white "
        >
          <span className="absolute -top-3.5 left-3 text-[#ff1d58] bg-white px-1 text-sm font-semibold">
            {index === 0 ? "Departure" : "Arrival"}
          </span>

          <CiCalendarDate
            color="#ff1d58"
            size={24}
            className="cursor-pointer"
            onClick={() => dateRef?.current?.focus()}
          />

          <DatePicker
            ref={dateRef}
            selected={startDate[index]}
            onChange={(date) => handleDateChange(date, index)}
            dateFormat="dd/MM/yyyy"
            className="outline-none w-full text-sm text-gray-700"
            calendarClassName="border border-gray-300 rounded-lg shadow-md p-2 text-sm"
            dayClassName={() =>
              "text-gray-800 hover:bg-yellow-300 hover:text-white rounded-full transition duration-200"
            }
            popperPlacement="bottom-start"
          />
        </div>
      ))}
    </div>
  );
};

export default DateAndTime;
