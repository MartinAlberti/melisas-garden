

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

