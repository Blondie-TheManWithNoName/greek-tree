import axios from "axios";

export const fetchGodInfo = async (p1, p2, setGodInfo) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:4005/api/gods/children/" + p1 + "&" + p2
    );
    setGodInfo(response.data);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodPartners = async (name, setGodPartners) => {
  try {
    const response = await axios.get("http://127.0.0.1:4005/api/gods/" + name);
    setGodPartners(response.data);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodParents = async (name, setParents) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:4005/api/gods/parents/" + name
    );
    setParents({
      parent1: response.data[0].parent1,
      parent2: response.data[0].parent2,
    });
  } catch (error) {
    // setError(error.message);
  }
};
