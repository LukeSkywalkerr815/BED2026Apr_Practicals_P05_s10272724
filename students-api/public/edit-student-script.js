const editStudentForm = document.getElementById("editStudentForm");
const loadingMessageDiv = document.getElementById("loadingMessage");
const messageDiv = document.getElementById("message");
const studentIdInput = document.getElementById("studentId");
const editNameInput = document.getElementById("editName");
const editAddressInput = document.getElementById("editAddress");

const apiBaseUrl = "http://localhost:3000";

function getStudentIdFromUrl() {
const params = new URLSearchParams(window.location.search);
return params.get("id");
}

async function loadStudentData() {
const id = getStudentIdFromUrl();
if (!id) {
loadingMessageDiv.textContent = "Error: Missing parameter string.";
return;
}

try {
const response = await fetch(`${apiBaseUrl}/students/${id}`);
if (!response.ok) throw new Error("Record not located.");

const student = await response.json();
studentIdInput.value = student.student_id;
editNameInput.value = student.name;
editAddressInput.value = student.address;

loadingMessageDiv.style.display = "none";
editStudentForm.style.display = "block";
} catch (error) {
loadingMessageDiv.textContent = `Load Error: ${error.message}`;
}
}

editStudentForm.addEventListener("submit", async (event) => {
event.preventDefault();
messageDiv.textContent = "";

const id = studentIdInput.value;
const payload = {
name: editNameInput.value,
address: editAddressInput.value,
};

try {
const response = await fetch(`${apiBaseUrl}/students/${id}`, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});

const body = await response.json();

if (response.status === 200) {
messageDiv.textContent = "Modifications saved successfully! Redirecting...";
messageDiv.style.color = "green";
setTimeout(() => { window.location.href = "students.html"; }, 1500);
} else {
messageDiv.textContent = `Validation Error: ${body.error || "Save rejected."}`;
messageDiv.style.color = "red";
}
} catch (error) {
messageDiv.textContent = `Save Failure: ${error.message}`;
messageDiv.style.color = "red";
}
});

window.addEventListener("load", loadStudentData);