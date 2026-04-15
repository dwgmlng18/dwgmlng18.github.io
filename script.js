/* ============================================================
   DEWA GEMILANG — Portfolio Script
   ============================================================ */

/* ── AOS (Animate On Scroll) Init ───────────────────────────── */
AOS.init({
  duration: 760,
  once: true,
  offset: 50,
  easing: "ease-out-cubic",
});

/* ── Page Loader ─────────────────────────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("out");
  }, 1500);
});

/* ── Custom Cursor ───────────────────────────────────────────── */
const curDot  = document.getElementById("cur");
const curRing = document.getElementById("cur-r");

if (curDot) {
  document.addEventListener("mousemove", (e) => {
    curDot.style.left  = curRing.style.left = e.clientX + "px";
    curDot.style.top   = curRing.style.top  = e.clientY + "px";
  });
}

document
  .querySelectorAll("a, button, .sp, .s-chip, .ip, .si-w, .tc, .edu-c, .scc")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cur-big"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cur-big"));
  });

/* ── Scroll Events (progress bar, navbar, active link, scroll-top btn) ── */
window.addEventListener("scroll", () => {
  const scrollY   = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Progress bar
  document.getElementById("prog").style.width = (scrollY / docHeight) * 100 + "%";

  // Scroll-to-top button visibility
  document.getElementById("st").classList.toggle("on", scrollY > 400);

  // Navbar background on scroll
  document.getElementById("nav").classList.toggle("sc", scrollY > 60);

  // Active nav link highlighting
  let currentSection = "";
  document.querySelectorAll("section[id]").forEach((section) => {
    if (scrollY >= section.offsetTop - 120) {
      currentSection = section.id;
    }
  });

  document.querySelectorAll(".nav-link-c").forEach((link) => {
    link.classList.remove("on");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("on");
    }
  });
});

/* ── Button Ripple Effect ────────────────────────────────────── */
document.querySelectorAll(".btn-pg, .btn-sub").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);

    ripple.className  = "rpl";
    ripple.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${e.clientX - rect.left - size / 2}px`,
      `top:${e.clientY - rect.top - size / 2}px`,
    ].join(";");

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* ── Toast Notification ──────────────────────────────────────── */
function toast(message, type = "ok") {
  const toastEl  = document.getElementById("toast");
  const messageEl = document.getElementById("toast-msg");

  messageEl.textContent = message;
  toastEl.className     = `tn t-${type}`;
  toastEl.querySelector("i").className =
    type === "ok" ? "bi bi-check-lg" : "bi bi-x-circle-fill";

  toastEl.classList.add("on");
  setTimeout(() => toastEl.classList.remove("on"), 3600);
}

/* ── Contact Form ────────────────────────────────────────────── */
document.getElementById("cForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama   = document.getElementById("iNama").value.trim();
  const email  = document.getElementById("iEmail").value.trim();
  const subjek = document.getElementById("iSubjek").value.trim();
  const pesan  = document.getElementById("iPesan").value.trim();
  const btn    = document.getElementById("sbtn");

  // Shake animation for invalid fields
  const shake = (el) => {
    el.style.borderColor = "#ef4444";
    el.style.animation   = "shk .4s ease";
    setTimeout(() => {
      el.style.animation   = "";
      el.style.borderColor = "";
    }, 600);
  };

  // Validation
  if (!nama || !email || !pesan) {
    if (!nama)  shake(document.getElementById("iNama"));
    if (!email) shake(document.getElementById("iEmail"));
    if (!pesan) shake(document.getElementById("iPesan"));
    toast("Harap isi semua kolom wajib (*)", "er");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    shake(document.getElementById("iEmail"));
    toast("Format email tidak valid", "er");
    return;
  }

  // Show loading spinner on button
  btn.innerHTML =
    '<svg style="width:22px;height:22px;animation:spin-s .7s linear infinite" viewBox="0 0 24 24">' +
    '<circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3"/>' +
    '<path d="M12 2a10 10 0 0 1 10 10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
    "</svg>";
  btn.style.pointerEvents = "none";

  setTimeout(() => {
    const subject = subjek || "Pesan dari Website Portofolio";
    const body    = `Nama: ${nama}\nEmail: ${email}\n\n${pesan}`;

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=dewagemilang18@gmail.com` +
      `&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank"
    );

    btn.classList.add("ok");
    btn.innerHTML = '<i class="bi bi-check-circle-fill" style="font-size:1.1rem"></i>' +
                    '<span class="bt">Terkirim!</span>';
    btn.style.pointerEvents = "auto";
    toast("Gmail terbuka — pesan siap dikirim!", "ok");
    document.getElementById("cForm").reset();

    setTimeout(() => {
      btn.classList.remove("ok");
      btn.innerHTML = '<i class="bi bi-send-fill"></i><span class="bt">Kirim Pesan</span>';
    }, 3200);
  }, 1300);
});

/* ── Mobile Navbar Hamburger Toggle ─────────────────────────── */
const toggler = document.querySelector(".navbar-toggler");

toggler.addEventListener("click", function () {
  const spans = this.querySelectorAll(".hmb span");
  const isOpen = this.classList.toggle("hact");

  spans[0].style.cssText = isOpen ? "transform:rotate(45deg) translate(5px,5px)"  : "";
  spans[1].style.cssText = isOpen ? "opacity:0;transform:translateX(-8px)"         : "";
  spans[2].style.cssText = isOpen ? "transform:rotate(-45deg) translate(5px,-5px)" : "";
});

// Reset hamburger when collapse closes
document.getElementById("nv").addEventListener("hidden.bs.collapse", () => {
  toggler.classList.remove("hact");
  toggler.querySelectorAll(".hmb span").forEach((s) => (s.style.cssText = ""));
});

// Close mobile menu on nav link click
document.querySelectorAll("#nv .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const collapseInstance = bootstrap.Collapse.getInstance(document.getElementById("nv"));
    if (collapseInstance) collapseInstance.hide();
  });
});

/* ── Dynamic Keyframes ───────────────────────────────────────── */
const keyframeStyles = document.createElement("style");
keyframeStyles.textContent =
  "@keyframes shk{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}" +
  "@keyframes spin-s{to{transform:rotate(360deg)}}";
document.head.appendChild(keyframeStyles);