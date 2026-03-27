const Strength = ({ data: { strength: { level, score }, yongshen } }: { data: { strength: { level: any, score: number }, yongshen: any } }) => {

    // viewBox 기준 내부 고정 수치 (이 수치들은 화면 크기에 맞춰 자동 스케일링 됨)
    const size = 200;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2; // 95

    const circumference = Math.PI * radius;
    const clampedScore = Math.min(Math.max(score, 0), 100);
    const strokeDashoffset = circumference - (circumference * clampedScore) / 100;

    const d = `M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`;

    const getDayMaster = (level: { korean: string; }) => {
        switch (level.korean) {
            case '극약':
                return '내 에너지가 많이 약한 상태예요. 주변의 도움과 지지가 꼭 필요한 시기예요.';
            case '태약':
                return '혼자 감당하기엔 버거운 게 많아요. 무리하지 말고 천천히 힘을 모아가세요';
            case '신약':
                return '내 힘보다 환경의 영향을 더 받는 편이에요. 안정적인 기반을 만드는 게 중요해요.';
            case '중화신약':
                return '거의 균형에 가깝지만 살짝 약한 편이에요. 컨디션 관리에 신경 쓰면 좋아요.';
            case '중화':
                return '나의 힘과 환경의 강약이 균형 잡힌 상태예요. 상황에 따라 유연하게 조절하는 능력이 필요해요.';
            case '중화신강':
                return '거의 균형에 가깝지만 살짝 강한 편이에요. 주변과 조화를 이루면 더 좋아요.';
            case '신강':
                return '내 힘이 환경보다 센 편이에요. 추진력은 좋지만 독단적이지 않게 주의하세요.';
            case '태강':
                return '에너지가 넘쳐서 주변과 부딪힐 수 있어요. 한 발 물러서는 여유가 필요해요.';
            case '극왕':
                return '내 에너지가 매우 강한 상태예요. 그 힘을 어디에 쓸지 방향을 잘 잡는 게 중요해요.';
            default:
                return '';
        }
    };

    return (
        <div className="w-full">
            {/* w-full max-w-[250px]: 최대 폭 250px 제한 */}
            {/* mx-auto: 웹에서의 가운데 정렬 (RN의 self-center 대체) */}
            {/* flex flex-col: RN의 기본 뷰 방향(세로) 적용 */}
            <div className="w-full max-w-[250px] aspect-[7/5] mx-auto relative flex flex-col justify-start items-center">

                {/* 1. 배경 그래프 레이어 */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* 웹 표준 svg 태그 사용 */}
                    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
                        {/* 회색 배경 트랙 */}
                        <path
                            d={d}
                            fill="none"
                            stroke="#f5f5f5"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                        />
                        {/* 실제 수치 게이지 */}
                        <path
                            d={d}
                            fill="none"
                            stroke="#0a0a0a"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            // 웹 환경에서 부드럽게 차오르는 애니메이션 효과 (선택사항)
                            className="transition-[stroke-dashoffset] duration-700 ease-out"
                        />
                    </svg>
                </div>

                {/* 2. 텍스트 및 뱃지 레이어 (Absolute) */}
                {/* w-full을 주어 텍스트가 중앙에 잘 오도록 설정 */}
                <div className="absolute top-[38%] flex flex-col items-center w-full px-4">
                    <span className="block text-5xl font-bold">
                        {score}
                    </span>
                    <span className="h-5 rounded-2xl px-2 py-0.5 font-medium transition-all inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 overflow-hidden bg-primary text-white text-xs font-bold">
                        {level.korean}
                    </span>
                    <p className="mt-3 text-center text-sm break-keep whitespace-pre-wrap">
                        {getDayMaster(level)}
                    </p>
                </div>
            </div>

            {/* 3. 하단 용신 정보 카드 */}
            {/* 바깥쪽 컨테이너(가장 상위 div)의 흐름을 타도록 배치 */}
            <div className="flex flex-col text-left p-4 bg-neutral-100 rounded-lg mt-14">
                <span className="text-xs text-neutral-950 mb-1">용신</span>
                <span className="text-sm font-medium text-neutral-950">
                    {`${yongshen?.primary.hanja}: ${yongshen?.method.korean}`}
                </span>
            </div>
        </div>
    );
};

export default Strength;