// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    question: "Which gas do plants use for photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  }
];

function loadQuiz() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  quizQuestions.forEach((q, index) => {
    const block = document.createElement("div");
    block.className = "quiz-block";
    block.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;
    q.options.forEach(opt => {
      block.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${opt}"/> ${opt}
        </label><br/>
      `;
    });
    container.appendChild(block);
  });
}

function submitQuiz() {
  let score = 0;
  quizQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });
  const result = document.getElementById("quiz-result");
  result.textContent = `✅ You got ${score} out of ${quizQuestions.length} correct.`;
  result.style.color = score >= 3 ? "green" : "red";
  result.classList.add("show");
}

// Load quiz on page load
window.onload = loadQuiz;

// Extended Weather Info
function getWeather() {
  const lat = 28.61;
  const lon = 77.23;
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,sunrise,sunset,uv_index_max,visibility,precipitation_sum&timezone=auto`)
    .then(res => res.json())
    .then(data => {
      const current = data.current_weather;
      const daily = data.daily;
      const weatherOutput = document.getElementById("weather-output");

      let forecast = '';
      for (let i = 0; i < 3; i++) {
        forecast += `
📅 ${daily.time[i]}:
🌡 Max: ${daily.temperature_2m_max[i]}°C | Min: ${daily.temperature_2m_min[i]}°C
💨 Wind: ${daily.windspeed_10m_max[i]} km/h | 🌞 Sunrise: ${daily.sunrise[i].split('T')[1]} | 🌇 Sunset: ${daily.sunset[i].split('T')[1]}
🌫 Visibility: ${daily.visibility ? daily.visibility[i] : 'N/A'} m | 🔆 UV Index: ${daily.uv_index_max ? daily.uv_index_max[i] : 'N/A'}
`;
      }

      weatherOutput.textContent =
        `📍 Location: (${lat}, ${lon})
🌡 Temp: ${current.temperature}°C
💨 Wind Speed: ${current.windspeed} km/h

🔮 Next 3 Days Forecast: ${forecast}`;
    })
    .catch(() => {
      document.getElementById("weather-output").textContent = "⚠️ Error fetching weather data.";
    });
}
