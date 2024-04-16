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
    setGods([...gods, ...children]);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodChildrenAndPartners = async (
  p1,
  p2,
  gods,
  setGods,
  setChildrenNum,
  selected,
  setShiftPercentage,
  setMirrorPartners,
  unselected
) => {
  try {
    const responseChild = await axios.get(
      "http://127.0.0.1:4005/api/gods/children/" + p1 + "&" + p2
    );
    setChildrenNum(responseChild.data.length);
    const responsePart = await axios.get(
      "http://127.0.0.1:4005/api/gods/" + selected
    );
    // setChildrenNum(response.data.length);

    const partners = responsePart.data.partners
      .map((partner, index) => {
        if (gods[unselected].name === partner) {
          if (unselected === 0) {
            index % 2 === 0
              ? setMirrorPartners(false)
              : setMirrorPartners(true);
          } else {
            index % 2 === 0
              ? setMirrorPartners(true)
              : setMirrorPartners(false);
          }
          // gods[unselected].state = "partner2";
          return {
            name: partner,
            state: "partner",
          };
        } else {
          return {
            name: partner,
            state: "partner",
          };
        }
      })
      .filter((partner) => partner !== null);

    const children = responseChild.data
      .map((child, index) => {
        if (selected !== null && selected === child) {
          setShiftPercentage(
            3.5 +
              index * 9 -
              (responseChild.data.length * 7 +
                (responseChild.data.length - 1) * 2) /
                2
          );
          return {
            name: child,
            state: "main",
          };
        }
        return {
          name: child,
          state: "child",
        };
      })
      .filter((child) => child !== null);

    setGods([...children, ...partners]);
  } catch (error) {
    // setError(error.message);
  }
};

export const fetchGodPartners = async (name, index, gods, setGods) => {
  try {
    const response = await axios.get("http://127.0.0.1:4005/api/gods/" + name);
    // setChildrenNum(response.data.length);

    const partners = response.data.partners.map((partner) => ({
      name: partner,
      state: "partner",
    }));
    // const mainGod = gods.filter((god) => god.name === name);
    const updatedGods = [...gods]; // Create a copy of gods array
    updatedGods[index] = { ...updatedGods[index], state: "main_in" }; // Update the specific element
    setGods(updatedGods);
    // mainGod[0].state = "main";
    // console.log(main.)
    setGods([...updatedGods, ...partners]);
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
