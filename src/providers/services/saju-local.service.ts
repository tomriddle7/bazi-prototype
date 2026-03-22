import type { AxiosInstance } from 'axios';
import ApiService from './api.service';

export default class SajuLocalService extends ApiService {
    $api: AxiosInstance;

    constructor() {
        super();
        this.$api = this.register(`${import.meta.env.VITE_API_URL}/api/v1/saju`);
    }

    async fetchRegionList() {
        const regions = [
            {
                "name": "광주",
                "longitude": 126.851338,
                "offsetMinutes": -33
            },
            {
                "name": "대구",
                "longitude": 128.601734,
                "offsetMinutes": -26
            },
            {
                "name": "대전",
                "longitude": 127.383316,
                "offsetMinutes": -30
            },
            {
                "name": "부산",
                "longitude": 129.075577,
                "offsetMinutes": -24
            },
            {
                "name": "서울",
                "longitude": 126.977902,
                "offsetMinutes": -32
            },
            {
                "name": "세종",
                "longitude": 127.290757,
                "offsetMinutes": -31
            },
            {
                "name": "울산",
                "longitude": 129.311327,
                "offsetMinutes": -23
            },
            {
                "name": "인천",
                "longitude": 126.705401,
                "offsetMinutes": -33
            },
            {
                "name": "광명",
                "longitude": 126.864602,
                "offsetMinutes": -33
            },
            {
                "name": "군포",
                "longitude": 126.933051,
                "offsetMinutes": -32
            },
            {
                "name": "김포",
                "longitude": 126.715633,
                "offsetMinutes": -33
            },
            {
                "name": "부천",
                "longitude": 126.765908,
                "offsetMinutes": -33
            },
            {
                "name": "성남",
                "longitude": 127.126627,
                "offsetMinutes": -31
            },
            {
                "name": "수원",
                "longitude": 127.028574,
                "offsetMinutes": -32
            },
            {
                "name": "시흥",
                "longitude": 126.802881,
                "offsetMinutes": -33
            },
            {
                "name": "안산",
                "longitude": 126.828954,
                "offsetMinutes": -33
            },
            {
                "name": "안성",
                "longitude": 127.279763,
                "offsetMinutes": -31
            },
            {
                "name": "안양",
                "longitude": 126.958697,
                "offsetMinutes": -32
            },
            {
                "name": "양평",
                "longitude": 127.487557,
                "offsetMinutes": -30
            },
            {
                "name": "여주",
                "longitude": 127.637329,
                "offsetMinutes": -29
            },
            {
                "name": "오산",
                "longitude": 127.077376,
                "offsetMinutes": -32
            },
            {
                "name": "용인",
                "longitude": 127.177933,
                "offsetMinutes": -31
            },
            {
                "name": "의왕",
                "longitude": 126.968299,
                "offsetMinutes": -32
            },
            {
                "name": "이천",
                "longitude": 127.435002,
                "offsetMinutes": -30
            },
            {
                "name": "평택",
                "longitude": 127.095997,
                "offsetMinutes": -32
            },
            {
                "name": "하남",
                "longitude": 127.214926,
                "offsetMinutes": -31
            },
            {
                "name": "화성",
                "longitude": 126.828594,
                "offsetMinutes": -33
            },
            {
                "name": "고양",
                "longitude": 126.833811,
                "offsetMinutes": -33
            },
            {
                "name": "구리",
                "longitude": 127.129522,
                "offsetMinutes": -31
            },
            {
                "name": "남양주",
                "longitude": 127.216442,
                "offsetMinutes": -31
            },
            {
                "name": "동두천",
                "longitude": 127.060407,
                "offsetMinutes": -32
            },
            {
                "name": "양주",
                "longitude": 127.045545,
                "offsetMinutes": -32
            },
            {
                "name": "연천",
                "longitude": 127.075183,
                "offsetMinutes": -32
            },
            {
                "name": "의정부",
                "longitude": 127.033679,
                "offsetMinutes": -32
            },
            {
                "name": "파주",
                "longitude": 126.778317,
                "offsetMinutes": -33
            },
            {
                "name": "포천",
                "longitude": 127.200344,
                "offsetMinutes": -31
            },
            {
                "name": "과천",
                "longitude": 126.987608,
                "offsetMinutes": -32
            },
            {
                "name": "가평",
                "longitude": 127.509587,
                "offsetMinutes": -30
            },
            {
                "name": "광주(경기)",
                "longitude": 127.255071,
                "offsetMinutes": -31
            },
            {
                "name": "강릉",
                "longitude": 128.875862,
                "offsetMinutes": -24
            },
            {
                "name": "고성(강원)",
                "longitude": 128.467817,
                "offsetMinutes": -26
            },
            {
                "name": "동해",
                "longitude": 129.114259,
                "offsetMinutes": -24
            },
            {
                "name": "삼척",
                "longitude": 129.164749,
                "offsetMinutes": -23
            },
            {
                "name": "속초",
                "longitude": 128.591862,
                "offsetMinutes": -26
            },
            {
                "name": "양구",
                "longitude": 127.989824,
                "offsetMinutes": -28
            },
            {
                "name": "양양",
                "longitude": 128.619038,
                "offsetMinutes": -26
            },
            {
                "name": "영월",
                "longitude": 128.461848,
                "offsetMinutes": -26
            },
            {
                "name": "원주",
                "longitude": 127.919641,
                "offsetMinutes": -28
            },
            {
                "name": "인제",
                "longitude": 128.170699,
                "offsetMinutes": -27
            },
            {
                "name": "정선",
                "longitude": 128.660749,
                "offsetMinutes": -25
            },
            {
                "name": "철원",
                "longitude": 127.313317,
                "offsetMinutes": -31
            },
            {
                "name": "춘천",
                "longitude": 127.732695,
                "offsetMinutes": -29
            },
            {
                "name": "태백",
                "longitude": 128.985544,
                "offsetMinutes": -24
            },
            {
                "name": "평창",
                "longitude": 128.390016,
                "offsetMinutes": -26
            },
            {
                "name": "홍천",
                "longitude": 127.888843,
                "offsetMinutes": -28
            },
            {
                "name": "화천",
                "longitude": 127.708187,
                "offsetMinutes": -29
            },
            {
                "name": "횡성",
                "longitude": 127.984965,
                "offsetMinutes": -28
            },
            {
                "name": "단양",
                "longitude": 128.365431,
                "offsetMinutes": -27
            },
            {
                "name": "보은",
                "longitude": 127.729418,
                "offsetMinutes": -29
            },
            {
                "name": "영동",
                "longitude": 127.783388,
                "offsetMinutes": -29
            },
            {
                "name": "옥천",
                "longitude": 127.571342,
                "offsetMinutes": -30
            },
            {
                "name": "음성",
                "longitude": 127.690523,
                "offsetMinutes": -29
            },
            {
                "name": "제천",
                "longitude": 128.190894,
                "offsetMinutes": -27
            },
            {
                "name": "증평",
                "longitude": 127.581489,
                "offsetMinutes": -30
            },
            {
                "name": "진천",
                "longitude": 127.435618,
                "offsetMinutes": -30
            },
            {
                "name": "청주",
                "longitude": 127.488753,
                "offsetMinutes": -30
            },
            {
                "name": "충주",
                "longitude": 127.925918,
                "offsetMinutes": -28
            },
            {
                "name": "공주",
                "longitude": 127.118999,
                "offsetMinutes": -32
            },
            {
                "name": "금산",
                "longitude": 127.48811,
                "offsetMinutes": -30
            },
            {
                "name": "논산",
                "longitude": 127.09866,
                "offsetMinutes": -32
            },
            {
                "name": "당진",
                "longitude": 126.64444,
                "offsetMinutes": -33
            },
            {
                "name": "보령",
                "longitude": 126.612737,
                "offsetMinutes": -34
            },
            {
                "name": "부여",
                "longitude": 126.909789,
                "offsetMinutes": -32
            },
            {
                "name": "서산",
                "longitude": 126.450288,
                "offsetMinutes": -34
            },
            {
                "name": "서천",
                "longitude": 126.691343,
                "offsetMinutes": -33
            },
            {
                "name": "아산",
                "longitude": 127.002034,
                "offsetMinutes": -32
            },
            {
                "name": "예산",
                "longitude": 126.848697,
                "offsetMinutes": -33
            },
            {
                "name": "천안",
                "longitude": 127.113745,
                "offsetMinutes": -32
            },
            {
                "name": "청양",
                "longitude": 126.802238,
                "offsetMinutes": -33
            },
            {
                "name": "태안",
                "longitude": 126.298004,
                "offsetMinutes": -35
            },
            {
                "name": "홍성",
                "longitude": 126.660729,
                "offsetMinutes": -33
            },
            {
                "name": "군산",
                "longitude": 126.736756,
                "offsetMinutes": -33
            },
            {
                "name": "김제",
                "longitude": 126.880387,
                "offsetMinutes": -32
            },
            {
                "name": "남원",
                "longitude": 127.390381,
                "offsetMinutes": -30
            },
            {
                "name": "무주",
                "longitude": 127.660829,
                "offsetMinutes": -29
            },
            {
                "name": "부안",
                "longitude": 126.733444,
                "offsetMinutes": -33
            },
            {
                "name": "순창",
                "longitude": 127.137571,
                "offsetMinutes": -31
            },
            {
                "name": "완주",
                "longitude": 127.162202,
                "offsetMinutes": -31
            },
            {
                "name": "익산",
                "longitude": 126.957174,
                "offsetMinutes": -32
            },
            {
                "name": "임실",
                "longitude": 127.289179,
                "offsetMinutes": -31
            },
            {
                "name": "장수",
                "longitude": 127.520772,
                "offsetMinutes": -30
            },
            {
                "name": "전주",
                "longitude": 127.147958,
                "offsetMinutes": -31
            },
            {
                "name": "정읍",
                "longitude": 126.855942,
                "offsetMinutes": -33
            },
            {
                "name": "진안",
                "longitude": 127.424838,
                "offsetMinutes": -30
            },
            {
                "name": "고창",
                "longitude": 126.702097,
                "offsetMinutes": -33
            },
            {
                "name": "고흥",
                "longitude": 127.281928,
                "offsetMinutes": -31
            },
            {
                "name": "곡성",
                "longitude": 127.292013,
                "offsetMinutes": -31
            },
            {
                "name": "광양",
                "longitude": 127.695985,
                "offsetMinutes": -29
            },
            {
                "name": "구례",
                "longitude": 127.462746,
                "offsetMinutes": -30
            },
            {
                "name": "나주",
                "longitude": 126.710772,
                "offsetMinutes": -33
            },
            {
                "name": "담양",
                "longitude": 126.988504,
                "offsetMinutes": -32
            },
            {
                "name": "목포",
                "longitude": 126.391914,
                "offsetMinutes": -34
            },
            {
                "name": "무안",
                "longitude": 126.481621,
                "offsetMinutes": -34
            },
            {
                "name": "보성",
                "longitude": 127.080068,
                "offsetMinutes": -32
            },
            {
                "name": "순천",
                "longitude": 127.487356,
                "offsetMinutes": -30
            },
            {
                "name": "신안",
                "longitude": 126.350478,
                "offsetMinutes": -35
            },
            {
                "name": "여수",
                "longitude": 127.662242,
                "offsetMinutes": -29
            },
            {
                "name": "영광",
                "longitude": 126.512011,
                "offsetMinutes": -34
            },
            {
                "name": "영암",
                "longitude": 126.696714,
                "offsetMinutes": -33
            },
            {
                "name": "완도",
                "longitude": 126.755129,
                "offsetMinutes": -33
            },
            {
                "name": "장성",
                "longitude": 126.784822,
                "offsetMinutes": -33
            },
            {
                "name": "장흥",
                "longitude": 126.907103,
                "offsetMinutes": -32
            },
            {
                "name": "진도",
                "longitude": 126.263508,
                "offsetMinutes": -35
            },
            {
                "name": "함평",
                "longitude": 126.516691,
                "offsetMinutes": -34
            },
            {
                "name": "해남",
                "longitude": 126.599304,
                "offsetMinutes": -34
            },
            {
                "name": "화순",
                "longitude": 126.986636,
                "offsetMinutes": -32
            },
            {
                "name": "경주",
                "longitude": 129.224739,
                "offsetMinutes": -23
            },
            {
                "name": "고령",
                "longitude": 128.262917,
                "offsetMinutes": -27
            },
            {
                "name": "구미",
                "longitude": 128.344284,
                "offsetMinutes": -27
            },
            {
                "name": "군위",
                "longitude": 128.572905,
                "offsetMinutes": -26
            },
            {
                "name": "김천",
                "longitude": 128.113661,
                "offsetMinutes": -28
            },
            {
                "name": "문경",
                "longitude": 128.186711,
                "offsetMinutes": -27
            },
            {
                "name": "봉화",
                "longitude": 128.7325,
                "offsetMinutes": -25
            },
            {
                "name": "상주",
                "longitude": 128.158992,
                "offsetMinutes": -27
            },
            {
                "name": "성주",
                "longitude": 128.282954,
                "offsetMinutes": -27
            },
            {
                "name": "안동",
                "longitude": 128.729591,
                "offsetMinutes": -25
            },
            {
                "name": "영덕",
                "longitude": 129.366139,
                "offsetMinutes": -23
            },
            {
                "name": "영양",
                "longitude": 129.112401,
                "offsetMinutes": -24
            },
            {
                "name": "영주",
                "longitude": 128.624024,
                "offsetMinutes": -26
            },
            {
                "name": "영천",
                "longitude": 128.938572,
                "offsetMinutes": -24
            },
            {
                "name": "예천",
                "longitude": 128.452611,
                "offsetMinutes": -26
            },
            {
                "name": "울릉",
                "longitude": 130.905883,
                "offsetMinutes": -16
            },
            {
                "name": "울진",
                "longitude": 129.400575,
                "offsetMinutes": -22
            },
            {
                "name": "의성",
                "longitude": 128.697013,
                "offsetMinutes": -25
            },
            {
                "name": "청도",
                "longitude": 128.733845,
                "offsetMinutes": -25
            },
            {
                "name": "청송",
                "longitude": 129.057016,
                "offsetMinutes": -24
            },
            {
                "name": "칠곡",
                "longitude": 128.401744,
                "offsetMinutes": -26
            },
            {
                "name": "포항",
                "longitude": 129.343626,
                "offsetMinutes": -23
            },
            {
                "name": "경산",
                "longitude": 128.741514,
                "offsetMinutes": -25
            },
            {
                "name": "거창",
                "longitude": 127.90959,
                "offsetMinutes": -28
            },
            {
                "name": "김해",
                "longitude": 128.889328,
                "offsetMinutes": -24
            },
            {
                "name": "남해",
                "longitude": 127.892531,
                "offsetMinutes": -28
            },
            {
                "name": "밀양",
                "longitude": 128.746946,
                "offsetMinutes": -25
            },
            {
                "name": "사천",
                "longitude": 128.06388,
                "offsetMinutes": -28
            },
            {
                "name": "산청",
                "longitude": 127.873438,
                "offsetMinutes": -29
            },
            {
                "name": "양산",
                "longitude": 129.037015,
                "offsetMinutes": -24
            },
            {
                "name": "의령",
                "longitude": 128.261724,
                "offsetMinutes": -27
            },
            {
                "name": "진주",
                "longitude": 128.10783,
                "offsetMinutes": -28
            },
            {
                "name": "창녕",
                "longitude": 128.492272,
                "offsetMinutes": -26
            },
            {
                "name": "창원",
                "longitude": 128.682366,
                "offsetMinutes": -25
            },
            {
                "name": "통영",
                "longitude": 128.433188,
                "offsetMinutes": -26
            },
            {
                "name": "하동",
                "longitude": 127.750581,
                "offsetMinutes": -29
            },
            {
                "name": "함안",
                "longitude": 128.406481,
                "offsetMinutes": -26
            },
            {
                "name": "함양",
                "longitude": 127.725165,
                "offsetMinutes": -29
            },
            {
                "name": "합천",
                "longitude": 128.165883,
                "offsetMinutes": -27
            },
            {
                "name": "거제",
                "longitude": 128.621263,
                "offsetMinutes": -26
            },
            {
                "name": "고성(경남)",
                "longitude": 128.322477,
                "offsetMinutes": -27
            },
            {
                "name": "제주",
                "longitude": 126.53747,
                "offsetMinutes": -34
            },
            {
                "name": "서귀포",
                "longitude": 126.55999,
                "offsetMinutes": -34
            }
        ];
        return regions.map(region => {
            return {
                label: region.name,
                value: region.longitude,
                offset: region.offsetMinutes,
            };
        });
    }

