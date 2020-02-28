import React from 'react';
import {Image} from 'store/reducers/caches';
import ImageThumbnail from './ImageThumbnail';
import uuid from 'uuid';

interface IImagesContainer {
  images: Image[];
}

export default function ImagesContainer({images}: IImagesContainer) {
  return (
    <React.Fragment>
      {images.map(item => {
        return <ImageThumbnail key={uuid.v4()} uri={item.thumb_url} />;
      })}
    </React.Fragment>
  );
}
