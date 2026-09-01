// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("mobile-open");

        menuToggle.textContent =
            navLinks.classList.contains("mobile-open")
                ? "✕"
                : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("mobile-open");
            menuToggle.textContent = "☰";
        });
    });
}


// ================= DARK / LIGHT MODE =================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("tarun-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const darkMode =
            document.body.classList.contains("dark");

        themeToggle.textContent =
            darkMode ? "☀️" : "🌙";

        localStorage.setItem(
            "tarun-theme",
            darkMode ? "dark" : "light"
        );

    });
}


// ================= SCROLL REVEAL =================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

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


// ================= ANIMATED STATS =================

const counters =
    document.querySelectorAll("[data-target]");

function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    const isDecimal =
        String(target).includes(".");

    let current = 0;

    const duration = 1600;

    const startTime = performance.now();

    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const eased =
            1 - Math.pow(1 - progress, 3);

        current = target * eased;

        counter.textContent =
            isDecimal
                ? current.toFixed(2)
                : Math.floor(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent =
                isDecimal
                    ? target.toFixed(2)
                    : target;
        }

    }

    requestAnimationFrame(update);
}


const statsSection =
    document.querySelector(".stats-section");

let statsAnimated = false;

if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0].isIntersecting &&
                    !statsAnimated
                ) {

                    statsAnimated = true;

                    counters.forEach(
                        animateCounter
                    );

                    statsObserver.disconnect();
                }

            },
            {
                threshold: 0.3
            }
        );

    statsObserver.observe(statsSection);
}


// ================= PROJECT DETAILS =================

const projectData = {

    "AI Career Guidance Chatbot": {

        number: "PROJECT 01",

        description:
            "A full-stack AI career guidance chatbot designed to provide personalized career recommendations using Natural Language Processing.",

        technologies: [
            "Flask",
            "scikit-learn",
            "NLTK",
            "spaCy",
            "SQLite",
            "REST API"
        ]

    },

    "Student Placement Prediction System": {

        number: "PROJECT 02",

        description:
            "A machine learning application using Random Forest to predict student placement outcomes based on student-related data.",

        technologies: [
            "Python",
            "Pandas",
            "scikit-learn",
            "Random Forest",
            "Tkinter"
        ]

    },

    "Reservation System": {

        number: "PROJECT 03",

        description:
            "A government-style online train reservation booking application developed as a hackathon project.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ]

    },

    "Scholarship Application Platform": {

        number: "PROJECT 04",

        description:
            "A scholarship application platform with an AI chatbot designed to guide students through the application process.",

        technologies: [
            "AI Chatbot",
            "GitHub",
            "Web Development"
        ]

    }

};


const projectModal =
    document.getElementById("projectModal");

const closeProjectModal =
    document.getElementById("closeProjectModal");

const modalProjectNumber =
    document.getElementById("modalProjectNumber");

const modalProjectTitle =
    document.getElementById("modalProjectTitle");

const modalProjectDescription =
    document.getElementById(
        "modalProjectDescription"
    );

const modalProjectTech =
    document.getElementById("modalProjectTech");


document
    .querySelectorAll(".project-details")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const project =
                    button.dataset.project;

                const data =
                    projectData[project];

                if (!data) return;

                modalProjectNumber.textContent =
                    data.number;

                modalProjectTitle.textContent =
                    project;

                modalProjectDescription.textContent =
                    data.description;

                modalProjectTech.innerHTML =
                    data.technologies
                        .map(
                            technology =>
                                `<span>${technology}</span>`
                        )
                        .join("");

                projectModal.classList.add("open");

                document.body.style.overflow =
                    "hidden";

            }
        );

    });


function closeModal() {

    projectModal.classList.remove("open");

    document.body.style.overflow = "";

}


if (closeProjectModal) {
    closeProjectModal.addEventListener(
        "click",
        closeModal
    );
}


if (projectModal) {

    projectModal.addEventListener(
        "click",
        event => {

            if (
                event.target === projectModal
            ) {
                closeModal();
            }

        }
    );

}


// ================= KEYBOARD ESCAPE =================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (
                projectModal &&
                projectModal.classList.contains("open")
            ) {
                closeModal();
            }

            if (
                chatWindow &&
                chatWindow.classList.contains("open")
            ) {
                closeChatWindow();
            }

        }

    }
);


// ================= CONTACT FORM =================

const contactForm =
    document.getElementById("contactForm");

const contactStatus =
    document.getElementById("contactStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();

            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();

            const subject =
                document.getElementById(
                    "contactSubject"
                ).value.trim();

            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                contactStatus.textContent =
                    "Please complete all fields.";

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                contactStatus.textContent =
                    "Please enter a valid email address.";

                return;

            }


            contactStatus.textContent =
                "Message details validated successfully. You can contact Tarun directly using the email button above.";


            contactForm.reset();

        }
    );

}


