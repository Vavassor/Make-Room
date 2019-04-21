import React from "react";

import Col from "react-bootstrap/Col";



export default {

  addLineBreaks: function(text){
    return text.split ('\n').map ((item, i) => <p key={i}>{item}</p>)
  },

  addLineBreaksTest: function(text, typ){
    return text.split ('\n').map ((item, i) => <h1 key={i}>{item}</h1>)
  },
  
  mediaLinks: function (link){
    let x = Object.entries(link);
    return x.map(item => <Col key={item[1]} sm={2}><a href={item[1]} target="_blank" rel="noopener noreferrer">{item[0]}</a></Col>)
  },

  sortByDate: function (items) {
    return items.sort((a, b) => new Date(b.order) - new Date(a.order))
  }


}