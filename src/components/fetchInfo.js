import axios from "axios";

export const fetchGodInfo = async (name, setGodInfo) => {
  try {
    const response = await axios.get("http://127.0.0.1:4005/api/gods/" + name);
    setGodInfo(response.data);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodChildren = async (
  p1,
  p2,
  gods,
  setGods,
  setChildrenNum
) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:4005/api/gods/children/" + p1 + "&" + p2
    );
    setChildrenNum(response.data.length);
    const children = response.data.map((child) => ({
      name: child,
      state: "child",
    }));
    setGods(children);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodPartners = async (name, gods, setGods) => {
  try {
    const response = await axios.get("http://127.0.0.1:4005/api/gods/" + name);
    // setChildrenNum(response.data.length);

    const partners = response.data.partners.map((partner) => ({
      name: partner,
      state: "partner",
    }));
    // const mainGod = gods.filter((god) => god.name === name);
    // mainGod[0].state = "main";
    // console.log(main.)
    setGods([...gods, ...partners]);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodParents = async (name, parents, setGods) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:4005/api/gods/parents/" + name
    );
    if (
      !(
        parents.parent1 === response.data[0].parent1 &&
        parents.parent2 === response.data[0].parent2
      )
    ) {
      setGods({
        parent1: response.data[0].parent1,
        parent2: response.data[0].parent2,
      });
    }
  } catch (error) {
    // setError(error.message);
  }
};
