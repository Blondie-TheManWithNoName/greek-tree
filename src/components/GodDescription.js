import React from "react";
import Styles from "./GodDescription.module.css";

const GodDescription = ({ twoSelected }) => {
  return (
    <article
      className={Styles.godArticle}
      style={
        twoSelected ? { display: "none", pointerEvents: 0 } : { display: 1 }
      }
    >
      <header className={Styles.godArticleHeader}>
        <span className={Styles.nameContainer}>
          <p>Greek Name</p>
          <p>Hola</p>
        </span>
        <span className={Styles.nameContainer}>
          <p>Roman Name</p>
          <p>Hola</p>
        </span>
        <span className={Styles.nameContainer}>
          <p>Translation</p>
          <p>Hola</p>
        </span>
      </header>
      <p className={Styles.nameDescription}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
        quidem omnis laudantium odit? Porro, in placeat? Totam ducimus
        doloremque, consequuntur fugit impedit vero! Numquam dolorum, enim et,
        hic laboriosam natus aliquid nobis libero maxime exercitationem nulla
        illum ex animi sit?
      </p>
    </article>
  );
};

export default GodDescription;
