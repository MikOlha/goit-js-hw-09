const formData = {
    email: "",
    message: ""
};

const saveToLocalStorage = () => {
    try {
        localStorage.setItem("feedback-form-state", JSON.stringify(formData));
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};

const populateForm = () => {
    try {
        const savedData = localStorage.getItem("feedback-form-state");
        if (savedData) {
            const { email, message } = JSON.parse(savedData);
            formData.email = email || "";
            formData.message = message || "";

            document.querySelector('input[name="email"]').value = formData.email;
            document.querySelector('textarea[name="message"]').value = formData.message;
        }
    } catch (error) {
        console.error("Error populating form", error);
    }
};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', (event) => {
    const { name, value } = event.target;
    formData[name] = value;
    saveToLocalStorage();
});

populateForm();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!formData.email || !formData.message) {
        alert("Fill please all fields");
        return;
    }

    console.log(formData);
    localStorage.removeItem("feedback-form-state");
    formData.email = "";
    formData.message = "";
    form.reset();
});