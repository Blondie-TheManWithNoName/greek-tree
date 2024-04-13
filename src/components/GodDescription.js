import React from "react";
import Styles from "./GodDescription.module.css";

const GodDescription = ({ godInfo }) => {
  console.log("AAAA", godInfo);
  return (
    <article className={Styles.godArticle}>
      <header className={Styles.godArticleHeader}>
        <span className={Styles.nameContainer}>
          <p>Greek Name</p>
          <p>{godInfo?.greek_name}</p>
        </span>
        <span className={Styles.nameContainer}>
          <p>Roman Name</p>
          <p>{godInfo?.roman_name}</p>
        </span>
        <span className={Styles.nameContainer}>
          <p>Translation</p>
          <p>{godInfo?.translation_name}</p>
        </span>
      </header>
      <p className={Styles.nameDescription}>
        {godInfo?.description ? (
          godInfo?.description
        ) : (
          <>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
            quidem omnis laudantium odit? Porro, in placeat? Totam ducimus
            doloremque, consequuntur fugit impedit vero! Numquam dolorum, enim
            et, hic laboriosam natus aliquid nobis libero maxime exercitationem
            nulla illum ex animi sit?
          </>
        )}
      </p>
    </article>
  );
};

export default GodDescription;
