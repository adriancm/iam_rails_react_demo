import request from './apiClient';
const base_path = 'metrics';

const metricService = {
    list: async ({ page }) =>
        request({ method: 'get', path: base_path, page}),
    average: async ({ page = 1, query }) =>
        request({ method: 'get', path: `${base_path}/average`, query, page }),
    show: async (id) =>
        request({ method: 'get', path: `${base_path}/${id}`}),
    create: async (metricData) =>
        request({ method: 'post', path: base_path, data: metricData}),
    update: async (id, metricData) =>
        request({ method: 'patch', path: `${base_path}/${id}`, data: metricData}),
    destroy: async (id) =>
        request({ method: 'delete', path: `${base_path}/${id}`}),
}

export default metricService;