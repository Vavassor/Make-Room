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

  for (let i = 0; i < props.columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % props.columns;
    columnWrapper[`column${columnIndex}`].push(
      <div key={props.children[i].key} style={{ marginBottom: `${props.gap}px`}}>
        {props.children[i]}
      </div>
    );
  }

  for (let i = 0; i < props.columns; i++) {
    result.push(
      <div
        key={columnWrapper[`column${i}`][0].key}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1,
        }}>
        {columnWrapper[`column${i}`]}
        {console.log(columnWrapper[`column${i}`][0].key)}
      </div>
    );
  }  

  return (
    <div className='masonry-box'>
      {result}
     </div>
   );
   

}

export default MasonryLayout