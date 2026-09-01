/* =========================================================
   TARUN KUMAR PORTFOLIO
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });

    });
}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

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

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "tarun-theme",
            isDark ? "dark" : "light"
        );

        themeToggle.textContent =
            isDark ? "☀️" : "🌙";

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

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


/* =========================================================
   ANIMATED STAT COUNTERS
========================================================= */

const counters =
    document.querySelectorAll("[data-count]");

const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                const target =
                    Number(counter.dataset.count);

                let current = 0;

                const duration = 1200;

                const stepTime =
                    Math.max(
                        Math.floor(duration / target),
                        50
                    );

                const timer =
                    setInterval(() => {

                        current++;

                        counter.textContent =
                            current;

                        if (current >= target) {

                            clearInterval(timer);

                            counter.textContent =
                                target;

                        }

                    }, stepTime);

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.7
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    career: {

        title: "AI Career Guidance Chatbot",

        description:
            "An AI-powered career guidance chatbot designed to help users explore career options and receive useful career-related information. The project focuses on conversational interaction, Artificial Intelligence and Natural Language Processing.",

        technologies: [
            "Python",
            "AI",
            "NLP",
            "NLTK",
            "spaCy"
        ]

    },


    placement: {

        title:
            "Student Placement Prediction System",

        description:
            "A machine-learning based application that uses student-related academic information to predict placement outcomes. The project demonstrates data processing, machine learning and predictive analysis.",

        technologies: [
            "Python",
            "Machine Learning",
            "Pandas",
            "scikit-learn"
        ]

    },


    reservation: {

        title:
            "Reservation System",

        description:
            "A web-based reservation application designed to simplify booking and reservation management through a user-friendly interface and structured data handling.",

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Database"
        ]

    },


    scholarship: {

        title:
            "Scholarship Application Platform",

        description:
            "A digital platform designed to make scholarship applications easier for students by providing a structured interface for submitting and managing application information.",

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Database"
        ]

    }

};


/* =========================================================
   PROJECT MODAL
========================================================= */

