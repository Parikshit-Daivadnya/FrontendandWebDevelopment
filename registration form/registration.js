document.addEventListener("DOMContentLoaded", () => {
  let registrationForm = document.getElementById("registrationForm");
  let userTableBody = document.getElementById("userTableBody");

  // Load users from Local Storage when page loads
  loadUsers();

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    let name = document.getElementById("name").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let city = document.getElementById("city").value.trim();

    // Basic validation
    if (!name || !username || !email || !phone || !city) {
      alert("All fields are required!");
      return;
    }

    // Create user object
    let user = { name, username, email, phone, city };

    // Save user to Local Storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Refresh user table
    loadUsers();

    // Show success message
    alert("Registration Successful!");

    // Reset form fields
    registrationForm.reset();
  });

  function loadUsers() {
    userTableBody.innerHTML = ""; // Clear previous data
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach((user, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.city}</td>
            `;
      userTableBody.appendChild(row);
    });
  }
});
