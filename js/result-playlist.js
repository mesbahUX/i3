/* =========================================================
   LOAD NEWEST PLAYLIST CARDS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadPlaylistCards();

});


/* =========================================================
   LOAD PLAYLIST CARDS
========================================================= */

async function loadPlaylistCards() {

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
            await fetch("data/playlists.xml");


        if (!response.ok) {

            throw new Error(
                "Failed to load playlists.xml"
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
           همه مجموعه‌ها
        ========================================= */

        const playlists =
            [
                ...xml.querySelectorAll("playlist")
            ];


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
            "results-items-grid results-playlist-grid";


        /* =========================================
           ساخت کارت‌ها
        ========================================= */

        playlists.forEach(item => {

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
            "Error loading playlist cards:",
            error
        );

    }

}