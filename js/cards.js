/* =========================================================
   CARD FACTORY
   ساخت کارت بر اساس type
========================================================= */

function createCard(item) {

    const itemType =
        getXMLValue(item, "type");


    switch (itemType) {

        case "video":
            return createVideoCard(item);

        case "audio":
            return createAudioCard(item);

        case "playlist":
            return createPlaylistCard(item);

        case "speaker":
            return createSpeakerCard(item);

        case "topic":
            return createTopicCard(item);

        default:
            return null;

    }

}


/* =========================================================
   GET XML VALUE
========================================================= */

function getXMLValue(item, tag) {

    return (
        item.querySelector(tag)
            ?.textContent
            .trim() || ""
    );

}


/* =========================================================
   VIDEO CARD
========================================================= */

function createVideoCard(item) {

    const id = item.getAttribute("id");

    const title =
        getXMLValue(item, "title");

    const speaker =
        getXMLValue(item, "speaker");

    const image =
        getXMLValue(item, "image");

    const duration =
        getXMLValue(item, "duration");


    const card =
        document.createElement("a");


    card.href =
        `content.html?id=${id}`;


    card.className =
        "content-card video-card";


    card.innerHTML = `

        <div class="content-card-image">

            <img
                src="${image}"
                alt="${title}"
            >

            <span class="video-play-icon">

                <i class="fa-solid fa-play"></i>

            </span>


            ${
                duration
                    ? `
                        <span class="video-duration">
                            ${duration}
                        </span>
                    `
                    : ""
            }

        </div>


        <!-- <div class="content-card-body">

            <h3>
                ${title}
            </h3>

            <p>
                ${speaker}
            </p>

        </div> -->
        
<div class="content-card-body">

    <div class="card-title-row">

        <h3>
            ${title}
        </h3>

    </div>

    <p>
        ${speaker}
    </p>

</div>
    `;

const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "content")
);

    return card;

}


/* =========================================================
   AUDIO CARD
========================================================= */

function createAudioCard(item) {

    const id = item.getAttribute("id");

    const title =
        getXMLValue(item, "title");

    const speaker =
        getXMLValue(item, "speaker");

    const image =
        getXMLValue(item, "image");


    const card =
        document.createElement("a");


    card.href =
        `content.html?id=${id}`;


    card.className =
        "content-card audio-card";


    card.innerHTML = `

        <div class="content-card-image">

            <img
                src="${image}"
                alt="${title}"
            >

        </div>


        <!-- <div class="content-card-body">

            <h3>
                ${title}
            </h3>

            <p>
                ${speaker}
            </p>

        </div> -->
<div class="content-card-body">

    <div class="card-title-row">

        <h3>
            ${title}
        </h3>

    </div>

    <p>
        ${speaker}
    </p>

</div>
    `;

const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "content")
);

    return card;

}


/* =========================================================
   PLAYLIST CARD
========================================================= */

