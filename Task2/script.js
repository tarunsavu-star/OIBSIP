/* =========================================================
   TARUN KUMAR PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     YEAR
  ======================================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
      });
    });

  }


  /* =======================================================
     THEME
  ======================================================= */

  const themeToggle = document.getElementById("themeToggle");

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");

    if (themeToggle) {
      themeToggle.textContent = "☀️";
    }
  }

  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle("light");

      const light =
        document.body.classList.contains("light");

      localStorage.setItem(
        "portfolio-theme",
        light ? "light" : "dark"
      );

      themeToggle.textContent =
        light ? "☀️" : "🌙";

    });

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* =======================================================
     STATS COUNTERS
  ======================================================= */

  const counters =
    document.querySelectorAll(".counter");

  function animateCounter(counter) {

    const target =
      Number(counter.dataset.count);

    let current = 0;

    const duration = 1000;

    const startTime = performance.now();

    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      const eased =
        1 - Math.pow(1 - progress, 3);

      current =
        Math.floor(target * eased);

      counter.textContent = current;

      if (progress < 1) {

        requestAnimationFrame(updateCounter);

      } else {

        counter.textContent = target;

      }

    }

    requestAnimationFrame(updateCounter);
  }


  /*
     Start counters when page loads.
     This also prevents the previous 0-counter issue.
  */

  setTimeout(() => {

    counters.forEach(counter => {
      animateCounter(counter);
    });

  }, 300);


  /* =======================================================
     MODAL
  ======================================================= */

  const modal =
    document.getElementById("detailsModal");

  const modalContent =
    document.getElementById("modalContent");

  const modalClose =
    document.getElementById("modalClose");

  const modalOverlay =
    document.querySelector(".modal-overlay");


  function openModal(content) {

    if (!modal || !modalContent) return;

    modalContent.innerHTML = content;

    modal.classList.add("show");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("show");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }


  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeModal();
    }

  });


  /* =======================================================
     ABOUT DETAILS
  ======================================================= */

  const aboutModalContent = `
    <span class="modal-label">About Me</span>

    <h2>Developer Profile</h2>

    <p>
      I'm a BCA graduate interested in software development,
      full-stack web technologies and artificial intelligence.
    </p>

    <h3>What I Focus On</h3>

    <ul>
      <li>Building responsive web applications.</li>
      <li>Developing practical full-stack solutions.</li>
      <li>Exploring AI and machine learning.</li>
      <li>Improving user experience and application quality.</li>
      <li>Learning modern development technologies.</li>
    </ul>

    <h3>Development Approach</h3>

    <p>
      I focus on writing understandable code, creating useful
      interfaces and converting real-world requirements into
      practical software solutions.
    </p>

    <h3>Career Goal</h3>

    <p>
      My goal is to grow as a software developer while working
      on meaningful products and continuously improving my
      technical and problem-solving skills.
    </p>
  `;


  document
    .querySelectorAll('[data-modal="aboutModal"]')
    .forEach(button => {

      button.addEventListener("click", () => {
        openModal(aboutModalContent);
      });

    });


  /* =======================================================
     PROJECT DATA
  ======================================================= */

  const projectData = {

    career: {

      title: "AI Career Guidance Chatbot",

      category: "AI / NLP",

      description:
        "An intelligent career guidance chatbot designed to help users explore career-related information and suitable career paths.",

      purpose:
        "The purpose of the project is to make career guidance more accessible through an interactive conversational system.",

      features: [
        "Interactive chatbot experience",
        "Career-related responses",
        "Natural language processing concepts",
        "User-focused conversation flow",
        "AI-based guidance approach"
      ],

      technologies:
        "Python, NLP, NLTK / spaCy concepts, AI",

      role:
        "Designed and developed the application concept and worked on the software implementation."
    },


    placement: {

      title: "Student Placement Prediction System",

      category: "Machine Learning",

      description:
        "A machine-learning based application designed to predict student placement outcomes using relevant student information.",

      purpose:
        "The project demonstrates how machine learning can be applied to educational data to provide predictive insights.",

      features: [
        "Student data processing",
        "Machine learning model",
        "Prediction workflow",
        "Data analysis",
        "Result presentation"
      ],

      technologies:
        "Python, Pandas, scikit-learn, Machine Learning",

      role:
        "Worked on data preparation, application development and prediction workflow."
    },


    reservation: {

      title: "Reservation System",

      category: "Web Application",

      description:
        "A web-based reservation solution designed to simplify booking and reservation management.",

      purpose:
        "The application demonstrates a structured approach to handling reservations through a digital interface.",

      features: [
        "Reservation interface",
        "User-friendly forms",
        "Booking information handling",
        "Responsive web layout",
        "Interactive interface"
      ],

      technologies:
        "HTML5, CSS3, JavaScript",

      role:
        "Worked on the frontend structure, styling and interactive functionality."
    },


    scholarship: {

      title: "Scholarship Application Platform",

      category: "Web Application",

      description:
        "A digital platform concept designed to simplify scholarship application and student information management.",

      purpose:
        "The project focuses on providing students with a more organized application experience.",

      features: [
        "Application interface",
        "Student information handling",
        "Form-based workflow",
        "Responsive design",
        "Structured user experience"
      ],

      technologies:
        "HTML5, CSS3, JavaScript, Database concepts",

      role:
        "Worked on the application interface, user flow and implementation."
    }

  };


  /* =======================================================
     PROJECT DETAILS
  ======================================================= */

  document
    .querySelectorAll(".project-details")
    .forEach(button => {

      button.addEventListener("click", () => {

        const key =
          button.dataset.project;

        const project =
          projectData[key];

        if (!project) return;

        openModal(`

          <span class="modal-label">
            ${project.category}
          </span>

          <h2>${project.title}</h2>

          <p>
            ${project.description}
          </p>

          <h3>Purpose</h3>

          <p>
            ${project.purpose}
          </p>

          <h3>Key Features</h3>

          <ul>
            ${project.features
              .map(feature => `<li>${feature}</li>`)
              .join("")}
          </ul>

          <h3>Technologies</h3>

          <p>${project.technologies}</p>

          <h3>My Role</h3>

          <p>${project.role}</p>

        `);

      });

    });


  /* =======================================================
     CERTIFICATION DATA
  ======================================================= */

  const certificationData = {

    python: {
      title: "Python Essentials",
      issuer: "Cisco NetAcad",
      description:
        "Certification focused on Python programming fundamentals and practical programming concepts.",
      skills:
        "Python programming, variables, data types, control flow, functions and programming fundamentals."
    },

    c: {
      title: "C Programming",
      issuer: "Cisco NetAcad",
      description:
        "Certification covering fundamental C programming concepts.",
      skills:
        "C syntax, programming logic, variables, control structures and problem solving."
    },

    azure: {
      title: "Microsoft Azure Fundamentals",
      issuer: "Digisaksham",
      description:
        "Certification focused on fundamental cloud computing and Microsoft Azure concepts.",
      skills:
        "Cloud concepts, Azure fundamentals and basic cloud services."
    },

    html: {
      title: "HTML5 Application Development",
      issuer: "Certiport",
      description:
        "Certification focused on HTML5 application development concepts.",
      skills:
        "HTML5 structure, web application concepts and modern web development."
    },

    aiml: {
      title: "AI & Machine Learning",
      issuer: "U-Learn",
      description:
        "Certification covering fundamental artificial intelligence and machine learning concepts.",
      skills:
        "AI concepts, machine learning fundamentals, data processing and predictive approaches."
    },

    english: {
      title: "MePro English Language Proficiency",
      issuer: "Pearson",
      description:
        "Professional English language proficiency certification.",
      skills:
        "English communication, language comprehension and professional communication."
    }

  };


  /* =======================================================
     CERTIFICATION DETAILS
  ======================================================= */

  document
    .querySelectorAll(".cert-details")
    .forEach(button => {

      button.addEventListener("click", () => {

        const key =
          button.dataset.cert;

        const cert =
          certificationData[key];

        if (!cert) return;

        openModal(`

          <span class="modal-label">
            Certification
          </span>

          <h2>${cert.title}</h2>

          <p>
            <strong>Issuer:</strong>
            ${cert.issuer}
          </p>

          <h3>About the Certification</h3>

          <p>
            ${cert.description}
          </p>

          <h3>Knowledge & Skills</h3>

          <p>
            ${cert.skills}
          </p>

        `);

      });

    });


  /* =======================================================
     HACKATHON DATA
  ======================================================= */

  const hackathonData = {

    hack1: {

      title: "Hackathon Projects",

      status: "Participation",

      description:
        "This section is prepared for documenting hackathon participation, project ideas, prototypes and technical solutions.",

      details: [
        "Problem identification",
        "Idea development",
        "Prototype development",
        "Team collaboration",
        "Technical presentation"
      ]

    },


    hack2: {

      title: "Technology Challenges",

      status: "Innovation",

      description:
        "A dedicated space for recording future technology challenges and innovative solutions developed during hackathons.",

      details: [
        "Technology exploration",
        "Rapid development",
        "Problem solving",
        "Innovation",
        "Project demonstration"
      ]

    }

  };


  document
    .querySelectorAll(".hack-details")
    .forEach(button => {

      button.addEventListener("click", () => {

        const key =
          button.dataset.hack;

        const hack =
          hackathonData[key];

        if (!hack) return;

        openModal(`

          <span class="modal-label">
            ${hack.status}
          </span>

          <h2>${hack.title}</h2>

          <p>
            ${hack.description}
          </p>

          <h3>Focus Areas</h3>

          <ul>
            ${hack.details
              .map(item => `<li>${item}</li>`)
              .join("")}
          </ul>

          <p>
            <strong>Note:</strong>
            Add your actual hackathon name, date,
            project and achievement here when available.
          </p>

        `);

      });

    });


  /* =======================================================
     SKILL DETAILS
  ======================================================= */

  const skillData = {

    Programming: {
      title: "Programming Skills",
      details:
        "C, Python, Java and JavaScript with a focus on programming logic and application development."
    },

    Frontend: {
      title: "Frontend Development",
      details:
        "HTML5, CSS3, JavaScript and React for creating responsive and interactive interfaces."
    },

    Backend: {
      title: "Backend Development",
      details:
        "Node.js, Express.js and REST APIs for server-side application development."
    },

    Database: {
      title: "Database Technologies",
      details:
        "MongoDB and SQLite for structured application data management."
    },

    AI: {
      title: "AI & Machine Learning",
      details:
        "scikit-learn, NLTK, spaCy, Pandas and Flask for AI, NLP and machine-learning applications."
    },

    Tools: {
      title: "Development Tools",
      details:
        "Git, GitHub, Linux and VS Code for development, version control and project management."
    }

  };


  document
    .querySelectorAll(".skill-details")
    .forEach(button => {

      button.addEventListener("click", () => {

        const card =
          button.closest(".skill-card");

        const key =
          card.dataset.skill;

        const skill =
          skillData[key];

        if (!skill) return;

        openModal(`

          <span class="modal-label">
            Technical Skill
          </span>

          <h2>${skill.title}</h2>

          <p>
            ${skill.details}
          </p>

        `);

      });

    });


  /* =======================================================
     EXPERIENCE DETAILS
  ======================================================= */

  const experienceData = {

    adhoc: {

      title: "MERN Full Stack Development Intern",

      company: "ADHOC Network",

      period: "May 2025 — July 2025",

      description:
        "Internship experience focused on full-stack development concepts and practical web application development.",

      skills:
        "MERN stack concepts, frontend development, backend development and web application workflows."

    },

    vidrutha: {

      title: "Software Development Intern",

      company: "Vidrutha Solutions",

      period: "December 2025 — April 2026",

      description:
        "Software development internship providing practical exposure to application development, testing and professional development workflows.",

      skills:
        "Software development, manual testing, cross-browser testing, bug tracking and development workflows."

    }

  };


  document
    .querySelectorAll(".experience-details")
    .forEach(button => {

      button.addEventListener("click", () => {

        const key =
          button.dataset.experience;

        const experience =
          experienceData[key];

        if (!experience) return;

        openModal(`

          <span class="modal-label">
            Internship
          </span>

          <h2>${experience.title}</h2>

          <p>
            <strong>Organization:</strong>
            ${experience.company}
          </p>

          <p>
            <strong>Period:</strong>
            ${experience.period}
          </p>

          <h3>Experience</h3>

          <p>
            ${experience.description}
          </p>

          <h3>Skills & Exposure</h3>

          <p>
            ${experience.skills}
          </p>

        `);

      });

    });


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForm =
    document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      const name =
        document.getElementById("contactName").value.trim();

      const email =
        document.getElementById("contactEmail").value.trim();

      const message =
        document.getElementById("contactMessage").value.trim();

      if (!name || !email || !message) {
        alert("Please complete all fields.");
        return;
      }

      const subject =
        encodeURIComponent(
          `Portfolio Contact from ${name}`
        );

      const body =
        encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

      window.location.href =
        `mailto:tarunsavu@gmail.com?subject=${subject}&body=${body}`;

    });

  }


  /* =======================================================
     CHAT ASSISTANT
  ======================================================= */

  const chatButton =
    document.getElementById("chatButton");

  const chatBox =
    document.getElementById("chatBox");

  const chatClose =
    document.getElementById("chatClose");

  const chatInput =
    document.getElementById("chatInput");

  const chatSend =
    document.getElementById("chatSend");

  const chatMessages =
    document.getElementById("chatMessages");


  if (chatButton && chatBox) {

    chatButton.addEventListener("click", () => {
      chatBox.classList.toggle("show");
    });

  }


  if (chatClose && chatBox) {

    chatClose.addEventListener("click", () => {
      chatBox.classList.remove("show");
    });

  }


  function addChatMessage(text, type) {

    const message =
      document.createElement("div");

    message.className =
      type === "user"
        ? "user-message"
        : "bot-message";

    message.textContent = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
      chatMessages.scrollHeight;
  }


  function getChatResponse(question) {

    const q =
      question.toLowerCase();


    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey")
    ) {
      return "Hi! 👋 Ask me about Tarun's skills, projects, internships or certifications.";
    }


    if (
      q.includes("skill") ||
      q.includes("technology") ||
      q.includes("tech")
    ) {
      return "Tarun works with C, Python, Java, JavaScript, HTML5, CSS3, React, Node.js, Express.js, MongoDB, REST APIs and AI/ML technologies.";
    }


    if (
      q.includes("project") ||
      q.includes("projects")
    ) {
      return "There are 4 major projects: AI Career Guidance Chatbot, Student Placement Prediction System, Reservation System and Scholarship Application Platform.";
    }


    if (
      q.includes("intern") ||
      q.includes("experience")
    ) {
      return "Tarun has completed 2 internships, including MERN Full Stack Development and Software Development internships.";
    }


    if (
      q.includes("certificate") ||
      q.includes("certification")
    ) {
      return "Tarun has 6 certifications covering Python, C Programming, Azure Fundamentals, HTML5, AI & Machine Learning and English language proficiency.";
    }


    if (
      q.includes("oibsip") ||
      q.includes("internship task")
    ) {
      return "Tarun completed 3 OIBSIP Level 1 tasks: Landing Page, Personal Portfolio and Temperature Converter.";
    }


    if (
      q.includes("github")
    ) {
      return "You can explore the projects through Tarun's GitHub profile.";
    }


    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("hire")
    ) {
      return "You can contact Tarun through the Contact section or email him directly.";
    }


    if (
      q.includes("hackathon")
    ) {
      return "The Hackathons section is available for documenting hackathon participation, ideas, prototypes and achievements.";
    }


    return "I can help you explore Tarun's projects, skills, internships, certifications, OIBSIP tasks and contact information.";
  }


  function sendChat() {

    if (!chatInput || !chatMessages) return;

    const question =
      chatInput.value.trim();

    if (!question) return;

    addChatMessage(question, "user");

    chatInput.value = "";

    setTimeout(() => {

      const response =
        getChatResponse(question);

      addChatMessage(response, "bot");

    }, 450);

  }


  if (chatSend) {
    chatSend.addEventListener("click", sendChat);
  }


  if (chatInput) {

    chatInput.addEventListener("keydown", event => {

      if (event.key === "Enter") {
        sendChat();
      }

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll("nav a");


  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        current = section.id;
      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") ===
        `#${current}`
      ) {
        link.classList.add("active");
      }

    });

  });


  /* =======================================================
     CLOSE MOBILE MENU ON OUTSIDE CLICK
  ======================================================= */

  document.addEventListener("click", event => {

    if (!navMenu || !menuToggle) return;

    if (
      navMenu.classList.contains("show") &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navMenu.classList.remove("show");
    }

  });


});
