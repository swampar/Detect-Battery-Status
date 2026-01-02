const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  // Check browser support
  if (!navigator.getBattery) {
    alert("⚠️ Battery Status API is not supported in this browser");
    return;
  }

  navigator.getBattery().then((battery) => {
    
    // Update all battery info initially
    updateAllBatteryInfo();
    
    // Event listeners for changes
    battery.addEventListener("chargingchange", updateAllBatteryInfo);
    battery.addEventListener("levelchange", updateAllBatteryInfo);

    // ---- FUNCTIONS ----
    function updateAllBatteryInfo() {
      updateLevelInfo();
      updateChargingInfo();
    }

    // Battery percentage + width bar
    function updateLevelInfo() {
      let batteryLevelValue = parseInt(battery.level * 100);
      chargeLevel.textContent = batteryLevelValue + "%";

      // Set width correctly (fixes your earlier error)
      charge.style.width = (batteryLevelValue * 0.1625) + "em";
    }

    // Charging / Not charging status
    function updateChargingInfo() {
      if (battery.charging) {
        charge.classList.add("active");
        chargingTimeRef.textContent = "⚡ Charging...";
      } else {
        charge.classList.remove("active");

        // Only show time if value is valid
        if (battery.dischargingTime !== Infinity) {
          let hrs = Math.floor(battery.dischargingTime / 3600);
          let mins = Math.floor((battery.dischargingTime % 3600) / 60);
          chargingTimeRef.textContent = `${hrs}h ${mins}m remaining`;
        } else {
          chargingTimeRef.textContent = "🔋 Not Charging";
        }
      }
    }

  });
};
