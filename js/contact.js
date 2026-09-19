document.addEventListener("DOMContentLoaded", () => {

    const copyButtons =
        document.querySelectorAll(".copy-contact");

    copyButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const text =
                button.dataset.copy;

            if (!text) return;

            try {

                await navigator.clipboard.writeText(text);

const icon = button.querySelector("i");

if (!icon) return;

icon.className = "fa-solid fa-check";

setTimeout(() => {

    icon.className = "fa-regular fa-copy";

}, 1500);

            } catch (error) {

                console.error(
                    "کپی انجام نشد:",
                    error
                );

            }

        });

    });

});