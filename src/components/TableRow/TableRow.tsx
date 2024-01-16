import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ICallProps, useCallsContext } from "../../context/CallsContext";
import AvatarIcon from "../../icons/AvatarIcon";
import CallTypeIcon from "../../icons/CallTypeIcon";
import { getFormattedPhoneNumber } from "../../utils/getFormattedPhoneNumber";
import secondsToMMSS from "../../utils/secondsToMMSS";
import CallField from "../CallField";
import EvaluationOfCall from "../EvaluationOfCall";
import "./TableRow.scss";
import ru from "dayjs/locale/ru";
import RowLabel from "../RowLabel";

const audio = new Audio();

export const TableRow = ({
  call,
  index,
}: {
  call: ICallProps;
  index: number;
}) => {
  const { callsList, callsByDate, order, sortCalls } = useCallsContext();
  const [record, setRecord] = useState<null | string>();
  const [callStatus, setCallStatus] = useState<string>("");
  const [currentCall, setCurrentTrack] = useState<ICallProps>(callsList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeOfCall = dayjs(call.date).format("HH:mm");
  const formattedDuration = call.time > 0 && secondsToMMSS(call.time);
  const indexValue = callsByDate.findIndex((el) => el.indexDay === index);
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

  const switchCallStatus = (status: string) => {
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
      case "1":
        return "ГРУЗЧИКОВ-СЕРВИС СПБ";
      case "6":
        return null;
    }
  };

  const getCallsDate = () => {
    if (indexValue === 0 && sortCalls === "date" && order === "DESC") {
      return <tr>{null}</tr>;
    }

    if (
      (indexValue === 0 && sortCalls === "date" && order === "ASC") ||
      (indexValue === 0 && sortCalls === "duration" && order === "DESC") ||
      (indexValue === 0 && sortCalls === "duration" && order === "ASC")
    ) {
      return (
        <RowLabel order="asc">
          {dateOfMonth}
          <span className="qnty">{callsByDate[indexValue].count}</span>
        </RowLabel>
      );
    }

    if (indexValue === 1 && sortCalls === "date" && order === "DESC") {
      return (
        <RowLabel>
          Вчера <span className="qnty">{callsByDate[1].count}</span>
        </RowLabel>
      );
    }

    if (callsByDate[indexValue]?.indexDay === index) {
      return (
        <RowLabel>
          {dateOfMonth}
          <span className="qnty">{callsByDate[indexValue].count}</span>
        </RowLabel>
      );
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
  }, [call.status, call.in_out]);

  return (
    <>
      {getCallsDate()}
      <tr className="body-row">
        <td className="body-col">{switchCallStatus(callStatus)}</td>
        <td className="body-col">{timeOfCall}</td>
        <td className="body-col">{employeeAvatar}</td>
        <td className="body-col">
          <CallField
            callStatus={callStatus}
            name={call.person_name}
            phone={phoneNumber}
          />
        </td>
        <td className="body-col">{switchCallSource(phoneNumber)}</td>
        <td className="body-col">
          <EvaluationOfCall phone={phoneNumber} />
        </td>
        <td className="body-col">{formattedDuration}</td>
      </tr>
    </>
  );
};
