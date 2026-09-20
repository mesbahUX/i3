/* =========================================================
   HOME FILTER
========================================================= */

document.addEventListener("componentsLoaded", () => {

    const topicFilter =
        document.querySelector("#home-topic-filter");

    const speakerFilter =
        document.querySelector("#home-speaker-filter");

    const formatFilter =
        document.querySelector("#home-format-filter");

    const applyButton =
        document.querySelector("#home-apply-filter");

    const activeFilters =
        document.querySelector("#home-active-filters");


    if (
        !topicFilter ||
        !speakerFilter ||
        !formatFilter ||
        !applyButton ||
        !activeFilters
    ) {

        console.error(
            "HOME FILTER ELEMENTS NOT FOUND"
        );

        return;

    }


    /* =========================================================
       اطلاعات فیلترها
    ========================================================= */

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


    /* =========================================================
       نام فارسی موضوعات
    ========================================================= */

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


    /* =========================================================
       فیلترهای انتخاب‌شده
       
       اینجا فقط بعد از زدن دکمه اعمال
       مقدار واقعی می‌گیرند.
    ========================================================= */

window.homeActiveFilters = {
    topic: "",
    speaker: "",
    format: ""
};

const active =
    window.homeActiveFilters;


    /* =========================================================
       وضعیت نمایش فیلدها
    ========================================================= */

    // function updateFilterFieldsVisibility() {

    //     Object.keys(filterData).forEach(key => {

    //         const select =
    //             filterData[key].element;

    //         const field =
    //             select.closest(
    //                 ".filter-field"
    //             );


    //         if (active[key]) {

    //             field.style.display =
    //                 "none";

    //         }

    //         else {

    //             field.style.display =
    //                 "";

    //         }

    //     });

    // }


    /* =========================================================
       نمایش تگ‌های فعال
    ========================================================= */

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


            /* -----------------------------------------
               موضوع
            ----------------------------------------- */

            if (key === "topic") {

                label =
                    topicNames[value] ||
                    value;

            }


            /* -----------------------------------------
               سخنران و قالب
            ----------------------------------------- */

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


        // updateFilterFieldsVisibility();

        updateFilterButton();

    }


    /* =========================================================
       فعال / غیرفعال کردن دکمه
    ========================================================= */

    // function updateFilterButton() {

    //     const visibleFields =
    //         Object.keys(filterData).some(key => {

    //             const select =
    //                 filterData[key].element;

    //             const field =
    //                 select.closest(
    //                     ".filter-field"
    //                 );


    //             return field &&
    //                 field.style.display !== "none";

    //         });


    //     /* اگر هیچ فیلدی باقی نمانده */

    //     if (!visibleFields) {

    //         applyButton.style.display =
    //             "none";

    //         return;

    //     }


    //     applyButton.style.display =
    //         "";


    //     const hasNewFilter =
    //         topicFilter.value ||
    //         speakerFilter.value ||
    //         formatFilter.value;


    //     applyButton.disabled =
    //         !hasNewFilter;

    // }
function updateFilterButton() {

    /* دکمه همیشه نمایش داده شود */

    applyButton.style.display =
        "";


    /* دکمه همیشه قابل کلیک باشد
       حتی وقتی همه فیلدها خالی هستند */

    applyButton.disabled =
        false;

}

    /* =========================================================
       تغییر موضوع
       
       فقط مقدار Select تغییر می‌کند.
       هنوز active تغییر نمی‌کند.
    ========================================================= */

    topicFilter.addEventListener(
        "change",
        () => {

            updateFilterButton();

        }
    );


    /* =========================================================
       تغییر سخنران
    ========================================================= */

    speakerFilter.addEventListener(
        "change",
        () => {

            updateFilterButton();

        }
    );


    /* =========================================================
       تغییر قالب
    ========================================================= */

    formatFilter.addEventListener(
        "change",
        () => {

            updateFilterButton();

        }
    );


    /* =========================================================
       اعمال فیلتر
       
       اینجا active از Select ها گرفته می‌شود.
       
       برخلاف Results:
       هیچ URLای ساخته نمی‌شود.
       هیچ صفحه‌ای عوض نمی‌شود.
    ========================================================= */

    applyButton.addEventListener(
        "click",
        () => {

            active.topic =
                topicFilter.value;

            active.speaker =
                speakerFilter.value;

            active.format =
                formatFilter.value;


            /* نمایش تگ‌ها */

            renderActiveFilters();


            /* -----------------------------------------
               فعلاً فقط برای تست
               
               بعداً اینجا محتوای نوارها
               بر اساس active تغییر می‌کند.
            ----------------------------------------- */

            console.log(
                "HOME FILTER APPLIED:",
                active
            );

        }
    );


    /* =========================================================
       حذف فیلتر
    ========================================================= */

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


            /* active را حذف می‌کنیم */

            active[filter] =
                "";


            /* Select هم خالی شود */

            if (filter === "topic") {

                topicFilter.value =
                    "";

            }


            if (filter === "speaker") {

                speakerFilter.value =
                    "";

            }


            if (filter === "format") {

                formatFilter.value =
                    "";

            }


            /* دوباره وضعیت را نمایش بده */

            renderActiveFilters();

        }
    );


    /* =========================================================
       وضعیت اولیه
    ========================================================= */

    renderActiveFilters();

    updateFilterButton();

});