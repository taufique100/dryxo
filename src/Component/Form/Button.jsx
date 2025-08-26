import React from "react";
import { Button } from "react-bootstrap";

const Button = ({ text, onClick }) => {
  return (
    <Button onClick={onClick} className="">
      {text}
    </Button>
  );
};

export default Button;
