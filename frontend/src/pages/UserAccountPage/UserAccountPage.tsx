import useUser from "../../hooks/useUser";
import { PageWrapper } from "../../global.styled";

const UserAccountsPage: React.FC = () => {
  const { profile } = useUser();

  return (
    <PageWrapper>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />

          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </PageWrapper>
  );
};

export default UserAccountsPage;
