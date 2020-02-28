import React, {useEffect} from 'react';
import {Image} from 'react-native';

interface ImageThumbnailProps {
  uri: string;
}

export default function ImageThumbnail({uri}: ImageThumbnailProps) {
  console.log(uri);
  useEffect(() => {
    const getImg = async () => {
      const url = await fetch(uri);
      console.log(url);
    };
    getImg();
  }, [uri]);
  return <Image source={{uri: uri}} style={{width: 200, height: 200}} />;
}
