/**
 * 통합 신살 계산 엔진 (SinsalEngine)
 */
const SINSAL_DEFINITIONS = {
    '겁살': 'robbery',
    '재살': 'disaster',
    '천살': 'sky',
    '지살': 'earth',
    '도화살': 'peachBlossom',
    '월살': 'moon',
    '망신살': 'lostSpirit',
    '장성살': 'generalStar',
    '반안살': 'saddleMount',
    '역마살': 'wanderlust',
    '육해살': 'sixHarms',
    '화개살': 'floweryCanopy',
};

const CONFIG = {
    robbery: {
        korean: "겁살",
        hanja: "劫煞",
        meaning: "강탈, 재물 손실, 압류",
        type: "inauspicious",
        sector: "twelve",
    },
    disaster: {
        korean: "재살",
        hanja: "災煞",
        meaning: "재난, 감금, 소송",
        type: "inauspicious",
        sector: "twelve",
    },
    sky: {
        korean: "천살",
        hanja: "天殺",
        meaning: "천재지변, 불치병, 마비",
        type: "inauspicious",
        sector: "twelve",
    },
    earth: {
        korean: "지살",
        hanja: "地殺",
        meaning: "이동, 변화, 이별",
        type: "neutral",
        sector: "twelve",
    },
    peachBlossom: {
        korean: "도화살",
        hanja: "桃花煞",
        meaning: "이성 인연, 매력, 색정",
        type: "neutral",
        sector: "twelve",
    },
    moon: {
        korean: "월살",
        hanja: "月殺",
        meaning: "혜안, 정신적 성숙, 상속, 증여",
        type: "neutral",
        sector: "twelve",
    },
    lostSpirit: {
        korean: "망신살",
        hanja: "亡身煞",
        meaning: "망신, 실수, 구설수",
        type: "inauspicious",
        sector: "twelve",
    },
    generalStar: {
        korean: "장성살",
        hanja: "將星煞",
        meaning: "권위, 리더십, 승진",
        type: "auspicious",
        sector: "twelve",
    },
    saddleMount: {
        korean: "반안살",
        hanja: "攀鞍煞",
        meaning: "안정, 출세, 승진",
        type: "auspicious",
        sector: "twelve",
    },
    wanderlust: {
        korean: "역마살",
        hanja: "驛馬煞",
        meaning: "이동, 변화, 해외",
        type: "neutral",
        sector: "twelve",
    },
    sixHarms: {
        korean: "육해살",
        hanja: "六害煞",
        meaning: "인관계 해침",
        type: "inauspicious",
        sector: "twelve",
    },
    floweryCanopy: {
        korean: "화개살",
        hanja: "華蓋煞",
        meaning: "예술, 종교, 고독",
        type: "neutral",
        sector: "twelve",
    },
    skyNoble: {
        korean: "천을귀인",
        hanja: "天乙貴人",
        meaning: "귀인의 도움, 위기 극복",
        type: "auspicious",
        sector: "gilsin",
    },
    taijiNoble: {
        korean: "태극귀인",
        hanja: "太極貴人",
        meaning: "지혜, 학문, 귀인의 도움",
        type: "auspicious",
        sector: "gilsin",
    },
    heavenlyVirtue: {
        korean: "천덕귀인",
        hanja: "天德貴人",
        meaning: "하늘의 덕, 재난 해소",
        type: "auspicious",
        sector: "gilsin",
    },
    monthlyVirtue: {
        korean: "월덕귀인",
        hanja: "月德貴人",
        meaning: "달의 덕, 흉화 해소",
        type: "auspicious",
        sector: "gilsin",
    },
    skyOfficial: {
        korean: "천관귀인",
        hanja: "天官貴人",
        meaning: "",
        type: "auspicious",
        sector: "gilsin",
    },
    skyFortune: {
        korean: "천복귀인",
        hanja: "天福貴人",
        meaning: "",
        type: "auspicious",
        sector: "gilsin",
    },
    heavenlyKitchen: {
        korean: "천주귀인",
        hanja: "天廚貴人",
        meaning: "의식주 풍족, 재물운, 복록",
        type: "auspicious",
        sector: "gilsin",
    },
    fortuneStar: {
        korean: "복성귀인",
        hanja: "福星貴人",
        meaning: "",
        type: "auspicious",
        sector: "gilsin",
    },
    imperialPardon: {
        korean: "황은대사",
        hanja: "皇恩大赦",
        meaning: "용서, 구원, 위기 극복, 귀인의 도움",
        type: "auspicious",
        sector: "gilsin",
    },
    literaryNoble: {
        korean: "문창귀인",
        hanja: "文昌貴人",
        meaning: "학업, 시험, 문서",
        type: "auspicious",
        sector: "gilsin",
    },
    literaryCurve: {
        korean: "문곡귀인",
        hanja: "文曲貴人",
        meaning: "예술, 문학, 감성적 학문",
        type: "auspicious",
        sector: "gilsin",
    },
    academicHall: {
        korean: "학당귀인",
        hanja: "學堂貴人",
        meaning: "학문, 교육, 지식",
        type: "auspicious",
        sector: "gilsin",
    },
    officialAcademicHall: {
        korean: "관귀학관",
        hanja: "官貴學館",
        meaning: "공직, 학문, 승진",
        type: "auspicious",
        sector: "gilsin",
    },
    hiddenWealth: {
        korean: "암록",
        hanja: "暗祿",
        meaning: "숨겨진 재물, 은밀한 도움",
        type: "auspicious",
        sector: "gilsin",
    },
    goldenCarriage: {
        korean: "금여성",
        hanja: "金輿星",
        meaning: "배우자운, 부귀, 명예",
        type: "auspicious",
        sector: "gilsin",
    },
    heavenlyDoctor: {
        korean: "천의성",
        hanja: "天醫星",
        meaning: "치료, 의료, 건강 회복",
        type: "auspicious",
        sector: "gilsin",
    },
    heavenlyPleasure: {
        korean: "천희성",
        hanja: "天喜星",
        meaning: "",
        type: "auspicious",
        sector: "gilsin",
    },
    wealthTreasury: {
        korean: "재고귀인",
        hanja: "財貴貴人",
        meaning: "",
        type: "auspicious",
        sector: "gilsin",
    },
    extremePower: {
        korean: "괴강살",
        hanja: "魁罡殺",
        meaning: "강한 개성, 리더십, 독선",
        type: "neutral",
        sector: "hyungsal",
    },
    whiteTiger: {
        korean: "백호살",
        hanja: "白虎殺",
        meaning: "상해, 사고, 수술",
        type: "neutral",
        sector: "hyungsal",
    },
    sheepBlade: {
        korean: "양인살",
        hanja: "羊刃殺",
        meaning: "극단적 성향, 승부욕, 위험",
        type: "neutral",
        sector: "hyungsal",
    },
    flyingBlade: {
        korean: "비인살",
        hanja: "飛刃殺",
        meaning: "",
        type: "neutral",
        sector: "hyungsal",
    },
    redFlame: {
        korean: "홍염살",
        hanja: "紅艶殺",
        meaning: "이성 문제, 색정, 매력",
        type: "neutral",
        sector: "hyungsal",
    },
    wonjin: {
        korean: "원진살",
        hanja: "怨嗔煞",
        meaning: "애증, 불화, 원망",
        type: "inauspicious",
        sector: "hyungsal",
    },
    ghostGate: {
        korean: "귀문관살",
        hanja: "鬼門關煞",
        meaning: "귀신, 영적 감각, 불안",
        type: "neutral",
        sector: "hyungsal",
    },
    lonelyWidower: {
        korean: "고신살",
        hanja: "孤神殺",
        meaning: "고독, 이별",
        type: "inauspicious",
        sector: "hyungsal",
    },
    lonelyWidow: {
        korean: "과숙살",
        hanja: "寡宿殺",
        meaning: "고독, 이별",
        type: "inauspicious",
        sector: "hyungsal",
    },
    yinDiscord: {
        korean: "음착살",
        hanja: "陰錯殺",
        meaning: "",
        type: "inauspicious",
        sector: "hyungsal",
    },
    yangDiscord: {
        korean: "양착살",
        hanja: "陽錯殺",
        meaning: "",
        type: "inauspicious",
        sector: "hyungsal",
    },
    burnInjury: {
        korean: "탕화살",
        hanja: "湯火殺",
        meaning: "",
        type: "inauspicious",
        sector: "hyungsal",
    },
    boneFracture: {
        korean: "급각살",
        hanja: "急脚殺",
        meaning: "다리 부상, 빠른 이동, 급작스러운 변화",
        type: "inauspicious",
        sector: "hyungsal",
    },
    // '단교관살': { ch: '斷橋關殺', type: 'hyungsal', term_key: 'dangyo_gwansal' },
    funeralGate: {
        korean: "상문살",
        hanja: "喪門殺",
        meaning: "",
        type: "inauspicious",
        sector: "hyungsal",
    },
    wanderingSpirit: {
        korean: "유하살",
        hanja: "流霞殺",
        meaning: "",
        type: "neutral",
        sector: "hyungsal",
    },
    emptiness: {
        korean: "공망",
        hanja: "空亡",
        meaning: "허무, 비움, 무력화",
        type: "neutral",
        sector: "hyungsal",
    },
    conflict: {
        korean: "상충살",
        hanja: "相沖殺",
        meaning: "",
        type: "inauspicious",
        sector: "hyungsal",
    },
    suspendedNeedle: {
        korean: "현침살",
        hanja: "懸針殺",
        meaning: "날카로운 기질, 성급함, 예리함",
        type: "neutral",
        sector: "hyungsal",
    },
    heavenlyNet: {
        korean: "천라",
        hanja: "天羅",
        meaning: "",
        type: "neutral",
        sector: "hyungsal",
    },
    earthlySnare: {
        korean: "지망",
        hanja: "地網",
        meaning: "",
        type: "neutral",
        sector: "hyungsal",
    },
    /* solidPosition: {
        korean: "건록",
        hanja: "建祿",
        meaning: "관직, 안정, 자립",
        type: "auspicious",
        sector: "etc",
    }, */
    /* heavenlyVirtueCombination: {
        korean: "천덕합",
        hanja: "天德合",
        meaning: "",
        type: "auspicious",
    }, */
    /* monthlyVirtueCombination: {
        korean: "월덕합",
        hanja: "月德合",
        meaning: "",
        type: "auspicious",
    } */
};

