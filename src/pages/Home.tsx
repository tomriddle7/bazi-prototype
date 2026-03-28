/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HelpCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { DateTime, Interval } from 'luxon';
import SaveHeader from '@/components/SaveHeader';
import { unsubmittAble, BIRTH_DATE_RGX, BIRTH_TIME_RGX } from "@/lib/utils";
import SajuLocalService from '@/providers/services/saju-local.service';

const koreanSummerTimes = [
  Interval.fromDateTimes(DateTime.local(1948, 6, 1, 0, 0), DateTime.local(1948, 9, 13, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1949, 4, 3, 0, 0), DateTime.local(1949, 9, 11, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1950, 4, 1, 0, 0), DateTime.local(1950, 9, 10, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1951, 5, 6, 0, 0), DateTime.local(1951, 9, 9, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1955, 5, 5, 0, 0), DateTime.local(1955, 9, 9, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1956, 5, 20, 0, 0), DateTime.local(1956, 9, 30, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1957, 5, 5, 0, 0), DateTime.local(1957, 9, 22, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1958, 5, 4, 0, 0), DateTime.local(1958, 9, 21, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1959, 5, 3, 0, 0), DateTime.local(1959, 9, 20, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1960, 5, 1, 0, 0), DateTime.local(1960, 9, 18, 0, 0)),
  Interval.fromDateTimes(DateTime.local(1987, 5, 10, 2, 0), DateTime.local(1987, 10, 11, 3, 0)),
  Interval.fromDateTimes(DateTime.local(1988, 5, 8, 2, 0), DateTime.local(1988, 10, 9, 3, 0)),
];

