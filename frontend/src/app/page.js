// app/page.js
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation'

export default withPageAuthRequired(
    async function Index() {
      return redirect('/home');
    },
    { returnTo: '/home' }
)
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL

