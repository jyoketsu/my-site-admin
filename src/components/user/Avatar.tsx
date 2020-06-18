import React from "react";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

export default function Tag() {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(logout());
  }
  return (
    <div onClick={handleClick}>
      <Avatar>U</Avatar>
    </div>
  );
}
