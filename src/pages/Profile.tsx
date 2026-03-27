import { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import SaveHeader from "@/components/SaveHeader";
import { ProfileDeleteCard } from '@/components/result/ProfileCard';
import { loadProfileList } from '@/lib/manageProfile';

const Profile = () => {
    const [profileList, setProfileList] = useState(loadProfileList());
    const [order, setOrder] = useState('latest');

    const toSortedProfileList = () => {
        switch (order) {
            case 'latest':
                return profileList;
            case 'namedesc':
                return profileList.toSorted((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
            default:
                return profileList;
        }
    };

    useEffect(() => {
        const getProfileList = () => {
            const profiles = loadProfileList();
            setProfileList(profiles);
        };
        window.addEventListener("storageUpdate", getProfileList);
        return () => {
            window.removeEventListener("storageUpdate", getProfileList);
        };
    }, []);

    return (
        <>
            <SaveHeader title="사주프로필" personInfo={{}} visible={{ save: false, myprofile: false }} />
            <main className="flex flex-col min-h-screen mx-auto relative px-5">
                <section className="mt-6 mb-3">
                    <Select items={[{ label: '최신등록순', value: 'latest' }, { label: '이름순', value: 'namedesc' }]} defaultValue={order} onValueChange={(e) => setOrder(e)}>
                        <SelectTrigger className="w-[120px] !h-10 border-slate-200 rounded-lg text-slate-600 focus:ring-0">
                            <SelectValue placeholder="최신등록순" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">최신등록순</SelectItem>
                            <SelectItem value="namedesc">이름순</SelectItem>
                        </SelectContent>
                    </Select>
                </section>
                <section className="gap-3 flex flex-col">
                    {toSortedProfileList().map((profile, i) => {
                        return <ProfileDeleteCard key={i} info={profile} />
                    })}
                </section>
            </main>
        </>
    )
}

export default Profile
