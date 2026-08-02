document.addEventListener("DOMContentLoaded", async () => {
    const itemList = document.querySelector(".item-list");
    const template = document.getElementById("template_sings");

    if (!itemList || !template) return;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/stars/");
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

    const stars = await response.json();

    itemList.innerHTML = "";

    stars.forEach (star => {
        const clone = template.content.cloneNode(true);

        const link = clone.querySelector(".item-link");
        if (link) {
            link.href = `./detail.html?id=${star.id}`;
        }

        const img = clone.querySelector('img');
        if (img) {
            img.src = "./images/menu/img-item01.jpg";
            img.alt = star.name;
        }
       
        const nameEl = clone.querySelector('.item-name');
        if (nameEl) nameEl.textContent = star.name;

        const descEl = clone.querySelector('.item-desc');
        if (descEl) descEl.textContent = star.summary;

        itemList.appendChild(clone);
    });
    }
    catch (error) {
        console.error("データ取得失敗:", error);
        }
});