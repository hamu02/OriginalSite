document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("post-form")
    const postList = document.getElementById("post-list")
    const template = document.getElementById("template-post")

    const initialPosts = [
    {
      name: "マスター",
      title: "今週の限定豆について",
      content: "今週はエチオピア産の浅煎り豆が入荷しました！華やかな香りをお楽しみください。",
      date: "2026/07/28 14:00"
    }
  ];

  let posts = JSON.parse(localStorage.getItem("kissa_posts")) || initialPosts;

  function renderPosts() {
    postList.innerHTML = "";

    posts.forEach(post => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".post-title").textContent = post.title;
      clone.querySelector(".post-name").textContent = post.name;
      clone.querySelector(".post-date").textContent = post.date;
      clone.querySelector(".post-content").textContent = post.content;
      postList.appendChild(clone);
    });
  }

  renderPosts();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("input-name").value.trim() || "名無しさん";
      const title = document.getElementById("input-title").value.trim();
      const content = document.getElementById("input-content").value.trim();

      if (!title || !content) {
        alert("タイトルと本文を入力してください。");
        return;
      }

      const now = new Date();
      const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newPost = { name, title, content, date: dateStr };
      posts.unshift(newPost);

      localStorage.setItem("kissa_posts", JSON.stringify(posts));
      renderPosts();

      form.reset();
    });
  }
});