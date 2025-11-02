// ==================================
// MODAL MANAGER
// ==================================
export function showModal(message) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "999";

  const box = document.createElement("div");
  box.style.background = "#1f2833";
  box.style.padding = "1rem 2rem";
  box.style.borderRadius = "8px";
  box.style.color = "#66fcf1";
  box.textContent = message;

  overlay.appendChild(box);
  overlay.addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
}
