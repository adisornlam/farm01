const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const wifiSignalElement = document.getElementById("wifiSignal");

const socket = new WebSocket("ws://192.168.1.103/ws"); // Ganti dengan IP address dan port yang sesuai

socket.onopen = function (e) {
  console.log("WebSocket connection established");
};

socket.onmessage = function (event) {
  const data = event.data;
  const [key, value] = data.split(":");

  if (key === "temperature") {
    const temperature = parseFloat(value);
    if (!isNaN(temperature)) {
      temperatureElement.textContent = temperature.toFixed(1) + " C";
    } else {
      console.error("Invalid temperature value:", value);
    }
  } else if (key === "humidity") {
    const humidity = parseFloat(value);
    humidityElement.textContent = humidity.toFixed(1) + " %";
  } else if (key === "wifiSignalStrength") {
    const wifiSignal = parseFloat(value);
    wifiSignalElement.textContent = wifiSignal.toFixed(0) + " %";
  }
};

socket.onclose = function (event) {
  console.log("WebSocket connection closed");
};

socket.onerror = function (error) {
  console.error("WebSocket error:", error);
};
