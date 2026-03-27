import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Settings, Trash } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  cn,
  getYinYang,
  getBirthDate,
  regionLong,
  STEMS,
  BRANCHES,
} from "@/lib/utils";
import { deleteProfile } from "@/lib/manageProfile";

const getProfileImg = (info) => {
  const yeongan = (Number(STEMS.indexOf(info.year[0])) + 1) % 10;
  const yeonji = Number(BRANCHES.indexOf(info.year[1])) + 1;
  const imgName = String((Math.abs(yeongan - yeonji) / 2) * 10 + yeongan);
  const path = import.meta.env.PROD ? import.meta.env.BASE_URL : "/src";
  return `${path}/assets/profile/${imgName.padStart(2, "0")}_profile.png`;
};

const getYinYangColor = (info) => {
  return info.calendar === "solar" ? "text-[#EF5350]" : "text-[#5CADFF]";
};

const ProfileBasic = ({ info }) => {
  return (
    <>
      <img
        className="w-16 h-16 rounded-full flex items-center justify-center"
        src={getProfileImg(info)}
        alt={info.year + " profile"}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{info.name}</h1>
          <Badge
            variant="outline"
            className="text-xs font-semibold px-2 py-0.5"
          >
            {info.day}
          </Badge>
        </div>
        <div className="flex items-center">
          <Badge
            variant="outline"
            className={cn(
              "mr-1 text-xs font-semibold px-2 py-0.5",
              getYinYangColor(info)
            )}
          >
            {getYinYang(info)}
          </Badge>
          <div className="text-xs text-neutral-90 text-left">
            <p>{getBirthDate(info)}</p>
            <p>
              {regionLong[info.longitude]} (지역시{" "}
              {Math.round((info.longitude - 127.5) * 4 - 30)}분)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const SaveIcon = ({ info }) => {
  return (
    <Link to="/" state={info}>
      <Settings size={16} className="ml-auto" />
    </Link>
  );
};

const DeleteIcon = ({ info }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash size={16} className="ml-auto" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>삭제 확인</AlertDialogTitle>
          <AlertDialogDescription className="text-center w-full">
            {info.name}
            <br />
            {getYinYang(info)} {getBirthDate(info)}
            <br />
            {regionLong[info.longitude]} (지역시{" "}
            {Math.round((info.longitude - 127.5) * 4 - 30)}분)
            <br />
            사주를 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!flex-col">
          <AlertDialogCancel
            variant="default"
            onClick={() => {
              deleteProfile(info);
              toast("사주가 삭제되었습니다.");
            }}
          >
            삭제
          </AlertDialogCancel>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ProfileSaveCard = ({ info }) => {
  return (
    <div className="flex items-center px-4 py-3 gap-1 border-1 border-solid border-neutral-200 rounded-lg">
      <ProfileBasic info={info} />
      <SaveIcon info={info} />
    </div>
  );
};

const ProfileDeleteCard = ({ info }) => {
  return (
    <div className="flex items-center px-4 py-3 gap-1 border-1 border-solid border-neutral-200 rounded-lg">
      <Link className="flex grow items-center gap-1" to="/" state={info}>
        <ProfileBasic info={info} />
      </Link>
      <DeleteIcon info={info} />
    </div>
  );
};

export { ProfileSaveCard, ProfileDeleteCard };
