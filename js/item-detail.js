document.addEventListener("DOMContentLoaded", () => {
  const detailsData = {
    "americano": {
      name: "アメリカーノ",
      label: "RECOMMEND",
      price: "450円",
      imgSrc: "./images/menu/img-item01.jpg",
      desc: "すっきりとした味わいのエスプレッソ抽出コーヒー",
      article: "当店の熟練バリスタが抽出したエスプレッソを、最適なお湯の温度で割った一杯です。浅煎り豆ならではのフルーティーな酸味と澄んだコクがあり、ゴクゴク飲める爽やかさが人気です。暑い日にはアイスアメリカーノもおすすめです。"
    },
    "caffelatte": {
      name: "カフェラテ",
      label: "POPULAR",
      price: "500円",
      imgSrc: "./images/menu/img-item02.jpg",
      desc: "濃厚なエスプレッソとまろやかなミルク",
      article: "濃厚でコクのあるエスプレッソに、きめ細かくスチームした北海道産ミルクスチームを合わせました。ミルクの自然な甘みとコーヒーのほろ苦さが絶妙に調和した、心休まる定番メニューです。"
    }
  };

  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  const item = detailsData[itemId];

  if (item) {
    document.getElementById("detail-name").textContent = item.name;
    document.getElementById("detail-label").textContent = item.label;
    document.getElementById("detail-price").textContent = item.price;
    document.getElementById("detail-desc").textContent = item.desc;
    document.getElementById("detail-article").textContent = item.article;

    const img = document.getElementById("detail-img");
    img.src = item.imgSrc;
    img.alt = item.name;
  } else {
    document.getElementById("detail-name").textContent = "商品が見つかりませんでした。";
  }
});