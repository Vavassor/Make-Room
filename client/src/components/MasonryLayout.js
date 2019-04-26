import React from 'react';
import PropTypes from 'prop-types';



const MasonryLayout = props => {
  const columnWrapper = {};
  const result = [];

  MasonryLayout.propTypes = {
    columns: PropTypes.number.isRequired,
    gap: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
  };
  
  MasonryLayout.defaultProps = {
    columns: 2,
    gap: 20,
  };

  let colNum = props.columns
  if (props.children.length < props.columns){
    colNum = props.children.length
  };

  for (let i = 0; i < colNum; i++) {
    columnWrapper[`column${i}`] = [];
  };

  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % colNum;
    columnWrapper[`column${columnIndex}`].push(
      <div key={props.children[i].key} style={{ marginBottom: `${props.gap}px`}}>
        {props.children[i]}
      </div>
    );
  };

  for (let i = 0; i < colNum; i++) {
    result.push(
      <div
        key={columnWrapper[`column${i}`][0].key}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1,
          width: 0,
        }}>
        {columnWrapper[`column${i}`]}
      </div>
    );
  };  

  return (
    <div className='masonry-box'>
      {result}
     </div>
   );
   

}

export default MasonryLayout