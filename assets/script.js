
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

// document.getElementById("write").addEventListener("click", async () => {
//   log("writeLog", "User clicked write button");

//   try {
//     const ndef = new NDEFReader();
//     await ndef.write("Hello Office of the CTO!");
//     log("writeLog", "> Text Message written");
//   } catch (error) {
//     log("writeLog", "Argh! " + error);
//   }
// });

// document.getElementById("writeUrl").addEventListener("click", async () => {
//   log("writeUrlLog", "User clicked write button");

//   const ndef = new NDEFReader();
//   try {
//     await ndef.write({
//       records: [{ recordType: "url", data: "https://cxlabs.sap.com" }]
//     });
//     log("writeUrlLog", "> URl Message written");
//   } catch {
//     log("writeUrlLog", "Argh! " + error);
//   }
// });

// document.getElementById("writeApp").addEventListener("click", async () => {
//   log("writeAppLog", "User clicked write button");

//   const ndef = new NDEFReader();
//   try {
//     const aarRecord = {
//       recordType: "android.com:pkg",
//       data: encoder.encode("de.rki.coronawarnapp")
//     };

//     await ndef.write({
//       records: [aarRecord]
//     });
//     log("writeAppLog", "> App Message written");
//   } catch {
//     log("writeAppLog", "Argh! " + error);
//   }
// });


var locationDisplay = getElementById("location-coordinates");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("location-coordinates").setAttribute('value', "Geoloacation is not supported by this browser");
  }
}


function showPosition(position) {
  
  document.getElementById("location-coordinates").setAttribute('value', "Latitude: " + position.coords.latitude +
  "Longitude: " + position.coords.longitude);
  
}


function dateStamp() {
  document.getElementById('todays-date').valueAsDate = new Date();
}

function timeStamp() {
const now = new Date();
const current = now.getHours() + ":" + now.getMinutes();
document.getElementById("time-stamp").value = current;
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
      if (serialNumber = "c2:5f:2d:5e") {
        log("readLog", "Fuck Yes string !!!!")
        document.getElementById("serial-number").setAttribute('value', serialNumber);
        document.getElementById("location-coordinates").setAttribute('value', serialNumber);
        
      } else {
        log("readLog", "Didn't work")
        document.getElementById("serial-number").setAttribute('value', serialNumber);
      };
      

      // const decoder = new TextDecoder();
      // for (const record of message.records) {
      //   switch (record.recordType) {
      //     case "text":
      //       const textDecoder = new TextDecoder(record.encoding);
      //       log(
      //         "readLog",
      //         `Text: ${textDecoder.decode(record.data)} (${record.lang})`
      //       );
      //       break;
      //     case "url":
      //       log("readLog", `URL: ${decoder.decode(record.data)}`);
      //       break;
      //     case "mime":
      //       if (record.mediaType === "application/json") {
      //         log(
      //           "readLog",
      //           `JSON: ${JSON.parse(decoder.decode(record.data))}`
      //         );
      //       } else {
      //         log("readLog", `Media not handled`);
      //       }
      //       break;
      //     default:
      //       log("readLog", `Record not handled`);
      //   }
      // }
    });
  } catch (error) {
    log("readLog", "Argh! " + error);
  }
});
