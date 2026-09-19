/* =========================================================
   FILTER
========================================================= */

document.addEventListener("componentsLoaded", () => {

    const topicFilter =
        document.querySelector("#topic-filter");

    const speakerFilter =
        document.querySelector("#speaker-filter");

    const formatFilter =
        document.querySelector("#format-filter");

    const applyButton =
        document.querySelector("#apply-filter");

    const activeFilters =
        document.querySelector("#active-filters");


    if (
        !topicFilter ||
        !speakerFilter ||
        !formatFilter ||
        !applyButton ||
        !activeFilters
    ) {
        console.error("FILTER ELEMENTS NOT FOUND");
        return;
    }


    /* =========================================
       اطلاعات فیلترها
    ========================================= */

    const filterData = {

        topic: {
            element: topicFilter,
            title: "موضوع"
        },

        speaker: {
            element: speakerFilter,
            title: "سخنران"
        },

        format: {
            element: formatFilter,
            title: "قالب"
        }

    };


    /* =========================================
       نام فارسی موضوعات
    ========================================= */

    const topicNames = {

        quran:
            "قرآن",

        ahlulbayt:
            "چهارده معصوم",

        prophets:
            "پیامبران",

        hadith:
            "حدیث",

        history:
            "تاریخ",

        seerah:
            "سیره",

        arabic:
            "قواعد عربی",

        aqeedah:
            "کلام و عقاید",

        fiqh:
            "فقه و احکام",

        ethics:
            "اخلاق",

        family:
            "خانواده",

        "islamic-sciences":
            "علوم اسلامی"

    };


    /* =========================================
       خواندن URL
    ========================================= */

    const params =
        new URLSearchParams(
            window.location.search
        );


    /* =========================================
       فیلترهای ثابت URL
       
       اینها قابل تغییر یا حذف نیستند:
       
       topic
       speaker
       format
    ========================================= */

    const fixedFilters = {

        topic:
            params.get("topic") || "",

        speaker:
            params.get("speaker") || "",

        format:
            params.get("format") || ""

    };


    /* =========================================
       فیلترهای قابل تغییر کاربر
       
       اینها از:
       
       topicf
       speakerf
       formatf
       
       خوانده می‌شوند.
    ========================================= */

    const active = {

        topic:
            params.get("topicf") || "",

        speaker:
            params.get("speakerf") || "",

        format:
            params.get("formatf") || ""

    };


    /* =========================================
       مخفی کردن فیلدهایی که نسخه ثابتشان
       در URL وجود دارد
    ========================================= */

    // Object.keys(filterData).forEach(key => {

    //     const select =
    //         filterData[key].element;

    //     const field =
    //         select.closest(".filter-field");


    //     if (fixedFilters[key]) {

    //         field.style.display =
    //             "none";

    //     }

    // });

/* =========================================
   وضعیت نمایش فیلدها
========================================= */

function updateFilterFieldsVisibility() {

    Object.keys(filterData).forEach(key => {

        const select =
            filterData[key].element;

        const field =
            select.closest(".filter-field");


        /*
         * اگر فیلتر ثابت URL وجود داشته باشد
         * یا فیلتر قابل تغییر فعال باشد،
         * فیلد مخفی می‌شود.
         */

        if (
            fixedFilters[key] ||
            active[key]
        ) {

            field.style.display =
                "none";

        }

        else {

            field.style.display =
                "";

        }

    });

}
    /* =========================================
       نمایش تگ‌های فعال
       
       فقط topicf / speakerf / formatf
       نمایش داده می‌شوند.
    ========================================= */

    function renderActiveFilters() {

        activeFilters.innerHTML = "";


        Object.keys(filterData).forEach(key => {

            const value =
                active[key];

            if (!value) {
                return;
            }


            const select =
                filterData[key].element;


            let label =
                value;


            /* =====================================
               موضوع
            ===================================== */

            if (key === "topic") {

                label =
                    topicNames[value] || value;

            }


            /* =====================================
               سخنران و قالب
            ===================================== */

            else {

                const option =
                    select.querySelector(
                        `option[value="${value}"]`
                    );


                if (option) {

                    label =
                        option.textContent.trim();

                }

            }


            const tag =
                document.createElement("div");


            tag.className =
                "active-filter-tag";


            tag.innerHTML = `

                <span class="active-filter-label">
                    ${label}
                </span>

                <button
                    type="button"
                    class="remove-filter"
                    data-filter="${key}"
                    aria-label="حذف فیلتر"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

            `;
        activeFilters.appendChild(tag);

    });


    updateFilterFieldsVisibility();

    updateFilterButton();

}
 

    /* =========================================
       فعال / غیرفعال کردن دکمه
       
       فقط فیلترهای قابل تغییر بررسی می‌شوند.
    ========================================= */
function updateFilterButton() {

    const visibleFields =
        Object.keys(filterData).some(key => {

            const select =
                filterData[key].element;

            const field =
                select.closest(".filter-field");

            return field &&
                field.style.display !== "none";

        });


    /* اگر هیچ فیلدی نمایش داده نمی‌شود */
    if (!visibleFields) {

        applyButton.style.display =
            "none";

        return;

    }


    /* حداقل یک فیلد نمایش داده می‌شود */
    applyButton.style.display =
        "";


    const hasNewFilter =
        topicFilter.value ||
        speakerFilter.value ||
        formatFilter.value;


    applyButton.disabled =
        !hasNewFilter;

}


    /* =========================================
       تغییر موضوع
    ========================================= */

    topicFilter.addEventListener(
        "change",
        () => {

            active.topic =
                topicFilter.value;

            updateFilterButton();

        }
    );


    /* =========================================
       تغییر سخنران
    ========================================= */

    speakerFilter.addEventListener(
        "change",
        () => {

            active.speaker =
                speakerFilter.value;

            updateFilterButton();

        }
    );


    /* =========================================
       تغییر قالب
    ========================================= */

    formatFilter.addEventListener(
        "change",
        () => {

            active.format =
                formatFilter.value;

            updateFilterButton();

        }
    );


    /* =========================================
       اعمال فیلتر
       
       نکته مهم:
       
       topic / speaker / format
       دست‌نخورده باقی می‌مانند.
       
       فقط:
       
       topicf
       speakerf
       formatf
       
       ساخته / تغییر / حذف می‌شوند.
    ========================================= */

    applyButton.addEventListener(
        "click",
        () => {

            const newParams =
                new URLSearchParams();


            /* =====================================
               type
            ===================================== */

            const currentType =
                params.get("type");


            if (currentType) {

                newParams.set(
                    "type",
                    currentType
                );

            }


            /* =====================================
               فیلترهای ثابت URL
               
               بدون هیچ تغییری
            ===================================== */

            if (fixedFilters.topic) {

                newParams.set(
                    "topic",
                    fixedFilters.topic
                );

            }


            if (fixedFilters.speaker) {

                newParams.set(
                    "speaker",
                    fixedFilters.speaker
                );

            }


            if (fixedFilters.format) {

                newParams.set(
                    "format",
                    fixedFilters.format
                );

            }


            /* =====================================
               فیلتر موضوع انتخاب‌شده
            ===================================== */

            if (active.topic) {

                newParams.set(
                    "topicf",
                    active.topic
                );

            }


            /* =====================================
               فیلتر سخنران انتخاب‌شده
            ===================================== */

            if (active.speaker) {

                newParams.set(
                    "speakerf",
                    active.speaker
                );

            }


            /* =====================================
               فیلتر قالب انتخاب‌شده
            ===================================== */

            if (active.format) {

                newParams.set(
                    "formatf",
                    active.format
                );

            }


            window.location.href =
                `results.html?${newParams.toString()}`;

        }
    );


    /* =========================================
       حذف فیلتر
       
       فقط topicf / speakerf / formatf
       قابل حذف هستند.
    ========================================= */

    activeFilters.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".remove-filter"
                );


            if (!button) {
                return;
            }


            const filter =
                button.dataset.filter;


            /* فقط active را خالی می‌کنیم */
            active[filter] = "";


            const newParams =
                new URLSearchParams();


            /* =====================================
               type
            ===================================== */

            const currentType =
                params.get("type");


            if (currentType) {

                newParams.set(
                    "type",
                    currentType
                );

            }


            /* =====================================
               فیلترهای ثابت
               
               همیشه باقی می‌مانند.
            ===================================== */

            if (fixedFilters.topic) {

                newParams.set(
                    "topic",
                    fixedFilters.topic
                );

            }


            if (fixedFilters.speaker) {

                newParams.set(
                    "speaker",
                    fixedFilters.speaker
                );

            }


            if (fixedFilters.format) {

                newParams.set(
                    "format",
                    fixedFilters.format
                );

            }


            /* =====================================
               فیلترهای باقی‌مانده کاربر
            ===================================== */

            if (active.topic) {

                newParams.set(
                    "topicf",
                    active.topic
                );

            }


            if (active.speaker) {

                newParams.set(
                    "speakerf",
                    active.speaker
                );

            }


            if (active.format) {

                newParams.set(
                    "formatf",
                    active.format
                );

            }


            window.location.href =
                `results.html?${newParams.toString()}`;

        }
    );


    /* =========================================
       مقداردهی Select ها
       
       فقط از topicf / speakerf / formatf
    ========================================= */

    topicFilter.value =
        active.topic;


    speakerFilter.value =
        active.speaker;


    formatFilter.value =
        active.format;


    /* =========================================
       وضعیت اولیه
    ========================================= */

    renderActiveFilters();

    updateFilterButton();

});
