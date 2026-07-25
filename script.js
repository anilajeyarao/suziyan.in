const revealTargets = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const requirementForm = document.querySelector("#requirement-form");
const requirementStatus = document.querySelector("#requirement-status");

if (requirementForm) {
  requirementForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#req-name")?.value.trim() || "";
    const company = document.querySelector("#req-company")?.value.trim() || "";
    const email = document.querySelector("#req-email")?.value.trim() || "";
    const details = document.querySelector("#req-details")?.value.trim() || "";

    const subject = "Talent Requirement for Suziyan";
    const bodyLines = [
      "Hello Suziyan,",
      "",
      "Please find our hiring requirement below.",
      "",
      `Name: ${name || "-"}`,
      `Company: ${company || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Requirement details:",
      details || "-",
      "",
      "Regards,"
    ];

    const emailBody = bodyLines.join("\n");
    const mailtoUrl = `mailto:contact@suziyan.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    if (requirementStatus) {
      requirementStatus.textContent = "Trying to open your email app...";
    }

    try {
      window.location.href = mailtoUrl;
    } catch (error) {
      // Ignore and fall back to the helper message below.
    }

    const fallbackMessage = "If your mail app did not open, please send this requirement manually to contact@suziyan.in. The requirement text has been prepared below.";

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailBody).then(() => {
        if (requirementStatus) {
          requirementStatus.textContent = `${fallbackMessage} It has also been copied to your clipboard.`;
        }
      }).catch(() => {
        if (requirementStatus) {
          requirementStatus.textContent = fallbackMessage;
        }
      });
    } else if (requirementStatus) {
      requirementStatus.textContent = fallbackMessage;
    }
  });
}
