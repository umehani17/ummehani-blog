const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const searchInput = document.querySelector("#searchInput");
const postGrid = document.querySelector("#postGrid");
const cards = document.querySelectorAll(".post-card");

if (searchInput && postGrid && cards.length) {
  searchInput.addEventListener("input", (event) => {
    const term = event.target.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardText = `${card.textContent} ${card.dataset.search || ""}`.toLowerCase();
      const matches = cardText.includes(term);
      card.style.display = matches ? "flex" : "none";
      if (matches) visibleCount += 1;
    });

    const previousMessage = document.querySelector(".empty-result");
    if (previousMessage) previousMessage.remove();

    if (visibleCount === 0) {
      const message = document.createElement("p");
      message.className = "empty-result";
      message.textContent = "No posts matched your search. Try another keyword.";
      postGrid.appendChild(message);
    }
  });
}

const subscribeForm = document.querySelector("#subscribeForm");
const emailInput = document.querySelector("#emailInput");

if (subscribeForm && emailInput) {
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!emailInput.value.trim()) return;

    showToast("Thank you. Your message is received.");
    subscribeForm.reset();
  });
}

const copyButtons = document.querySelectorAll(".copy-btn");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const codeBlock = button.closest(".code-block");
    const codeElement = codeBlock?.querySelector("code");
    if (!codeElement) return;

    try {
      await navigator.clipboard.writeText(codeElement.innerText);
      const previousText = button.textContent;
      button.textContent = "Copied!";
      button.disabled = true;
      showToast("Code copied to clipboard.");

      setTimeout(() => {
        button.textContent = previousText;
        button.disabled = false;
      }, 1400);
    } catch (error) {
      showToast("Copy failed. Please select and copy manually.");
    }
  });
});

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1700);
}
