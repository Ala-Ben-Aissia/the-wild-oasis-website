export default async function Page() {
  const users = await fetch(
    'https://jsonplaceholder.typicode.com/users',
  ).then((res) => res.json())

  return (
    <>
      <h1>Cabins page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
