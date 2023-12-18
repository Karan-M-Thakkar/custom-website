fetch("./AppData.json")
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    const appData = response;
    const { navbar } = appData;

    let navList = document.getElementById("navList");
    for (let navItem of navbar) {
      let level2List = "";
      if (navItem.submenu) {
        for (let eachL2Item of navItem.submenu) {
          let level3list = "";
          if (eachL2Item.submenu) {
            for (let eachL3Item of eachL2Item.submenu) {
              level3list += `
                <li class="l3-nav-item">
                  <a href="#">${eachL3Item.label}</a>
                </li>
              `;
            }
          }
          level2List += `
            <li class="l2-nav-item">
              <a href="#">${eachL2Item.label}</a>
              ${level3list ? '<p class="right-arrow">></p>' : ""}
              <ul class="l3-items-list">${level3list ? level3list : ""}</ul>
            </li>
          `;
        }
      }

      navList.innerHTML += `
          <li class="nav-link">
            <a href="#">${navItem.label}</a>
            <span class="nav-underline"></span>
            <div class="mega-menu-container">
              <ul class="l2-items-list">${level2List ? level2List : ""}</ul>
            </div>
          </li>
        `;
    }

    /* below code adjust the height of megamenu container to fit biggest L3 list */
    let megaMenuContainers = document.getElementsByClassName(
      "mega-menu-container"
    );
    for (let megaMenuContainer of megaMenuContainers) {
      let allL3ListsUnderMegaMenuContainer =
        megaMenuContainer.getElementsByClassName("l3-items-list");
      let maxL3ListHeight = 0;
      for (let l3List of allL3ListsUnderMegaMenuContainer) {
        maxL3ListHeight =
          l3List.clientHeight > maxL3ListHeight
            ? l3List.clientHeight
            : maxL3ListHeight;
      }
      megaMenuContainer.style.minHeight = `${maxL3ListHeight}px`;
      for (let l3List of allL3ListsUnderMegaMenuContainer) {
        l3List.style.minHeight = "100%";
      }
    }
  });
