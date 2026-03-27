import { getTenGodForStem, getTenGodForBranch } from '@gracefullight/saju';
import { SexagenaryCard } from '@/components/result/SexagenaryCard';

const LuckCycleCard = ({ luckArr, selected, titleProp, callback, ilgan }: any) => {
    return (
        <div className="flex">
            <div className="flex flex-row-reverse gap-1 overflow-scroll px-1 scrollbar-hide">
                {luckArr?.map((luck: any, i: number) => {
                    return (
                        <div key={`luck-${i}`} className={`my-1 ring-2 rounded-md p-1 ${Number(selected) === luck[titleProp] ? 'ring-black' : 'ring-transparent'}`} onClick={(e) => {
                            e.preventDefault();
                            if (callback) callback(luck[titleProp]);
                        }}>
                            <p className="text-xs">{luck[titleProp]}</p>
                            <p className="text-xs font-semibold">{getTenGodForStem(ilgan, luck.stem)?.korean}</p>
                            <SexagenaryCard
                                hanja={luck.stem}
                                rounded={false}
                                className="mb-1"
                            />
                            <SexagenaryCard
                                hanja={luck.branch}
                                rounded={false}
                                className="mb-1"
                            />
                            <p className="text-xs font-semibold">{getTenGodForBranch(ilgan, luck.branch)?.korean}</p>
                        </div>
                    )
                })}
            </div>
        </div>

    );
}

export default LuckCycleCard;
