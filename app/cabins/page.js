// import {Suspense} from 'react'
import Counter from '../components/counter'

export default async function Page() {
  const users = await fetch(
    'https://jsonplaceholder.typicode.com/users',
  ).then((res) => res.json())

  return (
    <>
      <h1>Cabins page</h1>
      {/* <Suspense fallback='LOADING DATA using suspense...'> */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {/* </Suspense> */}
      <Counter users={users} />
    </>
  )
}
