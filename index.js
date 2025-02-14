const timezones = [
  { value: "", text: "--Please choose an option--" },
  { value: "-12", text: "AoE - Anywhere on Earth (UTC -12)" },
  { value: "-11", text: "SST - Samoa Standard Time (UTC -11)" },
  { value: "-10", text: "HST - Hawaii Standard Time (UTC -10)" },
  { value: "-9", text: "AKST - Alaska Standard Time (UTC -9)" },
  { value: "-8", text: "PST - Pacific Standard Time (UTC -8)" },
  { value: "-7", text: "MST - Mountain Standard Time (UTC -7)" },
  { value: "-6", text: "CST - Central Standard Time (UTC -6)" },
  { value: "-5", text: "EST - Eastern Standard Time (UTC -5)" },
  { value: "-4", text: "AST - Atlantic Standard Time (UTC -4)" },
  { value: "-3", text: "BRT - Brazil Time (UTC -3)" },
  { value: "-2", text: "FNT - Fernando de Noronha Time (UTC -2)" },
  { value: "-1", text: "CVT - Cape Verde Time (UTC -1)" },
  { value: "0", text: "GMT - Greenwich Mean Time (UTC 0)" },
  { value: "1", text: "CET - Central European Time (UTC +1)" },
  { value: "2", text: "EET - Eastern European Time (UTC +2)" },
  { value: "3", text: "MSK - Moscow Standard Time (UTC +3)" },
  { value: "3.5", text: "IRST - Iran Standard Time (UTC +3.5)" },
  { value: "4", text: "GST - Gulf Standard Time (UTC +4)" },
  { value: "4.5", text: "AFT - Afghanistan Time (UTC +4.5)" },
  { value: "5", text: "PKT - Pakistan Standard Time (UTC +5)" },
  { value: "5.5", text: "IST - Indian Standard Time (UTC +5.5)" },
  { value: "5.75", text: "NPT - Nepal Time (UTC +5.75)" },
  { value: "6", text: "BST - Bangladesh Standard Time (UTC +6)" },
  { value: "6.5", text: "MMT - Myanmar Time (UTC +6.5)" },
  { value: "7", text: "ICT - Indochina Time (UTC +7)" },
  { value: "8", text: "CST - China Standard Time (UTC +8)" },
  { value: "9", text: "JST - Japan Standard Time (UTC +9)" },
  { value: "9.5", text: "ACST - Australian Central Standard Time (UTC +9.5)" },
  { value: "10", text: "AEST - Australian Eastern Standard Time (UTC +10)" },
  { value: "11", text: "SBT - Solomon Islands Time (UTC +11)" },
  { value: "12", text: "NZST - New Zealand Standard Time (UTC +12)" },
  { value: "13", text: "TOT - Tonga Time (UTC +13)" },
  { value: "14", text: "LINT - Line Islands Time (UTC +14)" },
];

let select = document.createElement("select");
select.id = "timezone1";
select.required = true;
let select2 = document.createElement("select");
select2.id = "timezone2";
select2.required = true;
timezones.forEach((option) => {
  let optionElement1 = document.createElement("option");
  optionElement1.value = option.value;
  optionElement1.textContent = option.text;
  select.appendChild(optionElement1);

  let clonedOption = optionElement1.cloneNode(true);
  select2.appendChild(clonedOption);
});
document.getElementById("container1").appendChild(select);
document.getElementById("container2").appendChild(select2);

function loop() {
  let date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hour = date.getHours();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.getElementById("time").innerHTML =
    hour + " : " + minutes + " : " + seconds;

  requestAnimationFrame(loop);
}

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let timezone1 = document.getElementById("timezone1").value;
  let timezone2 = document.getElementById("timezone2").value;
  let time = document.getElementById("input").value;
  let timeArr = time.split(":");
  let timeZ1 = timezone1.split(".");
  let timeZ2 = timezone2.split(".");

  let outputH =
    parseFloat(timeArr[0]) + (parseFloat(-timeZ1[0]) + parseFloat(timeZ2[0]));
  let outputM;
  timeArr[1] = parseFloat(timeArr[1]);
  if (timeZ2[1] != null && timeZ1[1] != null) {
    timeZ1[1] = parseFloat("0." + timeZ1[1]);
    timeZ2[1] = parseFloat("0." + timeZ2[1]);
    outputM = parseFloat(timeArr[1] + 60 * timeZ2[1] - 60 * timeZ1[1]);
  } else if (timeZ2[1] != null) {
    timeZ2[1] = parseFloat("0." + timeZ2[1]);
    outputM = parseFloat(timeArr[1] + 60 * timeZ2[1]);
  } else if (timeZ1[1] != null) {
    timeZ1[1] = parseFloat("0." + timeZ1[1]);
    outputM = parseFloat(timeArr[1] - 60 * timeZ1[1]);
  } else {
    outputM = parseFloat(timeArr[1]);
  }
  const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturtday",
    7: "Sunday",
  };

  let date = new Date();
  let day = date.getDay();

  if (outputM >= 60) {
    outputH += 1;
    outputM -= 60;
  }
  if (outputM < 0) {
    outputH -= 1;
    outputM += 60;
  }
  if (outputH < 0) {
    day -= 1;
    outputH = 24 + outputH;
  }
  if (outputH >= 24) {
    day += 1;
    outputH -= 24;
  }

  if (outputH < 10) {
    outputH = "0" + outputH;
  }
  if (outputM < 10) {
    outputM = "0" + outputM;
  }
  document.getElementById("timez1").innerHTML = days[day];
  document.getElementById("timez2").innerHTML = outputH + " : " + outputM;
});

loop();
