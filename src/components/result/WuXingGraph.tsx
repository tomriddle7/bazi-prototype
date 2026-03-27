import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// import OhaengIcon from '@/components/result/OhaengIcon';
// import OhaengBadge from '@/components/result/OhaengBadge';

// 오행 설정 데이터 (위치 및 색상 고정값)
const ELEMENTS_CONFIG: {
    [key: string]: {
        label: string;
        color: string;
        x: number;
        y: number;
    }
} = {
    wood: { label: '木', color: '#4CAF50', x: 250, y: 70 },
    fire: { label: '火', color: '#E91E63', x: 421.19, y: 194.38 },
    earth: { label: '土', color: '#FFB300', x: 355.80, y: 395.62 },
    metal: { label: '金', color: '#757575', x: 144.20, y: 395.62 },
    water: { label: '水', color: '#212121', x: 78.81, y: 194.38 },
};

const GENERATES: { [key: string]: string } = {
    wood: "fire",
    fire: "earth",
    earth: "metal",
    metal: "water",
    water: "wood",
};

const POSITION: { x: number; y: number }[] = [
    { x: 250, y: 70 },
    { x: 421.19, y: 194.38 },
    { x: 355.80, y: 395.62 },
    { x: 144.20, y: 395.62 },
    { x: 78.81, y: 194.38 },
];

const KOREAN: { [key: string]: string } = {
    wood: "목",
    fire: "화",
    earth: "토",
    metal: "금",
    water: "수",
};

const wuXingBg: { [key: string]: string } = {
    wood: "bg-[#10B981]",
    fire: "bg-[#EF4444]",
    earth: "bg-[#FBBF24]",
    metal: "bg-white",
    water: "bg-black"
};

const wuXingColor: {
    [key: string]: {
        korean: string;
        color: string;
    }
} = {
    insufficient: {
        korean: '부족',
        color: 'bg-black',
    },
    adequate: {
        korean: '적정',
        color: 'bg-[#10B981]',
    },
    development: {
        korean: '발달',
        color: 'bg-[#1F5C99]',
    },
    excessive: {
        korean: '과다',
        color: 'bg-[#EF4444]',
    }
};

// 십성 테이블 렌더링을 위한 매핑 배열
const TEN_GOD_MAP: { idx: number; gods: { label: string; key: string }[] }[] = [
    { idx: 0, gods: [{ label: '비견', key: 'companion' }, { label: '겁재', key: 'robWealth' }] },
    { idx: 1, gods: [{ label: '식신', key: 'eatingGod' }, { label: '상관', key: 'hurtingOfficer' }] },
    { idx: 2, gods: [{ label: '편재', key: 'indirectWealth' }, { label: '정재', key: 'directWealth' }] },
    { idx: 3, gods: [{ label: '편관', key: 'sevenKillings' }, { label: '정관', key: 'directOfficer' }] },
    { idx: 4, gods: [{ label: '편인', key: 'indirectSeal' }, { label: '정인', key: 'directSeal' }] },
];

