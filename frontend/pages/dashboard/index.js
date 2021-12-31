import Heading from '../../components/Heading';
import Layout from '../../components/Layout';
import Container from '../../components/Container';
const axios = require('axios').default;
import parseCookies from '../../helpers/parseCookies';

export default function Dashboard({ user }) {
  return (
    <Layout>
      <Container>
        {user && (
          <div>
            <Heading text={`Hey, ${user.firstName}`} />
            {user.isAdmin && <p>You are an admin!</p>}
          </div>
        )}
      </Container>
    </Layout>
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
