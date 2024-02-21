const horskePrice = 500;
const detskePrice = 200;
const silnicniPrice = 1500;
const gravelPrice = 2500;

const horske = document.querySelector("#horske");
const detske = document.querySelector("#detske");
const silnicni = document.querySelector("#silnicni");
const gravel = document.querySelector("#gravel");

const horskeCount = document.querySelector("#horske-num-input");
const detskeCount = document.querySelector("#detske-num-input");
const silnicniCount = document.querySelector("#silnicni-num-input");
const gravelCount = document.querySelector("#gravel-num-input");

const durationSelect = document.querySelector("#duration-select");

const nosice = document.querySelectorAll("input[type='radio']");

const vypocitanaCena = document.querySelector("#vypocitana-cena");
const nabidkaInput = document.querySelector("#nabidka-input");
const nabidka = document.querySelector("#nabidka");

const email = document.querySelector("#email");
const emailBtn = document.querySelector("#email-btn");
const emailInfo = document.querySelector("#email-info");

let total = 0;

function calculate() {
  total = 0;
  // ------------------ PRICE FOR CYCLES
  if (horske.checked) {
    total += parseInt(horskeCount.value) * horskePrice;
  }
  if (detske.checked) {
    total += parseInt(detskeCount.value) * detskePrice;
  }
  if (silnicni.checked) {
    total += parseInt(silnicniCount.value) * silnicniPrice;
  }
  if (gravel.checked) {
    total += parseInt(gravelCount.value) * gravelPrice;
  }
  //console.log("Cena za pocet a typ kol", total);

  // ------------------ PRICE FOR RENT DURATION

  switch (durationSelect.value) {
    case "1-day":
      // nic
      break;
    case "5-days":
      total = 5 * total;
      break;
    case "2-weeks":
      total = 14 * total;
      break;
    case "month":
      total = 31 * total;
      break;
    default:
      break;
  }
  //console.log("Cena po zapocteni doby pronajmu", total);

  // ------------------ NOSICE
  nosice.forEach((nosic) => {
    if (nosic.checked && nosic.value > 0) {
      total += total * (nosic.value / 100);
    }
  });

  // ------------------ SHOW TOTAL
  vypocitanaCena.innerHTML = `${total} Kč`;
  deal();
}

// ------------------ NABIDKA

nabidkaInput.addEventListener("input", (e) => {
  deal();
});

function deal() {
  if (total == 0) {
    nabidka.innerHTML = "Vyberte kola.";
  } else if (nabidkaInput.value == 0) {
    nabidka.innerHTML = "Zadejte castku.";
  } else {
    let rozdil = Math.abs(total - nabidkaInput.value);
    console.log(rozdil);
    console.log(total * 0.25);

    if (nabidkaInput.value > total) {
      nabidka.innerHTML = "😍 Fakt nam chcete dat vice?";
    } else {
      if (rozdil < total * 0.25) {
        nabidka.innerHTML = "👌 Takovou slevu vam muzeme poskytnout.";
      } else {
        nabidka.innerHTML = "❌ Takovou slevu dat nemuzeme.";
      }
    }
  }
}

// ------------------ EMAIL

email.addEventListener("input", () => {
  let address = email.value;

  if (address.includes("@") && address.includes(".")) {
    emailInfo.setAttribute("hidden", "");
    emailBtn.removeAttribute("disabled");
  } else {
    emailBtn.setAttribute("disabled", "");
    emailInfo.removeAttribute("hidden");
  }
});

// ------------------ SEND

function send() {
  alert("Objednavka poslana");
}
