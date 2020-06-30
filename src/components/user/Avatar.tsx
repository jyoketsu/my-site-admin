import React from "react";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useTypedSelector } from "../../redux/reducer/RootState";

export default function Tag() {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.auth.user);
  const disp = user ? user.username.substring(0, 1) : "";

  function handleClick() {
    dispatch(logout());
  }
  return (
    <div onClick={handleClick}>
      <Avatar>{disp}</Avatar>
    </div>
  );
}
