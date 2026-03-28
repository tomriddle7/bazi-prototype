import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { SexagenaryCard } from '@/components/result/SexagenaryCard';
import { getTenGodKey, getTenGodLabel } from '@gracefullight/saju';
import { drawerDataList, SEXAGENARY } from '@/lib/utils';
import { X } from 'lucide-react';

export interface SajuTerm {
    korean: string;
    hanja: string;
    key?: string;
}

export interface SinsalItem {
    name: string;
    hanja: string;
}

const SajuDrawer = ({ data }: { data: SajuTerm }) => {
    const { korean, hanja } = data;

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="ghost" className="h-4 px-1 text-xs">{korean}</Button>
            </DrawerTrigger>
            <DrawerContent className="fixed no-scrollbar h-2/5">
                <ScrollArea className='break-keep no-scrollbar overflow-y-auto mx-auto w-full pb-9 px-8'>
                    <DrawerHeader className="flex flex-row px-0 items-center justify-between">
                        <DrawerTitle>{`${korean}(${hanja})`}</DrawerTitle>
                        <DrawerClose><X size={20} /></DrawerClose>
                    </DrawerHeader>
                    {drawerDataList[korean].def.length > 0 &&
                        <>
                            <DrawerDescription className="font-medium">
                                한 줄 정의
                            </DrawerDescription>
                            <p>{drawerDataList[korean].def}</p>
                        </>}
                    <DrawerDescription className="font-medium">
                        설명
                    </DrawerDescription>
                    <p>{drawerDataList[korean].desc}</p>
                    {drawerDataList[korean].saju.length > 0 &&
                        <ul className="list-disc list-inside">
                            {drawerDataList[korean].saju.map((saju, i) => {
                                return <li key={`sigan-saju-${i}`}>{saju}</li>
                            })}
                        </ul>}
                    <DrawerDescription className="font-medium mt-2">
                        TIP
                    </DrawerDescription>
                    <p className="mb-3">{drawerDataList[korean].tip}</p>
                    <div className="flex flex-row">
                        {drawerDataList[korean].keyword.map((key, i) => {
                            return <span className="text-neutral-950 font-semibold px-2 py-0.5 mx-1 rounded-lg ring-1 ring-neutral-200" key={`sigan-key-${i}`}>{key}</span>
                        })}
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
};

