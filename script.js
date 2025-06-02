let contacts = [];
const contactList = document.getElementById("contactsList");
let selectedContacts = [];
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
	// check if contact is selected when filters are applied
	if (selectedContacts.includes(contact.id)) {
		li.classList.add("selected");
	}
	// toggle card selection on click
	li.addEventListener("click", toggleCardSelection);
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
	if (selectedContacts.length > 0) {
		let invitedContacts = contacts.filter((item) =>
			selectedContacts.includes(item.id)
		);
		alert(`Invited ${invitedContacts.map((item) => item.name).join(", ")}`);
	}
});

function initTabs() {
	const tabs = document.querySelectorAll(".tab");
	tabs.forEach((tab) => {
		tab.querySelector("span").textContent = contacts.filter(
			(contact) =>
				contact.type === tab.getAttribute("data-tab") ||
				tab.getAttribute("data-tab") == "all"
		).length;
		// Filter list on tab click
		tab.addEventListener("click", filterByType);
	});
}

// Select/Unselect a contact
function toggleCardSelection(e) {
	e.target.classList.toggle("selected");
	let id = e.target.getAttribute("data-index");

	if (selectedContacts.includes(id)) {
		selectedContacts.splice(selectedContacts.indexOf(id), 1);
	} else {
		selectedContacts.push(id);
	}
	inviteBtn.disabled = selectedContacts.length === 0;
}

// Filter list on search input change
const searchInput = document.getElementById("searchInput");

const filterByInput = (e) => {
	let value = e.target.value;
	contactList.innerHTML = "";
	contacts
		.filter(
			(contact) =>
				contact.name.toLowerCase().includes(value.toLowerCase()) &&
				(contact.type.toLowerCase() === activeTab || activeTab === "all")
		)
		.forEach((contact) => {
			appendContactCard(contact);
		});
};

searchInput.addEventListener("input", filterByInput);

// Handle Input clear button click
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", () => {
	searchInput.value = "";
	filterByInput({ target: { value: "" } });
});

// Filter list on tab click
const filterByType = (e) => {
	const tabs = document.querySelectorAll(".tab");
	tabs.forEach((t) => t.classList.remove("active"));

	let tab = e.target;
	tab.classList.add("active");
	activeTab = tab.getAttribute("data-tab").toLowerCase();
	for (const index in contactList.children) {
		if (
			contacts[index].type.toLowerCase() === activeTab ||
			activeTab == "all"
		) {
			contactList.children[index].style.display = "flex";
		} else {
			contactList.children[index].style.display = "none";
		}
	}
};
