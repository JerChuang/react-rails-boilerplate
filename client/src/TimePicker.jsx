import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactDom from 'react-dom';
import { Select } from 'antd';

const { Option } = Select;

class TimePicker extends React.Component {


  handleChange = value => {
    console.log(`selected ${value}`);
  }

  render() {
    return(
    <Select defaultValue="choose a time" style={{ width: 200 }} onChange={this.handleChange}>
        <Option value="1">1 hour</Option>
        <Option value="2">2 hours</Option>
        <Option value="3">3 hours</Option>
        <Option value="4">4 hours</Option>
        <Option value="5">5 hours</Option>
        <Option value="6">6 hours</Option>
        <Option value="7">7 hours</Option>
        <Option value="8">8 hours</Option>
    </Select>
  );
  }
}

export default TimePicker;