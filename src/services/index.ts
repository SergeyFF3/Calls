export async function getCallsList(
  date_start: string,
  date_end: string,
  type?: string
) {
  try {
    const response = await fetch(
      `${
        process.env.REACT_APP_API_URL
      }/getList?date_start=${date_start}&date_end=${date_end}${
        type && `&in_out=${type}`
      }&limit=10`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch calls list", response.statusText);
      return null;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCallRecord(id?: string, partner_id?: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/getRecord?record=${id}&partnership_id=${partner_id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
          "Content-type": `audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3`,
          "Content-Transfer-Encoding": "binary",
          "Content-Disposition": `filename="record.mp3"`,
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch record", response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