function createPlaylistCard(item) {

    const id =
        item.getAttribute("id");


    const title =
        getXMLValue(item, "title");


    const description =
        getXMLValue(item, "description");


    const format =
        getXMLValue(item, "format");


    const image1 =
        getXMLValue(item, "image1");


    const image2 =
        getXMLValue(item, "image2");


    const image3 =
        getXMLValue(item, "image3");


    /* =========================================================
       FORMAT INFO
    ========================================================= */

    let formatIcon = "fa-solid fa-layer-group";
    let formatText = "";


    if (format === "audio") {

        formatIcon =
            "fa-solid fa-headphones";

        formatText =
            "صوتی";

    }

    else if (format === "video") {

        formatIcon =
            "fa-solid fa-video";

        formatText =
            "تصویری";

    }

    else if (format === "mixed") {

        formatIcon =
            "fa-solid fa-photo-film";

        formatText =
            "صوتی-تصویری";

    }


    /* =========================================================
       CREATE CARD
    ========================================================= */

    const card =
        document.createElement("a");


    card.href =
        `playlist.html?id=${id}`;


    card.className =
        "playlist-card";


    card.innerHTML = `

        <div class="playlist-image">

            <div class="playlist-images">

                <img
                    src="${image1}"
                    alt=""
                    aria-hidden="true"
                >

                <img
                    src="${image2}"
                    alt=""
                    aria-hidden="true"
                >

                <img
                    src="${image3}"
                    alt="${title}"
                >


                <span class="playlist-info">

                    <i class="${formatIcon}"></i>

                    <span>
                        ${formatText}
                    </span>

                </span>


                ${
                    description
                        ? `
                            <span class="playlist-hover-text">
                                ${description}
                            </span>
                        `
                        : ""
                }

            </div>

        </div>


        <!-- <h3>
            ${title}
        </h3> -->
<div class="card-title-row">

    <h3>
        ${title}
    </h3>

</div>

    `;


    /* =========================================================
       MOBILE + TABLET CLICK
    ========================================================= */

    card.addEventListener("click", (event) => {
        if (
            event.target.closest(".card-actions")
        ) {
            return;
        }
        /* فقط موبایل و تبلت */
        if (window.innerWidth > 1000) {
            return;
        }


        /* اگر اطلاعات هنوز نمایش داده نشده */
        if (!card.classList.contains("show-info")) {

            event.preventDefault();


            /* بستن اطلاعات کارت‌های دیگر */
            document
                .querySelectorAll(".playlist-card.show-info")
                .forEach(otherCard => {

                    otherCard.classList.remove("show-info");

                });


            /* نمایش اطلاعات این کارت */
            card.classList.add("show-info");

        }

        /*
        اگر show-info از قبل وجود داشته باشد،
        preventDefault اجرا نمی‌شود
        و لینک باز می‌شود.
        */

    });

const titleRow =
    card.querySelector(".card-title-row");

titleRow.appendChild(
    createCardActions(id, "playlist")
);
    return card;

}


/* =========================================================
   SPEAKER CARD
========================================================= */

function createSpeakerCard(item) {

    const id = item.getAttribute("id");

    const name =
        getXMLValue(item, "title");

    const image =
        getXMLValue(item, "image");


    const card =
        document.createElement("a");


    card.href =
        `speaker.html?id=${id}`;


    card.className =
        "speaker-card";


    card.innerHTML = `

        <div class="speaker-image">

            <img
                src="${image}"
                alt="${name}"
            >

        </div>


        <h3>
            ${name}
        </h3>

    `;


    return card;

}


/* =========================================================
   TOPIC CARD
========================================================= */

function createTopicCard(item) {

    const id =
        item.getAttribute("id");

    const title =
        getXMLValue(item, "title");


    const card =
        document.createElement("a");


    /*
       با کلیک روی کارت دسته‌بندی
       به صفحه نتایج می‌رویم
       و اسم خود کارت را همراه لینک می‌فرستیم
    */

    card.href =
        `results.html?topic=${encodeURIComponent(title)}`;


    card.className =
        "topic-card";


    card.innerHTML = `

        <h3>
            ${title}
        </h3>

    `;


    return card;

}

/* =========================================================
   CARD ACTIONS
   منوی سه نقطه کارت
========================================================= */

function createCardActions(id, type = "content") {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "card-actions";


wrapper.innerHTML = `

    <button
        class="card-actions-button"
        type="button"
        aria-label="گزینه‌ها"
    >
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>

    <div class="card-actions-menu">
            ${
                type === "playlist"
                    ? `
                        <button
                            class="playlist-card-share-button"
                            data-playlist-id="${id}"
                            type="button"
                        >
                            <i class="fa-solid fa-share-nodes"></i>
                            <span>اشتراک‌گذاری</span>
                        </button>


                        <button
                            class="playlist-card-save-button"
                            data-playlist-id="${id}"
                            type="button"
                        >
                            <i class="fa-regular fa-bookmark"></i>
                            <span>ذخیره</span>
                        </button>
                    `
                    : `
                        <button
                            class="content-actions-button share-button"
                            data-content-id="${id}"
                            type="button"
                        >
                            <i class="fa-solid fa-share-nodes"></i>
                            <span>اشتراک‌گذاری</span>
                        </button>


                        <button
                            class="content-actions-button save-action"
                            data-content-id="${id}"
                            type="button"
                        >
                            <i class="fa-regular fa-bookmark"></i>
                            <span>ذخیره</span>
                        </button>


                        <button
                            class="content-actions-button download-button"
                            data-content-id="${id}"
                            type="button"
                        >
                            <i class="fa-solid fa-download"></i>
                            <span>دانلود</span>
                        </button>
                    `
            }

        </div>

    `;


    /* =========================================================
       THREE DOT BUTTON
    ========================================================= */

    const button =
        wrapper.querySelector(
            ".card-actions-button"
        );


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            document
                .querySelectorAll(
                    ".card-actions.show"
                )
                .forEach(other => {

                    if (other !== wrapper) {

                        other.classList.remove(
                            "show"
                        );

                    }

                });


            wrapper.classList.toggle(
                "show"
            );
const saveButton =
    wrapper.querySelector(
        ".save-action, .playlist-card-save-button"
    );

if (saveButton) {

    const storageKey =
        type === "playlist"
            ? "mesbah_saved_playlists"
            : "mesbah_saved_contents";


    const savedItems =
        JSON.parse(
            localStorage.getItem(storageKey) || "[]"
        );


    const saved =
        savedItems.includes(id);


    const icon =
        saveButton.querySelector("i");


    if (saved) {

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

    } else {

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

    }

}
        }
    );

    /* =========================================================
       PREVENT CARD LINK
       جلوگیری از رفتن به صفحه کارت هنگام کلیک روی اکشن‌ها
    ========================================================= */

    wrapper
        .querySelectorAll(
            ".card-actions-menu button"
        )
        .forEach(actionButton => {

            actionButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        });
