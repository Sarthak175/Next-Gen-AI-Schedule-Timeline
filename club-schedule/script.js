// ============================= 
// SCHEDULE DATA
// ============================= 

const scheduleData = {
  day1: {
    label: "Day 1",
    date: "March 18, 2026",
    events: [
      {
        time: "09:00 AM – 10:00 AM",
        title: "Opening Ceremony",
        venue: "Main Auditorium",
        category: "Ceremony",
        teamSize: "All Participants",
        live: false,
        description: "Official inauguration of the technical fest including keynote speech, faculty address, and overview of the upcoming events."
      },
      {
        time: "10:30 AM – 01:30 PM",
        title: "Pentathon Challenge",
        venue: "Innovation Hall",
        category: "Competition",
        teamSize: "Individual",
        live: false,
        description: "A five-stage technical competition testing logical reasoning, debugging skills, and problem-solving under strict time constraints."
      },
      {
        time: "02:00 PM – 05:00 PM",
        title: "Ideathon",
        venue: "Seminar Hall",
        category: "Innovation",
        teamSize: "2–4 Members",
        live: true,
        description: "Teams pitch innovative solutions to real-world social and technological challenges before an expert panel."
      },
      {
        time: "05:30 PM – 07:00 PM",
        title: "Tech Quiz",
        venue: "Conference Room A",
        category: "Quiz",
        teamSize: "2 Members",
        live: false,
        description: "Interactive quiz covering AI, cybersecurity, cloud computing, and emerging technologies."
      },
      {
        time: "07:30 PM – 09:00 PM",
        title: "Networking Mixer",
        venue: "Open Terrace",
        category: "Networking",
        teamSize: "Open",
        live: false,
        description: "Networking session connecting students with industry mentors and alumni."
      }
    ]
  },
  day2: {
    label: "Day 2",
    date: "March 19, 2026",
    events: [
      {
        time: "09:00 AM – 06:00 PM",
        title: "Hackathon 2.0",
        venue: "Innovation Lab",
        category: "Hackathon",
        teamSize: "2–4 Members",
        live: false,
        description: "24-hour coding marathon focused on building scalable AI, Web, and Blockchain-based applications."
      },
      {
        time: "10:00 AM – 12:00 PM",
        title: "AI & ML Workshop",
        venue: "Lab 3",
        category: "Workshop",
        teamSize: "Individual",
        live: false,
        description: "Hands-on session introducing neural networks, model training, and real-time deployment strategies."
      },
      {
        time: "01:00 PM – 03:00 PM",
        title: "Cybersecurity Bootcamp",
        venue: "Lab 2",
        category: "Bootcamp",
        teamSize: "Individual",
        live: false,
        description: "Practical introduction to ethical hacking fundamentals and network security techniques."
      },
      {
        time: "03:30 PM – 05:00 PM",
        title: "Cloud Architecture Talk",
        venue: "Seminar Hall",
        category: "Talk",
        teamSize: "Open",
        live: false,
        description: "Industry experts discuss scalable cloud-native systems and microservices architecture."
      },
      {
        time: "06:00 PM – 08:00 PM",
        title: "Startup Pitch Arena",
        venue: "Main Auditorium",
        category: "Startup",
        teamSize: "2–3 Members",
        live: false,
        description: "Students pitch startup ideas to investors and receive professional feedback."
      }
    ]
  },
  day3: {
    label: "Day 3",
    date: "March 20, 2026",
    events: [
      {
        time: "09:30 AM – 11:30 AM",
        title: "UI/UX Design Sprint",
        venue: "Design Studio",
        category: "Design",
        teamSize: "Individual",
        live: false,
        description: "Rapid prototyping challenge focused on creating intuitive and user-friendly digital interfaces."
      },
      {
        time: "12:00 PM – 02:00 PM",
        title: "Blockchain Workshop",
        venue: "Lab 1",
        category: "Workshop",
        teamSize: "Individual",
        live: false,
        description: "Introduction to blockchain fundamentals, smart contracts, and decentralized applications."
      },
      {
        time: "02:30 PM – 04:00 PM",
        title: "AR/VR Demo Session",
        venue: "Innovation Hall",
        category: "Demo",
        teamSize: "Open",
        live: false,
        description: "Live demonstrations of immersive augmented and virtual reality applications."
      },
      {
        time: "04:30 PM – 06:00 PM",
        title: "Project Expo",
        venue: "Exhibition Area",
        category: "Exhibition",
        teamSize: "Team",
        live: false,
        description: "Students showcase technical projects and innovations to faculty and industry judges."
      },
      {
        time: "06:30 PM – 08:00 PM",
        title: "Tech Leadership Panel",
        venue: "Main Auditorium",
        category: "Corporate",
        teamSize: "Open",
        live: false,
        description: "Industry leaders discuss emerging technology trends and career opportunities."
      }
    ]
  }
};

