document.addEventListener("DOMContentLoaded", () => {
  let userForm = document.getElementById("userForm");
  let tbody = document.getElementById("tbody");
  let count = 1; // Keeps track of row numbers

  userForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    let name = document.getElementById("name").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let city = document.getElementById("city").value.trim();

    // Validate fields (simple validation)
    if (!name || !username || !email || !phone || !city) {
      alert("All fields are required!");
      return;
    }

    // Create a new table row
    let row = document.createElement("tr");
    row.innerHTML = `
          <td>${count++}</td>
          <td>${name}</td>
          <td>${username}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${city}</td>
      `;

    // Append row to table
    tbody.appendChild(row);

    // Reset form fields
    userForm.reset();

    // Close the modal manually
    $("#userModal").modal("hide");
  });
});
