// Define the sections array
const sections = [
  { name: "Profile Summary", enabled: true },
  { name: "Academic and Co-curricular Achievements", enabled: true },
  { name: "Summer Internship Experience", enabled: true },
  { name: "Work Experience", enabled: true },
  { name: "Projects", enabled: true },
  { name: "Certifications", enabled: true },
  { name: "Leadership Positions", enabled: true },
  { name: "Extracurricular", enabled: true },
  { name: "Education", enabled: true }
];

// Function to handle editing the section name
function handleSectionNameEdit(sectionHeader, sectionName, index) {
  sectionName.contentEditable = true;
  sectionName.focus();
  sectionName.addEventListener("blur", () => {
    sectionName.contentEditable = false;
    sectionHeader.classList.remove("dark");
    const newName = sectionName.textContent.trim();
    if (newName !== sections[index].name) {
      sections[index].name = newName;
      saveButton.disabled = false; // Enable the save button
    }
    editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Change button icon back to pencil
    editButton.removeEventListener("click", handleSaveButtonClick); // Remove the save button click event listener
    editButton.addEventListener("click", handleEditButtonClick); // Add back the edit button click event listener
    resetListStyles();
  });
}

// Function to handle edit button click
function handleEditButtonClick() {
  const sectionHeader = this.parentElement;
  const sectionName = sectionHeader.querySelector(".section-name");
  const index = Array.from(sectionHeaders).indexOf(sectionHeader);
  sectionHeaders.forEach((header, i) => {
    if (header !== sectionHeader) {
      header.classList.add("dark"); // Apply dark style to the other list items
    }
  });
  sectionHeader.classList.remove("dark");
  handleSectionNameEdit(sectionHeader, sectionName, index);
  this.innerHTML = '<i class="fas fa-save"></i> Save'; // Change button text to "Save"
  this.removeEventListener("click", handleEditButtonClick); // Remove the edit button click event listener
  this.addEventListener("click", handleSaveButtonClick); // Add save button click event listener
}

// Function to handle save button click
function handleSaveButtonClick() {
  console.log("Changes saved successfully!");
  saveButton.disabled = true; // Disable the save button
  resetListStyles();
}

// Function to reset the list item styles
function resetListStyles() {
  sectionHeaders.forEach((header) => {
    header.classList.remove("dark"); // Remove dark style from all list items
  });
}

// Function to handle drag start
function handleDragStart(event) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", "");
  draggedItem = this;
  setTimeout(() => {
    this.classList.add("dragging");
  }, 0);
}

// Function to handle drag over
function handleDragOver(event) {
  event.preventDefault();
  this.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
}

// Function to handle drag leave
function handleDragLeave() {
  this.classList.remove("drag-over");
}

// Function to handle drop
function handleDrop(event) {
  event.stopPropagation();
  const dropIndex = Array.from(sectionHeaders).indexOf(this);
  const draggedIndex = Array.from(sectionHeaders).indexOf(draggedItem);
  if (dropIndex !== draggedIndex) {
    const tempSection = sections[draggedIndex];
    sections.splice(draggedIndex, 1);
    sections.splice(dropIndex, 0, tempSection);
    saveButton.disabled = false; // Enable the save button
    resetListStyles();
  }
  this.classList.remove("drag-over");
}

// Get all the section headers
const sectionHeaders = document.querySelectorAll(".section-header");

// Set initial section names and enable drag functionality
sectionHeaders.forEach((sectionHeader, index) => {
  const sectionName = sectionHeader.querySelector(".section-name");
  sectionName.textContent = sections[index].name;

  // Add draggable attribute to section header
  sectionHeader.draggable = true;

  // Add event listeners for drag events
  sectionHeader.addEventListener("dragstart", handleDragStart);
  sectionHeader.addEventListener("dragover", handleDragOver);
  sectionHeader.addEventListener("dragleave", handleDragLeave);
  sectionHeader.addEventListener("drop", handleDrop);

  // Get the edit button
  const editButton = sectionHeader.querySelector(".edit-button");

  // Add event listener to the edit button for editing section name
  editButton.addEventListener("click", handleEditButtonClick);
});

// Get the save button
const saveButton = document.getElementById("save-button");

// Add event listener for save button click
saveButton.addEventListener("click", handleSaveButtonClick);