// ============================= 
// STATE MANAGEMENT
// ============================= 

let activeDay = "day1";
let selectedEvent = null;

// ============================= 
// DOM ELEMENTS
// ============================= 

const tabsContainer = document.getElementById("tabs-container");
const activeDateEl = document.getElementById("active-date");
const timelineEvents = document.getElementById("timeline-events");
const overlay = document.getElementById("overlay");
const eventPanel = document.getElementById("event-panel");
const scrollProgress = document.querySelector(".scroll-progress");
const timelineLineProgress = document.querySelector(".timeline-line-progress");

// ============================= 
// UTILITY FUNCTIONS
// ============================= 

function sortEvents(events) {
  return [...events].sort((a, b) => {
    const startA = new Date(`1970/01/01 ${a.time.split("–")[0]}`);
    const startB = new Date(`1970/01/01 ${b.time.split("–")[0]}`);
    return startA - startB;
  });
}

function getUpcomingIndex(events) {
  const now = new Date();
  for (let i = 0; i < events.length; i++) {
    const start = new Date(`1970/01/01 ${events[i].time.split("–")[0]}`);
    if (start > now) return i;
  }
  return -1;
}

// ============================= 
// RENDER FUNCTIONS
// ============================= 

function renderTabs() {
  tabsContainer.innerHTML = "";
  const dayKeys = Object.keys(scheduleData);
  
  dayKeys.forEach(dayKey => {
    const button = document.createElement("button");
    button.className = `tab-btn ${activeDay === dayKey ? "active" : ""}`;
    button.textContent = scheduleData[dayKey].label;
    button.addEventListener("click", () => {
      activeDay = dayKey;
      renderTabs();
      renderDate();
      renderEvents();
    });
    tabsContainer.appendChild(button);
  });
}

function renderDate() {
  activeDateEl.textContent = scheduleData[activeDay]?.date || "";
}

function renderEvents() {
  const events = scheduleData[activeDay]?.events || [];
  const sortedEvents = sortEvents(events);
  const upcomingIndex = getUpcomingIndex(sortedEvents);
  
  timelineEvents.innerHTML = "";
  
  sortedEvents.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = `timeline-card ${index === upcomingIndex ? "upcoming-highlight" : ""}`;
    
    card.innerHTML = `
      <div class="event-time">${event.time}</div>
      <h2>${event.title}</h2>
      <div class="event-meta">${event.category} · ${event.teamSize} · ${event.venue}</div>
    `;
    
    card.addEventListener("click", () => openEventPanel(event));
    
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
    });
    
    timelineEvents.appendChild(card);
  });
  
  // Auto scroll to upcoming event
  if (upcomingIndex !== -1) {
    setTimeout(() => {
      const cards = document.querySelectorAll(".timeline-card");
      if (cards[upcomingIndex]) {
        cards[upcomingIndex].scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, 100);
  }
}

function openEventPanel(event) {
  selectedEvent = event;

  eventPanel.innerHTML = `
    <div class="panel-glow-strip"></div>

    <button class="close-btn">✕</button>

    <div class="panel-header">
      <h2 class="panel-title">${event.title}</h2>
      <div class="panel-time">
        ${event.time}
        ${event.live ? `<span class="live-badge">LIVE</span>` : ""}
      </div>
    </div>

    <div class="panel-content">
      <div class="info-block">
        <div class="info-block-content">
          <span class="info-label">Category</span>
          <strong class="info-value">${event.category}</strong>
        </div>
        <div class="info-number">01</div>
      </div>

      <div class="info-block">
        <div class="info-block-content">
          <span class="info-label">Team Size</span>
          <strong class="info-value">${event.teamSize}</strong>
        </div>
        <div class="info-number">02</div>
      </div>

      <div class="info-block">
        <div class="info-block-content">
          <span class="info-label">Venue</span>
          <strong class="info-value">${event.venue}</strong>
        </div>
        <div class="info-number">03</div>
      </div>

      <div class="panel-description">
        ${event.description}
      </div>
    </div>
  `;

  const closeBtn = eventPanel.querySelector(".close-btn");

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeEventPanel();
  });

  overlay.classList.add("active");
  eventPanel.classList.add("active");
}