// ================= PORTFOLIO CHAT =================

const chatButton =
    document.getElementById("chatButton");

const chatWindow =
    document.getElementById("chatWindow");

const closeChat =
    document.getElementById("closeChat");

const chatInput =
    document.getElementById("chatInput");

const sendChat =
    document.getElementById("sendChat");

const chatMessages =
    document.getElementById("chatMessages");


function openChatWindow() {

    if (!chatWindow) return;

    chatWindow.classList.add("open");

    if (chatInput) {
        chatInput.focus();
    }

}


function closeChatWindow() {

    if (!chatWindow) return;

    chatWindow.classList.remove("open");

}


if (chatButton) {

    chatButton.addEventListener(
        "click",
        openChatWindow
    );

}


if (closeChat) {

    closeChat.addEventListener(
        "click",
        closeChatWindow
    );

}


// ================= CHAT ANSWERS =================

function getChatResponse(question) {

    const text =
        question.toLowerCase();


    if (
        text.includes("skill") ||
        text.includes("technology") ||
        text.includes("technologies")
    ) {

        return (
            "Tarun's technical skills include C, Python, Java, " +
            "JavaScript, HTML5, CSS3, React, Node.js, Express.js, " +
            "MongoDB, REST APIs, AI/ML, software testing, Git/GitHub, " +
            "Linux and Azure Fundamentals."
        );

    }


    if (
        text.includes("project") ||
        text.includes("projects")
    ) {

        return (
            "Tarun has worked on four main projects: " +
            "AI Career Guidance Chatbot, Student Placement " +
            "Prediction System, Reservation System and " +
            "Scholarship Application Platform."
        );

    }


    if (
        text.includes("experience") ||
        text.includes("internship") ||
        text.includes("intern")
    ) {

        return (
            "Tarun completed internships at ADHOC Network as a " +
            "MERN Full Stack Development Intern and at Vidrutha " +
            "Solutions as a Software Development Intern."
        );

    }


    if (
        text.includes("education") ||
        text.includes("degree") ||
        text.includes("bca")
    ) {

        return (
            "Tarun is pursuing/completed a Bachelor of Computer " +
            "Applications (BCA) at Sri Aditya Degree College, " +
            "with a CGPA of 7.81/10."
        );

    }


    if (
        text.includes("certification") ||
        text.includes("certificate")
    ) {

        return (
            "Tarun has six certifications covering Python, C " +
            "Programming, Microsoft Azure Fundamentals, HTML5, " +
            "AI & Machine Learning and English Language Proficiency."
        );

    }


    if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("phone")
    ) {

        return (
            "You can contact Tarun at tarunsavu@gmail.com " +
            "or call +91 7569786175. LinkedIn and GitHub " +
            "links are also available in the portfolio."
        );

    }


    if (
        text.includes("oibsip") ||
        text.includes("task")
    ) {

        return (
            "The OIBSIP section contains direct links to " +
            "Tarun's Task 1 Landing Page, Task 2 Personal " +
            "Portfolio and Task 3 Temperature Converter."
        );

    }


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return (
            "Hi! 👋 I'm Tarun's portfolio assistant. " +
            "Ask me about his skills, projects, experience, " +
            "education, certifications or contact details."
        );

    }


    return (
        "I can answer questions about Tarun's skills, " +
        "projects, internships, education, certifications, " +
        "OIBSIP tasks and contact information."
    );

}


// ================= ADD CHAT MESSAGE =================

function addChatMessage(
    text,
    type
) {

    if (!chatMessages) return;

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


// ================= SEND CHAT =================

function sendMessage() {

    if (!chatInput) return;

    const question =
        chatInput.value.trim();

    if (!question) return;


    addChatMessage(
        question,
        "user"
    );

    chatInput.value = "";


    setTimeout(
        () => {

            addChatMessage(
                getChatResponse(question),
                "bot"
            );

        },
        450
    );

}


if (sendChat) {

    sendChat.addEventListener(
        "click",
        sendMessage
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// ================= QUICK CHAT =================

document
    .querySelectorAll(".quick-options button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.question;

                const questions = {

                    skills:
                        "What are Tarun's skills?",

                    projects:
                        "What projects has Tarun built?",

                    experience:
                        "What internship experience does Tarun have?",

                    contact:
                        "How can I contact Tarun?"

                };


                const question =
                    questions[type];

                if (!question) return;


                addChatMessage(
                    question,
                    "user"
                );


                setTimeout(
                    () => {

                        addChatMessage(
                            getChatResponse(question),
                            "bot"
                        );

                    },
                    450
                );

            }
        );

    });


// ================= CURRENT YEAR =================

const yearElements =
    document.querySelectorAll(".current-year");

yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


// ================= PAGE LOADED =================

console.log(
    "Tarun Kumar Portfolio loaded successfully."
);
