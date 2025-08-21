export const GetLocation = async (value) => {
  setQuery(value);

  if (value.length < 3) {
    setResults([]);
    return;
  }

  try {
    const response = await axios.get(
      "https://pallaku-backend.onrender.com/api/location/search",
      // "http://localhost:5000/api/location/search",
      {
        params: { q: value },
      }
    );

    setResults(response.data);
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};
