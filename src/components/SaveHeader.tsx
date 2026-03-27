import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Archive, Save } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getYinYang, getBirthDate, regionLong } from "@/lib/utils";
import { saveProfile } from '@/lib/manageProfile';

const SaveHeader = ({ title, personInfo, visible: { back = true, save = true, myprofile = true } }) => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between px-2 py-1">
            <Button className={!back && "invisible"} variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} />
            </Button>
            <h1 className="flex-1 text-center text-lg font-semibold ml-9">{title}</h1>
            <div className="flex justify-end">
                <AlertDialog>
                    <AlertDialogTrigger asChild className={cn("size-9 inline-flex items-center justify-center", !save && "invisible")}>
                        <Save size={20} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>저장 확인</AlertDialogTitle>
                            <AlertDialogDescription className="text-center w-full">
                                {personInfo.name}<br />
                                {getYinYang(personInfo)} {getBirthDate(personInfo)}<br />
                                {regionLong[personInfo.longitude]} (지역시 {Math.round((personInfo.longitude - 127.5) * 4 - 30)}분)<br />
                                사주를 저장하시겠습니까?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="!flex-col">
                            <AlertDialogCancel
                                variant="default"
                                onClick={() => {
                                    saveProfile(personInfo);
                                    toast("사주 저장이 완료되었습니다.");
                                }}
                            >저장
                            </AlertDialogCancel>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Link to="/profile" className={cn("size-9 inline-flex items-center justify-center", !myprofile && "invisible")}>
                    <Archive size={20} />
                </Link>
            </div>
        </header>
    );
}

export default SaveHeader;
