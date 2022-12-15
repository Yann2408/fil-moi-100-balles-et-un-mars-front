const endpoints = {
    tissus: {
        all: '/api/tissus',
        post: '/api/tissus',
        delete: '/api/tissus',
        get: (id: number) => `/api/tissus/${id.toString()}`,
    },
    tissuTypes: {
        all: '/api/tissu-types',
    }

}

export default endpoints