const regionLong = [
  { label: '대구', value: 128.601734 },
  { label: '대전', value: 127.383316 },
  { label: '부산', value: 129.075577 },
  { label: '서울', value: 126.977902 },
  { label: '세종', value: 127.290757 },
  { label: '울산', value: 129.311327 },
  { label: '인천', value: 126.705401 },
  { label: '광명', value: 126.864602 },
  { label: '군포', value: 126.933051 },
  { label: '김포', value: 126.715633 },
  { label: '부천', value: 126.765908 },
  { label: '성남', value: 127.126627 },
  { label: '수원', value: 127.028574 },
  { label: '시흥', value: 126.802881 },
  { label: '안산', value: 126.828954 },
  { label: '안성', value: 127.279763 },
  { label: '안양', value: 126.958697 },
  { label: '양평', value: 127.487557 },
  { label: '여주', value: 127.637329 },
  { label: '오산', value: 127.077376 },
  { label: '용인', value: 127.177933 },
  { label: '의왕', value: 126.968299 },
  { label: '이천', value: 127.435002 },
  { label: '평택', value: 127.095997 },
  { label: '하남', value: 127.214926 },
  { label: '화성', value: 126.828594 },
  { label: '고양', value: 126.833811 },
  { label: '구리', value: 127.129522 },
  { label: '남양', value: 127.216442 },
  { label: '동두', value: 127.060407 },
  { label: '양주', value: 127.045545 },
  { label: '연천', value: 127.075183 },
  { label: '의정', value: 127.033679 },
  { label: '파주', value: 126.778317 },
  { label: '포천', value: 127.200344 },
  { label: '고성', value: 128.467817 },
  { label: '동해', value: 129.114259 },
  { label: '삼척', value: 129.164749 },
  { label: '속초', value: 128.591862 },
  { label: '양구', value: 127.989824 },
  { label: '양양', value: 128.619038 },
  { label: '영월', value: 128.461848 },
  { label: '원주', value: 127.919641 },
  { label: '인제', value: 128.170699 },
  { label: '정선', value: 128.660749 },
  { label: '철원', value: 127.313317 },
  { label: '춘천', value: 127.732695 },
  { label: '태백', value: 128.985544 },
  { label: '평창', value: 128.390016 },
  { label: '홍천', value: 127.888843 },
  { label: '화천', value: 127.708187 },
  { label: '횡성', value: 127.984965 },
  { label: '단양', value: 128.365431 },
  { label: '보은', value: 127.729418 },
  { label: '영동', value: 127.783388 },
  { label: '옥천', value: 127.571342 },
  { label: '음성', value: 127.690523 },
  { label: '제천', value: 128.190894 },
  { label: '증평', value: 127.581489 },
  { label: '진천', value: 127.435618 },
  { label: '청주', value: 127.488753 },
  { label: '충주', value: 127.925918 },
  { label: '공주', value: 127.118999 },
  { label: '금산', value: 127.48811 },
  { label: '논산', value: 127.09866 },
  { label: '당진', value: 126.64444 },
  { label: '보령', value: 126.612737 },
  { label: '부여', value: 126.909789 },
  { label: '서산', value: 126.450288 },
  { label: '서천', value: 126.691343 },
  { label: '아산', value: 127.002034 },
  { label: '예산', value: 126.848697 },
  { label: '천안', value: 127.113745 },
  { label: '청양', value: 126.802238 },
  { label: '태안', value: 126.298004 },
  { label: '홍성', value: 126.660729 },
  { label: '군산', value: 126.736756 },
  { label: '김제', value: 126.880387 },
  { label: '남원', value: 127.390381 },
  { label: '무주', value: 127.660829 },
  { label: '부안', value: 126.733444 },
  { label: '순창', value: 127.137571 },
  { label: '완주', value: 127.162202 },
  { label: '익산', value: 126.957174 },
  { label: '임실', value: 127.289179 },
  { label: '장수', value: 127.520772 },
  { label: '전주', value: 127.147958 },
  { label: '정읍', value: 126.855942 },
  { label: '진안', value: 127.424838 },
  { label: '고흥', value: 127.281928 },
  { label: '곡성', value: 127.292013 },
  { label: '광양', value: 127.695985 },
  { label: '구례', value: 127.462746 },
  { label: '나주', value: 126.710772 },
  { label: '담양', value: 126.988504 },
  { label: '목포', value: 126.391914 },
  { label: '무안', value: 126.481621 },
  { label: '보성', value: 127.080068 },
  { label: '순천', value: 127.487356 },
  { label: '신안', value: 126.350478 },
  { label: '여수', value: 127.662242 },
  { label: '영광', value: 126.512011 },
  { label: '영암', value: 126.696714 },
  { label: '완도', value: 126.755129 },
  { label: '장성', value: 126.784822 },
  { label: '장흥', value: 126.907103 },
  { label: '진도', value: 126.263508 },
  { label: '함평', value: 126.516691 },
  { label: '해남', value: 126.599304 },
  { label: '화순', value: 126.986636 },
  { label: '경주', value: 129.224739 },
  { label: '고령', value: 128.262917 },
  { label: '구미', value: 128.344284 },
  { label: '군위', value: 128.572905 },
  { label: '김천', value: 128.113661 },
  { label: '문경', value: 128.186711 },
  { label: '봉화', value: 128.7325 },
  { label: '상주', value: 128.158992 },
  { label: '성주', value: 128.282954 },
  { label: '안동', value: 128.729591 },
  { label: '영덕', value: 129.366139 },
  { label: '영양', value: 129.112401 },
  { label: '영주', value: 128.624024 },
  { label: '영천', value: 128.938572 },
  { label: '예천', value: 128.452611 },
  { label: '울릉', value: 130.905883 },
  { label: '울진', value: 129.400575 },
  { label: '의성', value: 128.697013 },
  { label: '청도', value: 128.733845 },
  { label: '청송', value: 129.057016 },
  { label: '칠곡', value: 128.401744 },
  { label: '포항', value: 129.343626 },
  { label: '거창', value: 127.90959 },
  { label: '김해', value: 128.889328 },
  { label: '남해', value: 127.892531 },
  { label: '밀양', value: 128.746946 },
  { label: '사천', value: 128.06388 },
  { label: '산청', value: 127.873438 },
  { label: '양산', value: 129.037015 },
  { label: '의령', value: 128.261724 },
  { label: '진주', value: 128.10783 },
  { label: '창녕', value: 128.492272 },
  { label: '창원', value: 128.682366 },
  { label: '통영', value: 128.433188 },
  { label: '하동', value: 127.750581 },
  { label: '함안', value: 128.406481 },
  { label: '함양', value: 127.725165 },
  { label: '합천', value: 128.165883 },
  { label: '제주', value: 126.53747 }
];

