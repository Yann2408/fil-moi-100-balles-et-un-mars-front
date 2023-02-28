const endpoints = {
    tissus: {
        all: '/api/tissus',
        post: '/api/tissus',
        delete: '/api/tissus',
        get: (id: number) => `/api/tissus/${id.toString()}`,
    },
    tissuTypes: {
        all: '/api/tissu-types',
    },
    patterns: {
        all: '/api/patterns',
        post: '/api/patterns',
        delete: '/api/patterns',
        get: (id: number) => `/api/patterns/${id.toString()}`,
    },

}

export default endpoints