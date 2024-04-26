function calPosPartner(index, sign) {
  const radius = 45; // Radius of the semicircle
  const centerX = 50; // X-coordinate of the center of the semicircle
  const centerY = 50;
  if ((index % 2 === 0 && !sign) || (index % 2 !== 0 && sign)) {
    const angleIncrement = Math.PI / 16; // Increment angle for each element
    const angle = angleIncrement * (index - 1 * sign);
    const x = centerX - radius * Math.cos(angle);
    const y = centerY - radius * Math.sin(angle);
    return { x, y, angle };
  } else {
    const angleIncrement = -Math.PI / 16; // Decrement angle for each element (counterclockwise)
    const angle = angleIncrement * (index - 1 * !sign);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
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
  godPartner: (index, sign, active) => {
    const { x, y, angle } = calPosPartner(index, sign);

    return {
      left: `calc(${x}% - 3.5rem)`,
      top: `calc(${y}% - 1rem)`,
      rotate: `${angle}rad`,
      zIndex: "2",
      opacity: active ? 1 : 0,
      pointerEvents: active ? "auto" : "none",
      // transition: "left 0s, opacity 500ms",
    };
  },
  godChild: (index, total, shift, active) => {
    return {
      left: `calc(${50}% + ${index * 9}rem - ${
        (total * 7 + (total - 1) * 2) / 2 + shift
      }rem)`,
      top: `calc(50% - 1rem)`,
      zIndex: "1",
      opacity: active ? 1 : 0,
      pointerEvents: active ? "auto" : "none",
      // transition: "left 0s, opacity 0ms",
    };
  },
};
