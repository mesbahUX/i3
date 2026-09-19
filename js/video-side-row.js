async function loadVideoSideRow() {

    const sideRow = document.querySelector(".video-side-row");

    if (!sideRow) return;

    try {

        const response = await fetch("data/contents2.xml");
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

const currentContentId =
    new URLSearchParams(
        window.location.search
    ).get("id");


const currentContent =
    [...xml.querySelectorAll("content")]
        .find(content =>
            content.getAttribute("id") ===
            currentContentId
        );


const topic =
    currentContent
        ?.querySelector("topic")
        ?.textContent
        .trim() || "";


        const contents = [...xml.querySelectorAll("content")]
            .filter(content => {

                const id = Number(content.getAttribute("id"));

                return id >= 1 && id <= 12;
            });


        /* ساخت کارت‌ها */
        contents.forEach(content => {

            const id = content.getAttribute("id");

            const title =
                content.querySelector("title")?.textContent.trim() || "";

            const speaker =
                content.querySelector("speaker")?.textContent.trim() || "";

            const image =
                content.querySelector("image")?.textContent.trim() || "";


            const item = document.createElement("a");

            item.className = "video-side-item";
            item.href = `content.html?id=${id}`;


            const cover = document.createElement("img");

            cover.className = "video-side-cover";
            cover.src = image;
            cover.alt = title;


            const info = document.createElement("div");

            info.className = "video-side-info";


            const titleElement = document.createElement("span");

            titleElement.className = "video-side-title";
            titleElement.textContent = title;


            const speakerElement = document.createElement("span");

            speakerElement.className = "video-side-speaker";
            speakerElement.textContent = speaker;


            info.appendChild(titleElement);
            info.appendChild(speakerElement);

            item.appendChild(cover);
            item.appendChild(info);

            sideRow.appendChild(item);

        });


        /* =====================================================
           MORE BUTTON
        ===================================================== */

        const items = sideRow.querySelectorAll(".video-side-item");

        const maxItems = 10;


        if (items.length > maxItems) {

            items.forEach((item, index) => {

                if (index >= maxItems) {
                    item.style.display = "none";
                }

            });


            const moreButton = document.createElement("a");

            moreButton.className = "video-side-more";
const params =
    new URLSearchParams();

params.set(
    "format",
    "video"
);

if (topic) {

    params.set(
        "topic",
        topic
    );
}

moreButton.href =
    `results.html?${params.toString()}`;
    
            moreButton.innerHTML = `
                مشاهده همه
                <i class="fa-solid fa-arrow-left"></i>
            `;

            sideRow.appendChild(moreButton);
        }


    } catch (error) {

        console.error(
            "خطا در بارگذاری video-side-row:",
            error
        );

    }
}


document.addEventListener("DOMContentLoaded", () => {

    loadVideoSideRow();

});