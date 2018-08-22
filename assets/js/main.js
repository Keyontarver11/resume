const sendbtn = document.getElementById("sendbutton");

sendbtn.onclick = function(e) {
  e.preventDefault();

  fetch("http://ktarver.techlaunch.io:8000", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      from: document.getElementById("from").value,
      destination: document.getElementById("destination").value,
      subject: document.getElementById("subject").value
    })
  })
    .then(result => result.json())
    .then(result => {
      document.getElementById("message").innerHTML = result.message;
    })
    .catch(err => {
      document.getElementById("message").innerHTML = err.message;
    });
};
