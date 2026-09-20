document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSearchPage();

    }
);


/* =========================================================
   DATA
========================================================= */

async function loadSearchData() {

    const response =
        await fetch("data/contents2.xml");

    if (!response.ok) {

        throw new Error(
            "خطا در دریافت contents2.xml"
        );

    }

    const text =
        await response.text();

    return new DOMParser().parseFromString(
        text,
        "application/xml"
    );

}


/* =========================================================
   LOAD SEARCH PAGE
========================================================= */

async function loadSearchPage() {

    try {

        const input =
            document.querySelector("#search-input");

        const button =
            document.querySelector("#search-button");

        if (!input || !button) {
            return;
        }


        /* =====================================================
           LOAD DATA
        ===================================================== */

        const xml =
            await loadSearchData();


        const contents =
            Array.from(
                xml.querySelectorAll("content")
            );


        /* =====================================================
           URL QUERY
        ===================================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );

        const query =
            params.get("q") || "";


        if (query) {

            input.value = query;

            searchContents(
                query,
                contents
            );

        }
        else {

            showSearchEmpty(
                "برای جستجو، عبارت مورد نظر خود را وارد کنید."
            );

        }


        /* =====================================================
           SEARCH
        ===================================================== */

        function doSearch() {

            const value =
                input.value.trim();


            if (!value) {

                showSearchEmpty(
                    "برای جستجو، عبارت مورد نظر خود را وارد کنید."
                );

                return;

            }


            const newUrl =
                `search.html?q=${encodeURIComponent(value)}`;


            window.history.pushState(
                {},
                "",
                newUrl
            );


            searchContents(
                value,
                contents
            );

        }


        button.addEventListener(
            "click",
            doSearch
        );


        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    doSearch();

                }

            }
        );


    }
    catch (error) {

        console.error(
            "SEARCH ERROR:",
            error
        );

    }

}


/* =========================================================
   SEARCH CONTENTS
========================================================= */

function searchContents(
    query,
    contents
) {

    const normalizedQuery =
        query
            .trim()
            .toLowerCase();


    const results =
        contents.filter(
            content => {

                const title =
                    content.querySelector("title")
                        ?.textContent
                        .trim()
                        .toLowerCase() || "";


                const speaker =
                    content.querySelector("speaker")
                        ?.textContent
                        .trim()
                        .toLowerCase() || "";


                const topic =
                    content.querySelector("topic")
                        ?.textContent
                        .trim()
                        .toLowerCase() || "";


                const tags =
                    Array.from(
                        content.querySelectorAll("tags tag")
                    )
                    .map(
                        tag =>
                            tag.textContent
                                .trim()
                                .toLowerCase()
                    )
                    .join(" ");


                return (

                    title.includes(
                        normalizedQuery
                    )

                    ||

                    speaker.includes(
                        normalizedQuery
                    )

                    ||

                    topic.includes(
                        normalizedQuery
                    )

                    ||

                    tags.includes(
                        normalizedQuery
                    )

                );

            }
        );


    renderSearchResults(
        results,
        query
    );

}


/* =========================================================
   RENDER RESULTS
========================================================= */