const projectModal =
    document.getElementById("projectModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalTechnologies =
    document.getElementById("modalTechnologies");


const projectButtons =
    document.querySelectorAll(".project-btn");


projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const projectName =
            button.dataset.project;

        const project =
            projectData[projectName];

        if (!project) {
            return;
        }

        modalTitle.textContent =
            project.title;

        modalDescription.textContent =
            project.description;

        modalTechnologies.innerHTML = "";

        project.technologies.forEach(technology => {

            const tag =
                document.createElement("span");

            tag.textContent =
                technology;

            modalTechnologies.appendChild(tag);

        });

        projectModal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


function closeProjectModal() {

    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("active");

    document.body.style.overflow =
        "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


if (projectModal) {

    projectModal.addEventListener(
        "click",
        event => {

            if (event.target === projectModal) {
                closeProjectModal();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeProjectModal();
        }

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const subject =
                document.getElementById("subject").value.trim();

            const message =
                document.getElementById("message").value.trim();


            if (!name ||
                !email ||
                !subject ||
                !message) {

                formMessage.textContent =
                    "Please fill in all fields.";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                return;

            }


            const mailSubject =
                encodeURIComponent(subject);

            const mailBody =
                encodeURIComponent(
                    `Name: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`
                );


            window.location.href =
                `mailto:tarunsavu@gmail.com` +
                `?subject=${mailSubject}` +
                `&body=${mailBody}`;


            formMessage.textContent =
                "Opening your email application...";

        }
    );

}


/* =========================================================
   CHATBOT
========================================================= */

const chatButton =
    document.getElementById("chatButton");

const chatWindow =
    document.getElementById("chatWindow");

const chatClose =
    document.getElementById("chatClose");

const chatInput =
    document.getElementById("chatInput");

const chatSend =
    document.getElementById("chatSend");

const chatMessages =
    document.getElementById("chatMessages");


/* Open chat */

if (chatButton) {

    chatButton.addEventListener(
        "click",
        () => {

            chatWindow.classList.add("active");

            if (chatInput) {
                chatInput.focus();
            }

        }
    );

}


/* Close chat */

if (chatClose) {

    chatClose.addEventListener(
        "click",
        () => {

            chatWindow.classList.remove("active");

        }
    );

}


/* =========================================================
   CHAT RESPONSES
========================================================= */

function getChatResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
            Hi! 👋 Welcome to Tarun's portfolio.
            How can I help you?
        `;

    }


    if (
        text.includes("skill") ||
        text.includes("technology") ||
        text.includes("tech")
    ) {

        return `
            Tarun works with C, Python, Java,
            JavaScript, HTML, CSS, React,
            Node.js, Express.js, MongoDB,
            REST APIs and AI/ML technologies.
        `;

    }


    if (
        text.includes("project") ||
        text.includes("projects")
    ) {

        return `
            Tarun has worked on an AI Career
            Guidance Chatbot, Student Placement
            Prediction System, Reservation System
            and Scholarship Application Platform.
        `;

    }


    if (
        text.includes("experience") ||
        text.includes("internship")
    ) {

        return `
            Tarun has internship experience in
            MERN Full Stack Development, Software
            Development and Web Development &
            Designing through OIBSIP.
        `;

    }


    if (
        text.includes("education") ||
        text.includes("degree") ||
        text.includes("college")
    ) {

        return `
            Tarun completed his BCA at Sri Aditya
            Degree College with a CGPA of 7.81/10.
        `;

    }


    if (
        text.includes("certificate") ||
        text.includes("certification")
    ) {

        return `
            Certifications include Python Essentials,
            C Programming, Microsoft Azure Fundamentals,
            HTML5 Application Development, AI & Machine
            Learning and MePro English Language
            Proficiency.
        `;

    }


    if (
        text.includes("oibsip") ||
        text.includes("oasis") ||
        text.includes("task")
    ) {

        return `
            Tarun completed three OIBSIP Level 1
            projects: Landing Page, Personal Portfolio
            and Temperature Converter.
        `;

    }


    if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("phone")
    ) {

        return `
            You can contact Tarun at
            tarunsavu@gmail.com or
            +91 7569786175.
        `;

    }


    if (
        text.includes("linkedin")
    ) {

        return `
            You can connect with Tarun on LinkedIn
            using the LinkedIn link in the Contact
            section.
        `;

    }


    if (
        text.includes("github")
    ) {

        return `
            Tarun's GitHub profile is available through
            the GitHub link in the Contact section.
        `;

    }


    if (
        text.includes("hire") ||
        text.includes("job") ||
        text.includes("opportunity")
    ) {

        return `
            Tarun is interested in software development,
            full-stack development and related
            technology opportunities.
        `;

    }


    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {

        return `
            You're welcome! 😊
        `;

    }


    return `
        I'm not sure about that yet. You can ask me
        about Tarun's skills, projects, internships,
        education, certifications, OIBSIP tasks
        or contact details.
    `;

}


/* =========================================================
   ADD CHAT MESSAGE
========================================================= */

function addChatMessage(
    message,
    sender
) {

    if (!chatMessages) {
        return;
    }

    const messageElement =
        document.createElement("div");

    messageElement.className =
        `message ${sender}`;

    messageElement.innerHTML =
        message;

    chatMessages.appendChild(
        messageElement
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   SEND CHAT MESSAGE
========================================================= */

function sendChatMessage() {

    if (!chatInput) {
        return;
    }

    const message =
        chatInput.value.trim();


    if (!message) {
        return;
    }


    addChatMessage(
        message,
        "user"
    );


    chatInput.value = "";


    setTimeout(() => {

        const response =
            getChatResponse(message);

        addChatMessage(
            response,
            "bot"
        );

    }, 500);

}


/* Send button */

if (chatSend) {

    chatSend.addEventListener(
        "click",
        sendChatMessage
    );

}


/* Enter key */

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendChatMessage();

            }

        }
    );

}


/* =========================================================
   QUICK CHAT QUESTIONS
========================================================= */

const quickQuestions =
    document.querySelectorAll(
        ".quick-questions button"
    );


quickQuestions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const question =
                button.dataset.question;


            const questions = {

                skills:
                    "What are Tarun's skills?",

                projects:
                    "What projects has Tarun built?",

                experience:
                    "Tell me about Tarun's experience.",

                contact:
                    "How can I contact Tarun?"

            };


            const selectedQuestion =
                questions[question];


            if (!selectedQuestion) {
                return;
            }


            addChatMessage(
                selectedQuestion,
                "user"
            );


            setTimeout(() => {

                addChatMessage(
                    getChatResponse(
                        selectedQuestion
                    ),
                    "bot"
                );

            }, 400);

        }
    );

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =========================================================
   SMOOTH BUTTON FEEDBACK
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            document
                .querySelector(targetId)
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