const TWELVE_SINSAL_MAP = {
    // 신자진(申子辰) 水局 그룹
    '申': { '겁살': '巳', '재살': '午', '천살': '未', '지살': '申', '도화살': '酉', '월살': '戌', '망신살': '亥', '장성살': '子', '반안살': '丑', '역마살': '寅', '육해살': '卯', '화개살': '辰' },
    '子': { '겁살': '巳', '재살': '午', '천살': '未', '지살': '申', '도화살': '酉', '월살': '戌', '망신살': '亥', '장성살': '子', '반안살': '丑', '역마살': '寅', '육해살': '卯', '화개살': '辰' },
    '辰': { '겁살': '巳', '재살': '午', '천살': '未', '지살': '申', '도화살': '酉', '월살': '戌', '망신살': '亥', '장성살': '子', '반안살': '丑', '역마살': '寅', '육해살': '卯', '화개살': '辰' },

    // 인오술(寅午戌) 火局 그룹
    '寅': { '겁살': '亥', '재살': '子', '천살': '丑', '지살': '寅', '도화살': '卯', '월살': '辰', '망신살': '巳', '장성살': '午', '반안살': '未', '역마살': '申', '육해살': '酉', '화개살': '戌' },
    '午': { '겁살': '亥', '재살': '子', '천살': '丑', '지살': '寅', '도화살': '卯', '월살': '辰', '망신살': '巳', '장성살': '午', '반안살': '未', '역마살': '申', '육해살': '酉', '화개살': '戌' },
    '戌': { '겁살': '亥', '재살': '子', '천살': '丑', '지살': '寅', '도화살': '卯', '월살': '辰', '망신살': '巳', '장성살': '午', '반안살': '未', '역마살': '申', '육해살': '酉', '화개살': '戌' },

    // 사유축(巳酉丑) 金局 그룹
    '巳': { '겁살': '寅', '재살': '卯', '천살': '辰', '지살': '巳', '도화살': '午', '월살': '未', '망신살': '申', '장성살': '酉', '반안살': '戌', '역마살': '亥', '육해살': '子', '화개살': '丑' },
    '酉': { '겁살': '寅', '재살': '卯', '천살': '辰', '지살': '巳', '도화살': '午', '월살': '未', '망신살': '申', '장성살': '酉', '반안살': '戌', '역마살': '亥', '육해살': '子', '화개살': '丑' },
    '丑': { '겁살': '寅', '재살': '卯', '천살': '辰', '지살': '巳', '도화살': '午', '월살': '未', '망신살': '申', '장성살': '酉', '반안살': '戌', '역마살': '亥', '육해살': '子', '화개살': '丑' },

    // 해묘미(亥卯未) 木局 그룹
    '亥': { '겁살': '申', '재살': '酉', '천살': '戌', '지살': '亥', '도화살': '子', '월살': '丑', '망신살': '寅', '장성살': '卯', '반안살': '辰', '역마살': '巳', '육해살': '午', '화개살': '未' },
    '卯': { '겁살': '申', '재살': '酉', '천살': '戌', '지살': '亥', '도화살': '子', '월살': '丑', '망신살': '寅', '장성살': '卯', '반안살': '辰', '역마살': '巳', '육해살': '午', '화개살': '未' },
    '未': { '겁살': '申', '재살': '酉', '천살': '戌', '지살': '亥', '도화살': '子', '월살': '丑', '망신살': '寅', '장성살': '卯', '반안살': '辰', '역마살': '巳', '육해살': '오', '화개살': '未' },
};

