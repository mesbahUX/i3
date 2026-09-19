/* =========================================================
   SET AUDIO RESULTS TITLE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const type =
        params.get("type");

    const title =
        document.querySelector("#results-title");

    if (!title) {
        return;
    }

    const titles = {

        newest:
            "تازه‌های صوت",

        popular:
            "پربازدیدهای صوت",

        upcoming:
            "مناسبت‌های پیش‌رو - صوت"

    };

    title.textContent =
        titles[type] || "صوت‌ها";

});
/* =========================================================
   LOAD NEWEST AUDIO CARDS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadAudioCards();

});


/* =========================================================
   LOAD AUDIO CARDS
========================================================= */

async function loadAudioCards() {

    const container =
        document.querySelector(".results-grid");


    if (!container) {
        return;
    }


    try {

        /* =========================================
           LOAD XML
        ========================================= */

        const response =
            await fetch("data/contents2.xml");


        if (!response.ok) {

            throw new Error(
                "Failed to load contents2.xml"
            );

        }


        const xmlText =
            await response.text();


        const parser =
            new DOMParser();


        const xml =
            parser.parseFromString(
                xmlText,
                "application/xml"
            );


        /* =========================================
           بررسی خطای XML
        ========================================= */

        const parserError =
            xml.querySelector("parsererror");


        if (parserError) {

            throw new Error(
                "ساختار XML صحیح نیست."
            );

        }


        /* =========================================
           فقط صوت‌ها
        ========================================= */

        const audios =
            [...xml.querySelectorAll("content")]
                .filter(item => {

                    const type =
                        item
                            .querySelector("type")
                            ?.textContent
                            .trim();

                    return type === "audio";

                });


        /* =========================================
           پاک کردن محتوای قبلی
        ========================================= */

        container.innerHTML = "";


        /* =========================================
           ساخت همان گرید Results
        ========================================= */

        const grid =
            document.createElement("div");


        grid.className =
            "results-items-grid results-audio-grid";


        /* =========================================
           ساخت کارت‌ها
        ========================================= */

        audios.forEach(item => {

            const card =
                createCard(item);


            if (card) {

                grid.appendChild(card);

            }

        });


        /* =========================================
           اضافه کردن گرید به صفحه
        ========================================= */

        container.appendChild(grid);


    } catch (error) {

        console.error(
            "Error loading audio cards:",
            error
        );

    }

}