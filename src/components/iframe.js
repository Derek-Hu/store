import React from 'react';

const host = window.location.origin;
const url = `${host}/preview.html?t=${new Date().getTime()}`

const Preview = () => {
  return (
    <iframe src={url} title="preview" style={{width: '100%', height: '100%', background: '#fff'}}/>
  );
}

export default Preview;