/**
 * 메인 계산 실행
 */
export function analyzeSinsals({ year, month, day, hour, gender, hourKnown }) {
    const saju = {
        stems: { year: year[0], month: month[0], day: day[0], hour: hour[0] },
        branches: { year: year[1], month: month[1], day: day[1], hour: hour[1] },
        pillars: { year, month, day, hour },
        gender,
        hourKnown
    };
    const sinsals = { year: [], month: [], day: [], hour: [] };
    const sinsals12 = { year: [], month: [], day: [], hour: [] };

    const positions = ['year', 'month', 'day', 'hour'];

    positions.forEach(pos => {
        if (pos === 'hour' && !saju.hourKnown) return;

        // A. 12신살 규칙 적용 (sinsal12.js 방식)
        sinsals12[pos] = sinsals12[pos].concat(applyTwelveSinsal(saju, pos));

        // B. 일반 신살 규칙 적용 (sinsal.js 방식)
        sinsals[pos] = sinsals[pos].concat(applyGeneralRules(saju, pos));
    });

    return { sinsals, sinsals12 };
}

/**
 * 12신살 특화 로직
 */
function applyTwelveSinsal(saju, pos) {
    const yeonji = saju.branches.year;
    const jiji = saju.branches[pos];

    let sinsalResults = [];

    const sinsalGroupMap = TWELVE_SINSAL_MAP[yeonji];

    if (sinsalGroupMap) {
        // PHP의 array_search(value, array)와 동일한 기능: 가로(value)로 세로(key) 찾기
        const sinsalName = Object.keys(sinsalGroupMap).find(key => sinsalGroupMap[key] === jiji);

        // 일치하는 신살이 있을 경우, DEFINITIONS를 참조하여 객체를 생성합니다.
        if (sinsalName && SINSAL_DEFINITIONS[sinsalName]) {
            sinsalResults.push(addResult(SINSAL_DEFINITIONS[sinsalName]));
        }
    }
    return sinsalResults;
}

