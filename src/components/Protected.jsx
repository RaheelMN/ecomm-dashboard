import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Protected = ({ Page }) => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <Page/>
    </div>
  );
};

export default Protected;
