import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCallsContext } from "../../context/CallsContext";
import AvatarIcon from "../../icons/AvatarIcon";
import CallTypeIcon from "../../icons/CallTypeIcon";
import { getFormattedPhoneNumber } from "../../utils/getFormattedPhoneNumber";
import secondsToMMSS from "../../utils/secondsToMMSS";
import CallField from "../CallField";
import EvaluationOfCall from "../EvaluationOfCall";
import "./TableRow.scss";
import ru from "dayjs/locale/ru";

const audio = new Audio();

export const TableRow = ({
  call,
  index,
  callsByDate,
}: {
  call: any;
  index: number;
  callsByDate: any;
}) => {
  const { callsList } = useCallsContext();
  const [record, setRecord] = useState<null | undefined | string>();
  const [callStatus, setCallStatus] = useState<string>();
  const [currentCall, setCurrentTrack] = useState<any>(callsList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeOfCall = dayjs(call.date).format("HH:mm");
  const formattedDuration = call.time > 0 && secondsToMMSS(call.time);
  const indexValue = callsByDate.findIndex((el: any) => el.indexDay === index);
  const dateOfMonth = dayjs(callsByDate[indexValue]?.date)
    .locale(ru)
    .format("DD MMMM");

  const employeeAvatar =
    call.person_avatar === "" ? (
      <AvatarIcon />
    ) : (
      <img className="img" src={call.person_avatar} alt="avatar" />
    );

  const phoneNumber =
    call.in_out === 1
      ? getFormattedPhoneNumber(call.from_number)
      : getFormattedPhoneNumber(call.to_number);

  const handleToggleAudio = () => {
    if (currentCall.id !== call.id) {
      setCurrentTrack(call);
      setIsPlaying(true);

      if (record) audio.src = record;
      audio.currentTime = 0;
      audio.play();

      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const switchCallStatus = (status: string | undefined) => {
    switch (status) {
      case "Входящий":
        return <CallTypeIcon color="#002CFB" />;
      case "Пропущенный":
        return <CallTypeIcon color="#EA1A4F" />;
      case "Исходящий":
        return (
          <span className="call-status">
            <CallTypeIcon color="#28A879" />
          </span>
        );
      case "Не дозвонился":
        return (
          <span className="call-status">
            <CallTypeIcon color="#EA1A4F" />
          </span>
        );
      default:
        return null;
    }
  };

  const switchCallSource = (phone: string) => {
    switch (phone.slice(-1)) {
      case "2":
        return "Yandex";
      case "4":
        return "Google";
      case "7":
        return "Rabota.ru";
      case "2":
        return "Yandex";
      case "6":
        return null;
    }
  };

  useEffect(() => {
    if (call.status === "Дозвонился" && call.in_out === 1) {
      setCallStatus("Входящий");
    }
    if (call.status === "Дозвонился" && call.in_out === 0) {
      setCallStatus("Исходящий");
    }
    if (call.status === "Не дозвонился" && call.in_out === 1) {
      setCallStatus("Пропущенный");
    }
    if (call.status === "Не дозвонился" && call.in_out === 0) {
      setCallStatus("Не дозвонился");
    }
  }, []);

  const getCallsDate = () => {
    if (indexValue === 0) {
      return null;
    }
    if (indexValue === 1) {
      return (
        <tr className="date">
          <p>
            Вчера<span className="qnty">{callsByDate[1].count}</span>
          </p>
        </tr>
      );
    }
    if (callsByDate[indexValue]?.indexDay === index) {
      return (
        <tr className="date">
          <p>
            {dateOfMonth}
            <span className="qnty">{callsByDate[1].count}</span>
          </p>
        </tr>
      );
    }
  };

  return (
    <>
      {getCallsDate()}
      <tr>
        <td>{switchCallStatus(callStatus)}</td>
        <td>{timeOfCall}</td>
        <td>{employeeAvatar}</td>
        <td>
          <CallField
            callStatus={callStatus}
            name={call.person_name}
            phone={phoneNumber}
          />
        </td>
        <td>{switchCallSource(phoneNumber)}</td>
        <td>
          <EvaluationOfCall phone={phoneNumber} />
        </td>
        <td>{formattedDuration}</td>
      </tr>
    </>
  );
};
