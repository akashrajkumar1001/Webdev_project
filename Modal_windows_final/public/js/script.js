console.log("✅ script.js loaded");

async function showModal(id) {
  try {
    const res = await fetch(`/api/modal?id=${id}`);
    const data = await res.json();

    document.getElementById("modal-title").innerText = data.title;
    document.getElementById("modal-body").innerText = data.body;

    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal");

    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");

    requestAnimationFrame(() => {
      overlay.classList.add("active");
      modal.classList.add("active");
    });
  } catch (err) {
    console.error("Modal fetch failed:", err);
  }
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  const modal = document.getElementById("modal");

  overlay.classList.remove("active");
  modal.classList.remove("active");

  setTimeout(() => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  }, 300);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Dark mode toggle
document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// ✅ Make modal functions global so HTML onclick works
window.showModal = showModal;
window.closeModal = closeModal;
