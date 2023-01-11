import React from "react";

interface ProgressiveImageProps {
  placeholderSrc: string;
  src: string;
  [x: string]: any;
}

function ProgressiveImage({
  placeholderSrc,
  src,
  ...props
}: ProgressiveImageProps) {
  return (
    <img
      {...{ src: placeholderSrc, ...props }}
      alt={props.alt || ""}
      className="image"
    />
  );
}

export default ProgressiveImage;
