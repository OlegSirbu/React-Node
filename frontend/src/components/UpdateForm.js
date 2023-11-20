import { useState, useRef, useEffect } from "react";
import UserService from "../services/user.service";

const UpdateForm = ({ open, setOpen, file, fetchFiles }) => {
  const btnRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alertState, setAlertState] = useState({
    show: false,
    color: "green",
    msg: "",
  });

  useEffect(() => {
    setName(file?.name || "");
    setDescription(file?.description || "");
  }, [file]);
  const handleUpdate = () => {
    if (!name || !description) {
      setAlertState({
        show: true,
        color: "red",
        msg: "Please, enter valid name and description",
      });
      return;
    }

    UserService.updateFile({ ...file, name, description })
      .then((res) => {
        fetchFiles();
        setAlertState({
          show: true,
          color: "green",
          msg: "File updated successfully",
        });
        setTimeout(() => {
          setOpen(false);
          setAlertState({
            ...alertState,
            show: false,
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response);
        setAlertState({
          show: true,
          color: "red",
          msg: "Failed to update the file",
        });
      });
  };
};

export default UpdateForm;
