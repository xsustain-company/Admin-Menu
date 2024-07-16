import React, { useEffect } from 'react';

const UiContent: React.FC = () => {
    useEffect(() => {
        const checkboxElements = document.getElementsByClassName("code-switcher");
        Array.from(checkboxElements).forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                const card = checkbox.closest('.card') as HTMLElement | null;
                const preview = card?.querySelector(".live-preview") as HTMLElement | null;
                const code = card?.querySelector(".code-view") as HTMLElement | null;

                if (card && preview && code) {
                    if ((checkbox as HTMLInputElement).checked) {
                        // do this
                        preview.classList.add("d-none");
                        code.classList.remove("d-none");
                    } else {
                        // do that
                        preview.classList.remove("d-none");
                        code.classList.add("d-none");
                    }
                }
            });
        });
    }, []);

    return (
        <div>
            {/* Add your UI content here */}
        </div>
    );
};

export default UiContent;
