// menu.js
export function menu() {
    const content = document.querySelector("#content");
    content.textContent = "";

    const heading = createHeading("h1", "main-heading", "Menu");
    content.appendChild(heading);

    const courses = document.createElement("div");
    courses.className = "meal-courses";

    const sMeal1 = createMeal("Chicken Pakora", "Deep-fried marinated chicken with chickpea flour");
    const sMeal2 =createMeal("Paneer Tikka", "Grilled cottage cheese with herbs and yogurt marinade");
    const sMeal3 = createMeal("Tandoori Chicken Wings", "Spicy grilled chicken wings from the tandoor");
    const sMeals = [sMeal1, sMeal2, sMeal3];
    const starters = createCourse("starters", "Starters", sMeals);
    courses.appendChild(starters);

    const mMeal1 = createMeal("Butter Chicken", "Creamy tomato curry with tender chicken");
    const mMeal2 = createMeal("Chicken Tikka Masala", "Grilled chicken in a rich spiced sauce");
    const mMeal3 = createMeal("Chicken Korma", "Mild Curry with cream, nuts, and spices");
    const mMeals = [mMeal1, mMeal2, mMeal3];
    const mainDishes = createCourse("main-dishes", "Main Dishes", mMeals);
    courses.appendChild(mainDishes);

    const dMeal1 = createMeal("Gulab Jamun", "Sweet fried dough balls in syrup");
    const dMeal2 = createMeal("Mango Lassi", "Yogurt drink with mango");
    const dMeal3 = createMeal("Kheer", "Indian rice pudding");
    const dMeals = [dMeal1, dMeal2, dMeal3];
    const desserts = createCourse("desserts", "Desserts", dMeals);
    courses.appendChild(desserts);

    content.appendChild(courses);
}

function createHeading(type, classname, content) {
    const heading = document.createElement("div");
    heading.className = classname;
    const h = document.createElement(type);
    h.textContent = content;
    heading.appendChild(h);
    return heading;
}

function createCourse(classname, mealheading, mealsArr) {
    const course = document.createElement("div");
    course.className = classname;
    const heading = createHeading("h2", "heading", mealheading);
    course.appendChild(heading);
    const meals = document.createElement("div");
    meals.className = "meals";
    for (const meal of mealsArr) {
        meals.appendChild(meal);
    }
    course.appendChild(meals);
    return course;
}

function createMeal(mealheading, mealdescription) {
    const meal = document.createElement("div");
    meal.className = "meal";
    const heading = createHeading("h3", "meal-heading", mealheading);
    meal.appendChild(heading);
    const description = document.createElement("div");
    description.className = "meal-description";
    description.textContent = mealdescription;
    meal.appendChild(description);
    return meal;
}