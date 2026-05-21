const createStudentForm = document.getElementById("createStudentForm");
const messageDiv = document.getElementById("message");
const apiBaseUrl = "http://localhost:3000";

createStudentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  messageDiv.textContent = "";

  const payload = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await response.json();

    if (response.status === 201) {
      messageDiv.textContent = `Registration complete! Assigned ID: ${body.student_id}`;
      messageDiv.style.color = "green";
      createStudentForm.reset();
    } else {
      messageDiv.textContent = `Error: ${body.error || "Submission rejected."}`;
      messageDiv.style.color = "red";
    }
  } catch (error) {
    messageDiv.textContent = `Failed: ${error.message}`;
    messageDiv.style.color = "red";
  }
});