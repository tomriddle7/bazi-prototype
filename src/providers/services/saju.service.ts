import type { AxiosInstance } from 'axios';
import ApiService, { ApiError } from './api.service';

export default class SajuService extends ApiService {
    $v1_api: AxiosInstance;
    $v2_api: AxiosInstance;

    constructor() {
        super();
        this.$v1_api = this.register(`${import.meta.env.VITE_API_URL}/api/v1/saju`);
        this.$v2_api = this.register(`${import.meta.env.VITE_API_URL}/api/v2/saju`);
    }

    async fetchRegionList() {
        const { data: { regions } } = this.unpackResponse(
            await this.$v1_api.get('regions')
        );
        return regions.map((region: { name: any; longitude: any; offsetMinutes: any; }) => {
            return {
                label: region.name,
                value: region.longitude,
                offset: region.offsetMinutes,
            };
        });
    }

    async fetchSummerTime() {
        const { data: { periods } } = this.unpackResponse(
            await this.$v1_api.get('dst-periods')
        );
        return periods;
    }

    async fetchAnalyzedSaju(params: any) {
        const { data } = this.unpackResponse(
            await this.$v1_api.post(
                'analyze',
                params
            )
        );
        return data;
    }

    async fetchYearlyLuck(params: any) {
        const { data: { yearlyLuck } } = this.unpackResponse(
            await this.$v1_api.post(
                'yearly-luck',
                params
            )
        );
        return yearlyLuck;
    }

    async fetchMonthlyLuck(params: any) {
        const { data: { monthlyLuck } } = this.unpackResponse(
            await this.$v1_api.post(
                'monthly-luck',
                params
            )
        );
        return monthlyLuck;
    }

    async fetchSolarTerms(year: number) {
        const { data: { terms } } = this.unpackResponse(
            await this.$v1_api.get(`solar-terms/${year}`)
        );
        return terms;
    }

    protected unpackResponse = (response: any): any => {
        return response.data;
    }
}
