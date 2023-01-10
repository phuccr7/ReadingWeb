import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import "./dialog.css";
import UserService from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import bookService from "../../service/bookService";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const agree = (type, user) => {


  switch (type) {
    case "ban":
      UserService.banAccount(user)
        .then((result) => {
          window.location.reload(false);
        })
        .catch((error) => { });

      break;
    case "ban this user":
      UserService.banAccount(user)
        .then((result) => {
          window.location.href = "https://ebooks4u.netlify.app/admin/account/all";
        })
        .catch((error) => { });

      break;
    case "unbanned":
      UserService.unbanAccount(user)
        .then((result) => {
          window.location.reload(false);
        })
        .catch((error) => { });
      break;
    case "delete":
      bookService
        .deleteBook(user)
        .then((result) => {
          window.location.reload(false);
        })
        .catch((error) => { });
      break;
    case "delete comment":

      bookService
        .deleteComment(user)
        .then((result) => {
        })
        .catch((error) => { });
      window.location.reload(false);

      break;

    default:
      break;
  }
};
export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img className="icon" src={props.icon} alt="" onClick={handleClickOpen} style={{ cursor: "pointer" }} />
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Comfirm Dialog"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure to {props.type}  ?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog">
            <Button
              onClick={() => {
                setOpen(false);
                agree(props.type, props.user);
              }}
              className="buttonAgree"
            >
              {" "}
              {props.type}
            </Button>
            <Button onClick={handleClose} className="buttonDisagree">
              {" "}
              Cancel{" "}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
