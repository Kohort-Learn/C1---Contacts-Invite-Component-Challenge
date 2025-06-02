let contacts = [];
const contactList = document.getElementById("contactsList");
let activeTab = "all";

function ContactItemCardHTML(contact) {
	let statusClass =
		contact.status === "Online" ? "status-online" : "status-offline";
	return `<div class="avatar">
                <div class="status-dot ${statusClass}"></div>
                <img src="${contact.image}" alt="${contact.name}">
            </div>
            <div class="contact-info">
                <div>
                    <strong>${contact.name}</strong><br /> 
                    <small>${contact.status}</small>
                </div>
                <small>${contact.type}</small>
            </div>`;
}

function appendContactCard(contact) {
	// create list item
	const li = document.createElement("li");
	li.className = "contact-item";
	// set data-index attribute which will be used for toggling item selection
	li.setAttribute("data-index", contact.id);
	// set innerHTML of list item
	li.innerHTML = ContactItemCardHTML(contact);
	// append list item to contacts list
	contactList.appendChild(li);
}

const initContacts = async () => {
	// fetch contacts list from JSON file
	fetch("./assets/contacts.json")
		.then((response) => response.json())
		.then((data) => {
			// save contacts list for future use in filters
			contacts = data;
			// Render card item for each contact
			contacts.forEach((contact) => {
				appendContactCard(contact);
			});
			// Initialize tabs with contacts count
			initTabs();
		})
		.catch((error) => console.log(error));
};

initContacts();

// Handle Cancel button click
document.getElementById("cancelBtn").addEventListener("click", () => {
	alert("Cancelled");
});

// Handle Invite button click
document.getElementById("inviteBtn").addEventListener("click", () => {
	let invitedContacts = [];
	alert(`Invited ${invitedContacts.map((item) => item.name).join(", ")}`);
});

function initTabs() {
	const tabs = document.querySelectorAll(".tab");
	tabs.forEach((tab) => {
		tab.querySelector("span").textContent = contacts.filter(
			(contact) =>
				contact.type === tab.getAttribute("data-tab") ||
				tab.getAttribute("data-tab") == "all"
		).length;
	});
}
