// app/page.js
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation'

const Index = () => {
    return redirect('/metrics');
}

export default  withPageAuthRequired(Index, { returnTo: '/metrics' })
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL

