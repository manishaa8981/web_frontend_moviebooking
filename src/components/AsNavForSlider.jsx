import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";

const AsNavFor = ({ trailers, onPlayTrailer }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const settingsMain = {
    asNavFor: nav2,
    ref: sliderRef1,
    arrows: false,
    fade: true,
  };

  const settingsThumbs = {
    asNavFor: nav1,
    ref: sliderRef2,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <Slider {...settingsMain} className="w-full">
          {trailers.map((trailer) => (
            <div key={trailer.id} className="relative h-[400px]">
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={() => onPlayTrailer(trailer)}
                  className="btn btn-primary btn-lg gap-2"
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          ))}
        </Slider>
        <Slider {...settingsThumbs} className="mt-6">
          {trailers.map((trailer) => (
            <div key={trailer.id} className="px-2">
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="w-full h-28 object-cover rounded-lg cursor-pointer"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AsNavFor;
