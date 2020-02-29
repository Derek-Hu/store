import React from 'react';
import './graph.less';
import dragula from 'dragula';
import 'dragula/dist/dragula.min.css';
import {ContainerName, ContainerHints} from 'src/components/ElementContainer';
import DynamicForm from 'src/components/form/example/dynamicRule';

const TargetContainer = 'desktop-container';
export default class Graph extends React.Component {

  constructor(){
    super();
    this.state = {};
  }
  // https://github.com/bevacqua/dragula#drakeon-events
  // /Users/hubenlv/workspaces/github-sample/ant-design-landing/site/edit/template/components/EditStageController.jsx
  componentDidMount() {
    // this.side = document.querySelector(`.${ContainerName}`);
    // this.stage = document.querySelector(`.${TargetContainer}`);
    // this.t = dragula([this.side, this.stage], {
    //   copy: true,
    //   isContainer: function (el) {
    //     // console.log('isContainer', el);
    //     return el.classList.contains(ContainerName);
    //   },
    //   invalid: function (el) {
    //     return el.classList.contains(ContainerHints); // elements are always draggable by default
    //   },
    //   accepts: function (el, target, source, sibling) {
    //     // console.log('accept', el, el.classList, target, source, sibling);
    //     // const isAccept = !target.classList.contains(TargetContainer);
    //     if(!target.classList.contains(TargetContainer)){
    //       return false;
    //     }
    //     console.log('accept')
    //     return true; // elements can be dropped in any of the `containers` by default
    //   },
    // });
    // this.t.on('drop', (el, target, source, sibling) => {
    //   console.log('drop', el, target, source, sibling);
    //   this.setState({
    //     // el
    //   })

    // });
    // this.t.on('shadow', (el, container) => {
    //   console.log('shadow', el, container);
    // });
  }
  componentWillUnmount(){
    // this.t && this.t.destroy();
  }
  render() {
    return (
      <div className="desktop-container" style={{padding: '1em', height: '100%'}}>
        <DynamicForm></DynamicForm>
      </div>
    );
  }
}