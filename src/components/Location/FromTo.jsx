import useLocationSearch from "../../Hooks/useLocationSearch";

const FromTo = () => {
  const {
    fromInput,
    toInput,
    suggestionsFrom,
    suggestionsTo,
    handleFromChange,
    handleToChange,
    selectFrom,
    selectTo,
  } = useLocationSearch();

  return (
    <div className="w-full flex flex-col items-center gap-12 mt-8 py-6">
      <h1 className="lg:text-xl sm:text-md font-bold text-[#E43D12]">
        Tell me boss where should we go
      </h1>

      {/* From Input */}
      <div className="relative md:w-96 w-[90%]">
        <label className="absolute -top-3 left-2 bg-white px-1 text-sm font-semibold text-[#E43D12]">
          From
        </label>
        <input
          type="text"
          value={fromInput}
          onChange={handleFromChange}
          className="px-4 w-full h-12 border-2 border-gray-400 rounded-md outline-none"
        />
        {suggestionsFrom.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-40 overflow-y-auto">
            {suggestionsFrom.map((item, idx) => (
              <li
                key={idx}
                onClick={() => selectFrom(item.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* To Input */}
      <div className="relative md:w-96 w-[90%]">
        <label className="absolute -top-3 left-2 bg-white text-sm font-semibold text-[#E43D12]">
          To
        </label>
        <input
          type="text"
          value={toInput}
          onChange={handleToChange}
          className="px-4 w-full h-12 border-2 border-gray-400 rounded-md outline-none"
        />
        {suggestionsTo.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-40 overflow-y-auto">
            {suggestionsTo.map((item, idx) => (
              <li
                key={idx}
                onClick={() => selectTo(item.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FromTo;
