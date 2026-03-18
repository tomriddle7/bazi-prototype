/**
 * 사주 정보를 바탕으로 길신과 흉신(신살)을 계산하는 클래스
 */
export default class Sinsal {
    static DEFINITIONS = {
        // --- 1. 귀인(貴人): 인생의 조력자와 행운 ---
        '천을귀인': { ch: '天乙貴人', type: 'gilsin', term_key: 'cheoneul_gwiin' },
        '태극귀인': { ch: '太極貴人', type: 'gilsin', term_key: 'taegeuk_gwiin' },
        '천덕귀인': { ch: '天德貴人', type: 'gilsin', term_key: 'cheondeok_gwiin' },
        '월덕귀인': { ch: '月德貴人', type: 'gilsin', term_key: 'woldeok_gwiin' },
        '천관귀인': { ch: '天官貴人', type: 'gilsin', term_key: 'cheongwan_gwiin' },
        '천복귀인': { ch: '天福貴人', type: 'gilsin', term_key: 'cheonbok_gwiin' },
        '천주귀인': { ch: '天廚貴人', type: 'gilsin', term_key: 'cheonju_gwiin' },
        '복성귀인': { ch: '福星貴人', type: 'gilsin', term_key: 'bokseong_gwiin' },
        '황은대사': { ch: '皇恩大赦', type: 'gilsin', term_key: 'hwangeun_daesa' },
        '천덕합': { ch: '天德合', type: 'gilsin', term_key: 'cheondeok_hap' },
        '월덕합': { ch: '月德合', type: 'gilsin', term_key: 'woldeok_hap' },

        // --- 2. 학문/지혜: 총명함과 배움의 복 ---
        '문창귀인': { ch: '文昌貴人', type: 'gilsin', term_key: 'munchang_gwiin' },
        '문곡귀인': { ch: '文曲貴人', type: 'gilsin', term_key: 'mungok_gwiin' },
        '학당귀인': { ch: '學堂貴人', type: 'gilsin', term_key: 'hakdang_gwiin' },
        '관귀학관': { ch: '官貴學館', type: 'gilsin', term_key: 'gwangwi_hakgwan' },

        // --- 3. 재물/성공: 부와 명예의 기운 ---
        '암록': { ch: '暗祿', type: 'gilsin', term_key: 'amrok' },
        '금여록': { ch: '金輿祿', type: 'gilsin', term_key: 'geumyeorok' },

        // --- 4. 강력한 기운(煞): 리더십과 카리스마의 양면성 ---
        '괴강살': { ch: '魁罡殺', type: 'hyungsal', term_key: 'goegang_sal' },
        '백호살': { ch: '白虎殺', type: 'hyungsal', term_key: 'baekho_sal' },
        '양인살': { ch: '羊刃殺', type: 'hyungsal', term_key: 'yangin_sal' },

        // --- 5. 인간관계/애정: 매력과 고독의 기운 ---
        '홍염살': { ch: '紅艶殺', type: 'junglip', term_key: 'hongyeom_sal' },
        '원진살': { ch: '元辰殺', type: 'hyungsal', term_key: 'wonjin_sal' },
        '귀문관살': { ch: '鬼門關殺', type: 'hyungsal', term_key: 'gwimun_gwansal' },
        '고신살': { ch: '孤神殺', type: 'hyungsal', term_key: 'goshin_sal' },
        '과숙살': { ch: '寡宿殺', type: 'hyungsal', term_key: 'gwasuk_sal' },
        '상처살': { ch: '喪妻殺', type: 'hyungsal', term_key: 'sangcheo_sal' },
        '상부살': { ch: '喪夫殺', type: 'hyungsal', term_key: 'sangbu_sal' },
        '음양착살': { ch: '陰陽錯殺', type: 'hyungsal', term_key: 'eumyangchak_sal' },

        // --- 6. 건강/사고: 주의와 관리가 필요한 기운 ---
        '천의성': { ch: '天醫星', type: 'gilsin', term_key: 'cheonui_seong' },
        '탕화살': { ch: '湯火殺', type: 'hyungsal', term_key: 'tanghwa_sal' },
        '급각살': { ch: '急脚殺', type: 'hyungsal', term_key: 'geupgak_sal' },
        '단교관살': { ch: '斷橋關殺', type: 'hyungsal', term_key: 'dangyo_gwansal' },
        '상문살': { ch: '喪門殺', type: 'hyungsal', term_key: 'sangmun_sal' },
        '유하살': { ch: '流霞殺', type: 'hyungsal', term_key: 'yuha_sal' },
        '비인살': { ch: '飛刃殺', type: 'hyungsal', term_key: 'biin_sal' },

        // --- 7. 기타 특수 작용 ---
        '공망': { ch: '空亡', type: 'hyungsal', term_key: 'gongmang' },
    };

