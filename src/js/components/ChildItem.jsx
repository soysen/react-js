import React from 'react';
import { List, ListItem, ListItemContent, ListItemAction, Icon, IconToggle } from 'react-mdl';
import Child from '../components/ChildItem.jsx';
import TitleEditor from '../components/TitleEditor.jsx';

var ChildItem = React.createClass({
  getInitialState() {
    return {
      data: this.props.data, 
      edit: false,
      is_open: false
    }
  },
  toggleEditor() {
    let edit = !this.state.edit;
    this.setState({ edit: edit});
  },
  saveName(name){
    console.log(name);
    let data = this.state.data;
    data.name = name;
    this.setState({ data: data });
    this.toggleEditor();
  },
  toggleSubTree() {
    let open = !this.state.is_open;
    this.setState({ is_open: open });
  },
  addChild() {
    let data = this.state.data;
    data.child.push({
      name: "new folder",
      child: []
    });
    this.setState({ data: data, is_open: true });
  },
  deleteFolder(item, index) {
    let data = this.state.data;
    data.child.splice(index, 1);
    this.setState({ data: data });
  },
  remove() {
    this.props.deleteFolder(this.props.data, this.props.index);
  },
  render() {

    let ChildNode = this.props.data.child.map(
      function(item, index){
        return(<Child key={index} data={item} index={index} deleteFolder={this.deleteFolder} />);
      }.bind(this)
    ); 
    let Title = <span>{this.state.data.name}</span>;
    let AddIcon = <a onClick={this.addChild}><Icon name="add" /></a>;
    let EditIcon = <a onClick={this.toggleEditor} className="mdl-color-text--grey-500"><Icon name="mode_edit" /></a>;
    let RemoveIcon = <a onClick={this.remove} className="mdl-color-text--grey-500"><Icon name="delete" /></a>;
    let Folder = <Icon name="folder_open" />;

    if( this.state.edit==true) {
      Title = <TitleEditor data={this.state.data} index={this.props.index} cancelEditor={this.toggleEditor} saveName={this.saveName} />;
      EditIcon = "";
      RemoveIcon = "";
      AddIcon = "";
    }

    if(this.state.is_open==false) {
      ChildNode = "";
      Folder = <Icon name="folder" />;
    }

    return(
      <div className="tree-item">
        <div className="tree-item-title">
          <a className="folder" onClick={this.toggleSubTree}>{Folder}</a>
          <div className="tree-item-name">
            {Title}
            {AddIcon}
            {EditIcon}
            {RemoveIcon}
          </div>
        </div>
        <div className="sub tree">
          {ChildNode}
        </div>
      </div>  
    );
  }
});

export default ChildItem;
