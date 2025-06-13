import car from "../assets/Flux_Dev_A_shiny_sleek_and_colorful_tourist_car_appears_to_bur_2.jpg";

const Banner = () => {
  return (
    <div className="w-full aspect-[16/9] sm:aspect-[21/9] max-h-[500px] sm:max-h-[400px] lg:max-h-[450px] mx-auto">
      <img src={car} alt="Banner" className="w-full h-full object-cover" />
    </div>
  );
};

export default Banner;
