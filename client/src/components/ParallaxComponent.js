import React from "react";
import { Parallax } from "react-parallax";

const styles = {
  textAlign: "center"
};


const imageList = [
  "/images/background-1.jpg",
  "/images/background-2.jpg",
  "/images/background-3.jpg",
  "/images/background-4.jpg",
  "/images/background-5.jpg",
  "/images/background-6.jpg",
  "/images/background-7.jpg",
  "/images/background-8.jpg",
  "/images/background-9.jpg",
]

function randomImage() {
  let i = imageList.length;
  let rand = Math.floor(Math.random() * i);
  return imageList[rand];
}


export default function Plax(props) {

  Plax.defaultProps = {
    height: "130vh"
  };


  const insideStyles = {
    background: "white",
    opacity: 0.95,
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "0.5rem"
  };

  if (props.width){insideStyles.width = props.width}


  return(
  <div style={styles}>
    {/* <Parallax bgImage={randomImage()} strength={500}> */}
    <Parallax bgImage={props.image || randomImage()} strength={500}>
      <div style={{ height: `${props.height}` }}>
        <div className='plax-content' style={insideStyles}>{props.children}</div>
      </div>
    </Parallax>
  </div>
  )
};

