var myCarousel = new bootstrap.Carousel(
  document.querySelector("#testimonialCarousel"),
  {
    interval: false, // Stop auto-sliding to let users read full text
    pause: "hover",
    ride: false,
  }
);

// ✅ Contact Form Submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let btn = document.getElementById("button");
    btn.value = "Sending...";

    const serviceID = "service_utu6exs";
    const templateID = "template_9cizm4m";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Email";
        Swal.fire({
            text: "Message sent! We’re on it and will get back to you shortly.",
            icon: "success",
            confirmButtonColor: "#97a884 "
          });      },
      (err) => {
        btn.value = "Send Email";
        alert("Error sending message: " + JSON.stringify(err));
      }
    );
  });

// ✅ Newsletter Subscription Form Submission (Fixed)
document
  .getElementById("subscribe-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let subscribeBtn = document.querySelector("#subscribe-form button");
    subscribeBtn.innerText = "Subscribing...";
    subscribeBtn.disabled = true;

    const serviceID = "service_utu6exs";
    const templateID = "template_j182v9q";

    const userEmail = document.getElementById("newsletter").value;

    const templateParams = {
      newsletter: userEmail, // Match this with your EmailJS template variable
    };

    emailjs.send(serviceID, templateID, templateParams).then(
      () => {
        alert("You've successfully subscribed to our newsletter!");
        subscribeBtn.innerText = "Subscribe";
        subscribeBtn.disabled = false;
        document.getElementById("subscribe-form").reset(); // Clear the input field
      },
      (err) => {
        alert("Subscription failed: " + JSON.stringify(err));
        subscribeBtn.innerText = "Subscribe";
        subscribeBtn.disabled = false;
      }
    );
  });
