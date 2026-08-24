# Vansh Saini — Professional Engineering & Web Portfolio

A modern, technology-focused, and responsive personal portfolio website created for **Vansh Saini**, a Computer Science Engineering student at Lovely Professional University (LPU), batch 2025–2029.

---

## 🌟 Key Highlights & Features

- **Modern Deep Navy & Slate Aesthetic**: Tailored color palette, frosted glassmorphism surfaces (`backdrop-filter`), subtle borders, and high contrast for recruiter readability.
- **Lightweight Interactive Backdrop**: 60fps GPU-accelerated canvas particle/constellation animation that reacts gently to mouse hover with zero CPU lag and auto-throttling when tabs are hidden.
- **Hero & Interactive Code Widget**:
  - Live availability badge: `🟢 Open for Internships & Freelance`
  - Headline: *“Building Ideas into Digital Experiences.”*
  - Interactive profile object with syntax highlighting and 1-click snippet copy.
- **Skills Matrix with Dynamic Filtering**:
  - Filter by `All`, `Web Technologies`, `Programming & Core Concepts`, `IoT & Electronics`, `Tools & Platforms`, and `Professional Skills`.
- **Projects Section & Interactive Deep-Dive Modal**:
  - **IoT-Based Autonomous Irrigation Control System** (2025–2026): Multi-sensor telemetry (BH1750, MLX90614, BMP280, Soil Moisture), VPD & stress logic, ESP32 actuation, and live Blynk IoT dashboard.
  - **Embedded Systems & IoT Automation Projects** (2024–2025): Relay switching, hardware interfacing, and wireless telemetry.
  - Clickable modal displaying technical system architecture diagrams and component breakdown.
- **Dual Timeline Layout**:
  - **Experience & Activities**: Student Volunteer – Academic & Environmental Awareness (Government School, Saharanpur, UP).
  - **Education**: B.Tech CSE at Lovely Professional University (2025–2029), Senior Secondary PCM (80%), Secondary (89%).
- **Interactive Contact Section**:
  - 1-Click Copy-to-Clipboard for Email (`vanshsainicse@gmail.com`) and Phone (`+91 8439448216`).
  - Interactive contact form with client-side validation, live character counter, floating toast notifications, and universal mailto draft generator.
  - Direct links to GitHub (`github.com/vanshsaini03`) and LinkedIn.
- **Printable / Downloadable Resume Template**:
  - Located at `assets/resume-preview.html` with clean 1-page print CSS.
- **Zero Heavy Dependencies**:
  - Built with pure Semantic HTML5, Vanilla CSS3, and Modular Vanilla JS for instantaneous page loads.

---

## 📁 Directory Structure

```
vansh-saini-portfolio/
├── index.html                    # Main semantic website entry point & SEO metadata
├── css/
│   ├── style.css                 # Core CSS design system, typography, colors, responsive layouts
│   └── animations.css            # CSS keyframes, card transitions, scroll reveal rules
├── js/
│   ├── app.js                    # Navigation, active ScrollSpy, skill filters, copy-to-clipboard & forms
│   ├── background.js             # Canvas constellation mesh particle animation
│   └── modal.js                  # Interactive project architecture modal viewer
├── assets/
│   ├── favicon.svg               # Sleek brand monogram favicon
│   ├── project-iot-irrigation.svg# High-resolution technical architecture diagram
│   ├── project-embedded.svg      # Embedded systems schematic illustration
│   └── resume-preview.html       # Clean printable 1-page resume view
└── README.md                     # Documentation & setup guide
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any modern browser, or launch a lightweight local HTTP server:

### Option 1: Using Python
```bash
# In the portfolio directory:
python -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080).

### Option 2: Using Node.js (npx serve)
```bash
npx -y serve .
```

---

## 🛠️ Personalization & Updates

- **Updating LinkedIn URL**:
  Search for `class="linkedin-placeholder"` in `index.html` and replace `href="#"` with your actual LinkedIn profile URL (e.g. `href="https://linkedin.com/in/your-username"`).
- **Updating Projects or Adding Live Demos**:
  Edit the project cards in `index.html` and modal definitions in `js/modal.js`.
