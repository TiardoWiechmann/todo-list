export function contact() {
    const content = document.querySelector("#content");
    content.textContent = "";
    
    const heading = document.createElement("div");
    heading.className = "heading";
    const h1 = document.createElement("h1");
    h1.textContent = "Contact Us";
    heading.appendChild(h1);
    content.appendChild(heading)
    
    const welcome = document.createElement("div");
    welcome.textContent = "We'd love to hear from you! Whether you want to reserve a table, order takeaway, or have any questions, feel free to get in touch.";
    content.appendChild(welcome);

    const address = createInfosection("address", "Address", `Spice Garden Indian Restaurant
        123 Main Street
        Berlin, Germany`);
    content.appendChild(address);

    const phone = createInfosection("phone", "Phone", "+49 30 12345678");
    content.appendChild(phone);

    const email = createInfosection("email", "Email", "info@spicegarden-restaurant.com");
    content.appendChild(email);

    const openHours = createInfosection("opening-hours", "Opening Hours", "");
    const ul = document.createElement("ul");
    ul.className = "infos";
    const li1 = createLi("Monday – Thursday: 11:30 AM – 10:00 PM");
    ul.appendChild(li1);
    const li2 = createLi("Friday – Saturday: 11:30 AM – 11:00 PM");
    ul.appendChild(li2);
    const li3 = createLi("Sunday: 12:00 PM – 10:00 PM");
    ul.appendChild(li3);
    openHours.appendChild(ul);
    content.appendChild(openHours);
}

function createInfosection(classname, subheading, content) {
    const infosection = document.createElement("div");
    infosection.className = classname;

    const heading = document.createElement("div");
    heading.className = "subheading";
    const h2 = document.createElement("h2");
    h2.textContent = subheading;
    heading.appendChild(h2);
    infosection.appendChild(heading);

    if (subheading != "opening-hours"){
        const info = document.createElement("div");
        info.className = "infos";
        info.innerText = content;
        infosection.appendChild(info);
    }

    return infosection;
}

function createLi(content) {
    const li = document.createElement("li");
    li.textContent = content;
    return li;
}