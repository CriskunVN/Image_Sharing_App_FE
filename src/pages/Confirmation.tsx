// frontend/src/pages/Confirmation.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

import AuthService from "../service/auth.service";

type AlertState = {
  show: boolean;
  color: "green" | "red";
  msg: string;
};
type ConfirmationToken = {
  confirmationToken: string;
};

const Confirmation = () => {
  const { confirmationToken } = useParams<ConfirmationToken>();
  const [processing, setProcessing] = useState(true);
  const [alertState, setAlertState] = useState<AlertState>({
    show: false,
    color: "green",
    msg: "",
  });

  useEffect(() => {
    AuthService.verify(confirmationToken as string)
      .then((res) => {
        setAlertState({
          show: true,
          color: "green",
          msg: res.data.message,
        });
        setProcessing(false);
      })
      .catch((err) => {
        setAlertState({
          show: true,
          color: "red",
          msg: "Failed to verify your email",
        });
        setProcessing(false);

        console.error(err);
      });
  }, []);
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          {processing ? <Loader /> : null}
          {alertState.show ? (
            <Alert
              color={alertState.color}
              msg={alertState.msg}
              show={alertState.show}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Confirmation;