    constructor() {
        this.saju = {};
        this.rules = {};
        this.calculatedSinsals = { year: [], month: [], day: [], hour: [] };
        this.gender = 'male';
        this.initializeRules();
    }

    /**
     * 사주 데이터 주입
     * @param {Object} saju - 간지 정보를 담은 객체
     */
    withSaju(saju) {
        this.saju = {
            ganji: { year: saju.year.ch, month: saju.month.ch, day: saju.day.ch },
            h: { year: saju.year.ch[0], month: saju.month.ch[0], day: saju.day.ch[0] },
            e: { year: saju.year.ch[1], month: saju.month.ch[1], day: saju.day.ch[1] },
        };

        if (saju.hourKnown) {
            this.saju.ganji.hour = saju.hour.ch;
            this.saju.h.hour = saju.hour.ch[0];
            this.saju.e.hour = saju.hour.ch[1];
        }

        this.gender = saju.gender; // 'male' or 'female'
        return this;
    }

    /**
     * 신살 계산 로직 실행
     */
    calculate() {
        this.calculatedSinsals = { year: [], month: [], day: [] };
        if (this.saju.ganji.hour) this.calculatedSinsals.hour = [];

        const basePositions = ['year', 'month', 'day'];
        if (this.saju.ganji.hour) basePositions.push('hour');

        for (const [name, rule] of Object.entries(this.rules)) {
            if (rule.gender && rule.gender !== this.gender) continue;

            const positions = rule.positions || basePositions;

            for (const pos of positions) {
                // [수정] 시주가 없는데 pos가 'h'이면 건너뜀
                if (!this.saju.ganji[pos]) continue;

                const params = rule.params.map(paramType => {
                    switch (paramType) {
                        case 'ilgan': return this.saju.h.day;
                        case 'wolji': return this.saju.e.month;
                        case 'yeonji': return this.saju.e.year;
                        case 'ilji': return this.saju.e.day;
                        case 'jiji': return this.saju.e[pos];
                        case 'ganji': return this.saju.ganji[pos];
                        case 'cheongan': return this.saju.h[pos];
                        default: return null;
                    }
                });

                if (rule.logic(...params)) {
                    this.calculatedSinsals[pos].push(name);
                }
            }
        }
        return this;
    }

    /**
     * 최종 결과 객체 생성
     */
    create() {
        const result = { year: [], month: [], day: [], hour: [] };
        for (const [posKey, sinsalNames] of Object.entries(this.calculatedSinsals)) {
            const uniqueNames = [...new Set(sinsalNames)];
            result[posKey] = uniqueNames.map(name => {
                const def = Sinsal.DEFINITIONS[name];
                return {
                    ko: name,
                    ch: def.ch,
                    type: def.type || 'junglip',
                    term_key: def.term_key || '',
                };
            });
        }
        return result;
    }

