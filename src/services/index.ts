const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
};

export async function getList() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/getList`, {
      method: "POST",
      headers,
    });
    if (!response.ok) {
      console.error("Failed to fetch call list", response.statusText);
      return null;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
}
