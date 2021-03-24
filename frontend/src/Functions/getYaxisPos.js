import { useState, useEffect } from "react";

const getPos = () =>{
  let container= document.getElementById( "YaxisContainer")
  if(container){
  let containerRect = container.getBoundingClientRect();
  let leftPos=  containerRect.leftPos
  return leftPos
  }
  }

export default function YaxisCurrentPos() {
  // save current window width in the state object
  let [width, setWidth] = useState(getPos());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getPos()), 150);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}
