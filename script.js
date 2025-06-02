let contacts = [];
const contactList = document.getElementById("contactsList");

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
		})
		.catch((error) => console.log(error));
};

initContacts();
