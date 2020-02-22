import React from 'react';
import './graph.less';
import dragula from 'dragula';
import {ContainerName, ContainerHints} from 'src/components/ElementContainer';

export default class Graph extends React.Component {

  // https://github.com/bevacqua/dragula#drakeon-events
  // /Users/hubenlv/workspaces/github-sample/ant-design-landing/site/edit/template/components/EditStageController.jsx
  componentDidMount() {
    this.side = document.querySelector(`.${ContainerHints}`);
    this.stage = document.querySelector('.desktop-container');
    const t = dragula([this.side, this.stage], {
      copy: true,
      isContainer: function (el) {
        // console.log('isContainer', el);
        return el.classList.contains(ContainerName);
      },

      moves: function (el, source, handle, sibling) {
        // console.log(el, source, handle, sibling)
        return el.classList.contains(ContainerHints); // elements are always draggable by default
      },
    });
    t.on('drop', (el, target) => {
      console.log('drop', el, target);
    })
  }
  render() {
    return (
      <div className="desktop-container" style={{padding: '1em'}}>
      </div>
    );
  }
}