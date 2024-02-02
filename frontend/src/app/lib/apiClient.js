import { getSession } from '@auth0/nextjs-auth0';

export const getAccessToken = async () => {
    return fetch(process.env.AUTH0_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json'}),
        body: JSON.stringify({
            client_id: process.env.AUTH0_API_CLIENT_ID,
            client_secret: process.env.AUTH0_API_CLIENT_SECRET,
            audience: process.env.AUTH0_AUDIENCE,
            grant_type: 'client_credentials'
        })
    })
}

const apiClient = async ({ method, path, data = {} }) => {

    const base_url = process.env.BASE_API_URL || 'http://localhost:3000/api/v1';
    const response = await getAccessToken();
    const { access_token } = await response.json();
    const { user } = await getSession();


    return fetch(`${base_url}${path}`, {
        method,
        headers: new Headers({
            'Authorization': `Bearer ${access_token}`,
            'Tenant-ID': user?.org_id
        }),
        ...(method.toUpperCase() === 'GET' ? {} : { body: JSON.stringify(data) })
    });
}

export default apiClient;