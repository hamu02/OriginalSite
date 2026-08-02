document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("post-form")
    const postList = document.getElementById("post-list")
    const template = document.getElementById("template-post")


  const starId = 1; 
  const API_URL = `http://127.0.0.1:8000/api/stars/${starId}/comments/`;

  async function renderPosts() {
    try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("コメント取得失敗");
            
            const comments = await response.json();

            postList.innerHTML = "";

            comments.reverse().forEach(post => {
                const clone = template.content.cloneNode(true);
                
                const nameEl = clone.querySelector(".post-name");
                if (nameEl) nameEl.textContent = post.name;

                const dateEl = clone.querySelector(".post-date");
                if (dateEl) dateEl.textContent = post.created_at;

                const contentEl = clone.querySelector(".post-content");
                if (contentEl) contentEl.textContent = post.message;

                postList.appendChild(clone);
            });
        } catch (error) {
            console.error("コメント読み込みエラー:", error);
        }
  }

  renderPosts();

  if (form) {
    form.addEventListener("submit",async (e) => {
      e.preventDefault();

      const name = document.getElementById("input-name").value.trim() || "名無しさん";
      const message = document.getElementById("input-content").value.trim();

      if (!message) {
                alert("メッセージを入力してください。");
                return;
            }

          try {
              const response = await fetch(API_URL, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ name, message })
              });

                if (!response.ok) throw new Error("投稿に失敗しました");

                form.reset();
                renderPosts(); // 一覧更新

            } 
            
            catch (error) {
                alert("エラーが発生しました: " + error.message);
            }
        });
    } 
});