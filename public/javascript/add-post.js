async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const review = document.querySelector("#review").value;

    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            review
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);