const REGION_LONG_KEY = 'region';
const SUMMER_TIME_KEY = 'summer-time';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sajuApi = new SajuLocalService();

  const [personInfo, setPersonInfo] = useState({
    name: '',
    gender: 'female',
    birthDate: '19900101',
    birthTime: '0000',
    calendar: 'solar',
    summerTime: false,
    hourKnown: true,
    yaja: false,
    longitude: 126.977902,
  });
  const [regionLong, setRegionLong] = useState<{label: string, value: number }[]>([]);
  const [summerTime, setSummerTime] = useState<(Interval<true> | Interval<false>)[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    navigate('/result', {
      state: {
        ...personInfo,
        summerTime: inSummerTime(),
      }
    });
  };

  const inSummerTime = () => {
    let result = false;
    const { birthDate, birthTime } = personInfo;
    const date = birthDate.replace(BIRTH_DATE_RGX, "$1-$2-$3");
    const time = birthTime.replace(BIRTH_TIME_RGX, "$1:$2");
    const birthDateTime = DateTime.fromISO(`${date}T${time}`);
    summerTime.forEach((interval) => {
      if (interval.contains(birthDateTime)) {
        result = true;
      }
    });
    return result;
  };

  useEffect(() => {
    (async () => {
      let long = JSON.parse(sessionStorage.getItem(REGION_LONG_KEY) || '[]');
      let summer = JSON.parse(sessionStorage.getItem(SUMMER_TIME_KEY) || '[]');
      if (!long.length || !summer.length) {
        [long, summer] = await Promise.all([
          sajuApi.fetchRegionList(),
          sajuApi.fetchSummerTime()
        ]);
        sessionStorage.setItem(REGION_LONG_KEY, JSON.stringify(long));
        sessionStorage.setItem(SUMMER_TIME_KEY, JSON.stringify(summer));
      }
      setRegionLong(long);
      const summerPeriod = summer.map(({ year, start, end }: any) => {
        return Interval.fromDateTimes(
          DateTime.local(year, start.month, start.day, start.hour, 0),
          DateTime.local(year, end.month, end.day, end.hour, 0)
        );
      });
      setSummerTime(summerPeriod);

      const personInfo = { ...location.state };
      if (Object.keys(personInfo).length > 0) {
        const {
          name,
          gender,
          birthDate,
          birthTime,
          calendar,
          hourKnown,
          yaja,
          longitude,
        } = personInfo;
        setPersonInfo({
          name,
          gender,
          birthDate: birthDate.replace(/-/g, ""),
          birthTime: birthTime.replace(/:/g, ""),
          calendar,
          hourKnown,
          yaja,
          longitude,
        } as any);
      }
    })();
  }, []);

  return (
    <>
      {/* Header */}
      <SaveHeader title="사주 입력" personInfo={personInfo} visible={{ back: false }} />

      <main className="flex flex-col min-h-screen mx-auto relative px-5">
        <h2 className="text-2xl font-bold my-8 leading-tight text-left">
          사주 정보를 입력해 주세요.
        </h2>
        {/* Main Content */}
        <form>
          <div className="flex-1">
            <FieldGroup className="gap-8">
              {/* 이름 입력 */}
              <Field className="gap-1">
                <FieldLabel htmlFor="name" className="text-sm font-medium text-neutral-950">이름</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  maxLength={12}
                  placeholder="이름 입력..."
                  className="h-9 border-neutral-200 rounded-lg focus-visible:ring-1 focus-visible:ring-neutral-500"
                  value={personInfo.name}
                  onChange={(e) => setPersonInfo({ ...personInfo, name: e.target.value })}
                />
              </Field>

              {/* 성별 선택 */}
              <Field className="gap-1">
                <FieldLabel className="text-sm font-medium text-neutral-950">성별</FieldLabel>
                <Tabs value={personInfo.gender} onValueChange={(e) => setPersonInfo({ ...personInfo, gender: e })}>
                  <TabsList className="!w-full">
                    <TabsTrigger value="female">여자</TabsTrigger>
                    <TabsTrigger value="male">남자</TabsTrigger>
                  </TabsList>
                </Tabs>
              </Field>

              {/* 생년월일시 */}
              <Field className="gap-1">
                <FieldLabel className="text-sm font-medium text-neutral-950">생년월일시</FieldLabel>
                <div className="flex gap-2">
                  <Select items={[{ label: '양력', value: 'solar' }, { label: '음력', value: 'lunar' }]} defaultValue={personInfo.calendar} onValueChange={(e: any) => setPersonInfo({ ...personInfo, calendar: e })}>
                    <SelectTrigger className="w-[80px] !h-9 border-neutral-200 rounded-lg">
                      <SelectValue placeholder="양력" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solar">양력</SelectItem>
                      <SelectItem value="lunar">음력</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    className="flex-1 h-9 border-neutral-200 rounded-lg focus-visible:ring-1 focus-visible:ring-neutral-500"
                    maxLength={8}
                    pattern="[0-9]+"
                    value={personInfo.birthDate}
                    onChange={(e) => setPersonInfo({ ...personInfo, birthDate: e.target.value })}
                  />
                  <Input
                    type="text"
                    className="flex-1 h-9 border-neutral-200 rounded-lg focus-visible:ring-1 focus-visible:ring-neutral-500"
                    maxLength={4}
                    pattern="[0-9]+"
                    value={personInfo.birthTime}
                    onChange={(e) => setPersonInfo({ ...personInfo, birthTime: e.target.value })}
                  />
                </div>
                <div className="flex items-center h-6 gap-4">
                  <div className="flex items-center space-x-1">
                    <Checkbox id="no-time" className="rounded-sm border-neutral-300 w-4 h-4" checked={!personInfo.hourKnown} onCheckedChange={(e) => setPersonInfo({ ...personInfo, hourKnown: !e })} />
                    <FieldLabel htmlFor="no-time" className="text-sm text-neutral-60">
                      시간모름
                    </FieldLabel>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Checkbox id="yaja" className="rounded-sm border-neutral-300 w-4 h-4" checked={personInfo.yaja} onCheckedChange={(e) => setPersonInfo({ ...personInfo, yaja: e })} />
                    <FieldLabel htmlFor="yaja" className="text-sm text-neutral-60">
                      야자시/조자시
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="icon" className="rounded-full w-5 h-5 text-neutral-60">
                            <HelpCircle />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="break-keep no-scrollbar overflow-y-auto mx-auto w-full pb-9 px-8">
                            <DrawerHeader className="flex flex-row pt-0 px-0 items-center justify-between">
                              <DrawerTitle>야자시/조자시</DrawerTitle>
                              <DrawerClose><X size={20} /></DrawerClose>
                            </DrawerHeader>
                            <DrawerDescription>
                              자정 무렵 자시를 둘로 나눈 개념으로 밤 11시부터 자정은 당일의 자시인 야자시로 자정부터 새벽 1시는 다음날의 자시인 조자시로 보는 옵션입니다. 일반적인 해석방법은 아니나 자시에 태어난 사람의 사주 계산을 위한 보정 옵션입니다.
                            </DrawerDescription>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </FieldLabel>

                  </div>
                </div>
                {/* 안내 배너 */}
                {inSummerTime() && <div className="px-4 py-3 bg-neutral-100 rounded-lg">
                  <p className="text-xs text-neutral-950">
                    출생년도가 서머타임에 해당하여 -60분 보정합니다.
                  </p>
                </div>}
              </Field>

              {/* 태어난 지역 */}
              <Field className="gap-1">
                <FieldLabel className="text-sm font-medium text-neutral-950">태어난 지역</FieldLabel>
                <Select items={regionLong} defaultValue={personInfo.longitude} onValueChange={(e) => setPersonInfo({ ...personInfo, longitude: e as number })}>
                  <SelectTrigger className="!h-9 border-neutral-200 rounded-lg">
                    <SelectValue placeholder="서울" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {regionLong.map((item) => {
                        return (
                          <SelectItem key={item.label} value={item.value}>
                            {item.label}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="px-4 py-3 bg-neutral-100 rounded-lg">
                  <p className="text-xs text-neutral-950">
                    입력하신 지역 정보에 따라 {Math.round((personInfo.longitude - 127.5) * 4 - 30)}분을 보정합니다.
                  </p>
                </div>
              </Field>
            </FieldGroup>
          </div>
          {/* Bottom Button */}
          <Field className="py-4 bottom-0">
            <Button className="w-full h-9 text-neutral-50 text-sm font-medium rounded-lg" onClick={handleSubmit} disabled={unsubmittAble(personInfo)}>만세력 보러가기</Button>
          </Field>
        </form>
      </main>
    </>
  );
};

export default Home;