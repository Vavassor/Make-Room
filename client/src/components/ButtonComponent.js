import React from "react";

import Button from "react-bootstrap/Button";

export function PortfolioInfoButton (props){
  return (
    <>
    <Button>Update</Button>
    </>
  )
};

export function ItemUpdateButton (props){
  return(
    <>
       <Button>Update Item</Button>
    </>
  )
};

export function ItemButton(props){

  return(
    <>
       <Button className="mx-1" variant={props.variant} onClick={props.action} size={props.size}>{props.children}</Button>
    </>
  )
};