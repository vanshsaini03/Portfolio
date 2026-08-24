/**
 * VANSH SAINI PORTFOLIO - PROJECT DEEP-DIVE MODAL CONTROLLER
 * Handles interactive inspection of system schematics and technical details
 */

(function () {
  'use strict';

  const modalData = {
    'iot-irrigation': {
      title: 'IoT-Based Autonomous Irrigation Control System',
      subtitle: 'Research & Implementation • 2025–2026',
      badge: 'IoT & Embedded Systems',
      diagram: 'assets/project-iot-irrigation.svg',
      overview: `An intelligent, closed-loop irrigation system engineered to monitor soil and microclimate metrics in real-time, making precision watering decisions without human intervention while offering cloud-based manual overrides.`,
      architecture: [
        {
          heading: 'Multi-Sensor Array Telemetry',
          detail: 'Integrated BH1750 (Ambient Light), MLX90614 (Non-Contact IR Plant Canopy Temperature), BMP280 (Barometric Pressure & Humidity), and capacitive Soil Moisture Probes via I2C and ADC.'
        },
        {
          heading: 'VPD & Plant-Stress Predictive Logic',
          detail: 'Calculates Vapor Pressure Deficit (VPD = VPsat - VPact) alongside soil moisture to identify plant transpirational stress before permanent wilting occurs, optimizing water conservation.'
        },
        {
          heading: 'ESP32 Controller & Fail-Safe Actuation',
          detail: 'Microcontroller executes decision trees locally with watchdog timers and controls an optocoupled relay module driving a high-torque DC submersible water pump.'
        },
        {
          heading: 'Blynk IoT Cloud Dashboard',
          detail: 'Live mobile & web telemetry dashboard displaying streaming sensor gauges, manual pump trigger buttons, auto-irrigation schedules, and critical event notifications.'
        }
      ],
      techStack: ['ESP32', 'Arduino IDE', 'Blynk IoT', 'BH1750', 'MLX90614', 'BMP280', 'Soil Moisture', 'C/C++', 'I2C Bus']
    },
    'embedded-automation': {
      title: 'Embedded Systems & IoT Automation Projects',
      subtitle: 'Hardware Prototyping & Bench Experiments • 2024–2025',
      badge: 'Hardware & Automation',
      diagram: 'assets/project-embedded.svg',
      overview: `A series of laboratory and practical automation prototypes focusing on microcontroller interfacing, relay switching matrices, sensor calibration, and wireless telemetry bridges.`,
      architecture: [
        {
          heading: 'Microcontroller Architecture & Logic',
          detail: 'Implemented non-blocking event loops (`millis()` scheduling) and hardware interrupt service routines (ISR) on Arduino and ESP32 platforms for responsive sensor sampling.'
        },
        {
          heading: 'High-Load Relay Isolation',
          detail: 'Designed optocoupled relay driver circuits with flyback diode protection to safely interface low-voltage microcontrollers (3.3V/5V) with AC and DC high-load appliances.'
        },
        {
          heading: 'Wireless Sensor Networking',
          detail: 'Configured local Wi-Fi telemetry using lightweight communication protocols for remote diagnostics, real-time alert dispatch, and sensor data logging.'
        },
        {
          heading: 'Diagnostic Visualizers',
          detail: 'Integrated I2C OLED displays and diagnostic LEDs for instantaneous on-device debugging, fault indication, and runtime system state monitoring.'
        }
      ],
      techStack: ['Arduino', 'ESP32', 'Relay Modules', 'Analog Sensors', 'C/C++', 'Hardware Interfacing', 'Optocouplers']
    }
  };

  const overlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-dynamic-content');

  function openProjectModal(projectId) {
    const data = modalData[projectId];
    if (!data || !overlay || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-header-info">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
          <span class="project-type-badge" style="position: static;">${data.badge}</span>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-cyan);">${data.subtitle}</span>
        </div>
        <h2 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">${data.title}</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${data.overview}</p>
      </div>

      <div class="modal-diagram-container" style="margin: 1rem 0;">
        <img src="${data.diagram}" alt="${data.title} Architecture Diagram" style="width: 100%; height: auto; border-radius: 8px;" />
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
        <h3 style="font-size: 1.15rem; color: var(--accent-blue-light); font-weight: 700;">Key Engineering Highlights</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
          ${data.architecture.map(item => `
            <div style="padding: 1rem; background: rgba(16, 26, 50, 0.6); border: 1px solid var(--glass-border); border-radius: 8px;">
              <h4 style="font-size: 0.925rem; color: var(--accent-cyan-light); margin-bottom: 0.35rem;">${item.heading}</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">${item.detail}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08);">
        <h4 style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Technologies & Hardware Utilized</h4>
        <div class="project-tech-stack">
          ${data.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event Listeners
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      const targetId = trigger.getAttribute('data-modal-target');
      openProjectModal(targetId);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  window.openProjectModal = openProjectModal;
})();
