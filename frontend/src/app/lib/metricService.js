import request from './apiClient';

const metricService =  () => {

    const path = '/metrics';

    const list = async () => request({ method: 'get', path: path});

    const show = async (id) => request({ method: 'get', path: `${path}/${id}`});

    const create = async (metricData) => request({ method: 'post', path: path, data: metricData});

    const update = async (metricData) => request({ method: 'patch', path: `${path}/${id}`, data: metricData});

    const destroy = async (id) => request({ method: 'delete', path: `${path}/${id}`});

    return { list, show, create, update, destroy }
}

export default metricService;