    async fetchSummerTime() {
        return [
            {
                "year": 1948,
                "start": {
                    "month": 6,
                    "day": 1,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 13,
                    "hour": 0
                }
            },
            {
                "year": 1949,
                "start": {
                    "month": 4,
                    "day": 3,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 11,
                    "hour": 0
                }
            },
            {
                "year": 1950,
                "start": {
                    "month": 4,
                    "day": 1,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 10,
                    "hour": 0
                }
            },
            {
                "year": 1951,
                "start": {
                    "month": 5,
                    "day": 6,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 9,
                    "hour": 0
                }
            },
            {
                "year": 1955,
                "start": {
                    "month": 5,
                    "day": 5,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 9,
                    "hour": 0
                }
            },
            {
                "year": 1956,
                "start": {
                    "month": 5,
                    "day": 20,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 30,
                    "hour": 0
                }
            },
            {
                "year": 1957,
                "start": {
                    "month": 5,
                    "day": 5,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 22,
                    "hour": 0
                }
            },
            {
                "year": 1958,
                "start": {
                    "month": 5,
                    "day": 4,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 21,
                    "hour": 0
                }
            },
            {
                "year": 1959,
                "start": {
                    "month": 5,
                    "day": 3,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 20,
                    "hour": 0
                }
            },
            {
                "year": 1960,
                "start": {
                    "month": 5,
                    "day": 1,
                    "hour": 0
                },
                "end": {
                    "month": 9,
                    "day": 18,
                    "hour": 0
                }
            },
            {
                "year": 1987,
                "start": {
                    "month": 5,
                    "day": 10,
                    "hour": 2
                },
                "end": {
                    "month": 10,
                    "day": 11,
                    "hour": 3
                }
            },
            {
                "year": 1988,
                "start": {
                    "month": 5,
                    "day": 8,
                    "hour": 2
                },
                "end": {
                    "month": 10,
                    "day": 9,
                    "hour": 3
                }
            }
        ];
    }

    async fetchAnalyzedSaju(params: any) {
        const { data } = this.unpackResponse(
            await this.$api.post(
                'analyze',
                params
            )
        );
        return data;
    }

    async fetchYearlyLuck(params: any) {
        const { data: { yearlyLuck } } = this.unpackResponse(
            await this.$api.post(
                'yearly-luck',
                params
            )
        );
        return yearlyLuck;
    }

    async fetchMonthlyLuck(params: any) {
        const { data: { monthlyLuck } } = this.unpackResponse(
            await this.$api.post(
                'monthly-luck',
                params
            )
        );
        return monthlyLuck;
    }

    async fetchSolarTerms(year: number) {
        const { data: { terms } } = this.unpackResponse(
            await this.$api.get(`solar-terms/${year}`)
        );
        return terms;
    }

    protected unpackResponse = (response: any): any => {
        return response.data;
    }
}
