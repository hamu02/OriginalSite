document.addEventListener("DOMContentLoaded", () => {
    const templateData = [
        {
        id: "americano",
        name: "アメリカーノ",
        desc: "すっきりとした味わいのエスプレッソ抽出コーヒー",
        price: "450円",
        label: "おすすめ",
        imgSrc: "./images/menu/img-item01.jpg",
        imgAlt: "アメリカーノの商品画像"
    },
    {
        id: "caffelatte",
        name: "カフェラテ",
        desc: "濃厚なエスプレッソとまろやかなミルク",
        price: "500円",
        label: "人気",
        imgSrc: "./images/menu/img-item02.jpg",
        imgAlt: "カフェラテの商品画像"
    }
    ];

    const itemList = document.querySelector(".item-list");
    const template = document.getElementById("template_sings");

    if (!itemList || !template) return;
    templateData.forEach (item => {
        const clone = template.content.cloneNode(true);

        const link = clone.querySelector(".item-link");
        if (link) {
            link.href = `./detail.html?id=${item.id}`;
        }

        const img = clone.querySelector('img');
        img.src = item.imgSrc;
        img.alt = item.imgAlt;
        clone.querySelector('.item-name').textContent = item.name;
        clone.querySelector('.item-desc').textContent = item.desc;
        clone.querySelector('.price').textContent = item.price;
        clone.querySelector('.item-label').textContent = item.label;

        itemList.appendChild(clone);
    });
});