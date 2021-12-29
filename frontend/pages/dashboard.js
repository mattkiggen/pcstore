import Navbar from '../components/Navbar';

export default function Dashboard({ user }) {
  return (
    <>
      <Navbar />
      <h1>Hey, {user && user.firstName}</h1>
    </>
  );
}
