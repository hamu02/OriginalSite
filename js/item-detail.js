document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const starId = params.get("id");

  if (!starId) {
        if (document.getElementById("detail-name")) {
         document.getElementById("detail-name").textContent = "指定された星が見つかりません。";
        }
        return;
    }

  try {
        const response = await fetch(`http://127.0.0.1:8000/api/stars/${starId}/`);
        if (!response.ok) throw new Error("星の詳細データ取得に失敗しました");

        const star = await response.json();

        if (document.getElementById("detail-name")) document.getElementById("detail-name").textContent = star.name;
        if (document.getElementById("detail-category")) document.getElementById("detail-category").textContent = star.category || '天体';
        if (document.getElementById("detail-desc")) document.getElementById("detail-desc").textContent = star.summary;
        if (document.getElementById("detail-article")) document.getElementById("detail-article").textContent = star.description;

    const imgEl = document.getElementById("detail-img");
    if (imgEl) {
      imgEl.src = star.image_url ? star.image_url : "./images/menu/img-item01.jpg";
      imgEl.alt = star.name;
    }

  } catch (error) {
    console.error(error);
    if (document.getElementById("detail-name")) {
      document.getElementById("detail-name").textContent = "データの読み込みに失敗しました。";
    }
  }
});