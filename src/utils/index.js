export const fetcher = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const poster = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
