import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";

import SaveHeader from "@/components/SaveHeader";
import { ProfileSaveCard } from "@/components/result/ProfileCard";
import FourPillarsTable from '@/components/result/FourPillarsTable';
import WuXingGraph from "@/components/result/WuXingGraph";
import Relation from "@/components/result/Relation";
import Strength from "@/components/result/Strength";
import LuckCycleCard from "@/components/result/LuckCycleCard";
import { DateTime } from "luxon";
import {
    getLunarDate,
    getStemElement,
    getBranchElement,
    getTenGodKey,
    getTenGodLabel,
} from "@gracefullight/saju";
import {
    BIRTH_DATE_RGX,
    BIRTH_TIME_RGX,
    getDayGanji,
    SEXAGENARY,
} from "@/lib/utils";
import SajuLocalService from "@/providers/services/saju-local.service";

const Result = () => {
    const location = useLocation();

    const sajuApi = new SajuLocalService();

    const personInfo = { ...location.state };

    const [tenGod, setTenGod] = useState({});
    const [pillar, setPillar] = useState({});
    const [twelveStage, setTwelveStage] = useState([]);
    const [gongmang, setGongmang] = useState([]);
    const [sinsal, setSinsal] = useState({});
    const [sinsal12, setSinsal12] = useState({});
    const [majorLuck, setMajorLuck] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [yearLuck, setYearLuck] = useState({});
    const [monthLuck, setMonthLuck] = useState({});
    const [graph, setGraph] = useState({});
    const [tenGodData, setTenGodData] = useState({});
    const [yearTerms, setYearTerms] = useState({});
    const [strength, setStrength] = useState({});
    const [relations, setRelations] = useState({});
    const [yongshen, setYongshen] = useState({});

    const [tab, setTab] = useState(0);

    const zizangan = {
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

    const getZizanganKorean = (dayMaster, stem) => {
        const hiddenStems = getTenGodKey(dayMaster, stem);
        return `${SEXAGENARY.stems[stem].korean}(${getTenGodLabel(hiddenStems).korean})`;
    };

    const handleSubmit = async () => {
        const currentYear = DateTime.now().year;
        const { summerTime: _, birthDate, birthTime, ...paramInfo } = personInfo;
        const {
            gongmang,
            pillars,
            tenGods,
            twelveStages,
            sinsals,
            sinsals12,
            majorLuck,
            relations,
            strength,
            yongShen,
        } = await sajuApi.fetchAnalyzedSaju({
            ...paramInfo,
            birthDate: birthDate.replace(BIRTH_DATE_RGX, "$1-$2-$3"),
            birthTime: birthTime.replace(BIRTH_TIME_RGX, "$1:$2"),
        });

        setPillar(pillars);
        setTenGod(tenGods);
        setTwelveStage(twelveStages);
        setGongmang(gongmang);
        setYongshen(yongShen);
        setSinsal(sinsals);
        setSinsal12(sinsals12);

        // 대운 계산(대운은 변하지 않음)
        setMajorLuck(majorLuck.pillars);
        // 현재 나이 계산
        let startAge = majorLuck.pillars[0].startAge;
        const year = personInfo.birthDate.substring(0, 4);
        while (Number(year) + startAge + 10 < currentYear) {
            startAge += 10;
        }
        // 세운&월운 초기값 계산
        Promise.all([
            changeSelectedMajor(startAge),
            changeSelectedYear(currentYear),
            getCurrentSolarTerms(currentYear)
        ]);
        // 달력 계산
        // const solarTermsList = getSolarTermsForYear(currentYear, { adapter, timezone: "Asia/Seoul" });
        // const newList = solarTermsList.map(term => {
        //   return {
        //     date: `${term.date.year}-${term.date.month.toString().padStart(2, '0')}-${term.date.day.toString().padStart(2, '0')}`,
        //     ...term.term
        //   }
        // })
        // const solarTerms = Object.fromEntries(
        //   newList.map((value) => [value.date, value])
        // );
        // setYearTerms(solarTerms);

        saveWuXingData(pillars.hour + pillars.day + pillars.month + pillars.year);
        saveTenGodData(tenGods);
        setStrength(strength);
        setRelations(relations);
    };

    const saveWuXingData = (saju) => {
        const ganji = {
            wood: 0,
            fire: 0,
            earth: 0,
            metal: 0,
            water: 0
        };

        let wu = '';
        for (let i = 0; i < saju.length; i++) {
            if (i % 2 === 0) {
                wu = getStemElement(saju[i]);
            } else {
                wu = getBranchElement(saju[i]);
            }
            ganji[wu] += 12.5;
        }
        setGraph(ganji);
    };

    const saveTenGodData = (tenGods) => {
        const sipsin = {
            companion: 0,
            robWealth: 0,
            eatingGod: 0,
            hurtingOfficer: 0,
            indirectWealth: 0,
            directWealth: 0,
            sevenKillings: 0,
            directOfficer: 0,
            indirectSeal: 0,
            directSeal: 0
        };
        const tenGodData = { ...tenGods };
        delete tenGodData['dayMaster'];
        for (const i in tenGodData) {
            // 일간 예외처리
            tenGodData[i].stem.tenGod.key === 'dayMaster' ? sipsin['companion'] += 12.5 : sipsin[tenGodData[i].stem.tenGod.key] += 12.5;
            sipsin[tenGodData[i].branch.tenGod.key] += 12.5;
        }
        setTenGodData(sipsin);
    };

    const changeSelectedMajor = async (startAge) => {
        if (!yearLuck[startAge]) {
            const year = personInfo.birthDate.substring(0, 4);
            const yearlyLuck = await sajuApi.fetchYearlyLuck({
                birthYear: Number(year),
                startAge,
            });
            setYearLuck({
                ...yearLuck,
                [startAge]: yearlyLuck,
            });
        }
        setSelectedMajor(`major-${startAge}`);
    };

    const changeSelectedYear = async (year) => {
        if (!monthLuck[year]) {
            const monthlyLuck = await sajuApi.fetchMonthlyLuck({
                year,
            });
            setMonthLuck({
                ...monthLuck,
                [year]: monthlyLuck,
            });
        }
        setSelectedYear(`year-${year}`);
    };

    const getCurrentSolarTerms = async (year) => {
        if (yearTerms[year]) return;
        const solarTerms = await sajuApi.fetchSolarTerms(year);
        setYearTerms({
            ...yearTerms,
            [year]: solarTerms,
        });
    };

    useEffect(() => {
        (async () => {
            await handleSubmit();
        })();
    }, []);

    return (
        <>
            {/* Header */}
            <SaveHeader
                title=""
                personInfo={{ ...personInfo, ...pillar }}
                visible={{}}
            />

            {Object.keys(sinsal).length > 0 && Object.keys(sinsal12).length > 0 && (
                <main className="flex flex-col min-h-screen mx-auto relative px-5 pt-4 gap-6">
                    <section className="-mb-4">
                        <ProfileSaveCard info={{ ...personInfo, ...pillar }} />
                    </section>
                    <section>
                        <FourPillarsTable tenGod={tenGod} pillar={pillar} twelveStage={twelveStage} gongmang={gongmang} sinsal={sinsal} sinsal12={sinsal12} />
                    </section>
                    <section>
                        <div className="flex item-start justify-start gap-1 overflow-scroll px-1 py-4 scrollbar-hide">
                            <button
                                className={`px-2 py-0.5 text-xs font-semibold rounded-lg bg-neutral-100 ring-2${tab === 0 ? " ring-neutral-200" : " ring-transparent"
                                    }`}
                                onClick={() => setTab(0)}
                            >
                                오행과 십성
                            </button>
                            <button
                                className={`px-2 py-0.5 text-xs font-semibold rounded-lg bg-neutral-100 ring-2${tab === 1 ? " ring-neutral-200" : " ring-transparent"
                                    }`}
                                onClick={() => setTab(1)}
                            >
                                사주관계(합형충파해)
                            </button>
                            <button
                                className={`px-2 py-0.5 text-xs font-semibold rounded-lg bg-neutral-100 ring-2${tab === 2 ? " ring-neutral-200" : " ring-transparent"
                                    }`}
                                onClick={() => setTab(2)}
                            >
                                신강신약
                            </button>
                        </div>
                        {tab === 0 && (
                            <WuXingGraph
                                data={graph}
                                ilgan={getStemElement(pillar?.day[0])}
                                tenGod={tenGodData}
                            />
                        )}
                        {tab === 1 && <Relation pillar={pillar} data={relations} />}
                        {tab === 2 && <Strength data={{ strength, yongshen }} />}
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold w-fit">대운</h2>
                        <div className="text-left p-4 bg-neutral-100 rounded-lg">
                            <p className="text-xs text-neutral-950">대운수: {majorLuck[0].startAge}({majorLuck[0].pillar})</p>
                        </div>
                        <LuckCycleCard luckArr={majorLuck} selected={selectedMajor.substring(6)} callback={changeSelectedMajor} titleProp={'startAge'} ilgan={pillar?.day[0]} />
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold w-fit">연운</h2>
                        <LuckCycleCard luckArr={yearLuck[selectedMajor.substring(6)]} selected={selectedYear.substring(5)} callback={changeSelectedYear} titleProp={'year'} ilgan={pillar?.day[0]} />
                    </section>
                    <section className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold w-fit">월운</h2>
                        <LuckCycleCard luckArr={monthLuck[selectedYear.substring(5)]} selected={selectedYear} titleProp={'month'} ilgan={pillar?.day[0]} />
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold w-fit">일진 달력</h2>
                        <Calendar
                            mode="single"
                            numberOfMonths={1}
                            captionLayout="dropdown"
                            className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)] w-full iljin-calendar"
                            formatters={{
                                formatMonthDropdown: (date) => {
                                    return date.toLocaleString("default", { month: "long" })
                                },
                                formatWeekdayName: (day) => day?.toLocaleDateString('ja-JP', { weekday: 'short' }),
                            }}
                            onMonthChange={(e) => {
                                if (!yearTerms[e.getFullYear()]) {
                                    getCurrentSolarTerms(e.getFullYear());
                                }
                            }}
                            components={{
                                DayButton: ({ children, modifiers, day, ...props }) => {
                                    const [toYear, toMonth, toDay] = day.isoDate.split('-');
                                    const lunarDate = getLunarDate(toYear, toMonth, toDay);
                                    return (
                                        <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                                            <p><em className="not-italic">{children}</em><span className="ml-1 opacity-70 text-xs">{lunarDate.lunarMonth}.{lunarDate.lunarDay}</span></p>
                                            <p className="font-bold">{getDayGanji(toYear, toMonth, toDay)}</p>
                                            <span style={{ color: "#3399FF" }}>{yearTerms[toYear] && yearTerms[toYear][day.isoDate] ? yearTerms[toYear][day.isoDate].korean : '​'}</span>
                                        </CalendarDayButton>
                                    )
                                },
                            }}
                        />
                    </section>
                </main>
            )}
        </>
    );
};

export default Result;
