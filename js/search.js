document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('starContainer');
  const template = document.getElementById('template_stars');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const tagButtons = document.querySelectorAll('.tag-btn');

  const categoryNames = {
    'zodiac': '12星座',
    'extra': '変わり種天体',
    'planet': '惑星',
    'nebula': '星雲・銀河'
  };

  function loadStars(query = '', category = '') {
    let url = 'http://127.0.0.1:8000/api/stars/?';
    if (query) url += `q=${encodeURIComponent(query)}&`;
    if (category) url += `category=${encodeURIComponent(category)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        container.innerHTML = '';
        if (data.length === 0) {
          container.innerHTML = '<p style="text-align:center; width:100%;">該当する星が見つかりませんでした。</p>';
          return;
        }
        data.forEach(star => {
          const clone = template.content.cloneNode(true);
          const img = clone.querySelector('.item-img');
          img.src = star.image || './images/common/no-image.png';
          img.alt = star.name;

          if (img) {
            // 🌟 修正ポイント：star.image ではなく star.image_url を使用！
            img.src = star.image_url ? star.image_url : './images/menu/img-item01.jpg';
            img.alt = star.name;
          }

          const link = clone.querySelector('.item-link');
          if (link) link.href = `detail.html?id=${star.id}`;

          // 🌟 修正ポイント：英語のID（zodiac等）を日本語（12星座等）に変換して表示
          const categoryEl = clone.querySelector('.item-category');
          if (categoryEl) {
            categoryEl.textContent = categoryNames[star.category] || star.category || '天体';
          }

          const nameEl = clone.querySelector('.item-name');
          if (nameEl) nameEl.textContent = star.name;

          const summaryEl = clone.querySelector('.item-summary');
          if (summaryEl) {
            summaryEl.textContent = star.summary || (star.description ? star.description.substring(0, 40) + '...' : '');
          }

          container.appendChild(clone);
        });
      })
      .catch(error => console.error('エラー:', error));
  }

  loadStars();

  if (searchBtn) {
    searchBtn.addEventListener('click', () => loadStars(searchInput.value.trim(), ''));
  }

  tagButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (searchInput) searchInput.value = '';
      loadStars('', e.target.getAttribute('data-category'));
    });
  });
});
