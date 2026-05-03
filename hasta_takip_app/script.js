const days = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
const hours = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

let data = JSON.parse(localStorage.getItem("schedule")) || {};

function save() {
  localStorage.setItem("schedule", JSON.stringify(data));
}

function createSchedule() {
  const container = document.getElementById("schedule");

  if (!container) return; // 💥 KRİTİK KORUMA

  container.innerHTML = ""; // tekrar yüklemede temizler

  days.forEach(day => {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    const title = document.createElement("h3");
    title.innerText = day;

    dayDiv.appendChild(title);

    hours.forEach(hour => {
      const key = day + "-" + hour;

      const slot = document.createElement("div");
      slot.className = "slot";

      const info = data[key] ? `${data[key].name} - ${data[key].note}` : "Boş";

      slot.innerHTML = `<strong>${hour}</strong> ${info}`;

      slot.onclick = () => {
        const name = prompt("Hasta adı:");
        if (!name) return;

        const note = prompt("Not / Tanı:");

        data[key] = { name, note };
        save();
        location.reload();
      };

      dayDiv.appendChild(slot);
    });

    container.appendChild(dayDiv);
  });
}

window.onload = function () {
  createSchedule();
};
createSchedule();
