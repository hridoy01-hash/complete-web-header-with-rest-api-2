
(async function () {
    const BUSINESS_ID = "62c2bc6ec78008f8bbe24170";
    const LOGO = 'logo.webp';
    const HEADER_LOGO_IMAGAE = `https://www.soppiya.com/media/images/${BUSINESS_ID}/business/${LOGO}`;
    const PRIMARY_COLOR = `#BFA78A`;
    typeof handleNotification === "function" && handleNotification(true, true);
    const apiCall = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };
    // handle header logo
    async function headerLogo() {
        const businessLogo = document.getElementById("s0701_businessLogo");
        businessLogo.setAttribute("src", `${HEADER_LOGO_IMAGAE}`);
        businessLogo.addEventListener("click", function () {
            typeof handleNavigate == "function" && handleNavigate("/");
            console.log("Home Page");
        });
    }
    await headerLogo();

    // handle sidebar open close
    const hamburgerIcon = document.querySelectorAll(".s0701_common_hamburger_id");
    const sidebarMainWrapper = document.getElementById("s0701_sidebar_main_wrapper_id");
    const sidebarContentDiv = document.querySelector(".s0701_sidebar_content_wrapper");
    function handleSidebarCloseOpen() {
        for (let i = 0; i < hamburgerIcon.length; i++) {
            const element = hamburgerIcon[i];
            element.addEventListener("click", function () {
                sidebarMainWrapper.classList.add("s0701_open_sidebar");
            });

        };
    }
    handleSidebarCloseOpen();

    function closeButtonClickHandler() {
        document.querySelector(".s0701_sidebar_close_btn_wrapper").addEventListener("click", function () {
            sidebarMainWrapper.classList.remove("s0701_open_sidebar");
        });
    };
    closeButtonClickHandler();

    function sidebarCloseOutSideClick() {
        sidebarMainWrapper.addEventListener("click", function (e) {
            const targetArea = sidebarContentDiv.contains(e.target);
            if (!targetArea) {
                sidebarMainWrapper.classList.remove("s0701_open_sidebar");
            };
        });
    };
    sidebarCloseOutSideClick();

    // handle cart wishlist

    // handle wishlist cart click hnadler
    async function cartWishlistClickHandler() {

        document.getElementById("s0701_header_wishlist_id").addEventListener("click", function () { cartWishlistNavigate("s0701_header_wishlist_id", "s0701_mobile_wishlist_id", "/wishlist") });
        document.getElementById("s0701_mobile_wishlist_id").addEventListener("click", function () { cartWishlistNavigate("s0701_header_wishlist_id", "s0701_mobile_wishlist_id", "/wishlist") });

        document.getElementById("s0701_header_cart_id").addEventListener("click", function () { cartWishlistNavigate("s0701_header_cart_id", "s0701_mobile_cart_id", "/cart") });
        document.getElementById("s0701_mobile_cart_id").addEventListener("click", function () { cartWishlistNavigate("s0701_header_cart_id", "s0701_mobile_cart_id", "/cart") });
    }
    await cartWishlistClickHandler();

    // cart wishlist set route
    function cartWishlistNavigate(headerID, mobileID, path) {
        typeof handleNavigate === "function" && handleNavigate(`${path}`);
        removeActiveFill();
        document.getElementById(`${headerID}`).children[0].children[0].classList.add("s0701_active_menu_icon");
        document.getElementById(`${mobileID}`).children[0].children[0].classList.add("s0701_active_mobile_menu_icon");
        console.log(`${path}`);
    };

    async function removeActiveFill() {
        const cartWishlistIcon = document.querySelectorAll(".s0701_nav_menu_list");
        for (let i = 0; i < cartWishlistIcon.length; i++) {
            const element = cartWishlistIcon[i];
            if (element.children[0].children[0].classList.contains("s0701_active_menu_icon")) {
                element.children[0].children[0].classList.remove("s0701_active_menu_icon");
            };
            if (element.children[0].children[0].classList.contains("s0701_active_mobile_menu_icon")) {
                element.children[0].children[0].classList.remove("s0701_active_mobile_menu_icon")
            };
        };
    };

    // account handle
    function checkUserLoginStatus() {
        let checkUserLoginStaus = typeof handleUserAuth === "function" && handleUserAuth("check", {});
        return checkUserLoginStatus.status;
    };

    function hnadleNavigationAccountRoute() {
        if (checkUserLoginStatus() === true) { typeof handleAutn === "function" && handleAutn("/account"); };
        console.log('/account');
    };

    function accountClickHandler() {
        const userIcon = document.querySelectorAll(".s0701_account_profile_icon");
        for (let i = 0; i < userIcon.length; i++) {
            const element = userIcon[i];
            element.addEventListener("click", function () {
                hnadleNavigationAccountRoute();
            });

        };
    };
    accountClickHandler();

    // handle search interaction
    const searchIcon = document.querySelectorAll(".s0701_search_icon_common_class");
    const searchPopupMainWrapper = document.getElementById("s0601_search_popup_main_wrapper_id");
    function handleSearchIconClick() {
        for (let i = 0; i < searchIcon.length; i++) {
            const element = searchIcon[i];
            element.addEventListener("click", function () {
                searchPopupMainWrapper.classList.add("s0601_active_search_popup");
            });

        };
    };
    handleSearchIconClick();

    function closeSearchPopup() {
        const closeIcon = document.querySelector(".s0601_searchIcon_container");
        closeIcon.addEventListener("click", function () {
            searchPopupMainWrapper.classList.remove("s0601_active_search_popup");
        });
    };
    closeSearchPopup();

    // handle search input field
    async function getInputSearchField() {
        const inputField = document.querySelector(".s0601_search_input");
        inputField.addEventListener("input", async function (e) {
            const inputValue = e.target.value;
            if (inputValue?.length > 0) {
                await loadSearchData(inputValue);
            } else {
                const innerResultParentDiv = document.getElementById("s0601_search_result_all_items_id");
                innerResultParentDiv.textContent = "";
            }

        });
    };
    await getInputSearchField();

    let delayForInput = 0;
    const loadSearchData = async (inputValue) => {
        if (delayForInput) {
            clearTimeout(delayForInput);
        }
        delayForInput = setTimeout(async () => {
            if (inputValue?.length > 0) {
                const searchResult = await apiCall(`https://api.soppiya.com/v2.1/widget/header/search?q=${inputValue}`);
                if (document.getElementById("s0601_search_result_all_items_id").childNodes) {
                    document.getElementById("s0601_search_result_all_items_id").textContent = "";
                }
                if (searchResult.length === 0 || typeof searchResult === "undefined") {
                    const notFound = elementMaker("div", ["s0601_search_result_item"]);
                    notFound.innerText = `No Item Found`;
                    document.getElementById("s0601_search_result_all_items_id").appendChild(notFound);

                } else {
                    const notFound = elementMaker("li", ["s0601_search_result_item"]);
                    notFound.innerText = "";
                    await displaySearchResult(searchResult);
                };
            };
        }, 200);

    };
    await loadSearchData();

    async function displaySearchResult(searchResult) {
        if (searchResult?.length > 0) {
            for (let i = 0; i < searchResult.length; i++) {
                const element = searchResult[i];
                let resultItemLi = elementMaker("li", ["s0601_search_result_item"]);
                resultItemLi.innerHTML = `${element.name}`;
                document.getElementById("s0601_search_result_all_items_id").appendChild(resultItemLi);
                resultItemLi.addEventListener("click", (e) => {
                    typeof handleNavigate === "function" && handleNavigate(`/item/${element.slug}`);
                    const searchResultParentDiv = document.getElementById("s0601_search_result_all_items_id");
                    searchResultParentDiv.textContent = "";
                    searchPopupMainWrapper.classList.remove("s0601_active_search_popup");
                    const inputField = document.querySelector(".s0601_search_input");
                    inputField.value = "";
                    console.log("search item cliked", `/item/${element.slug}`);
                });
            };
        };
    };


    // display legal pages data
    async function displayLegalPages() {
        const legalPagesData = await apiCall(`https://api.soppiya.com/v2.1/widget/header/page`);
        // console.log("legalPagesData" , legalPagesData);
        for (let i = 0; i < legalPagesData.length; i++) {
            const element = legalPagesData[i];
            let pageLi = elementMaker("li", ["s0701_sidebar_menu_list"]);
            pageLi.innerText = `${element.title}`;
            document.querySelector(".s0701_legalPage_wrapper").appendChild(pageLi);
            pageLi.addEventListener("click", function () {
                typeof handleNavigate === "function" && handleNavigate(`/page/${element.slug}`);
                console.log(`/page/${element.slug}`);
            });

        };
    };
    await displayLegalPages();

    // display social icon 
    async function showSocialData() {
        const socialData = await apiCall(`https://api.soppiya.com/v2.1/widget/header/social`);
        // console.log("socialData", socialData);
        for (let i = 0; i < socialData.length; i++) {
            const element = socialData[i];
            const IconLi = elementMaker("li");
            const IconLink = elementMaker("a");
            IconLink.setAttribute("src", `${element.url}`);
            IconLink.innerHTML = `${element.svg}`;
            IconLi.appendChild(IconLink);
            IconLink.children[0].children[0].lastChild.style.fill = `${PRIMARY_COLOR}`;
            document.querySelector(".s0701_social_icon_list_wrapper").appendChild(IconLi);
            IconLi.addEventListener("click", () => {
                window.open(`${element.url}`, "_blank");
                console.log("url link", `${element.url}`);
            });
        };
    };
    await showSocialData();

    // handle catagories interaction

    async function openCatagories() {
        const catagiresTitle = document.getElementById("s0701_all_catagories_title_id");
        catagiresTitle.addEventListener("click", function () {
            // catagiresTitle.classList.toggle("s0701_active_menu");
            document.querySelector(".s0701_all_catagories_title_class_add").classList.toggle("s0701_active_menu");
        });
    };
    await openCatagories();

    //sub catagories interaction
    const loadAllCatagories = await apiCall(`https://api.soppiya.com/v2.1/widget/header/category`);
    async function loadSubCatagories(loadAllCatagories) {
        for (let i = 0; i < loadAllCatagories.length; i++) {
            const element = loadAllCatagories[i];
            // console.log("subCatagories", element);
            const subLi = elementMaker("li", ["s0701_sub_catagories_list"]);
            const subCatagoriesContentWrapper = elementMaker("div", ["s0701_sub_catagories_list_content"]);
            subLi.appendChild(subCatagoriesContentWrapper);
            const subCatagoriesName = elementMaker("span", ["s0701_sub_catagories_name"]);
            subCatagoriesName.innerText = `${element.name}`;
            subCatagoriesContentWrapper.appendChild(subCatagoriesName);
            const arrowIcon = elementMaker("span", ["s0701_open_sub_menu_icon"]);

            arrowIcon.innerHTML = `
            <svg
                                                xmlns="http://www.w3.org/2000/svg" width="8" height="4.349"
                                                viewBox="0 0 8 4.349">
                                                <path id="Path_1732" data-name="Path 1732"
                                                    d="M4,4.349A1.189,1.189,0,0,1,3.157,4L0,.843.843,0,4,3.157,7.157,0,8,.843,4.843,4A1.189,1.189,0,0,1,4,4.349Z"
                                                    fill="#fff" opacity="0.5" />
                                            </svg>
            `;
            if (element.hasChild == true) {
                subCatagoriesContentWrapper.appendChild(arrowIcon);
                subLi.addEventListener("click", async function (e) {
                    event.stopImmediatePropagation();
                    let elementID = element._id;
                    if (subLi.children.length === 1) {
                        removeActiveSubmenu();
                        subLi.classList.add("s0701_active_menu");
                        await loadSubSubCatagories(elementID, subLi);

                    } else {
                        subLi.classList.toggle("s0701_active_menu");
                    }
                });
            } else {
                subLi.addEventListener("click", function (e) {
                    event.stopImmediatePropagation();
                    typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                    console.log(`/category/${element._id}`);
                });
            }

            document.getElementById("s0701_sub_catagories_list_wrapper_id").appendChild(subLi);
        }
    };
    await loadSubCatagories(loadAllCatagories);



    // sub sub catagories
    async function loadSubSubCatagories(elementID, subLi) {

        const subSubCatagoriesData = await apiCall(`https://api.soppiya.com/v2.1/widget/header/category/${elementID}`);
        const subSubMainWrapper = elementMaker("ul", ["s0701_sub_sub_catagories_list_wrapper"]);
        for (let i = 0; i < subSubCatagoriesData.length; i++) {
            const element = subSubCatagoriesData[i];
            const subSubLi = elementMaker("li", ["s0701_sub_sub_catagories_list"]);
            const subCatagoriesContentWrapper = elementMaker("div", ["s0701_sub_sub_catagories_list_content"]);
            subSubLi.appendChild(subCatagoriesContentWrapper);
            const subSubCatagoriesName = elementMaker("span", ["s0701_sub_sub_catagories_name"]);
            subSubCatagoriesName.innerText = `${element.name}`;
            subCatagoriesContentWrapper.appendChild(subSubCatagoriesName);
            const arrowIcon = elementMaker("span", ["s0701_open_sub_sub_menu_icon"]);
            subSubMainWrapper.appendChild(subSubLi);
            arrowIcon.innerHTML = `
            <svg
                                                xmlns="http://www.w3.org/2000/svg" width="8" height="4.349"
                                                viewBox="0 0 8 4.349">
                                                <path id="Path_1732" data-name="Path 1732"
                                                    d="M4,4.349A1.189,1.189,0,0,1,3.157,4L0,.843.843,0,4,3.157,7.157,0,8,.843,4.843,4A1.189,1.189,0,0,1,4,4.349Z"
                                                    fill="#fff" opacity="0.5" />
                                            </svg>
            `;
            if (element.hasChild == true) {
                subCatagoriesContentWrapper.appendChild(arrowIcon);
                subSubLi.addEventListener("click", async function (e) {
                    event.stopImmediatePropagation();
                    let elementID = element._id;
                    if (subSubLi.children.length === 1) {
                        removeActiveSubsubmenu();
                        subSubLi.classList.add("s0701_active_menu");
                        await subSubSubCatagories(elementID, subSubLi);

                    } else {
                        subSubLi.classList.toggle("s0701_active_menu");
                    }
                });
            } else {
                subSubLi.addEventListener("click", function (e) {
                    event.stopImmediatePropagation();
                    typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                    console.log(`/category/${element._id}`);
                });
            }
            subLi.appendChild(subSubMainWrapper);
        }

    };

    // sub sub sub handle
    async function subSubSubCatagories(elementId, parenLi) {
        const subSubSubData = await apiCall(`https://api.soppiya.com/v2.1/widget/header/category/${elementId}`);
        // console.log("subSubSubData",subSubSubData);
        const subsubsubWrapper = elementMaker("ul", ["s0701_sub_sub_sub_catagories_list_wrapper"]);
        for (let i = 0; i < subSubSubData.length; i++) {
            const element = subSubSubData[i];
            // console.log("subSubSubData",element);
            const subsubsubLi = elementMaker("li", ["s0701_sub_sub_sub_catagories_list"]);
            const subsubsubContentWrapper = elementMaker("div", ["s0701_sub_sub_sub_catagories_list_content"]);
            subsubsubLi.appendChild(subsubsubContentWrapper);
            const subsubsubName = elementMaker("span", ["s0701_sub_sub_sub_catagories_name"]);
            subsubsubName.innerText = `${element.name}`;
            subsubsubContentWrapper.appendChild(subsubsubName);
            subsubsubWrapper.appendChild(subsubsubLi);
            subsubsubLi.addEventListener("click", function () {
                event.stopImmediatePropagation();
                typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                console.log(`/category/${element._id}`);
            });
        };
        parenLi.appendChild(subsubsubWrapper);
    };

    // toogle active sub menenu
    function removeActiveSubmenu() {
        const subCatagoriesList = document.querySelectorAll(".s0701_sub_catagories_list ");
        for (let i = 0; i < subCatagoriesList.length; i++) {
            const element = subCatagoriesList[i];
            element.classList.contains("s0701_active_menu") && element.classList.toggle("s0701_active_menu");
        };
    };
    // toggle active sub sub menu
    function removeActiveSubsubmenu() {
        const subSubCatagoriesList = document.querySelectorAll(".s0701_sub_sub_catagories_list ");
        for (let i = 0; i < subSubCatagoriesList.length; i++) {
            const element = subSubCatagoriesList[i];
            element.classList.contains("s0701_active_menu") && element.classList.toggle("s0701_active_menu");
        };
    };

    function closeAllCatagoriesWindowClick() {
        const notRemoveArea = document.getElementById("s0701_sub_catagories_list_wrapper_id");
        const catagiresTitleClick = document.getElementById("s0701_all_catagories_title_id");
        window.addEventListener("click", function (e) {
            const notRemoveTargetArea = notRemoveArea.contains(e.target);
            const targetOpenCatagories = catagiresTitleClick.contains(e.target);
            if (!notRemoveTargetArea && !targetOpenCatagories) {
                document.querySelector(".s0701_all_catagories_title_class_add").classList.remove("s0701_active_menu");
            } else if (notRemoveTargetArea && targetOpenCatagories) {
                document.querySelector(".s0701_all_catagories_title_class_add").classList.add("s0701_active_menu");
            };
        });
    };
    closeAllCatagoriesWindowClick();

    window.notificationAlert = (type, count) => {
        if (type === "cart") {
            if (count > 0) {
                document.getElementById("s0701_header_cart_id").classList.add("s0701_active_notification");
                document.getElementById("s0701_mobile_cart_id").classList.add("s0701_active_mobile_notification");
            } else {
                document.getElementById("s0401_header_cart_id")?.classList?.remove("s0701_active_notification");
                document.getElementById("s0401_header_mobile_cart_id")?.classList?.remove("s0701_active_mobile_notification");
            };
        } else if (type === "wishlist") {
            if (count > 0) {
                document.getElementById("s0401_header_wishlist_id").classList.add("s0701_active_notification");
                document.getElementById("s0401_header_mobile_wishlist_id").classList.add("s0701_active_mobile_notification");
            } else {
                document.getElementById("s0401_header_wishlist_id")?.classList?.remove("s0701_active_notification");
                document.getElementById("s0401_header_mobile_wishlist_id")?.classList?.remove("s0701_active_mobile_notification");
            };
        };
    };






    function elementMaker(name, className, id) {
        try {
            let element = document.createElement(name);
            className && (element.className = className.join(" "));
            id && (element.id = id);
            return element;
        } catch (err) { };
    };
    function setAttributes(elementName, allAttributes) {
        for (let key in allAttributes) {
            elementName.setAttribute(key, allAttributes[key]);
        };
    };
})();