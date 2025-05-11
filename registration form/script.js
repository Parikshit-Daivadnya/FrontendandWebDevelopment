document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const viewUsersBtn = document.getElementById("viewUsersBtn");
  const userListContainer = document.getElementById("userListContainer");
  const userTableBody = document.getElementById("userTableBody");

  // Function to save user data to localStorage
  function saveUserToStorage(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Function to display registered users in a table
  function displayUsers() {
    userListContainer.style.display = "block";
    let users = JSON.parse(localStorage.getItem("users")) || [];
    userTableBody.innerHTML = ""; // Clear the table body before adding new rows
    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.dob}</td>
      `;
      userTableBody.appendChild(tr);
    });
  }

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      username,
      email,
      password,
      phone,
      dob,
    };

    // Save the user
    saveUserToStorage(newUser);

    // Clear form after submission
    form.reset();

    alert("User registered successfully!");
  });

  // Event listener for viewing registered users
  viewUsersBtn.addEventListener("click", function () {
    displayUsers();
  });
});
