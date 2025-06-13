const vehicleSearch = (from, to, setVehicleList) => {
  if (!from || !to) {
    alert("please select pick up and drop location");
  } else {
    setVehicleList(true);
  }
};

export default vehicleSearch;
