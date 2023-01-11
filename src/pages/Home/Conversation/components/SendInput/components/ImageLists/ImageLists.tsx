import React from "react";

interface ImageListsProps {
  images: string[];
}

function ImageLists({ images }: ImageListsProps) {
  return (
    <div className="flex flex-wrap py-2">
      {images.map((image) => (
        <img
          key={image}
          src={image}
          alt=""
          className="w-12 h-12 object-contain rounded-md"
        />
      ))}
    </div>
  );
}

export default ImageLists;
