function calPosPartner(index) {
  const radius = 45; // Radius of the semicircle
  const centerX = 50; // X-coordinate of the center of the semicircle
  const centerY = 50;
  const ratio = 1; // Adjust as needed
  if (index % 2 === 0) {
    const angleIncrement = Math.PI / 20; // Increment angle for each element
    const angle = angleIncrement * index;
    const x = centerX - radius * Math.cos(angle);
    const y = centerY - radius * Math.sin(angle) * ratio;
    return { x, y, angle };
  } else {
    const angleIncrement = -Math.PI / 20; // Decrement angle for each element (counterclockwise)
    const angle = angleIncrement * (index - 1);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle) * ratio;
    return { x, y, angle };
  }
}

export const styleBtn = {
  godMain: {
    left: "calc(50% - 3.5rem)",
    top: "calc(50% - 1rem)",
    zIndex: "1",
  },
  godParent: (index) => ({
    left:
      index === 0
        ? "calc(50% - 3.5rem - 4.5rem)"
        : "calc(50% - 3.5rem + 4.5rem)",
    top: "calc(50% - 1rem)",
    zIndex: "1",
  }),
  godParent1: {
    left: "calc(50% - 3.5rem - 4.5rem)",
    top: "calc(50% - 1rem)",
    zIndex: "1",
  },
  godParent2: {
    left: "calc(50% - 3.5rem + 4.5rem)",
    top: "calc(50% - 1rem)",
    zIndex: "1",
  },
  godPartner: (index) => {
    const { x, y, angle } = calPosPartner(index);
    return {
      left: `calc(${x}% - 3.5rem)`,
      top: `calc(${y}% - 1rem)`,
      rotate: `${angle}rad`,
    };
  },
  godChild: (index, total, shift) => {
    // const { x, y } = calPosChild(index);
    return {
      left: `calc(${50}% + ${index * 9}rem - ${
        (total * 7 + (total - 1) * 2) / 2 + shift
      }rem)`,
      top: `calc(50% - 1rem)`,
      zIndex: "1",
    };
  },

  partnerOut: {
    opacity: 0,
  },
};
