import axios, { type AxiosInstance } from 'axios';

export default abstract class ApiService {
    authInfo: any;

    protected constructor() { }

    protected abstract unpackResponse(response: any): any;

    protected register(baseURL: string): AxiosInstance {
        const client = axios.create({ baseURL });
        client.interceptors.response.use(
            (res: any) => res,
            async (err: any) => {
                if (err.response === undefined) {
                    throw Error(err);
                }
                const {
                    config,
                    response: { status },
                } = err;
                switch (err.response && status) {
                    case 400:
                    case 401:
                        location.href = '/+not-found';
                        break;
                    case 403:
                        break;
                    case 404:
                        break;
                    case 409:
                        break;
                    case 503:
                        break;
                    default:
                        throw Error('API Error');
                }
                throw ApiError.buildError(err.response);
            }
        );
        return client;
    }

    private async getAuthTokens() {
        const { refreshToken, accessToken } = this.authInfo;
        try {
            // const { data } = await axios.post(
            //     `${import.meta.env.VITE_API_GW}/auth/v1/portal/token/refresh`,
            //     {
            //         refreshToken: refreshToken.value,
            //     },
            //     { headers: { Authorization: `Bearer ${accessToken.value}` } }
            // );
            // return data.payload;
        } catch (e) {
            // const { useAuthStore } = await import('common-setups-provider');
            // const authStore = useAuthStore();
            // authStore.unsetAuth();
            // throw ApiError.buildError(e.response);
        }
    }

    protected setHeader(client: AxiosInstance, auth: any): AxiosInstance {
        this.authInfo = auth;
        client.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${auth.accessToken.value}`;
        return client;
    }

    /**
     * Axios 객체를 복사해서 별도의 Header 를 설정하는 것이 불가함으로, 별도의 unset 함수 필요
     * @param client
     * @protected
     */
    protected unsetHeader(client: AxiosInstance): AxiosInstance {
        delete client.defaults.headers.common['Authorization'];
        return client;
    }
}

export class ApiError extends Error {
    private code: number;
    private body = undefined;

    private constructor(message: string, code: number, body?: any) {
        super(message);
        this.name = 'API CALL EXCEPTION';
        this.code = code;
        this.body = body;
    }

    static buildError(response: any) {
        const { data, status } = response;
        if (data && data.error) {
            const { message, code } = data.error;
            return new ApiError(message, code, data.error);
        } else {
            return new ApiError('SERVER RESPONSE CODE', status);
        }
    }
}
