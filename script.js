async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey  = 'c0a2bcc52d9243c01c3b69d4be83299a';

  const resultDiv = document.getElementById('weatherResult');

  if (city === "") {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
    resultDiv.classList.remove('hidden');
    return;
  }

  // ✅ Use backticks here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    resultDiv.innerHTML = "<p>Loading...</p>";
    resultDiv.classList.remove('hidden');

    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style='color:red;'>${err.message}</p>`;
  }
}
