import React, { useState, useRef, useLayoutEffect } from "react";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import UserBubble from "./UserBubble";

export default function App({ data }) {
  console.log(data)
  const getStockBubbles = () => {
    return data?.map((user, i) => {
      return <UserBubble {...user} key={i} />;
    });
  };

  const stockBubbles = getStockBubbles();
  console.log(window.innerWidth);
  const [desktopoptions, setdesktopOptions] = useState({
    size: 180,
    minSize: 50,
    gutter: 30,
    provideProps: true,
    numCols: 7,
    fringeWidth: 460,
    yRadius: 200,
    xRadius: 100,
    cornerRadius: 100,
    showGuides: false,
    compact: true,
    gravitation: 5,
  });
  const [mobileoptions, setmobileOptions] = useState({
    size: 100,
    minSize: 30,
    gutter: 60,
    provideProps: true,
    numCols: 4,
    fringeWidth: 160,
    yRadius: 200,
    xRadius: 100,
    cornerRadius: 100,
    showGuides: false,
    compact: true,
    gravitation: 5,
  });

  const scrollToRef = (ref) => {
    if (ref) {
      const y = ref.current.offsetTop - 50;
      window.scrollTo(0, y);
    } else {
      window.scrollTo(0, 0);
    }
  };

  useLayoutEffect(() => {
    const hash = window.location.hash.split("#/")[1];
    if (hash == "demo") {
      scrollToRef(demoRef);
    } else if (hash == "docs") {
      scrollToRef(docsRef);
    } else if (hash == "code") {
      scrollToRef(codeRef);
    } else if (hash == "layout") {
      scrollToRef(layoutRef);
    } else if (hash == "style") {
      scrollToRef(styleRef);
    }
  }, []);

  const demoRef = useRef(null);
  const docsRef = useRef(null);
  const codeRef = useRef(null);
  const layoutRef = useRef(null);
  const styleRef = useRef(null);

  return (
    <React.Fragment>
      {window.innerWidth > 768 ? (
        <BubbleUI className="bubbleUI" options={desktopoptions}>
          {stockBubbles}
        </BubbleUI>
      ) : (
        <BubbleUI className="bubbleUI" options={mobileoptions}>
          {stockBubbles}
        </BubbleUI>
      )}
    </React.Fragment>
  );
}
