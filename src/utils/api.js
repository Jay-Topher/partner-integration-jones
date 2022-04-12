export const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:3000/data-200.json");
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
};
