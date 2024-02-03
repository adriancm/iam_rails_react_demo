import { getSession } from '@auth0/nextjs-auth0';
import { DEFAULT_API_URL } from "@src/app/constants";
import {underscoreObject} from "@src/app/utils";

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

const apiClient = async ({ method, path, page = 1, query, data = {} }) => {

    const base_url = process.env.BASE_API_URL || DEFAULT_API_URL;
    const response = await getAccessToken();
    const { access_token } = await response.json();
    const { user } = await getSession();

    const getPagedPath = (fullPath) => {
        return `${fullPath}/page/${page}`
    }

    const getFullPath = () => {
        let fullPath = `${base_url}/${path}`;
        if(page)
            fullPath = getPagedPath(fullPath);
        if(query)
            fullPath = fullPath + '?' + new URLSearchParams(underscoreObject(query)).toString();

        return fullPath;
    }

    return fetch(getFullPath(), {
        method,
        headers: new Headers({
            'Authorization': `Bearer ${access_token}`,
            'Tenant-ID': user?.org_id
        }),
        ...(method.toUpperCase() === 'GET' ? {} : { body: JSON.stringify(data) })
    });
}

export default apiClient;