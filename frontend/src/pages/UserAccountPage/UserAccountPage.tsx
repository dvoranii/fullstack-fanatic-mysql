import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { useUser } from "../../context/UserContext";
import { PageWrapper } from "../../global.styled";

const UserAccountsPage: React.FC = () => {
  const { profile, setProfile } = useUser();
  const navigate = useNavigate();

  const logOut = () => {
    googleLogout();
    setProfile(null);
    navigate("/");
  };

  console.log("Rendering profile:", profile);

  return (
    <PageWrapper>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />

          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </PageWrapper>
  );
};

export default UserAccountsPage;
