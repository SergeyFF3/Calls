import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCallsContext } from "../../context/CallsContext";
import { getFormattedPhoneNumber } from "../../utils/getFormattedPhoneNumber";
import secondsToMMSS from "../../utils/secondsToMMSS";
import CallField from "../CallField";

const audio = new Audio();

export const TableRow = ({ call }: { call: any }) => {
  const { callsList } = useCallsContext();
  const [record, setRecord] = useState<null | undefined | string>();
  const [statusCall, setStatusCall] = useState<string>();
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

  useEffect(() => {
    if (call.status === "Дозвонился" && call.in_out === 1) {
      setStatusCall("Входящий");
    }
    if (call.status === "Дозвонился" && call.in_out === 0) {
      setStatusCall("Исходящий");
    }
    if (call.status === "Не дозвонился" && call.in_out === 1) {
      setStatusCall("Пропущенный");
    }
    if (call.status === "Не дозвонился" && call.in_out === 0) {
      setStatusCall("Недозвон");
    }
  }, []);

  return (
    <tr>
      <td>{statusCall}</td>
      <td>{timeOfCall}</td>
      <td>
        <img src={call.person_avatar} alt="avatar" />
      </td>
      <td>
        <CallField
          statusCall={statusCall}
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
