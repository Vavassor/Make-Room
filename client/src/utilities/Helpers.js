import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";



export default {

  addLineBreaks: function(text){
    return text.split ('\n').map ((item, i) => < Fragment key={i}>{item} <br /></ Fragment>)
  },

  mediaLinks: function (link){
    let x = Object.entries(link);
    return x.map(item => <Col key={item[1]} sm={2}><a href={item[1]} target="_blank" rel="noopener noreferrer">{item[0]}</a></Col>)
  },

  sortByDate: function (items) {
    return items.sort((a, b) => new Date(b.order) - new Date(a.order))
  },

  renderName (at){
    let name;
    (at.firstname || at.lastname)? name=`${at.firstname || ""} ${at.lastname || ""}`: name="Anon"
    return name
  },

}