/**
 * 일반 신살 로직 (일간 기준, 월지 기준 등)
 */
function applyGeneralRules(saju, pos) {
    const ilgan = saju.stems.day;
    const yeonji = saju.branches.year;
    const wolji = saju.branches.month;
    const ilji = saju.branches.day;
    const jiji = saju.branches[pos];
    const ganji = saju.pillars[pos];
    const cheongan = saju.stems[pos];
    const ilju = saju.pillars.day;

    let sinsalResults = [];

    // 천을귀인 예시
    const cheoneulMap = {
        '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
        '乙': ['子', '申'], '己': ['子', '申'],
        '丙': ['酉', '亥'], '丁': ['酉', '亥'],
        '辛': ['寅', '午'],
        '壬': ['卯', '巳'], '癸': ['卯', '巳']
    };
    if (cheoneulMap[ilgan]?.includes(jiji)) {
        sinsalResults.push(addResult('skyNoble'));
    }
    // 태극귀인 예시
    const taegeukMap = {
        '甲': ['子', '午'], '乙': ['子', '午'],
        '丙': ['卯', '酉'], '丁': ['卯', '酉'],
        '戊': ['辰', '戌', '丑', '未'], '己': ['辰', '戌', '丑', '未'],
        '庚': ['寅', '亥'], '辛': ['寅', '亥'],
        '壬': ['巳', '申'], '癸': ['巳', '申']
    };
    if (taegeukMap[ilgan]?.includes(jiji)) {
        sinsalResults.push(addResult('taijiNoble'));
    }
    // 천덕귀인
    const chundukMap = {
        '子': { type: 'jiji', target: '巳' },
        '丑': { type: 'cheongan', target: '庚' },
        '寅': { type: 'cheongan', target: '丁' },
        '卯': { type: 'jiji', target: '申' },
        '辰': { type: 'cheongan', target: '壬' },
        '巳': { type: 'jiji', target: '申' },
        '午': { type: 'jiji', target: '亥' },
        '未': { type: 'cheongan', target: '甲' },
        '申': { type: 'cheongan', target: '癸' },
        '酉': { type: 'jiji', target: '寅' },
        '戌': { type: 'cheongan', target: '丙' },
        '亥': { type: 'cheongan', target: '乙' }
    };
    const cdRule = chundukMap[wolji];
    if (cdRule) {
        const compareValue = cdRule.type === 'cheongan' ? cheongan : jiji;
        if (compareValue === cdRule.target) {
            sinsalResults.push(addResult('heavenlyVirtue'));
        }
    }
    // 월덕귀인
    const woldukMap = {
        '丙': ['寅', '午', '戌'],
        '壬': ['申', '子', '辰'],
        '甲': ['亥', '卯', '未'],
        '庚': ['巳', '酉', '丑']
    };
    if (woldukMap[cheongan]?.includes(wolji)) {
        sinsalResults.push(addResult('monthlyVirtue'));
    }
    // 천관귀인
    const cheongwanMap = ['甲未', '乙辰', '丙巳', '丁寅', '戊戌', '己卯', '庚亥', '辛申', '壬寅', '癸午'];
    if (cheongwanMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('skyOfficial'));
    }
    // 천복귀인
    const cheonbokMap = ['甲酉', '乙申', '丙子', '丁亥', '戊卯', '己寅', '庚午', '辛巳', '壬午', '癸巳'];
    if (cheonbokMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('skyFortune'));
    }
    // 천주귀인
    const cheonjuMap = ['甲巳', '乙午', '丙巳', '丁午', '戊申', '己酉', '庚亥', '辛子', '壬寅', '癸卯'];
    if (cheonjuMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('heavenlyKitchen'));
    }
    // 복성귀인
    const bokseongMap = ['甲寅', '乙丑', '乙亥', '丙子', '丙戌', '丁酉', '戊申', '己未', '庚午', '辛巳', '壬辰', '癸卯'];
    if (bokseongMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('fortuneStar'));
    }
    // 황은대사
    const hwangeunMap = ['寅戌', '卯丑', '辰寅', '巳巳', '午酉', '未卯', '申子', '酉午', '戌亥', '亥辰', '子申', '丑未'];
    if (hwangeunMap.includes(wolji + jiji)) {
        sinsalResults.push(addResult('imperialPardon'));
    }
    // 문창귀인
    const munchangMap = ['甲巳', '乙午', '丙申', '丁酉', '戊申', '己酉', '庚亥', '辛子', '壬寅', '癸卯'];
    if (munchangMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('literaryNoble'));
    }
    // 문곡귀인
    const mungokMap = ['甲亥', '乙子', '丙寅', '丁卯', '戊寅', '己卯', '庚巳', '辛午', '壬申', '癸酉'];
    if (mungokMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('literaryCurve'));
    }
    // 학당귀인
    const hakdangMap = ['甲亥', '乙午', '丙寅', '丁酉', '戊寅', '己酉', '庚巳', '辛子', '壬申', '癸卯'];
    if (hakdangMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('academicHall'));
    }
    // 관귀학관
    const gwangwiMap = ['甲巳', '乙巳', '丙申', '丁申', '戊亥', '己亥', '庚寅', '辛寅', '壬寅', '癸寅'];
    if (gwangwiMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('officialAcademicHall'));
    }
    // 암록
    const amrokMap = ['甲亥', '乙戌', '丙申', '丁未', '戊申', '己未', '庚巳', '辛辰', '壬寅', '癸丑'];
    if (amrokMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('hiddenWealth'));
    }
    // 금여성
    const geumyeoMap = ['甲辰', '乙巳', '丙未', '丁申', '戊未', '己申', '庚戌', '辛亥', '壬丑', '癸寅'];
    if (geumyeoMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('goldenCarriage'));
    }
    // 천의성
    const cheonuiMap = ['子亥', '丑子', '寅丑', '卯寅', '辰卯', '巳辰', '午巳', '未午', '申未', '酉申', '戌酉', '亥戌'];
    if (cheonuiMap.includes(wolji + jiji)) {
        sinsalResults.push(addResult('heavenlyDoctor'));
    }
    // 천희성
    const cheonheeMap = ['寅未', '卯午', '辰巳', '巳辰', '午卯', '未寅', '申丑', '酉子', '戌亥', '亥戌', '子酉', '丑申'];
    if (cheonheeMap.includes(wolji + jiji)) {
        sinsalResults.push(addResult('heavenlyPleasure'));
    }
    // 재고귀인
    const jagoMap = ['甲辰', '乙辰', '丙丑', '丁丑', '戊丑', '己丑', '庚未', '辛未', '壬戌', '癸戌'];
    if (jagoMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('wealthTreasury'));
    }
    // 괴강살
    const goegangMap = ['壬辰', '戊戌', '庚辰', '庚戌'];
    if (goegangMap.includes(ganji)) {
        sinsalResults.push(addResult('extremePower'));
    }
    // 백호살
    const baekhoMap = ['甲辰', '乙未', '丙戌', '丁丑', '戊辰', '壬戌', '癸丑'];
    if (baekhoMap.includes(ganji)) {
        sinsalResults.push(addResult('whiteTiger'));
    }
    // 양인살
    const yanginMap = ['甲卯', '丙午', '戊午', '庚酉', '壬子'];
    // ['甲卯','乙辰','丙午','丁未','戊午','己未','庚酉','辛戌','壬子','癸丑']으로 계산하는 학파도 있음.
    if (yanginMap.includes(ilgan, jiji)) {
        sinsalResults.push(addResult('sheepBlade'));
    }
    // 비인살
    const biinMap = ['甲酉', '乙戌', '丙子', '丁丑', '戊子', '己丑', '庚卯', '辛辰', '壬午', '癸未'];
    if (biinMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('flyingBlade'));
    }
    // 홍염살
    const hongyeomMap = ['甲午', '乙午', '丙寅', '丁未', '戊辰', '己辰', '庚戌', '辛酉', '壬子', '癸申'];
    if (hongyeomMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('redFlame'));
    }
    // 원진살
    const wonjinMap = ['子未', '丑午', '寅酉', '卯申', '辰亥', '巳戌', '午丑', '未子', '申卯', '酉寅', '戌巳', '亥辰'];
    if (wonjinMap.includes(ilji + jiji) || wonjinMap.includes(jiji + ilji)) {
        sinsalResults.push(addResult('wonjin'));
    }
    // 귀문관살
    const gwimungwanMap = ['子酉', '丑午', '寅未', '卯申', '辰亥', '巳戌', '午丑', '未寅', '申卯', '酉子', '戌巳', '亥辰'];
    if (gwimungwanMap.includes(ilji + jiji) || gwimungwanMap.includes(jiji + ilji)) {
        sinsalResults.push(addResult('ghostGate'));
    }
    // 고신살(남성 전용 신살)
    const goshinMap = {
        '巳': ['寅', '卯', '辰'],
        '申': ['巳', '午', '未'],
        '亥': ['申', '酉', '戌'],
        '寅': ['亥', '子', '丑']
    };
    if (goshinMap[jiji]?.includes(yeonji) && saju.gender === 'male') {
        sinsalResults.push(addResult('lonelyWidower'));
    }
    // 과숙살(여성 전용 신살)
    const gwasukMap = {
        '丑': ['寅', '卯', '辰'],
        '辰': ['巳', '午', '未'],
        '未': ['申', '酉', '戌'],
        '戌': ['亥', '子', '丑']
    };
    if (gwasukMap[jiji]?.includes(yeonji) && saju.gender === 'female') {
        sinsalResults.push(addResult('lonelyWidow'));
    }
    // 음착살
    const eumchakMap = ['丁丑', '丁未', '申卯', '申酉', '癸巳', '癸亥'];
    if (eumchakMap.includes(ilju)) {
        sinsalResults.push(addResult('yinDiscord'));
    }
    // 양착살
    const yangchakMap = ['壬辰', '丙午', '壬戌', '丙子', '戊寅', '戊申', '甲寅'];
    if (yangchakMap.includes(ilju)) {
        sinsalResults.push(addResult('yangDiscord'));
    }
    // 탕화살
    const tanghwaMap = ['子午', '丑未', '寅寅', '卯午', '辰未', '巳寅', '午午', '未未', '申寅', '酉午', '戌未', '亥寅'];
    if (tanghwaMap.includes(yeonji + jiji)) {
        sinsalResults.push(addResult('burnInjury'));
    }
    // 급각살
    const geupgakMap = {
        '寅': ['亥', '子'], '卯': ['亥', '子'], '辰': ['亥', '子'],
        '巳': ['卯', '未'], '午': ['卯', '未'], '未': ['卯', '未'],
        '申': ['寅', '戌'], '酉': ['寅', '戌'], '戌': ['寅', '戌'],
        '亥': ['丑', '辰'], '子': ['丑', '辰'], '丑': ['丑', '辰'],
    };
    if (geupgakMap[wolji]?.includes(jiji)) {
        sinsalResults.push(addResult('boneFracture'));
    }
    // 단교관살
    /* const dangyogwanMap = ['子亥', '丑子', '寅寅', '卯卯', '辰申', '巳丑', '午戌', '未酉', '申辰', '酉巳', '戌午', '亥未'];
    if (dangyogwanMap.includes(ilji + jiji)) {
        sinsalResults.push(addResult('dangyogwan_sal'));
    } */
    // 상문살
    const sangmunMap = ['子寅', '丑卯', '寅辰', '卯巳', '辰午', '巳未', '午申', '未酉', '申戌', '酉亥', '戌子', '亥丑'];
    if (sangmunMap.includes(ilji + jiji)) {
        sinsalResults.push(addResult('funeralGate'));
    }
    // 유하살
    const yuhaMap = ['甲酉', '乙戌', '丙未', '丁申', '戊巳', '己午', '庚辰', '辛卯', '壬亥', '癸寅'];
    if (yuhaMap.includes(ilgan + jiji)) {
        sinsalResults.push(addResult('wanderingSpirit'));
    }
    // 공망
    let gongmangPair = [];
    // 60갑자 순환(순)에 따른 공망 찾기
    if (['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛미', '壬申', '癸酉'].includes(ilju)) gongmangPair = ['戌', '亥'];
    else if (['甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未'].includes(ilju)) gongmangPair = ['申', '酉'];
    else if (['甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳'].includes(ilju)) gongmangPair = ['午', '未'];
    else if (['甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯'].includes(ilju)) gongmangPair = ['辰', '巳'];
    else if (['甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑'].includes(ilju)) gongmangPair = ['寅', '卯'];
    else if (['甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'].includes(ilju)) gongmangPair = ['子', '丑'];
    // 비교 대상 지지가 공망에 해당하는지 확인
    if (gongmangPair.includes(jiji)) {
        sinsalResults.push(addResult('emptiness'));
    }
    // 상충살
    const sangchungMap = ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥', '午子', '未丑', '申寅', '酉卯', '戌辰', '亥巳'];
    for (let i = 0; i < Object.values(saju.branches).length; i++) {
        if (sangchungMap.includes(jiji + Object.values(saju.branches)[i])) {
            sinsalResults.push(addResult('conflict'));
            break;
        }
    }
    // 현침살
    const hyeonChimMap = {
        '甲': ['卯', '午', '申', '未'],
        '辛': ['亥', '子'],
    };
    if (hyeonChimMap[cheongan]?.includes(jiji)) {
        sinsalResults.push(addResult('suspendedNeedle'));
    }
    // 천라
    const cheonraMap = ['戌亥', '戌亥'];
    for (let i = 0; i < Object.values(saju.branches).length; i++) {
        if (cheonraMap.includes(jiji + Object.values(saju.branches)[i])) {
            sinsalResults.push(addResult('heavenlyNet'));
            break;
        }
    }
    // 지망
    const jimangMap = ['辰巳', '巳辰'];
    for (let i = 0; i < Object.values(saju.branches).length; i++) {
        if (jimangMap.includes(jiji + Object.values(saju.branches)[i])) {
            sinsalResults.push(addResult('earthlySnare'));
            break;
        }
    }
    /* if (jiji == '辰' && Object.values(saju.branches).include('巳') ||
        jiji == '巳' && Object.values(saju.branches).include('辰')) {
        sinsalResults.push(addResult('earthlySnare'));
    } */
    return sinsalResults;
}

function addResult(key) {
    const info = CONFIG[key];
    if (info) {
        return {
            key: key,
            name: info.korean,
            hanja: info.hanja,
            meaning: info.meaning,
            type: info.type,
        }
    }
}