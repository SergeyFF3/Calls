import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCallsContext } from "../../context/CallsContext";
import CallTypeIcon from "../../icons/CallTypeIcon";
import { getFormattedPhoneNumber } from "../../utils/getFormattedPhoneNumber";
import secondsToMMSS from "../../utils/secondsToMMSS";
import CallField from "../CallField";
import "./TableRow.scss";

const audio = new Audio();

export const TableRow = ({ call }: { call: any }) => {
  const { callsList } = useCallsContext();
  const [record, setRecord] = useState<null | undefined | string>();
  const [callStatus, setCallStatus] = useState<string>();
  const [currentCall, setCurrentTrack] = useState<any>(callsList[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeOfCall = dayjs(call.date).format("HH:mm");
  const formattedDuration = call.time > 0 && secondsToMMSS(call.time);
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

  return (
    <tr>
      <td>{switchCallStatus(callStatus)}</td>
      <td>{timeOfCall}</td>
      <td>
        <img src={call.person_avatar} alt="avatar" />
      </td>
      <td>
        <CallField
          callStatus={callStatus}
          name={call.person_name}
          phone={phoneNumber}
        />
      </td>
      <td>-</td>
      <td>-</td>
      <td>{formattedDuration}</td>
    </tr>
  );
};
