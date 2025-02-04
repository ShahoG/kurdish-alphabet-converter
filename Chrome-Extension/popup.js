document.addEventListener("DOMContentLoaded", () => {
  // Declare buttons
  const ArabicToYekgirtuButton = document.getElementById("convertToY");
  const ArabicToBedirxaniButton = document.getElementById("convertToB");
  const BedirxaniToYekgirtuButton = document.getElementById("convertBtoY");
  const YekgirtuToBedirxaniButton = document.getElementById("convertYtoB");
  const BedirxaniToArabicButton = document.getElementById("convertBtoA");

  // Execute scripts from clicks on btns
  ArabicToYekgirtuButton.onclick = () => {
    executeScript("scriptY.js");
  };

  ArabicToBedirxaniButton.onclick = () => {
    executeScript("scriptB.js");
  };

  BedirxaniToYekgirtuButton.onclick = () => {
    executeScript("scriptBtoY.js");
  };

  BedirxaniToArabicButton.onclick = () => {
    executeScript("scriptBtoA.js");
  };

  YekgirtuToBedirxaniButton.onclick = () => {
    executeScript("scriptYtoB.js");
  };

  // Add listener for keyboard shorcuts
  document.addEventListener("keyup", (e) => {
    if (e.code === "KeyY") {
      executeScript("scriptY.js");
    } else if (e.code === "KeyB") {
      executeScript("scriptB.js");
    } else if (e.code === "KeyU") {
      executeScript("scriptBtoY.js");
    } else if (e.code === "KeyS") {
      executeScript("scriptBtoA.js");
    }
  });

  // Execute the correct script
  let executeScript = (file) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: [file],
      });
    });
    window.close();
  };
});
