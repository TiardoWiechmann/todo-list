// home.js
import restaurantImage from "../images/indian-meal.jpg";

export function home() {
    const content = document.querySelector("#content");
    content.textContent = "";
    const heading = document.createElement("h1");
    heading.textContent = "Spicegarden";
    const image = document.createElement("img");
    image.width = 200;
    image.src = restaurantImage;
    image.alt = "Delicious indian meal"
    const homeP = document.createElement("p");
    homeP.innerText = `Welcome to Spicegarden – your destination for authentic indian cuisine.

    At Spicegarden, we bring together traditional recipes, fresh ingredients, and a warm, inviting atmosphere to create a dining
    experience that feels both special and familiar. Whether you are joining us for a relaxed dinner, a family celebration, or a
    quick lunch, our goal is to provide you with delicious food and attentive service. Each dish is carefully prepared to
    balance flavor, freshness, and authenticity.
    We look forward to welcoming you to Spicegarden and sharing the rich flavors of Indian cuisine with you.`;
    
    content.appendChild(heading);
    content.appendChild(image);
    content.appendChild(homeP);
};