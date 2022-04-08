export const fetchData = (callback) => {
  fetch("http://localhost:3000/data-200.json")
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => console.error(err));
};