    /**
     * 규칙 초기화 (PHP의 initializeRules 대응)
     */
    initializeRules() {
        this.rules = {
            // --- 귀인(貴人) 시리즈 ---
            '천을귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => {
                    const map = {
                        '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
                        '乙': ['子', '申'], '己': ['子', '申'],
                        '丙': ['酉', '亥'], '丁': ['酉', '亥'],
                        '辛': ['寅', '午'],
                        '壬': ['卯', '巳'], '癸': ['卯', '巳']
                    };
                    return map[ilgan]?.includes(jiji) || false;
                }
            },
            '태극귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => {
                    const map = {
                        '甲': ['子', '午'], '乙': ['子', '午'],
                        '丙': ['卯', '酉'], '丁': ['卯', '酉'],
                        '戊': ['辰', '戌', '丑', '未'], '己': ['辰', '戌', '丑', '未'],
                        '庚': ['寅', '亥'], '辛': ['寅', '亥'],
                        '壬': ['巳', '申'], '癸': ['巳', '申']
                    };
                    return map[ilgan]?.includes(jiji) || false;
                }
            },
            '천덕귀인': {
                params: ['wolji', 'cheongan', 'jiji'],
                logic: (wolji, cheongan, jiji) => this.isChunduk(wolji, cheongan, jiji)
            },
            '월덕귀인': {
                params: ['wolji', 'cheongan'],
                logic: (wolji, cheongan) => this.isWolduk(wolji, cheongan)
            },
            // --- 학문/지혜 관련 ---
            '문창귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲巳', '乙午', '丙申', '丁酉', '戊申', '己酉', '庚亥', '辛子', '壬寅', '癸卯'].includes(ilgan + jiji)
            },
            '학당귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲亥', '乙午', '丙寅', '丁酉', '戊寅', '己酉', '庚巳', '辛子', '壬申', '癸卯'].includes(ilgan + jiji)
            },
            '문곡귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲亥', '乙子', '丙寅', '丁卯', '戊寅', '己卯', '庚巳', '辛午', '壬申', '癸酉'].includes(ilgan + jiji)
            },
            '관귀학관': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲巳', '乙巳', '丙申', '丁申', '戊亥', '己亥', '庚寅', '辛寅', '壬申', '癸申'].includes(ilgan + jiji)
            },
            // --- 재물/명예/기타 길신 ---
            '천주귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲巳', '乙午', '丙巳', '丁午', '戊申', '己酉', '庚亥', '辛子', '壬寅', '癸卯'].includes(ilgan + jiji)
            },
            '천관귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲未', '乙辰', '丙巳', '丁寅', '戊卯', '己酉', '庚亥', '辛申', '壬酉', '癸午'].includes(ilgan + jiji)
            },
            '천복귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲酉', '乙申', '丙子', '丁亥', '戊卯', '己寅', '庚午', '辛巳', '壬午', '癸巳'].includes(ilgan + jiji)
            },
            '복성귀인': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲寅', '乙丑', '丙子', '丁酉', '戊申', '己未', '庚午', '辛巳', '壬辰', '癸卯'].includes(ilgan + jiji)
            },
            '암록': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲亥', '乙戌', '丙申', '丁未', '戊申', '己未', '庚巳', '辛辰', '壬寅', '癸丑'].includes(ilgan + jiji)
            },
            '금여록': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲辰', '乙巳', '丙未', '丁申', '戊未', '己申', '庚戌', '辛亥', '壬丑', '癸寅'].includes(ilgan + jiji)
            },
            '천의성': {
                params: ['wolji', 'jiji'],
                positions: ['year', 'day', 'hour'],
                logic: (wolji, jiji) => this.isChene(wolji, jiji)
            },
            // --- 주요 흉살(凶神) 및 중립살 ---
            '백호살': {
                params: ['ganji'],
                logic: (ganji) => ['甲辰', '乙未', '丙戌', '丁丑', '戊辰', '壬戌', '癸丑'].includes(ganji)
            },
            '괴강살': {
                params: ['ganji'],
                logic: (ganji) => ['壬辰', '壬戌', '戊戌', '庚辰', '庚戌'].includes(ganji)
            },
            '양인살': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲卯', '丙午', '戊午', '庚酉', '壬子'].includes(ilgan + jiji)
                // ['甲卯','乙辰','丙午','丁未','戊午','己未','庚酉','辛戌','壬子','癸丑'] 양인살은 좌측 처럼 구하는 경우도 있음(학파에 따라 다름)
            },
            '홍염살': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲午', '乙午', '丙寅', '丁未', '戊辰', '己辰', '庚戌', '辛酉', '壬子', '癸申'].includes(ilgan + jiji)
            },
            '원진살': {
                params: ['ilji', 'jiji'],
                positions: ['year', 'month', 'hour'],
                logic: (ilji, jiji) => {
                    const pairs = ['子未', '丑午', '寅酉', '卯申', '辰亥', '巳戌'];
                    return pairs.includes(ilji + jiji) || pairs.includes(jiji + ilji);
                }
            },
            '귀문관살': {
                params: ['ilji', 'jiji'],
                positions: ['year', 'month', 'hour'],
                logic: (ilji, jiji) => {
                    const pairs = ['子酉', '丑午', '寅未', '卯申', '辰亥', '巳戌'];
                    return pairs.includes(ilji + jiji) || pairs.includes(jiji + ilji);
                }
            },
            '상문살': {
                params: ['ilji', 'jiji'],
                positions: ['year', 'month', 'hour'],
                logic: (ilji, jiji) => ['子寅', '丑卯', '寅辰', '卯巳', '辰午', '巳未', '午申', '未酉', '申戌', '酉亥', '戌子', '亥丑'].includes(ilji + jiji)
            },
            '급각살': {
                params: ['ilji', 'jiji'],
                positions: ['year', 'day', 'hour'],
                logic: (wolji, jiji) => {
                    const map = {
                        '寅': ['亥', '子'], '卯': ['亥', '子'], '辰': ['亥', '子'],
                        '巳': ['卯', '未'], '午': ['卯', '未'], '未': ['卯', '未'],
                        '申': ['寅', '戌'], '酉': ['寅', '戌'], '戌': ['寅', '戌'],
                        '亥': ['丑', '辰'], '子': ['丑', '辰'], '丑': ['丑', '辰'],
                    };
                    return map[wolji]?.includes(jiji) || false;
                }
            },
            '고신살': {
                gender: 'male',
                params: ['yeonji', 'jiji'],
                logic: (yeonji, jiji) => {
                    if (['寅', '卯', '辰'].includes(yeonji)) return jiji === '巳';
                    if (['巳', '午', '未'].includes(yeonji)) return jiji === '申';
                    if (['申', '酉', '戌'].includes(yeonji)) return jiji === '亥';
                    if (['亥', '子', '丑'].includes(yeonji)) return jiji === '寅';
                    return false;
                }
            },
            '과숙살': {
                gender: 'female',
                params: ['yeonji', 'jiji'],
                logic: (yeonji, jiji) => {
                    if (['寅', '卯', '辰'].includes(yeonji)) return jiji === '丑';
                    if (['巳', '午', '未'].includes(yeonji)) return jiji === '辰';
                    if (['申', '酉', '戌'].includes(yeonji)) return jiji === '未';
                    if (['亥', '子', '丑'].includes(yeonji)) return jiji === '戌';
                    return false;
                }
            },
            // --- 기타 신살 규칙 ---
            '황은대사': {
                params: ['wolji', 'jiji'],
                logic: (wolji, jiji) => ['子申', '丑未', '寅戌', '卯丑', '辰寅', '巳巳', '午酉', '未卯', '申子', '酉午', '戌亥', '亥辰'].includes(wolji + jiji)
            },
            '월덕합': {
                params: ['wolji', 'cheongan'],
                logic: (wolji, cheongan) => this.isWoldukHap(wolji, cheongan)
            },
            '천덕합': {
                params: ['wolji', 'jiji'],
                logic: (wolji, jiji) => this.isChendukHap(wolji, jiji)
            },
            '단교관살': {
                params: ['ilji', 'jiji'],
                positions: ['day'], // 기존 코드상 일지에만 해당
                logic: (ilji, jiji) => ['子亥', '丑子', '寅寅', '卯卯', '辰申', '巳丑', '午戌', '未酉', '申辰', '酉巳', '戌午', '亥未'].includes(ilji + jiji)
            },
            '탕화살': {
                params: ['yeonji', 'jiji'], // 원본 코드는 my_e(생년지) 기준이었음
                logic: (yeonji, jiji) => ['子午', '丑未', '寅寅', '卯午', '辰未', '巳寅', '午午', '未未', '申寅', '酉午', '戌未', '亥寅'].includes(yeonji + jiji)
            },
            '유하살': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲酉', '乙戌', '丙未', '丁申', '戊巳', '己午', '庚辰', '辛卯', '壬亥', '癸寅'].includes(ilgan + jiji)
            },
            '비인살': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => ['甲酉', '乙戌', '丙子', '丁丑', '戊子', '己丑', '庚卯', '辛辰', '壬午', '癸未'].includes(ilgan + jiji)
            },
            '음양착살': {
                params: ['ilgan', 'jiji'],
                logic: (ilgan, jiji) => {
                    const map = {
                        '丙': ['子', '午'],
                        '丁': ['丑', '未'],
                        '戊': ['寅', '申'],
                        '辛': ['卯', '酉'],
                        '壬': ['辰', '戌'],
                        '癸': ['巳', '亥'],
                    };
                    return map[ilgan]?.includes(jiji) || false;
                }
            },
            '공망': {
                params: ['ilgan', 'ilji', 'jiji'],
                logic: (ilgan, ilji, jiji) => {
                    const ilju = ilgan + ilji;
                    let gongmangPair = [];
                    // 60갑자 순환(순)에 따른 공망 찾기
                    if (['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛미', '壬申', '癸酉'].includes(ilju)) gongmangPair = ['戌', '亥'];
                    else if (['甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未'].includes(ilju)) gongmangPair = ['申', '酉'];
                    else if (['甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳'].includes(ilju)) gongmangPair = ['午', '未'];
                    else if (['甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚자', '辛丑', '壬寅', '癸卯'].includes(ilju)) gongmangPair = ['辰', '巳'];
                    else if (['甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑'].includes(ilju)) gongmangPair = ['寅', '卯'];
                    else if (['甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'].includes(ilju)) gongmangPair = ['子', '丑'];
                    // 비교 대상 지지가 공망에 해당하는지 확인
                    return gongmangPair.includes(jiji);
                }
            }
        };
    }

    // --- 보조 로직 (PHP Trait 대체) ---
    isChunduk(wolji, cheongan, jiji) {
        switch (wolji) {
            case '子': return jiji === '巳';
            case '丑': return cheongan === '庚';
            case '寅': return cheongan === '丁';
            case '卯': return jiji === '申';
            case '辰': return cheongan === '壬';
            case '巳': return jiji === '申';
            case '午': return jiji === '亥';
            case '未': return cheongan === '甲';
            case '申': return cheongan === '癸';
            case '酉': return jiji === '寅';
            case '戌': return cheongan === '丙';
            case '亥': return cheongan === '乙';
            default: return false;
        }
    }

    isWolduk(wolji, cheongan) {
        const map = { '寅': '丙', '午': '丙', '戌': '丙', '申': '壬', '子': '壬', '辰': '壬', '亥': '甲', '卯': '甲', '未': '甲', '巳': '庚', '酉': '庚', '丑': '庚' };
        return map[wolji] === cheongan;
    }

    isWoldukHap(wolji, cheongan) {
        const map = { '亥': '己', '卯': '己', '未': '己', '寅': '辛', '午': '辛', '戌': '辛', '巳': '乙', '酉': '乙', '丑': '乙', '申': '丁', '子': '丁', '辰': '丁' };
        return map[wolji] === cheongan;
    }
    
    isChendukHap(wolji, jiji) {
        return ['子申', '丑乙', '寅壬', '卯巳', '辰丁', '巳丙', '午寅', '未己', '申戊', '酉亥', '戌辛', '亥庚'].includes(wolji + jiji);
    }

    isChene(wolji, jiji) {
        return ['子亥', '丑子', '寅丑', '卯寅', '辰卯', '巳辰', '午巳', '未午', '申未', '酉申', '戌酉', '亥戌'].includes(wolji + jiji);
    }
}