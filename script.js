/* ============================================================
   RAGHAVENDRA KURAPATI — PORTFOLIO INTERACTIVE ENGINE
   Three.js Developer Text & Tech Icon Cloud + 2-Tap Contact System
   ============================================================ */

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════
  // THREE.JS GRAPHICAL TECH STACK ICON SPRITES (NO TEXT BOXES)
  // ══════════════════════════════════════════════════════════
  const canvas = document.getElementById('three-canvas');
  let scene, camera, renderer, particles, iconSprites = [], cyberGrid;
  let mouseX = 0, mouseY = 0;
  let mouseWorld = new THREE.Vector3(9999, 9999, -16);
  let targetMouseWorld = new THREE.Vector3(9999, 9999, -16);
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  // Helper to draw authentic tech stack brand vector icons on canvas textures (NO TEXT)
  function createTechIconTexture(type) {
    const c = document.createElement('canvas');
    c.width = 160;
    c.height = 160;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 160, 160);

    // Glowing circular pedestal
    const grad = ctx.createRadialGradient(80, 80, 15, 80, 80, 75);
    grad.addColorStop(0, 'rgba(10, 15, 28, 0.92)');
    grad.addColorStop(0.7, 'rgba(6, 10, 20, 0.65)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(80, 80, 75, 0, Math.PI * 2);
    ctx.fill();

    // Subtle neon border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(80, 80, 68, 0, Math.PI * 2);
    ctx.stroke();

    ctx.save();
    ctx.translate(80, 80);

    switch (type) {
      case 'react': {
        // React Orbital Atom
        ctx.strokeStyle = '#00f5ff';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 14;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.ellipse(0, 0, 44, 16, (i * Math.PI) / 3, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = '#00f5ff';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'python': {
        // Python Interlocking Serpents
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.beginPath();
        ctx.roundRect(-24, -28, 28, 26, [12, 12, 3, 12]);
        ctx.roundRect(-12, -14, 36, 18, [3, 12, 12, 3]);
        ctx.fill();
        ctx.fillStyle = '#0a0f1d';
        ctx.beginPath();
        ctx.arc(-14, -20, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.beginPath();
        ctx.roundRect(-4, 2, 28, 26, [3, 12, 12, 12]);
        ctx.roundRect(-24, -4, 36, 18, [12, 3, 3, 12]);
        ctx.fill();
        ctx.fillStyle = '#0a0f1d';
        ctx.beginPath();
        ctx.arc(14, 20, 3, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'fastapi': {
        // FastAPI Teal Circle with Lightning
        ctx.fillStyle = '#059669';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, 38, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(5, -24);
        ctx.lineTo(-16, 2);
        ctx.lineTo(-2, 2);
        ctx.lineTo(-5, 24);
        ctx.lineTo(16, -2);
        ctx.lineTo(2, -2);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'docker': {
        // Docker Whale with Cargo Stack
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        const s = 8;
        const bX = -22, bY = -16;
        const grid = [
          [0, 1, 1, 0],
          [1, 1, 1, 1],
        ];
        grid.forEach((row, r) => {
          row.forEach((col, c) => {
            if (col) ctx.fillRect(bX + c * (s + 2.5), bY + r * (s + 2.5), s, s);
          });
        });
        ctx.beginPath();
        ctx.moveTo(-28, 6);
        ctx.bezierCurveTo(-28, 22, 16, 22, 26, 6);
        ctx.bezierCurveTo(30, 2, 28, -6, 26, -8);
        ctx.bezierCurveTo(20, 4, 16, 4, 12, 6);
        ctx.lineTo(-28, 6);
        ctx.fill();
        break;
      }
      case 'pytorch': {
        // PyTorch Flame & Spark Dot
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.bezierCurveTo(-20, -12, -24, 12, -12, 26);
        ctx.bezierCurveTo(0, 32, 18, 26, 22, 12);
        ctx.bezierCurveTo(26, -4, 14, -16, 10, -14);
        ctx.bezierCurveTo(14, -2, 10, 10, 2, 14);
        ctx.bezierCurveTo(-8, 14, -12, 4, -4, -8);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(16, -20, 5, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'langchain': {
        // LangChain / Neural Graph Nodes
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 12;
        const pts = [
          [0, -26],
          [-24, 16],
          [24, 16],
          [0, 2],
        ];
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[1][0], pts[1][1]);
        ctx.lineTo(pts[2][0], pts[2][1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        ctx.lineTo(pts[3][0], pts[3][1]);
        ctx.lineTo(pts[1][0], pts[1][1]);
        ctx.moveTo(pts[3][0], pts[3][1]);
        ctx.lineTo(pts[2][0], pts[2][1]);
        ctx.stroke();

        ctx.fillStyle = '#c084fc';
        pts.forEach(p => {
          ctx.beginPath();
          ctx.arc(p[0], p[1], 6, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }
      case 'leetcode': {
        // LeetCode DSA Angular Emblem
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(-18, -16);
        ctx.lineTo(10, -28);
        ctx.lineTo(20, -18);
        ctx.lineTo(-4, -6);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.moveTo(-18, -16);
        ctx.lineTo(-4, -6);
        ctx.lineTo(-4, 22);
        ctx.lineTo(-18, 12);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(-4, -6);
        ctx.lineTo(20, -18);
        ctx.lineTo(20, 10);
        ctx.lineTo(-4, 22);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'gcp': {
        // Google Cloud 4-Lobe Cloud
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f5ff';
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(-10, -5, 18, 0, Math.PI * 2);
        ctx.arc(12, -7, 16, 0, Math.PI * 2);
        ctx.arc(16, 10, 14, 0, Math.PI * 2);
        ctx.arc(-14, 10, 14, 0, Math.PI * 2);
        ctx.arc(2, 12, 16, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'aws': {
        // AWS Smile Arrow
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, -4, 26, 0.25 * Math.PI, 0.75 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(16, 12);
        ctx.lineTo(28, 16);
        ctx.lineTo(20, 26);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'github': {
        // GitHub Octocat Silhouette
        ctx.fillStyle = '#f1f5f9';
        ctx.shadowColor = '#cbd5e1';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(0, 5, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.moveTo(-18, -14);
        ctx.lineTo(-10, -24);
        ctx.lineTo(-4, -16);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(18, -14);
        ctx.lineTo(10, -24);
        ctx.lineTo(4, -16);
        ctx.fill();
        break;
      }
      case 'nodejs': {
        // Node.js Hexagon Shield
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const x = 32 * Math.cos(a);
          const y = 32 * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'kubernetes': {
        // K8s Helm Wheel
        ctx.strokeStyle = '#326ce5';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#326ce5';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        for (let i = 0; i < 7; i++) {
          const a = (i * Math.PI * 2) / 7;
          const x = 28 * Math.cos(a);
          const y = 28 * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        for (let i = 0; i < 7; i++) {
          const a = (i * Math.PI * 2) / 7;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(28 * Math.cos(a), 28 * Math.sin(a));
          ctx.stroke();
        }
        ctx.fillStyle = '#326ce5';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'tensorflow': {
        // TF Isometric Cube T
        ctx.fillStyle = '#ff6f00';
        ctx.shadowColor = '#ff6f00';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(22, -14);
        ctx.lineTo(22, 14);
        ctx.lineTo(0, 28);
        ctx.lineTo(-22, 14);
        ctx.lineTo(-22, -14);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffa000';
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(22, -14);
        ctx.lineTo(0, 0);
        ctx.lineTo(-22, -14);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'mongodb': {
        // MongoDB Leaf
        ctx.fillStyle = '#10aa50';
        ctx.shadowColor = '#10aa50';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.bezierCurveTo(24, -12, 22, 18, 0, 30);
        ctx.bezierCurveTo(-22, 18, -24, -12, 0, -30);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -24);
        ctx.lineTo(0, 24);
        ctx.stroke();
        break;
      }
      case 'redis': {
        // Redis Layered Crystal
        ctx.fillStyle = '#dc2626';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, -26);
        ctx.lineTo(26, -10);
        ctx.lineTo(0, 6);
        ctx.lineTo(-26, -10);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.lineTo(26, -8);
        ctx.lineTo(26, 2);
        ctx.lineTo(0, 18);
        ctx.lineTo(-26, 2);
        ctx.lineTo(-26, -8);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'graphql': {
        // GraphQL Crystal Nodes
        ctx.strokeStyle = '#e10098';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#e10098';
        ctx.shadowBlur = 12;
        const hex = [];
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          hex.push([28 * Math.cos(a), 28 * Math.sin(a)]);
        }
        ctx.beginPath();
        ctx.moveTo(hex[0][0], hex[0][1]);
        for (let i = 1; i < 6; i++) ctx.lineTo(hex[i][0], hex[i][1]);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#e10098';
        hex.forEach(p => {
          ctx.beginPath();
          ctx.arc(p[0], p[1], 5, 0, Math.PI * 2);
          ctx.fill();
        });
        break;
      }
      case 'typescript': {
        // TypeScript Blue Badge
        ctx.fillStyle = '#3178c6';
        ctx.shadowColor = '#3178c6';
        ctx.shadowBlur = 12;
        ctx.roundRect(-26, -26, 52, 52, 10);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-16, -10);
        ctx.lineTo(0, -10);
        ctx.moveTo(-8, -10);
        ctx.lineTo(-8, 14);
        ctx.stroke();
        break;
      }
      case 'tailwind': {
        // Tailwind Cyan Wave
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(-10, -5, 14, 0, Math.PI * 2);
        ctx.arc(10, 5, 14, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'huggingface': {
        // Hugging Face Emoji Emblem
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(-10, -6, 4, 0, Math.PI * 2);
        ctx.arc(10, -6, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 4, 12, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        break;
      }
      default: {
        ctx.strokeStyle = '#00f5ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(c);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  function initThree() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Starfield Data Particles (Dark Obsidian Ambient) ──
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const whiteColor = new THREE.Color(0xffffff);
    const silverColor = new THREE.Color(0x94a3b8);
    const darkSlate = new THREE.Color(0x334155);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.2) color = whiteColor;
      else if (colorChoice < 0.45) color = silverColor;
      else color = darkSlate;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ── Floating Graphical Tech Stack Brand Icon Sprites (22+ Icons, NO TEXT) ──
    const techIconConfigs = [
      { type: 'react', pos: [-18, 9, -15], scale: 4.8 },
      { type: 'fastapi', pos: [18, 10, -18], scale: 4.5 },
      { type: 'python', pos: [-16, -9, -13], scale: 4.6 },
      { type: 'langchain', pos: [15, -8, -14], scale: 4.8 },
      { type: 'docker', pos: [-22, 1, -22], scale: 4.6 },
      { type: 'pytorch', pos: [20, 2, -17], scale: 4.6 },
      { type: 'leetcode', pos: [0, 14, -16], scale: 4.5 },
      { type: 'gcp', pos: [-9, 15, -22], scale: 4.8 },
      { type: 'aws', pos: [10, -15, -19], scale: 4.6 },
      { type: 'github', pos: [-3, -16, -15], scale: 4.5 },
      { type: 'nodejs', pos: [14, 16, -24], scale: 4.5 },
      { type: 'kubernetes', pos: [-24, 12, -26], scale: 4.6 },
      { type: 'tensorflow', pos: [24, -12, -25], scale: 4.6 },
      { type: 'mongodb', pos: [-20, -16, -22], scale: 4.5 },
      { type: 'redis', pos: [22, 14, -26], scale: 4.5 },
      { type: 'typescript', pos: [5, 18, -24], scale: 4.4 },
      { type: 'graphql', pos: [-6, -20, -22], scale: 4.5 },
      { type: 'tailwind', pos: [22, -4, -20], scale: 4.4 },
      { type: 'huggingface', pos: [-25, -6, -24], scale: 4.6 },
      { type: 'react', pos: [-12, -18, -21], scale: 4.2 },
      { type: 'python', pos: [17, -18, -23], scale: 4.2 },
      { type: 'fastapi', pos: [-4, 20, -25], scale: 4.3 },
    ];

    techIconConfigs.forEach(item => {
      const texture = createTechIconTexture(item.type);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.88 });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(item.scale, item.scale, 1);
      sprite.position.set(...item.pos);
      sprite.userData = {
        originX: item.pos[0],
        originY: item.pos[1],
        originZ: item.pos[2],
        baseScale: item.scale,
        vx: 0,
        vy: 0,
        phase: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.4,
      };
      scene.add(sprite);
      iconSprites.push(sprite);
    });


  }

  function animateThree() {
    requestAnimationFrame(animateThree);

    // Particle rotation
    if (particles) {
      particles.rotation.y += 0.0002;
    }

    // Smooth lerp for mouse world coordinates
    mouseWorld.lerp(targetMouseWorld, 0.18);

    // Fluid interactive floating tech icons with zero lag physics
    const time = Date.now() * 0.001;
    iconSprites.forEach((sprite) => {
      const ud = sprite.userData;
      // Natural organic ambient floating target
      const targetX = ud.originX + Math.sin(time * ud.floatSpeed + ud.phase) * 1.6;
      const targetY = ud.originY + Math.cos(time * (ud.floatSpeed * 0.8) + ud.phase) * 1.4;

      // Interactive mouse repulsion/movement
      const dx = sprite.position.x - mouseWorld.x;
      const dy = sprite.position.y - mouseWorld.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 15;

      if (dist < repelRadius && dist > 0.01) {
        // Fluid repulsive force
        const force = Math.pow((repelRadius - dist) / repelRadius, 1.4) * 2.5;
        ud.vx += (dx / dist) * force * 0.9;
        ud.vy += (dy / dist) * force * 0.9;
        sprite.scale.lerp(new THREE.Vector3(ud.baseScale * 1.22, ud.baseScale * 1.22, 1), 0.2);
        sprite.material.opacity = 1.0;
      } else {
        sprite.scale.lerp(new THREE.Vector3(ud.baseScale, ud.baseScale, 1), 0.08);
        sprite.material.opacity = 0.88;
      }

      // Spring restitution back to ambient position
      ud.vx += (targetX - sprite.position.x) * 0.045;
      ud.vy += (targetY - sprite.position.y) * 0.045;

      // Velocity damping for lag-free buttery motion
      ud.vx *= 0.87;
      ud.vy *= 0.87;

      // Apply velocity
      sprite.position.x += ud.vx;
      sprite.position.y += ud.vy;

      // Dynamic rotational tilt
      sprite.material.rotation = THREE.MathUtils.lerp(sprite.material.rotation, ud.vx * 0.09, 0.12);
    });



    // Camera subtle smooth parallax
    const targetCamX = mouseX * 0.0018;
    const targetCamY = -mouseY * 0.0018;
    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }



  // ══════════════════════════════════════════════════════════
  // TOAST NOTIFICATION SYSTEM
  // ══════════════════════════════════════════════════════════
  const toast = document.getElementById('toastNotification');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.innerHTML = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // ══════════════════════════════════════════════════════════
  // 2-TAP INTERACTIVE CONTACT CARD (REVEAL -> REDIRECT)
  // ══════════════════════════════════════════════════════════
  window.handleContactCardClick = function (card) {
    if (!card) return;

    const isUnlocked = card.classList.contains('unlocked');
    const type = card.dataset.type || 'contact';
    const value = card.dataset.value || '';
    const url = card.dataset.url || '';

    const labelMap = {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      leetcode: 'LeetCode',
    };
    const title = labelMap[type] || 'Contact Detail';

    if (!isUnlocked) {
      // ── FIRST TAP: REVEAL & COPY ──
      card.classList.add('unlocked');

      const badge = card.querySelector('.contact-card-badge');
      if (badge) badge.textContent = '✓ Unlocked';

      const valueEl = card.querySelector('.contact-value');
      if (valueEl) {
        valueEl.textContent = value;
        valueEl.classList.remove('card-masked-val');
      }

      const subtextEl = card.querySelector('.contact-subtext');
      if (subtextEl) {
        subtextEl.textContent = '⚡ Tap again to open link ↗';
      }

      // Copy value or URL to clipboard
      const textToCopy = (type === 'email') ? value : (url || value);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`✓ ${title} revealed & copied: <strong>${value}</strong><br><small>Tap card again to open.</small>`);
        }).catch(() => {
          showToast(`✓ ${title} revealed: <strong>${value}</strong>. Tap again to open.`);
        });
      } else {
        showToast(`✓ ${title} revealed: <strong>${value}</strong>. Tap again to open.`);
      }

    } else {
      // ── SECOND TAP: REDIRECT / OPEN ──
      if (url) {
        showToast(`🚀 Opening ${title}...`);
        setTimeout(() => {
          if (url.startsWith('mailto:')) {
            window.location.href = url;
          } else {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        }, 300);
      }
    }
  };

  // ══════════════════════════════════════════════════════════
  // FOCUS VIEW SWITCHER (ALL / FREELANCE / FULL-TIME)
  // ══════════════════════════════════════════════════════════
  window.setFocus = function (focus) {
    document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.focus === focus);
    });

    document.body.classList.remove('focus-freelance', 'focus-fulltime');

    if (focus === 'freelance') {
      document.body.classList.add('focus-freelance');
      const target = document.getElementById('services') || document.getElementById('experience');
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
      showToast('⚡ Spotlighting <strong>Engineering Services & Experience</strong>');
    } else if (focus === 'fulltime') {
      document.body.classList.add('focus-fulltime');
      const target = document.getElementById('experience');
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
      showToast('💼 Spotlighting <strong>Work Experience & Technical Roadmap</strong>');
    } else {
      showToast('🌐 Displaying <strong>Master Unified Showcase</strong>');
    }
  };

  // Toggle button click handlers
  document.querySelectorAll('.mode-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => setFocus(btn.dataset.focus));
  });

  // ══════════════════════════════════════════════════════════
  // TYPING EFFECT
  // ══════════════════════════════════════════════════════════
  const typingTitles = [
    'Passionate Software Engineer & Builder',
    'Full-Stack Developer',
    'ML and AI Engineer',
    'Finance & Quantitative Market Investor',

  ];

  const typingEl = document.getElementById('typingText');
  let currentTitleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingTimeout = null;

  function typeNextChar() {
    if (!typingEl) return;
    if (typingTimeout) clearTimeout(typingTimeout);

    const currentTitle = typingTitles[currentTitleIndex];

    if (!isDeleting) {
      typingEl.textContent = currentTitle.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex === currentTitle.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeNextChar, 3000);
        return;
      }
      typingTimeout = setTimeout(typeNextChar, 60);
    } else {
      typingEl.textContent = currentTitle.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % typingTitles.length;
        typingTimeout = setTimeout(typeNextChar, 350);
        return;
      }
      typingTimeout = setTimeout(typeNextChar, 35);
    }
  }

  // ══════════════════════════════════════════════════════════
  // LIVE CLOCK
  // ══════════════════════════════════════════════════════════
  function updateLiveClock() {
    const timeEl = document.getElementById('clockTime');
    const ampmEl = document.getElementById('clockAmPm');
    const dateEl = document.getElementById('clockDate');

    if (!timeEl || !ampmEl || !dateEl) return;

    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Add leading zeros
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    
    timeEl.textContent = `${hours}:${minutes}`;
    ampmEl.textContent = ampm;
    dateEl.textContent = `${month} ${day}`;
  }

  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // ══════════════════════════════════════════════════════════
  // NAVBAR SCROLL EFFECT
  // ══════════════════════════════════════════════════════════
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ══════════════════════════════════════════════════════════
  // MOBILE MENU
  // ══════════════════════════════════════════════════════════
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // SMOOTH SCROLL
  // ══════════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // ══════════════════════════════════════════════════════════
  // PROJECT FILTER
  // ══════════════════════════════════════════════════════════
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  const miniCards = document.querySelectorAll('.project-card-mini[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const allCards = [...projectCards, ...miniCards];

      allCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ══════════════════════════════════════════════════════════
  // 3D CARD TILT EFFECT
  // ══════════════════════════════════════════════════════════
  function initCardTilt() {
    const cards = document.querySelectorAll('.project-card, .service-card, .profile-card, .client-card, .flow-node, .adventure-passion-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }

  // ══════════════════════════════════════════════════════════
  // ANIMATED STATS COUNTER
  // ══════════════════════════════════════════════════════════
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target], .profile-stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = parseInt(entry.target.dataset.target);
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            entry.target.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    counters.forEach(counter => observer.observe(counter));
  }

  // ══════════════════════════════════════════════════════════
  // GSAP SCROLL ANIMATIONS
  // ══════════════════════════════════════════════════════════
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Stagger children in grids
    const grids = ['.skills-grid', '.services-grid', '.clients-grid', '.projects-grid', '.profiles-grid',
      '.flow-map-track', '.contact-grid', '.domains-grid',
      '.projects-grid-secondary', '.stats-row'];

    grids.forEach(selector => {
      const container = document.querySelector(selector);
      if (!container) return;

      const children = container.querySelectorAll('.reveal, .skill-category, .service-card, .client-card, .project-card, .profile-card, .flow-node, .contact-card, .domain-card, .timeline-item, .project-card-mini, .stat-card');
      if (children.length === 0) return;

      gsap.fromTo(children,
        { opacity: 0, y: 35 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }

  // ══════════════════════════════════════════════════════════
  // MOUSE TRACKING & RESIZE
  // ══════════════════════════════════════════════════════════
  function updateMouseWorld(clientX, clientY) {
    mouseX = clientX - windowHalfX;
    mouseY = clientY - windowHalfY;

    if (!camera) return;
    const ndcX = (clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(clientY / window.innerHeight) * 2 + 1;

    const rayVec = new THREE.Vector3(ndcX, ndcY, 0.5);
    rayVec.unproject(camera);
    const dir = rayVec.sub(camera.position).normalize();
    if (dir.z !== 0) {
      const distToPlane = (-16 - camera.position.z) / dir.z;
      targetMouseWorld.copy(camera.position).add(dir.multiplyScalar(distToPlane));
    }
  }

  function onMouseMove(e) {
    updateMouseWorld(e.clientX, e.clientY);
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      updateMouseWorld(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  window.addEventListener('touchmove', onTouchMove, { passive: true });

  function onResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  // ══════════════════════════════════════════════════════════
  // INITIALIZATION
  // ══════════════════════════════════════════════════════════
  function init() {
    // Three.js
    try {
      initThree();
      animateThree();
    } catch (e) {
      console.warn('Three.js initialization failed:', e);
    }

    // GSAP
    requestAnimationFrame(() => {
      initGSAP();
    });

    // Typing effect
    typeNextChar();

    // Interactive features
    initCardTilt();
    animateCounters();

    // Event listeners
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
