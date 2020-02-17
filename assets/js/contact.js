function sendForm() {

  let db = firebase.firestore()

  let name = document.forms["contactForm"]["name"];
  let email = document.forms["contactForm"]["email"];
  let message = document.forms["contactForm"]["message"];

  const mailformat = /^\w+[\.-]?\w+@\w+[\.-]?\w+\.\w{2,3}$/;

  const el = document.getElementById("snackbar");
  if (name.value === '') {
    document.getElementById('text_warning').innerHTML = 'The name is required';
    el.className = "show";
    setTimeout(function () { el.className = el.className.replace("show", ""); }, 3000);
    name.focus();
    return false;
  }

  if (email.value === '') {
    document.getElementById('text_warning').innerHTML = 'The email is required';
    el.className = "show";
    setTimeout(function () { el.className = el.className.replace("show", ""); }, 3000);
    email.focus();
    return false;
  }
  if (!email.value.match(mailformat)) {
    document.getElementById('text_warning').innerHTML = 'the email format is not accepted';
    el.className = "show";
    setTimeout(function () { el.className = el.className.replace("show", ""); }, 3000);
    email.focus();
    return false;
  }

  if (message.value === '') {
    document.getElementById('text_warning').innerHTML = 'The message is required';
    el.className = "show";
    setTimeout(function () { el.className = el.className.replace("show", ""); }, 3000);
    message.focus();
    return false;
  }


  db.collection('messages').add({
    name: name.value,
    email: email.value,
    message: message.value,
    fecha: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(refDoc => {
      name.value = '';
      email.value = '';
      message.value = '';

      const el_success = document.getElementById("snackbar_success");
      document.getElementById('text_success').innerHTML = 'I received your message, thank you!';
      el_success.className = "show";
      setTimeout(function () { el_success.className = el_success.className.replace("show", ""); }, 3000);

    })
    .catch(error => {
      const el_danger = document.getElementById("snackbar_success");
      document.getElementById('text_danger').innerHTML = '¡Ups! try again or write me to i@jheison.com';
      el_danger.className = "show";
      setTimeout(function () { el_danger.className = el_danger.className.replace("show", ""); }, 3000);
    })
}