const WuXingGraph = ({ data, ilgan, tenGod }: any) => {
    // 오행 순서 배열 생성
    let chartOrder = [ilgan];
    for (let i = 0; i < 4; i++) {
        chartOrder = chartOrder.concat(GENERATES[chartOrder.at(-1)]);
    }

    // 기본값 설정 (데이터가 없을 경우 0%)
    const chartData = {
        wood: 0,
        fire: 0,
        earth: 0,
        metal: 0,
        water: 0,
        ...data
    };

    // 노드 렌더링 헬퍼 함수
    const renderNode = (index) => {
        const key = chartOrder[index];
        const config = ELEMENTS_CONFIG[key];
        const percentage = chartData[key] || 0; // 0 ~ 100 사이 값
        const radius = 45;
        const diameter = 90;

        // 비율에 따른 높이 계산
        // SVG 내부 y좌표는 위에서 아래로 증가하므로, 바닥에서 차오르게 하려면 y 위치를 조정해야 함
        const fillHeight = (percentage / 100) * diameter;
        const fillY = 45 - fillHeight; // rect의 y 시작점 (중심 기준 45가 바닥)

        return (
            <g transform={`translate(${POSITION[index].x}, ${POSITION[index].y})`} key={key}>
                <circle r={radius} className="node-circle" />
                <clipPath id={`clip-${key}`}>
                    <circle r={radius - 0.5} />
                </clipPath>

                {/* 채워지는 부분 */}
                <rect
                    x={-radius}
                    y={fillY}
                    width={diameter}
                    height={fillHeight}
                    fill={config.color}
                    clipPath={`url(#clip-${key})`}
                    className="node-fill"
                />

                {/* 퍼센트 뱃지 */}
                <rect x="-32" y="-13" width="64" height="26" rx="9" className="percentage-badge" />
                <text y="6" className="percentage-text">
                    {percentage.toFixed(1)}%
                </text>

                {/* 아이콘 (한자) 뱃지 위치 조정 */}
                {/* 목(Top), 화(Top), 토(Bottom), 금(Bottom), 수(Top) 등 원본 디자인의 위치 반영 */}
                <g transform={`translate(0, ${index === 2 || index === 3 ? 45 : -45})`}>
                    <rect
                        x="-13"
                        y="-13"
                        width="26"
                        height="26"
                        rx="7"
                        fill={config.color}
                        stroke="white"
                        strokeWidth="1.5"
                    />
                    <text y="4.5" className="icon-badge-text">
                        {config.label}
                    </text>
                </g>
            </g>
        );
    };

    return (
        <>
            <div className="w-full max-w-[500px] mx-auto">
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <style>
                        {`
            @import url('https://fonts.googleapis.com/css2?family=Pretendard:wght@400;600;700&display=swap');
            .node-circle { fill: white; stroke: #f2f2f2; stroke-width: 1.5; }
            .percentage-badge { fill: none; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0)); }
            .percentage-text { font-family: 'Pretendard', sans-serif; font-size: 14px; font-weight: 700; text-anchor: middle; fill: #111; }
            .icon-badge-text { font-family: 'Pretendard', sans-serif; font-size: 13px; font-weight: 700; text-anchor: middle; fill: white; }
            .arrow-line-saeng { fill: none; stroke: #42A5F5; stroke-width: 2.2; stroke-linecap: round; marker-end: url(#head-saeng); }
            .arrow-line-geuk { fill: none; stroke: #EF5350; stroke-width: 2.2; stroke-linecap: round; marker-end: url(#head-geuk); }
            .legend-text { font-family: 'Pretendard', sans-serif; font-weight: 700; font-size: 14px; fill: #555; dominant-baseline: middle; }
            .legend-box { fill: rgba(255, 255, 255, 0.95); stroke: #efefef; stroke-width: 1; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.05)); }
            /* Transition for smooth animation */
            .node-fill { transition: y 0.5s ease-out, height 0.5s ease-out; } 
          `}
                    </style>
                    <defs>
                        <marker id="head-saeng" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                            <path d="M0,2 L8,5 L0,8 Z" fill="#42A5F5" />
                        </marker>
                        <marker id="head-geuk" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                            <path d="M0,2 L8,5 L0,8 Z" fill="#EF5350" />
                        </marker>
                    </defs>

                    <g fill="white" transform="translate(20, 20)">
                        <rect width="100" height="76" rx="16" className="legend-box" />

                        <g transform="translate(18, 25)">
                            <text x="0" y="0" className="legend-text">생</text>
                            <line x1="24" y1="0" x2="65" y2="0" stroke="#42A5F5" strokeWidth="2.2" markerEnd="url(#head-saeng)" />
                        </g>

                        <g transform="translate(18, 51)">
                            <text x="0" y="0" className="legend-text">극</text>
                            <line x1="24" y1="0" x2="65" y2="0" stroke="#EF5350" strokeWidth="2.2" markerEnd="url(#head-geuk)" />
                        </g>
                    </g>

                    {/* 상생 화살표 (파란색) */}
                    <g id="arrows-saeng-layer">
                        <path d="M 297.73 104.68 A 180 180 0 0 1 373.46 159.70" className="arrow-line-saeng" />
                        <path d="M 402.96 250.49 A 180 180 0 0 1 374.03 339.51" className="arrow-line-saeng" />
                        <path d="M 296.80 395.62 A 180 180 0 0 1 203.20 395.62" className="arrow-line-saeng" />
                        <path d="M 125.97 339.51 A 180 180 0 0 1 97.04 250.49" className="arrow-line-saeng" />
                        <path d="M 126.54 159.70 A 180 180 0 0 1 202.27 104.68" className="arrow-line-saeng" />
                    </g>

                    {/* 상극 화살표 (빨간색) */}
                    <g id="arrows-geuk-layer">
                        <path d="M 268.23 126.11 L 337.57 339.51" className="arrow-line-geuk" />
                        <path d="M 308.07 360.94 L 126.54 229.06" className="arrow-line-geuk" />
                        <path d="M 137.81 194.38 L 362.19 194.38" className="arrow-line-geuk" />
                        <path d="M 373.46 229.06 L 191.93 360.94" className="arrow-line-geuk" />
                        <path d="M 162.43 339.51 L 231.77 126.11" className="arrow-line-geuk" />
                    </g>

                    {/* 노드 레이어 */}
                    <g id="nodes-layer">
                        {renderNode(0)}
                        {renderNode(1)}
                        {renderNode(2)}
                        {renderNode(3)}
                        {renderNode(4)}
                    </g>
                </svg>
            </div>
            <Table className="w-full border-1 border-solid border-neutral-200 rounded-lg">
                <TableBody>
                    {TEN_GOD_MAP.map((row) => {
                        const elementKey = chartOrder[row.idx];
                        let badge = 'insufficient';
                        if (data[elementKey] <= 12.5) {
                            badge = 'insufficient';
                        } else if (data[elementKey] <= 25) {
                            badge = 'adequate';
                        } else if (data[elementKey] <= 37.5) {
                            badge = 'development';
                        } else {
                            badge = 'excessive';
                        }
                        return (

                            <TableRow key={`row-${row.idx}`}>
                                <TableCell>
                                    <div className="flex flex-row items-center justify-center gap-1 h-fit">
                                        {/* <OhaengIcon wuxing={elementKey} /> */}
                                        <Badge className={`rounded-md w-6 h-6 ${wuXingBg[elementKey]}`}>
                                            <span className={`font-bold !text-[11px] ${elementKey === 'metal' ? 'text-black' : 'text-white'}`}>
                                                {ELEMENTS_CONFIG[elementKey].label}
                                            </span>
                                        </Badge>
                                        <span className="text-xs font-medium">
                                            {KOREAN[elementKey]} {data[elementKey]}%
                                        </span>
                                        {/* <OhaengBadge sipsin={data[chartOrder[0]]} /> */}
                                        <Badge className={`rounded-md ${wuXingColor[badge].color}`}>
                                            <span className="font-bold !text-[10px]">
                                                {wuXingColor[badge].korean}
                                            </span>
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 items-center justify-center">
                                    {row.gods.map((god) => (
                                        <p key={god.key} className="text-xs font-medium text-foreground">
                                            {god.label} {tenGod[god.key]}%
                                        </p>
                                    ))}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}

export default WuXingGraph;