const FourPillarsTable = ({ tenGod, pillar, twelveStage, gongmang, sinsal, sinsal12 }: any) => {
    // 지장간 매핑 데이터
    const zizangan: {
        [key: string]: string;
    } = {
        '子': '壬癸', // 임계
        '丑': '癸辛己', // 계신기
        '寅': '戊丙甲', // 무병값
        '卯': '甲乙', // 갑을
        '辰': '乙癸戊', // 을계무
        '巳': '戊庚丙', // 무경병
        '午': '丙己丁', // 병기정
        '未': '丁乙己', // 정을기
        '申': '戊壬庚', // 기무임경
        '酉': '庚辛', // 경신
        '戌': '辛丁戊', // 신정무
        '亥': '戊甲壬', // 무갑임
    };

    const getZizanganKorean = (dayMaster: string, stem: string) => {
        const hiddenStems = getTenGodKey(dayMaster, stem);
        return `${SEXAGENARY.stems[stem].korean}(${getTenGodLabel(hiddenStems).korean})`;
    };

    return (
        <div className="w-full rounded-lg border border-neutral-200 overflow-hidden">
            <Table>
                <TableHeader className="bg-neutral-100">
                    <TableRow>
                        {/* <TableHead scope="row"></TableHead> */}
                        <TableHead className="text-center text-xs font-medium h-7" scope="col">시주</TableHead>
                        <TableHead className="text-center text-xs font-medium h-7" scope="col">일주</TableHead>
                        <TableHead className="text-center text-xs font-medium h-7" scope="col">월주</TableHead>
                        <TableHead className="text-center text-xs font-medium h-7" scope="col">년주</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {/* <TableHead scope="row">십성</TableHead> */}
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.hour.stem.tenGod} />
                        </TableCell>
                        <TableCell className="py-1">
                            <Button variant="ghost" className="h-4 px-1 text-xs">{tenGod?.day.stem.tenGod.korean}</Button>
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.month.stem.tenGod} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.year.stem.tenGod} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">천간</TableHead> */}
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.hour[0]}
                            />
                        </TableCell>
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.day[0]}
                            />
                        </TableCell>
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.month[0]}
                            />
                        </TableCell>
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.year[0]}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">지지</TableHead> */}
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.hour[1]}
                            />
                        </TableCell>
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.day[1]}
                            />
                        </TableCell>
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.month[1]}
                            />
                        </TableCell>
                        <TableCell>
                            <SexagenaryCard
                                hanja={pillar?.year[1]}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">십성</TableHead> */}
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.hour.branch.tenGod} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.day.branch.tenGod} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.month.branch.tenGod} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={tenGod?.year.branch.tenGod} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">지장간</TableHead> */}
                        <TableCell className="py-1">
                            {zizangan[pillar?.hour[1]].split('').map((char, i) => {
                                return <p className="text-xs font-medium" key={`zizan-hour-${i}`}>{getZizanganKorean(pillar?.day[0], char)}</p>
                            })}
                        </TableCell>
                        <TableCell className="py-1">
                            {zizangan[pillar?.day[1]].split('').map((char, i) => {
                                return <p className="text-xs font-medium" key={`zizan-day-${i}`}>{getZizanganKorean(pillar?.day[0], char)}</p>
                            })}
                        </TableCell>
                        <TableCell className="py-1">
                            {zizangan[pillar?.month[1]].split('').map((char, i) => {
                                return <p className="text-xs font-medium" key={`zizan-month-${i}`}>{getZizanganKorean(pillar?.day[0], char)}</p>
                            })}
                        </TableCell>
                        <TableCell className="py-1">
                            {zizangan[pillar?.year[1]].split('').map((char, i) => {
                                return <p className="text-xs font-medium" key={`zizan-year-${i}`}>{getZizanganKorean(pillar?.day[0], char)}</p>
                            })}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">12운성</TableHead> */}
                        <TableCell className="py-1">
                            <SajuDrawer data={twelveStage?.hour} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={twelveStage?.day} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={twelveStage?.month} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={twelveStage?.year} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">공망</TableHead> */}
                        <TableCell className="py-1">
                            <p className="text-xs font-medium">{gongmang?.includes('hour') ? '공망' : '-'}</p>
                        </TableCell>
                        <TableCell className="py-1">
                            <p className="text-xs font-medium">{gongmang?.includes('day') ? '공망' : '-'}</p>
                        </TableCell>
                        <TableCell className="py-1">
                            <p className="text-xs font-medium">{gongmang?.includes('month') ? '공망' : '-'}</p>
                        </TableCell>
                        <TableCell className="py-1">
                            <p className="text-xs font-medium">{gongmang?.includes('year') ? '공망' : '-'}</p>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">십이신살</TableHead> */}
                        <TableCell className="py-1">
                            <SajuDrawer data={{
                                korean: sinsal12?.hour[0]?.name,
                                hanja: sinsal12?.hour[0]?.hanja
                            }} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={{
                                korean: sinsal12?.day[0]?.name,
                                hanja: sinsal12?.day[0]?.hanja
                            }} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={{
                                korean: sinsal12?.month[0]?.name,
                                hanja: sinsal12?.month[0]?.hanja
                            }} />
                        </TableCell>
                        <TableCell className="py-1">
                            <SajuDrawer data={{
                                korean: sinsal12?.year[0]?.name,
                                hanja: sinsal12?.year[0]?.hanja
                            }} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableHead scope="row">신살</TableHead> */}
                        <TableCell className="py-1">
                            {sinsal?.hour?.map((item: SinsalItem, index: number) => {
                                return <div key={`h-${index}`}>
                                    <SajuDrawer key={`h-${index}`} data={{
                                        korean: item.name,
                                        hanja: item.hanja
                                    }} />
                                </div>
                            })}
                        </TableCell>
                        <TableCell className="py-1">
                            {sinsal?.day?.map((item: SinsalItem, index: number) => {
                                return <div key={`d-${index}`}>
                                    <SajuDrawer data={{
                                        korean: item.name,
                                        hanja: item.hanja
                                    }} />
                                </div>
                            })}
                        </TableCell>
                        <TableCell className="py-1">
                            {sinsal?.month?.map((item: SinsalItem, index: number) => {
                                return <div key={`m-${index}`}>
                                    <SajuDrawer data={{
                                        korean: item.name,
                                        hanja: item.hanja
                                    }} />
                                </div>
                            })}
                        </TableCell>
                        <TableCell className="py-1">
                            {sinsal?.year?.map((item: SinsalItem, index: number) => {
                                return <div key={`y-${index}`}>
                                    <SajuDrawer data={{
                                        korean: item.name,
                                        hanja: item.hanja
                                    }} />
                                </div>
                            })}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default FourPillarsTable;
