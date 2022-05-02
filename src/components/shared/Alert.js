import React from "react";
import { FiX } from "react-icons/fi";
const Alert = ({ msg, closeIcon, ...rest }) => {
  const [show, setShow] = React.useState(true);
  if (show)
      return <div
        {...rest}
      >
        <p className="flex justify-between items-center">
          {msg}
          <span className="cursor-pointer" onClick={() => setShow(false)}>
            <FiX />
          </span>
        </p>
      </div>
  return null;
};

export default Alert;
