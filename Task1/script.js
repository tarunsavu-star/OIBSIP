// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");

    menuToggle.textContent =
        navLinks.classList.contains("mobile-open") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        menuToggle.textContent = "☰";
    });
});


// ================= SCROLL ANIMATION =================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
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


// ================= ANIMATED COUNTERS =================

const counters = document.querySelectorAll("[data-target]");

let countersStarted = false;

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !countersStarted) {

                countersStarted = true;

                counters.forEach(counter => {

                    const target =
                        Number(counter.getAttribute("data-target"));

                    let current = 0;

                    const increment =
                        Math.max(1, Math.ceil(target / 60));

                    const updateCounter = () => {

                        current += increment;

                        if (current >= target) {
                            current = target;
                        }

                        counter.textContent = current;

                        if (current < target) {
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    updateCounter();

                });

            }

        });

    },
    {
        threshold: 0.5
    }
);

const statsSection = document.querySelector(".stats-section");

if (statsSection) {
    counterObserver.observe(statsSection);
}


// ================= SERVICE MODAL =================

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const serviceInformation = {

    "Web Design": {
        title: "Web Design",
        text: "We create modern, responsive and user-focused website experiences.",
        items: [
            "UI / UX Design",
            "Responsive layouts",
            "Wireframes",
            "Interactive prototypes",
            "Design systems",
            "Conversion-focused interfaces"
        ]
    },

    "Development": {
        title: "Web Development",
        text: "We transform designs into fast, responsive and functional digital experiences.",
        items: [
            "HTML5 and CSS3",
            "JavaScript development",
            "Responsive websites",
            "Performance optimization",
            "Frontend architecture",
            "Deployment"
        ]
    },

    "Brand Strategy": {
        title: "Brand Strategy",
        text: "We help businesses build a clear and consistent digital identity.",
        items: [
            "Brand identity",
            "Visual direction",
            "Content strategy",
            "Digital positioning",
            "Brand guidelines",
            "Communication strategy"
        ]
    },

    "SEO & Growth": {
        title: "SEO & Growth",
        text: "We improve website visibility, discoverability and long-term digital performance.",
        items: [
            "Technical SEO",
            "Website performance",
            "Content planning",
            "Analytics",
            "Search optimization",
            "Growth strategy"
        ]
    },

    "UI / UX": {
        title: "UI / UX Design",
        text: "We design interfaces around real users and practical business goals.",
        items: [
            "User research",
            "Wireframes",
            "User flows",
            "Interactive prototypes",
            "Usability testing",
            "Design systems"
        ]
    },

    "Maintenance": {
        title: "Website Maintenance",
        text: "We help keep websites updated, secure and performing well after launch.",
        items: [
            "Content updates",
            "Performance monitoring",
            "Security checks",
            "Bug fixes",
            "Technical support",
            "Continuous improvements"
        ]
    }

};


document.querySelectorAll(".learn-more").forEach(button => {

    button.addEventListener("click", () => {

        const service =
            button.getAttribute("data-service");

        const information =
            serviceInformation[service];

        if (!information) return;

        modalTitle.textContent = information.title;

        modalBody.innerHTML = `
            <p>${information.text}</p>

            <ul>
                ${information.items
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>
        `;

        modal.classList.add("open");

        document.body.classList.add("modal-open");

    });

});


closeModal.addEventListener("click", () => {

    modal.classList.remove("open");

    document.body.classList.remove("modal-open");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {

        modal.classList.remove("open");

        document.body.classList.remove("modal-open");

    }

});


// ================= CASE STUDIES =================

const caseStudies = {

    "FinanceFlow": {
        title: "FinanceFlow",
        description:
            "A modern financial dashboard concept designed to make complex information easier to understand.",
        results: [
            "92% UX score",
            "94% performance score",
            "Responsive dashboard experience",
            "Clear data visualization"
        ]
    },

    "Northline": {
        title: "Northline",
        description:
            "A premium e-commerce concept focused on product discovery and a smooth customer journey.",
        results: [
            "Improved product discovery",
            "Responsive shopping experience",
            "Conversion-focused interface",
            "Mobile-first approach"
        ]
    },

    "CloudDesk": {
        title: "CloudDesk",
        description:
            "A SaaS productivity platform concept focused on simplicity, organization and collaboration.",
        results: [
            "Simple navigation",
            "Clean dashboard interface",
            "Responsive application layout",
            "User-focused experience"
        ]
    }

};


document.querySelectorAll(".case-study").forEach(button => {

    button.addEventListener("click", () => {

        const project =
            button.getAttribute("data-project");

        const information =
            caseStudies[project];

        if (!information) return;

        modalTitle.textContent =
            information.title;

        modalBody.innerHTML = `
            <p>${information.description}</p>

            <h3>Project Highlights</h3>

            <ul>
                ${information.results
                    .map(result => `<li>${result}</li>`)
                    .join("")}
            </ul>
        `;

        modal.classList.add("open");

        document.body.classList.add("modal-open");

    });

});