function closeEventPanel() {
  selectedEvent = null;
  overlay.classList.remove("active");
  eventPanel.classList.remove("active");
}

// ============================= 
// SCROLL HANDLERS
// ============================= 

function handleScroll() {
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = window.scrollY / totalHeight;
  
  scrollProgress.style.transform = `scaleX(${progress})`;
  timelineLineProgress.style.height = `${progress * 100}%`;
}

// ============================= 
// EVENT LISTENERS
// ============================= 

window.addEventListener("scroll", handleScroll);
overlay.addEventListener("click", closeEventPanel);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeEventPanel();
  }
});

// ============================= 
// INITIALIZATION
// ============================= 

function init() {
  renderTabs();
  renderDate();
  renderEvents();
  handleScroll();
}

// Start the app
init();

// ============================= 
// PARTICLE ANIMATION
// ============================= 

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 50;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.3 + 0.1;
    this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246,' : 'rgba(167, 139, 250,';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.opacity + ')';
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animateParticles();

// ============================= 
// STARS CANVAS ANIMATION
// ============================= 

const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");
let W, H, starsArray;

function resizeStars(){
  W = starsCanvas.width = window.innerWidth;
  H = starsCanvas.height = window.innerHeight;

  const count = Math.floor(Math.min(170, Math.max(90, W / 12)));
  
  starsArray = Array.from({length: count}).map(() => ({
    x: Math.random()*W,
    y: Math.random()*H,
    r: Math.random()*1.6 + 0.2,
    a: Math.random()*0.5 + 0.12,
    vx: (Math.random()-0.5)*0.25,
    vy: (Math.random()-0.5)*0.25,
    pulse: Math.random()*0.02 + 0.01
  }));
}

window.addEventListener("resize", resizeStars);
resizeStars();

function loopStars(){
  starsCtx.clearRect(0,0,W,H);

  for(const s of starsArray){
    s.x += s.vx; 
    s.y += s.vy;
    
    if(s.x < -20) s.x = W+20;
    if(s.x > W+20) s.x = -20;
    if(s.y < -20) s.y = H+20;
    if(s.y > H+20) s.y = -20;

    s.a += Math.sin(Date.now() * s.pulse) * 0.01;
    s.a = Math.max(0.12, Math.min(0.62, s.a));

    starsCtx.beginPath();
    starsCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    starsCtx.fillStyle = `rgba(255,255,255,${s.a})`;
    starsCtx.fill();
    
    if(s.a > 0.4){
      starsCtx.beginPath();
      starsCtx.arc(s.x, s.y, s.r * 2, 0, Math.PI*2);
      starsCtx.fillStyle = `rgba(139,92,246,${s.a * 0.15})`;
      starsCtx.fill();
    }
  }

  for(let i=0;i<starsArray.length;i++){
    for(let j=i+1;j<starsArray.length;j++){
      const a = starsArray[i], b = starsArray[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      
      if(d < 120){
        const alpha = (1 - d/120) * 0.05;
        starsCtx.strokeStyle = `rgba(139,92,246,${alpha})`;
        starsCtx.lineWidth = 1;
        starsCtx.beginPath();
        starsCtx.moveTo(a.x, a.y);
        starsCtx.lineTo(b.x, b.y);
        starsCtx.stroke();
      }
    }
  }

  requestAnimationFrame(loopStars);
}

loopStars();

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  starsArray.forEach(star => {
    const dx = star.x - mouseX;
    const dy = star.y - mouseY;
    const distance = Math.sqrt(dx*dx + dy*dy);
    
    if(distance < 100){
      star.a = Math.min(0.8, star.a + 0.1);
    }
  });
});
