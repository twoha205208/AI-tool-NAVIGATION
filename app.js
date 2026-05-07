const tools = [
  {
    name: "ChatGPT",
    category: "對話助理",
    desc: "通用型 AI 對話與內容生成，適合寫作、學習與日常工作。",
    tags: ["chat", "content", "assistant"],
    url: "https://chatgpt.com"
  },
  {
    name: "Claude",
    category: "對話助理",
    desc: "長文本推理與文件處理表現優秀，適合分析與協作。",
    tags: ["analysis", "assistant", "document"],
    url: "https://claude.ai"
  },
  {
    name: "Gemini",
    category: "對話助理",
    desc: "Google 生態整合良好，涵蓋文字、圖片與多模態能力。",
    tags: ["google", "multimodal", "chat"],
    url: "https://gemini.google.com"
  },
  {
    name: "Midjourney",
    category: "圖像設計",
    desc: "高品質 AI 繪圖工具，擅長風格化視覺創作與概念圖。",
    tags: ["image", "art", "design"],
    url: "https://www.midjourney.com"
  },
  {
    name: "Adobe Firefly",
    category: "圖像設計",
    desc: "Adobe 出品生成式影像工具，適合商業與設計流程整合。",
    tags: ["adobe", "image", "creative"],
    url: "https://firefly.adobe.com"
  },
  {
    name: "Canva AI",
    category: "圖像設計",
    desc: "快速建立社群圖卡與簡報，提供 AI 文案與設計輔助。",
    tags: ["canva", "presentation", "design"],
    url: "https://www.canva.com"
  },
  {
    name: "Runway",
    category: "影音生成",
    desc: "文字生成影片與影片編輯工具，常用於短片與廣告製作。",
    tags: ["video", "gen-ai", "editing"],
    url: "https://runwayml.com"
  },
  {
    name: "Pika",
    category: "影音生成",
    desc: "AI 影片生成平台，可快速產生動畫與短影音內容。",
    tags: ["video", "animation", "creator"],
    url: "https://pika.art"
  },
  {
    name: "ElevenLabs",
    category: "影音生成",
    desc: "高擬真 AI 語音生成與配音，適合旁白與多語音內容。",
    tags: ["voice", "audio", "tts"],
    url: "https://elevenlabs.io"
  },
  {
    name: "GitHub Copilot",
    category: "程式開發",
    desc: "程式碼自動補全與對話助手，提升開發效率。",
    tags: ["code", "developer", "assistant"],
    url: "https://github.com/features/copilot"
  },
  {
    name: "Cursor",
    category: "程式開發",
    desc: "AI 原生編輯器，支援專案理解、重構與自動修復。",
    tags: ["ide", "code", "productivity"],
    url: "https://cursor.com"
  },
  {
    name: "Perplexity",
    category: "研究搜尋",
    desc: "AI 搜尋與問答工具，強調來源引用與快速查證。",
    tags: ["search", "research", "answer"],
    url: "https://www.perplexity.ai"
  },
  {
    name: "NotebookLM",
    category: "研究搜尋",
    desc: "以你的文件為基礎進行摘要、問答與知識整理。",
    tags: ["notes", "research", "google"],
    url: "https://notebooklm.google.com"
  },
  {
    name: "Notion AI",
    category: "辦公效率",
    desc: "整合在文件與專案管理流程中的寫作與整理助手。",
    tags: ["productivity", "docs", "workflow"],
    url: "https://www.notion.so/product/ai"
  },
  {
    name: "Grammarly",
    category: "辦公效率",
    desc: "英文寫作修正與語氣建議工具，適合商務溝通。",
    tags: ["writing", "grammar", "office"],
    url: "https://www.grammarly.com"
  }
];

const state = {
  query: "",
  category: "全部"
};

const categoryChips = document.getElementById("categoryChips");
const toolGrid = document.getElementById("toolGrid");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");

function getCategories() {
  const all = tools.map((tool) => tool.category);
  return ["全部", ...new Set(all)];
}

function renderCategories() {
  const categories = getCategories();
  categoryChips.innerHTML = categories
    .map(
      (cat) =>
        `<button class="chip ${cat === state.category ? "active" : ""}" data-category="${cat}">${cat}</button>`
    )
    .join("");
}

function filterTools() {
  const q = state.query.trim().toLowerCase();
  return tools.filter((tool) => {
    const inCategory = state.category === "全部" || tool.category === state.category;
    if (!q) return inCategory;
    const haystack = `${tool.name} ${tool.desc} ${tool.tags.join(" ")}`.toLowerCase();
    return inCategory && haystack.includes(q);
  });
}

function renderTools() {
  const filtered = filterTools();
  resultCount.textContent = `共 ${filtered.length} 個工具`;

  if (!filtered.length) {
    toolGrid.innerHTML = `
      <article class="tool-card">
        <h3>找不到符合條件的工具</h3>
        <p>請嘗試更換關鍵字或切換分類。</p>
      </article>
    `;
    return;
  }

  toolGrid.innerHTML = filtered
    .map(
      (tool) => `
      <article class="tool-card">
        <div class="meta">
          <span class="badge">${tool.category}</span>
          <span>${tool.tags[0]}</span>
        </div>
        <h3>${tool.name}</h3>
        <p>${tool.desc}</p>
        <a href="${tool.url}" target="_blank" rel="noreferrer noopener">前往官網 →</a>
      </article>
    `
    )
    .join("");
}

categoryChips.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const picked = target.dataset.category;
  if (!picked) return;
  state.category = picked;
  renderCategories();
  renderTools();
});

searchInput.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  state.query = target.value;
  renderTools();
});

resetBtn.addEventListener("click", () => {
  state.query = "";
  state.category = "全部";
  searchInput.value = "";
  renderCategories();
  renderTools();
});

renderCategories();
renderTools();
