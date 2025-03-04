document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on index.html or workshop.html
  const currentPage = window.location.pathname.split("/").pop();

  // Handle smooth scrolling on index.html
  if (currentPage === "index.html") {
    // If there's a hash in the URL (like #services-container), apply smooth scroll
    const targetHash = window.location.hash;
    if (targetHash) {
      // Wait until the page is fully loaded and then scroll with offset
      setTimeout(function () {
        const targetElement = document.querySelector(targetHash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust the offset as needed
            behavior: 'smooth'
          });

          // Clean the URL by removing the hash after the scroll is done
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
      }, 100); // A short delay to ensure the page is fully loaded
    }

    // Apply smooth scroll on internal navigation
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip smooth scrolling if the link is to workshop.html
        if (href === "workshop.html") return;

        e.preventDefault(); // Prevent default anchor behavior for internal links

        const targetId = href.substring(1); // Get the target section ID (e.g., #services-container)
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust the offset as needed
            behavior: 'smooth'
          });

          // Clean the URL by removing the hash after the scroll is done
          history.pushState("", document.title, window.location.pathname + window.location.search);
        }
      });
    });
  }

  // Handle navigation from workshop.html to index.html and apply scroll offset
  if (currentPage === "workshop.html") {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only handle links that go to index.html sections
        if (href.includes("index.html")) {
          e.preventDefault(); // Prevent default behavior for navigation

          const targetId = href.split("#")[1]; // Extract target section ID (e.g., services-container)

          // Redirect to index.html with the hash for the section
          window.location.href = "index.html#" + targetId;
        }
      });
    });
  }
});

 
// Close the navbar on link click for mobile devices
$('.navbar-nav>li>a').on('click', function() {
  $('.navbar-collapse').collapse('hide');
});

// ✅ Contact Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let btn = document.getElementById("button");
    btn.value = "Sending...";

    const serviceID = "service_gcohg4p";
    const templateID = "template_k1syzme"; // Contact Form Template ID

    const templateParams = {
      from_name: document.getElementById("contact-name").value,
      from_lastname: document.getElementById("contact-last-name").value,
      from_email: document.getElementById("contact-email").value,
      message: document.getElementById("message").value,
    };
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    emailjs.send(serviceID, templateID, templateParams).then(
      () => {
        btn.value = "Send Email";
        Swal.fire({
          text: "Message sent! We’re on it and will get back to you shortly.",
          icon: "success",
          confirmButtonColor: "#97a884 ",
        });
        document.getElementById("contact-form").reset();
      },
      (err) => {
        btn.value = "Send Email";
        alert("Error sending message: " + JSON.stringify(err));
      }
    );
  });

// ✅ Newsletter Subscription Form Submission
document
  .getElementById("subscribe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let subscribeBtn = document.querySelector("#subscribe-btn");
    subscribeBtn.innerText = "Subscribing...";
    subscribeBtn.disabled = true;

    const serviceID = "service_gcohg4p";
    const templateID = "template_1dhi6ao"; // Newsletter Template ID

    const userEmail = document.getElementById("newsletter").value;

    const templateParams = {
      newsletter: userEmail,
    };

    emailjs.send(serviceID, templateID, templateParams).then(
      () => {
        subscribeBtn.innerText = "Subscribed!";

        Swal.fire({
          text: "Subscription successful! You will receive updates soon.",
          icon: "success",
          confirmButtonColor: "#97a884 ",
        });
        document.getElementById("subscribe-form").reset();
        
      },
      (err) => {
        alert("Subscription failed: " + JSON.stringify(err));
        subscribeBtn.innerText = "Subscribe";
        subscribeBtn.disabled = false;
      }
    );
  });

