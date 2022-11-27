import React from "react";
import { Route, Routes } from "react-router-dom";
import { CreateItemContainer } from "./CreateItemContainer";
import { ItemContainer } from "./ItemContainer";
import { ListContainer } from "./ListContainer";
import { ProfileContainer } from "./ProfileContainer";
import { SigninContainer } from "./SigninContainer";

export const MainContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<ListContainer />} />
      <Route path="/:id" element={<ItemContainer />} />
      <Route path="/create" element={<CreateItemContainer />} />
      <Route path="/profile/:id" element={<ProfileContainer />} />
      <Route path="/signin" element={<SigninContainer />} />
    </Routes>
  );
};
