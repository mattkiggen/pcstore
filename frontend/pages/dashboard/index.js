import Navbar from '../../components/Navbar';
const axios = require('axios').default;
import parseCookies from '../../helpers/parseCookies';

export default function Dashboard({ user }) {
  return (
    <>
      <Navbar />
      {user && (
        <div>
          <h1>Hey, {user.firstName}</h1>
          {user.isAdmin && <p>You are an admin!</p>}
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  if (!cookie['x-auth-token'])
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };

  const headers = {
    'x-auth-token': cookie['x-auth-token'],
  };
  const res = await axios.get(`${process.env.API_URL}/api/users`, {
    headers,
  });

  console.log(res.data);

  return {
    props: { user: res.data },
  };
}
