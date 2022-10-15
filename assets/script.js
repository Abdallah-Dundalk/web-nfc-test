console.log("ready. go change the world.");

const log = function(id, txt) {
  document.getElementById(id).style.display = "block";
  let p = document.createElement("p");
  p.textContent = txt;
  document.getElementById(id).append(p);
};

document.getElementById("check").onclick = () => {
  if ("NDEFReader" in window) {
    document.getElementById("available").style.display = "block";
  } else {
    document.getElementById("not-available").style.display = "block";
  }

  setTimeout(() => {
    document.getElementById("not-available").style.display = "none";
    document.getElementById("available").style.display = "none";
  }, 3000);
};


var locationDisplay = getElementById("location-coordinates");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("location-coordinates").setAttribute('value', "Geolocation is not supported by this browser");
  }
}


function showPosition(position) {
  
  document.getElementById("location-coordinates").setAttribute('value', "Latitude: " + position.coords.latitude +
  "Longitude: " + position.coords.longitude);
  
}


function timeStamp() {
const now = new Date();
const current = now.getHours() + ":" + now.getMinutes();
document.getElementById("time-stamp").value = current;
document.getElementById('todays-date').valueAsDate = now;
}

document.getElementById("read").addEventListener("click", async () => {
  log("readLog", "User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    log("readLog", "> Scan started");

    ndef.addEventListener("readingerror", () => {
      log(
        "readLog",
        "Argh! Cannot read data from the NFC tag. Try another one?"
      );
    });

    ndef.addEventListener("reading", ({serialNumber }) => {
      log("readLog", `> Go on then: ${serialNumber}`);
      if ({serialNumber }) {
        log("readLog", "time stamp Yes string !!!!")
        document.getElementById("serial-number").setAttribute('value', `${serialNumber }`);
      } else {
        log("readLog", "Didn't work")
        document.getElementById("serial-number").setAttribute('value', `${serialNumber }`);
      };
    });
  } catch (error) {
    log("readLog", "Argh! " + error);
  }
});
