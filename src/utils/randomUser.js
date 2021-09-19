export default async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const [userData] = data.results;

  return {
    username: userData.login.username,
    email: userData.email,
    name: userData.name.first,
    lastName: userData.name.last,
    birth: new Date(userData.dob.date),
    image: userData.picture.large
  };
}
