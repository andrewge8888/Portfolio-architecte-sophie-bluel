function login() {
    const emailElement = document.querySelector(".emailField");
    const passwordElement = document.querySelector(".passwordField");
    const submitButtonElement = document.querySelector(".submitButton");
    

    submitButtonElement.addEventListener("click", async (event) => {
        const email = emailElement.value;
        const password = passwordElement.value;

        event.preventDefault();
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const ret = await response.json();

        localStorage.setItem("token", ret.token);


    });
}

login();