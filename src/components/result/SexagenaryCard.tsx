import { cn } from "@/lib/utils";

export type Wuxing = "wood" | "fire" | "earth" | "metal" | "water";
export type YinYang = "yang" | "yin";

export interface SexagenaryCardProps {
      wuxing?: Wuxing;
      rounded?: boolean;
      hanja: Hanja;
      hangul?: string;
      className?: string;
};

const wuXingColor = {
    wood: "bg-[#048C4A] text-white",
    fire: "bg-[#B41400] text-white",
    earth: "bg-[#FFC043] text-black",
    metal: "bg-white text-black",
    water: "bg-black text-white"
};

const ganjiKorean = {
  子: {
        korean: '자',
        wuxing: 'water',
        yinyang: 'yang'
  },
  丑: {
        korean: '축',
        wuxing: 'earth',
        yinyang: 'yin'
  },
  寅: {
        korean: '인',
        wuxing: 'wood',
        yinyang: 'yang'
  },
  卯: {
        korean: '묘',
        wuxing: 'wood',
        yinyang: 'yin'
  },
  辰: {
        korean: '진',
        wuxing: 'earth',
        yinyang: 'yang'
  },
  巳: {
        korean: '사',
        wuxing: 'fire',
        yinyang: 'yin'
  },
  午: {
        korean: '오',
        wuxing: 'fire',
        yinyang: 'yang'
  },
  未: {
        korean: '미',
        wuxing: 'earth',
        yinyang: 'yin'
  },
  申: {
        korean: '신',
        wuxing: 'metal',
        yinyang: 'yang'
  },
  酉: {
        korean: '유',
        wuxing: 'metal',
        yinyang: 'yin'
  },
  戌: {
        korean: '술',
        wuxing: 'earth',
        yinyang: 'yang'
  },
  亥: {
        korean: '해',
        wuxing: 'water',
        yinyang: 'yin'
  },
  甲: {
        korean: '갑',
        wuxing: 'wood',
        yinyang: 'yang'
  },
  乙: {
        korean: '을',
        wuxing: 'wood',
        yinyang: 'yin'
  },
  丙: {
        korean: '병',
        wuxing: 'fire',
        yinyang: 'yang'
  },
  丁: {
        korean: '정',
        wuxing: 'fire',
        yinyang: 'yin'
  },
  戊: {
        korean: '무',
        wuxing: 'earth',
        yinyang: 'yang'
  },
  己: {
        korean: '기',
        wuxing: 'earth',
        yinyang: 'yin'
  },
  庚: {
        korean: '경',
        wuxing: 'metal',
        yinyang: 'yang'
  },
  辛: {
        korean: '신',
        wuxing: 'metal',
        yinyang: 'yin'
  },
  壬: {
        korean: '임',
        wuxing: 'water',
        yinyang: 'yang'
  },
  癸: {
        korean: '계',
        wuxing: 'water',
        yinyang: 'yin'
  }
} as const;

export type Hanja = keyof typeof ganjiKorean;

function SexagenaryCard({
    wuxing,
    rounded = true,
    hanja,
    hangul,
    className
}: SexagenaryCardProps) {
    return (
        <div
            className={cn(
                "mx-auto size-12 flex flex-col justify-center items-center border-1 border-solid border-neutral-200",
                rounded ? "rounded-full" : "rounded-lg",
                wuxing ? wuXingColor[wuxing] : wuXingColor[ganjiKorean[hanja].wuxing],
                className
            )}>
            <span className="text-lg font-semibold">{hanja}</span>
            <span className="text-xs font-normal">{ganjiKorean[hanja].yinyang === 'yang' ? '+' : '-'}{hangul ? hangul : ganjiKorean[hanja].korean}</span>
        </div>
    );
}

export {
    SexagenaryCard,
}
