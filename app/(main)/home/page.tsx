import { getSession } from '@/app/server/auth.action'

export default async function HomePage() {
  const session = await getSession()

  console.log(5, session)
  return <div>HomePage</div>
}
