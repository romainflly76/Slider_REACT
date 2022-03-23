import React, { useState } from "react";
// nous avons besoin de useState from React
import "./Slider.css";

import BtnSlider from "./BtnSlider";

// import les donnes du slider (du tableau qui va nous permettre d'iterer à l'interieur)
// detaSlider.js
import dataSlider from "./dataSlider";

export default function Slider() {
  const [slideAnim, setSlideAnim] = useState({
    index: 1,
    // Previens la fin de l'animation avant d'afficher l'autre image
    // On passe d'entrée inProgress à False
    inProgress: false,
  });

  const nextSlide = () => {
    // SlideAnim.inprogress est different donc de False
    if (slideAnim.index !== dataSlider.length && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index + 1, inProgress: true });

      // Alors on rentre dans une condition timeOut
      setTimeout(() => {
        // le setAnim lorsque l'index +1 alors inprogress passe à false pendant 400 millieme
        // C'est à dire, 0.4 sec comme dan sl'animation
        setSlideAnim({ index: slideAnim.index + 1, inProgress: false });
      }, 400);
    } else if (slideAnim.index === dataSlider.length && !slideAnim.inProgress) {
      setSlideAnim({ index: 1, inProgress: true });

      setTimeout(() => {
        setSlideAnim({ index: 1, inProgress: false });
      }, 400);
    }
  };

  const prevSlide = () => {
    if (slideAnim.index !== 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index - 1, inProgress: true });

      setTimeout(() => {
        setSlideAnim({ index: slideAnim.index - 1, inProgress: false });
      }, 400);
    } else if (slideAnim.index === 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: 5, inProgress: true });

      setTimeout(() => {
        setSlideAnim({ index: 5, inProgress: false });
      }, 400);
    }
  };

  const moveDot = (index) => {
    setSlideAnim({ index: index, inProgress: false });
  };
  return (
    // Methode MAP pour les images du tableau Objet, index
    <div className="container-slider">
      {/* // container slider pour contenir la div dans un slider */}
      {dataSlider.map((obj, index) => {
        // qui retourne une div avec une clé unique pour chaque element 'Key' l'id de l'objet
        return (
          <div
            Key={obj.id}
            //On change la classe à chaue fois, on n emontre qu'une photo
            className={
              // Rendu conditionelle directement dans le classname
              // Si l'index qui commence par 1 est égale === à l'index +1 (donc 0+1)
              // Alors le classname  est "slide active-anim" sinon il est "slide"
              // "Active-anim" dans le css = opacity à 1 pour voir l'image alors que "slide" opacity à 0
              slideAnim.index === index + 1 ? "slide active-anim" : "slide"
            }
          >
            {/* //src dossier Imgs on passe l'expression "template literal" */}
            <img src={`/Imgs/img${index + 1}.jpg`} alt="" />
          </div>
        );
      })}
      {/* On passe la props MoveSlide et nextSlide et la driection sous forme de chaine de caractere */}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <div
              className={slideAnim.index === index + 1 ? "dot active" : "dot"}
              // ONCLICK pour cliquer sur l'image
              // On passe une fonction anonyme et on appelle modeDot et on passe à chaque fois
              // Index+1;; Ensuite on créer moveDot
              onClick={() => moveDot(index + 1)}
            ></div>
          );
        })}
      </div>

      {/* <div className="container-dots">
        <div className={slideAnim.index === 1 ? "dot active" : "dot"}></div>
        <div className={slideAnim.index === 2 ? "dot active" : "dot"}></div>
        <div className={slideAnim.index === 3 ? "dot active" : "dot"}></div>
        <div className={slideAnim.index === 4 ? "dot active" : "dot"}></div>
        <div className={slideAnim.index === 5 ? "dot active" : "dot"}></div>
      </div> */}
    </div>
  );
}
