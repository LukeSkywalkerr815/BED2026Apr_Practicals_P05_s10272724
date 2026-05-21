const studentsListDiv = document.getElementById("studentsList");
const fetchStudentsBtn = document.getElementById("fetchStudentsBtn");
const messageDiv = document.getElementById("message");
const apiBaseUrl = "http://localhost:3000";

async function fetchStudents() {
  try {
    studentsListDiv.innerHTML = "Loading records...";
    messageDiv.textContent = "";

    const response = await fetch(`${apiBaseUrl}/students`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const students = await response.json();
    studentsListDiv.innerHTML = "";

    if (students.length === 0) {
      studentsListDiv.innerHTML = "<p>No records found.</p>";
      return;
    }

    students.forEach((student) => {
      const item = document.createElement("div");
      item.classList.add("student-item");
      item.innerHTML = `
        <h3>${student.name}</h3>
        <p><strong>Address:</strong> ${student.address}</p>
        <p><strong>ID:</strong> ${student.student_id}</p>
        <button class="edit-btn" onclick="editStudent(${student.student_id})">Edit</button>
        <button class="delete-btn" data-id="${student.student_id}">Delete</button>
      `;
      studentsListDiv.appendChild(item);
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", handleDeleteClick);
    });
  } catch (error) {
    console.error(error);
    studentsListDiv.innerHTML = `<p style="color: red;">Failed to load records: ${error.message}</p>`;
  }
}

function editStudent(id) {
  window.location.href = `edit-student.html?id=${id}`;
}

async function handleDeleteClick(event) {
  const id = event.target.getAttribute("data-id");
  if (!confirm(`Permanently delete student record ID: ${id}?`)) return;

  try {
    const response = await fetch(`${apiBaseUrl}/students/${id}`, { method: "DELETE" });
    if (response.status === 204) {
      messageDiv.textContent = "Record wiped successfully.";
      messageDiv.style.color = "green";
      fetchStudents();
    } else {
      throw new Error(`Failed with status: ${response.status}`);
    }
  } catch (error) {
    messageDiv.textContent = `Error: ${error.message}`;
    messageDiv.style.color = "red";
  }
}

fetchStudentsBtn.addEventListener("click", fetchStudents);
window.addEventListener("load", fetchStudents);