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
      let level3list = "";
      for (let eachL2Item of navItem.submenu) {
        level2List += `
          <li class="l2-nav-item">
            <a href="#">${eachL2Item.label}</a>
          </li>
        `;

        for (let eachL3Item of eachL2Item.submenu) {
          level3list += `
            <li class="l3-nav-item">
              <a href="#">${eachL3Item.label}</a>
            </li>
          `;
        }
      }

      navList.innerHTML += `
          <li class="nav-link">
            <a href="#">${navItem.label}</a>
            <span class="nav-underline"></span>
            <div class="mega-menu-container">
              <ul class="l2-items-list">${level2List}</ul>
              <ul class="l3-items-list">${level3list}</ul>
            </div>
          </li>
        `;
    }
  });
