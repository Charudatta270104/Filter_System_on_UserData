const searchInput = document.getElementById("searchInput");
const userList = document.getElementById("userList");
const cursor = document.querySelector(".custom-cursor");

let usersData = [];

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    usersData = data;
    displayUsers(usersData);
  })
  .catch((err) => {
    userList.innerHTML = `<p>Error loading user data.</p>`;
    console.error(err);
  });

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.username.toLowerCase().includes(searchText) ||
      user.address.city.toLowerCase().includes(searchText)
  );
  displayUsers(filteredUsers);
});

function displayUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
    `;
    userList.appendChild(userCard);
  });
}
