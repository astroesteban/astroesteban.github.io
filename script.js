// Small bits of mission-console behavior.
const start = Date.now();
const baseSeconds = (((4 * 24) + 17) * 3600) + (32 * 60) + 8;

function updateMissionClock() {
  const elapsed = Math.floor((Date.now() - start) / 1000);
  const total = baseSeconds + elapsed;
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  document.getElementById("missionTime").textContent =
    [days, hours, minutes, seconds].map((v, i) =>
      String(v).padStart(i === 0 ? 3 : 2, "0")
    ).join(":");
}

setInterval(updateMissionClock, 1000);
updateMissionClock();

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent placeholder project links from jumping to the top.
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});
