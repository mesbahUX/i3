/* =========================================================
   HOME CONTENT FILTER
========================================================= */

document.addEventListener(
    "componentsLoaded",
    () => {

        const applyButton =
            document.querySelector(
                "#home-apply-filter"
            );

        if (!applyButton) {
            return;
        }


        /* -----------------------------------------
           APPLY FILTER
        ----------------------------------------- */

        applyButton.addEventListener(
            "click",
            () => {

                const filters =
                    window.homeActiveFilters;

                if (!filters) {
                    return;
                }


                applyContentFilter(
                    filters
                );

            }
        );

    }
);


/* =========================================================
   APPLY CONTENT FILTER
========================================================= */

function applyContentFilter(
    filters
) {

    const rows =
        document.querySelectorAll(
            ".content-row[data-format]"
        );


    rows.forEach(row => {

        /* -----------------------------------------
           FORMAT
           فقط ردیف را نمایش/مخفی می‌کند
           و به IDها کاری ندارد
        ----------------------------------------- */

        if (filters.format) {

            const rowFormat =
                row.dataset.format;


            if (
                rowFormat !==
                filters.format
            ) {

                row.style.display =
                    "none";

                return;

            }

        }


        /* -----------------------------------------
           SHOW ROW
        ----------------------------------------- */

        row.style.display = "";


        /* -----------------------------------------
           SLIDER
        ----------------------------------------- */

        const slider =
            row.querySelector(
                ".content-slider[data-ids]"
            );


        if (!slider) {
            return;
        }


        /* -----------------------------------------
           ORIGINAL IDS
           محدوده اصلی را فقط یک بار نگه می‌داریم
        ----------------------------------------- */

        const originalIds =
            slider.dataset.originalIds ||
            slider.dataset.ids;


        if (!slider.dataset.originalIds) {

            slider.dataset.originalIds =
                originalIds;

        }


        /* -----------------------------------------
           NO TOPIC / SPEAKER
        ----------------------------------------- */

        if (
            !filters.topic &&
            !filters.speaker
        ) {

            slider.dataset.ids =
                originalIds;


            loadContentRow(
                slider
            );


            return;

        }


        /* -----------------------------------------
           FILTER IDS
        ----------------------------------------- */

        const filteredIds =
            getFilteredIds(
                originalIds,
                filters
            );


        if (!filteredIds.length) {

            slider.dataset.ids =
                "";

            loadContentRow(
                slider
            );

            return;

        }


        /* -----------------------------------------
           SET IDS
        ----------------------------------------- */

        slider.dataset.ids =
            filteredIds.join(",");


        loadContentRow(
            slider
        );

    });

}


/* =========================================================
   GET FILTERED IDS
========================================================= */

function getFilteredIds(
    originalIds,
    filters
) {

    /*
       IDهای این ردیف را می‌گیریم.
    */

    const allIds =
        parseIds(
            originalIds
        );


    /*
       برای هر ردیف، چند ID اول
       مخصوص Topic هستند.
    */

    const topicIds =
        getTopicIds(
            originalIds,
            allIds
        );


    /*
       برای هر ردیف، چند ID آخر
       مخصوص Speaker هستند.
    */

    const speakerIds =
        getSpeakerIds(
            originalIds,
            allIds
        );


    /* -----------------------------------------
       فقط TOPIC
    ----------------------------------------- */

    if (
        filters.topic &&
        !filters.speaker
    ) {

        return topicIds;

    }


    /* -----------------------------------------
       فقط SPEAKER
    ----------------------------------------- */

    if (
        filters.speaker &&
        !filters.topic
    ) {

        return speakerIds;

    }


    /* -----------------------------------------
       TOPIC + SPEAKER
       اشتراک دو مجموعه
    ----------------------------------------- */

    if (
        filters.topic &&
        filters.speaker
    ) {

        return topicIds.filter(
            id =>
                speakerIds.includes(id)
        );

    }


    return allIds;

}


/* =========================================================
   TOPIC IDS
========================================================= */

function getTopicIds(
    originalIds,
    allIds
) {

    /*
       فعلاً 3/4 اول هر ردیف
       برای Topic
    */

    const count =
        Math.ceil(
            allIds.length * 0.75
        );


    return allIds.slice(
        0,
        count
    );

}


/* =========================================================
   SPEAKER IDS
========================================================= */

function getSpeakerIds(
    originalIds,
    allIds
) {

    /*
       فعلاً 3/4 آخر هر ردیف
       برای Speaker
    */

    const count =
        Math.ceil(
            allIds.length * 0.75
        );


    return allIds.slice(
        allIds.length - count
    );

}


/* =========================================================
   PARSE IDS
========================================================= */

function parseIds(
    ids
) {

    const result = [];


    ids
        .split(",")
        .forEach(part => {

            const pieces =
                part.trim().split("-");


            const start =
                parseInt(
                    pieces[0]
                );


            const end =
                pieces.length > 1
                    ? parseInt(
                        pieces[1]
                    )
                    : start;


            if (
                Number.isNaN(start) ||
                Number.isNaN(end)
            ) {
                return;
            }


            for (
                let i = start;
                i <= end;
                i++
            ) {

                result.push(
                    String(i)
                );

            }

        });


    return result;

}