// ================= FAQ =================

document.querySelectorAll(".faq-question").forEach(question => {

    question.addEventListener("click", () => {

        const item =
            question.parentElement;

        const answer =
            item.querySelector(".faq-answer");

        const isActive =
            item.classList.contains("active");


        document.querySelectorAll(".faq-item").forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                otherItem.querySelector(".faq-answer").style.maxHeight =
                    null;
            }

        });


        if (isActive) {

            item.classList.remove("active");

            answer.style.maxHeight = null;

        } else {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


// ================= WORK WITH US FORM =================

const projectForm =
    document.getElementById("projectForm");

const formMessage =
    document.getElementById("formMessage");


projectForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const service =
        document.getElementById("service").value;

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !service || !message) {

        formMessage.textContent =
            "Please complete all required fields.";

        return;

    }


    formMessage.textContent =
        `Thanks ${name}! Your project enquiry has been received.`;

    projectForm.reset();

});


// ================= CHAT =================

const chatButton =
    document.getElementById("chatButton");

const chatWindow =
    document.getElementById("chatWindow");

const openChat =
    document.getElementById("openChat");

const closeChat =
    document.getElementById("closeChat");

const sendChat =
    document.getElementById("sendChat");

const chatInput =
    document.getElementById("chatInput");

const chatMessages =
    document.getElementById("chatMessages");


function openChatWindow() {

    chatWindow.classList.add("open");

    chatInput.focus();

}


function closeChatWindow() {

    chatWindow.classList.remove("open");

}


chatButton.addEventListener(
    "click",
    openChatWindow
);


openChat.addEventListener(
    "click",
    openChatWindow
);


closeChat.addEventListener(
    "click",
    closeChatWindow
);


// ================= CHAT RESPONSES =================

function getChatResponse(question) {

    const text =
        question.toLowerCase();


    if (
        text.includes("service") ||
        text.includes("services")
    ) {

        return `
            We provide Web Design, Development,
            UI/UX Design, Brand Strategy,
            SEO & Growth and Website Maintenance.
        `;

    }


    if (
        text.includes("price") ||
        text.includes("pricing") ||
        text.includes("cost")
    ) {

        return `
            Project pricing depends on the scope,
            features and timeline. Use the
            Work With Us form to describe your project
            and request a project discussion.
        `;

    }


    if (
        text.includes("process") ||
        text.includes("how")
    ) {

        return `
            Our process includes Discovery, Strategy,
            Design, Development, Testing and Launch.
        `;

    }


    if (
        text.includes("design")
    ) {

        return `
            Our web design service focuses on
            responsive layouts, UI/UX, prototypes
            and user-focused experiences.
        `;

    }


    if (
        text.includes("development") ||
        text.includes("developer") ||
        text.includes("website")
    ) {

        return `
            Our development service covers responsive
            websites, JavaScript functionality,
            performance optimization and deployment.
        `;

    }


    if (
        text.includes("contact") ||
        text.includes("email")
    ) {

        return `
            You can use the Contact section or
            the Work With Us form to start a project.
        `;

    }


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
            Hello! 👋 How can I help you?
            You can ask me about our services,
            pricing, process or starting a project.
        `;

    }


    return `
        I can help with questions about our
        services, web design, development,
        pricing, process and project enquiries.
    `;

}


function addChatMessage(
    text,
    type
) {

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


function sendMessage() {

    const question =
        chatInput.value.trim();

    if (!question) return;


    addChatMessage(
        question,
        "user"
    );


    chatInput.value = "";


    setTimeout(() => {

        const response =
            getChatResponse(question);

        addChatMessage(
            response,
            "bot"
        );

    }, 500);

}


sendChat.addEventListener(
    "click",
    sendMessage
);


chatInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


// ================= QUICK CHAT OPTIONS =================

document.querySelectorAll(
    ".quick-options button"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const question =
                button.getAttribute(
                    "data-question"
                );


            const questions = {

                services:
                    "What services do you provide?",

                pricing:
                    "What is your pricing?",

                process:
                    "What is your process?",

                contact:
                    "How can I contact you?"

            };


            const message =
                questions[question];


            addChatMessage(
                message,
                "user"
            );


            setTimeout(() => {

                addChatMessage(
                    getChatResponse(message),
                    "bot"
                );

            }, 500);

        }
    );

});


// ================= ESCAPE KEY =================

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            modal.classList.remove("open");

            document.body.classList.remove(
                "modal-open"
            );

            closeChatWindow();

        }

    }
);


// ================= CONSOLE MESSAGE =================

console.log(
    "Nexora Task 1 loaded successfully."
);