function renderSearchResults(
    contents,
    query
) {

    const container =
        document.querySelector(
            "#search-results-list"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!contents.length) {

        showSearchEmpty(
            `نتیجه‌ای برای «${query}» پیدا نشد.`
        );

        return;

    }


    hideSearchEmpty();


    contents.forEach(
        content => {

            const id =
                content.getAttribute("id");


            const title =
                content.querySelector("title")
                    ?.textContent
                    .trim() || "";


            const speaker =
                content.querySelector("speaker")
                    ?.textContent
                    .trim() || "";


            const type =
                content.querySelector("type")
                    ?.textContent
                    .trim() || "";


            const duration =
                content.querySelector("duration")
                    ?.textContent
                    .trim() || "";


            const image =
                content.querySelector("cover")
                    ?.textContent
                    .trim()
                ||
                content.querySelector("image")
                    ?.textContent
                    .trim()
                ||
                "";


            const typeText =
                type === "video"
                    ? "ویدئو"
                    : "صوت";


            const typeIcon =
                type === "video"
                    ? "fa-video"
                    : "fa-headphones";


            const item =
                document.createElement("div");


            item.className =
                "search-result-item";


            item.innerHTML = `

                <div class="search-result-cover">

                    <img
                        src="${image}"
                        alt="${title}"
                    >

                </div>


                <div class="search-result-info">

<div class="search-result-title">
    <span class="search-title-text">${title}</span>
</div>


                    ${
                        speaker
                            ? `
                                <div class="search-result-speaker">
                                    ${speaker}
                                </div>
                            `
                            : ""
                    }


                    <div class="search-result-meta">

                        <span>
                            <i class="fa-solid ${typeIcon}"></i>
                            ${typeText}
                        </span>

                        ${
                            duration
                                ? `
                                    <span>
                                        <i class="fa-regular fa-clock"></i>
                                        ${duration}
                                    </span>
                                `
                                : ""
                        }

                    </div>

                </div>

            <div class="playlist-content-actions">

                <button
                    type="button"
                    class="playlist-action share-button"
                    data-content-id="${id}"
                    title="اشتراک‌گذاری"
                >
                    <i class="fa-solid fa-share-nodes"></i>
                </button>

                <button
                    type="button"
                    class="playlist-action download-button"
                    data-content-id="${id}"
                    title="دانلود"
                >
                    <i class="fa-solid fa-download"></i>
                </button>

                <button
                    type="button"
                    class="playlist-action save-action"
                    data-content-id="${id}"
                    title="ذخیره"
                >
                    <i class="fa-regular fa-bookmark"></i>
                </button>

            </div>

            `;


            /* =================================================
               CLICK
            ================================================= */

            item.addEventListener(
                "click",
                event => {

if (
    event.target.closest(
        ".playlist-action"
    )
) {
    return;
}


                    if (!id) {
                        return;
                    }


                    window.location.href =
                        `content.html?id=${encodeURIComponent(id)}`;

                }
            );


        container.appendChild(item);

        checkSearchTitleOverflow(item);

        }
    );

    loadPlaylistSaveStates();
}


/* =========================================================
   EMPTY STATE
========================================================= */

function showSearchEmpty(message) {

    const empty =
        document.querySelector(
            "#search-empty"
        );


    if (!empty) {
        return;
    }


    empty.textContent =
        message;


    empty.style.display =
        "block";

}


function hideSearchEmpty() {

    const empty =
        document.querySelector(
            "#search-empty"
        );


    if (!empty) {
        return;
    }


    empty.style.display =
        "none";

}


function checkSearchTitleOverflow(item) {

    const titleElement =
        item.querySelector(".search-result-title");

    const titleText =
        item.querySelector(".search-title-text");

    if (!titleElement || !titleText) {
        return;
    }

    /* عنوان اصلی را از data ذخیره می‌کنیم */
    const originalTitle =
        titleText.dataset.originalTitle ||
        titleText.textContent;

    titleText.dataset.originalTitle =
        originalTitle;

    /* اول حالت قبلی را پاک می‌کنیم */
    titleElement.classList.remove("is-long");

    titleText.textContent =
        originalTitle;

    requestAnimationFrame(() => {

        const textWidth =
            titleText.scrollWidth;

        const containerWidth =
            titleElement.clientWidth;

        if (textWidth > containerWidth) {

            titleText.textContent =
                  originalTitle + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
                + originalTitle + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
                + originalTitle + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
                + originalTitle + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
                + originalTitle;

            titleElement.classList.add("is-long");

        }

    });

}
window.addEventListener("resize", () => {

    document
        .querySelectorAll(".search-result-item")
        .forEach(item => {

            checkSearchTitleOverflow(item);

        });

});