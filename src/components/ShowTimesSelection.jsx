import React from "react";

const ShowTimesSelection = ({ showTimes, selectedHall, handleShowSelection }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-3">Select Hall</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {showTimes.map((show) => (
          <button
            key={show.hallId._id}
            onClick={() => handleShowSelection(show)}
            className={`flex flex-col items-center p-4 rounded-lg min-w-[120px] transition-all duration-300 ${
              selectedHall === show.hallId._id
                ? "bg-green-500 scale-105 shadow-lg"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            <span
              className={`text-lg font-semibold ${
                selectedHall === show.hallId._id ? "text-black" : "text-white"
              }`}
            >
              {show.hallId.hall_name}
            </span>
            <div
              className={`mt-2 px-4 py-1 rounded-full text-sm ${
                selectedHall === show.hallId._id
                  ? "bg-black text-white"
                  : "bg-green-500 text-black"
              }`}
            >
              {show.start_time} - {show.end_time}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowTimesSelection;