return wrapper;
}


/* =========================================================
   CLOSE CARD MENUS
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".card-actions"
            )
        ) {

            document
                .querySelectorAll(
                    ".card-actions.show"
                )
                .forEach(action => {

                    action.classList.remove(
                        "show"
                    );

                });

        }

    }
);

/* =========================================================
   PLAYLIST CARD ACTIONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        /* =====================================================
           SHARE
        ===================================================== */

        const shareButton =
            event.target.closest(
                ".playlist-card-share-button"
            );


        if (shareButton) {

            event.preventDefault();
            event.stopPropagation();


            const playlistId =
                shareButton.dataset.playlistId;


            if (!playlistId) return;


            const card =
                shareButton.closest(
                    ".playlist-card"
                );


            const title =
                card
                    ?.querySelector(
                        ".card-title-row h3"
                    )
                    ?.textContent
                    .trim()
                || "مجموعه";


            const url =
                `${window.location.origin}` +
                `${window.location.pathname
                    .replace(
                        /[^/]+$/,
                        "playlist.html"
                    )}` +
                `?id=${encodeURIComponent(playlistId)}`;


            if (navigator.share) {

                navigator.share({

                    title: title,

                    text:
                        `${title}\n\nاز سامانه مصباح\n${url}`,

                    url: url

                }).catch(error => {

                    if (
                        error.name !==
                        "AbortError"
                    ) {

                        console.error(
                            "PLAYLIST CARD SHARE ERROR:",
                            error
                        );

                    }

                });

            } else {

                navigator.clipboard
                    .writeText(url)
                    .then(() => {

                        alert(
                            "لینک مجموعه کپی شد."
                        );

                    });

            }


            return;

        }


        /* =====================================================
           SAVE
        ===================================================== */

        const saveButton =
            event.target.closest(
                ".playlist-card-save-button"
            );


        if (saveButton) {

            event.preventDefault();
            event.stopPropagation();


            const playlistId =
                saveButton.dataset.playlistId;


            if (!playlistId) return;


            let saved = [];

            try {

                saved =
                    JSON.parse(
                        localStorage.getItem(
                            "mesbah_saved_playlists"
                        )
                    ) || [];

            } catch {

                saved = [];

            }


            const id =
                String(playlistId);


            const icon =
                saveButton.querySelector("i");


            if (
                saved.includes(id)
            ) {

                saved =
                    saved.filter(
                        item =>
                            String(item) !== id
                    );


                saveButton.classList.remove(
                    "saved"
                );


                if (icon) {

                    icon.className =
                        "fa-regular fa-bookmark";

                }

            } else {

                saved.push(id);


                saveButton.classList.add(
                    "saved"
                );


                if (icon) {

                    icon.className =
                        "fa-solid fa-bookmark";

                }

            }


            localStorage.setItem(
                "mesbah_saved_playlists",
                JSON.stringify(saved)
            );


            return;

        }

    }
);
