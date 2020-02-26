import React from 'react';

class Layout extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <div>Hello</div>
    );
  }
}

export default Layout;