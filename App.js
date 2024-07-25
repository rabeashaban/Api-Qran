var dataAPI = new XMLHttpRequest();
dataAPI.open("GET", "https://api.alquran.cloud/v1/surah", true);
dataAPI.send();

var surahs;

dataAPI.addEventListener("readystatechange", function () {
  if (dataAPI.readyState == 4 && dataAPI.status == 200) {
    surahs = JSON.parse(dataAPI.response).data;
    showDataAPI();
  }
});

function showDataAPI() {
  var show = '<div class="row">';
  surahs.forEach(function (surah) {
    show += `
      <div class="col-md-6 mb-4">
        <h4>${surah.number}. ${surah.name}</h4>
        <p>عدد الآيات: ${surah.numberOfAyahs}</p>
        <button class="btn btn-primary" onclick="getSurah(${surah.number})">عرض السورة</button>
      </div>
    `;
  });
  show += "</div>";
  document.getElementById("posts").innerHTML = show;
}

function getSurah(surahNumber) {
  var surahAPI = new XMLHttpRequest();
  surahAPI.open(
    "GET",
    `https://api.alquran.cloud/v1/surah/${surahNumber}`,
    true
  );
  surahAPI.send();

  surahAPI.addEventListener("readystatechange", function () {
    if (surahAPI.readyState == 4 && surahAPI.status == 200) {
      var surah = JSON.parse(surahAPI.response).data;
      showSurah(surah);
    }
  });
}
function showSurah(surah) {
  var show = `
      <div class="mb-5">
        <h4>${surah.number}. ${surah.name}</h4>
        <p style="margin: 0; padding: 0;">
          ${surah.ayahs
            .map(
              (ayah, index) => `
            <span style="font-size: 16px; display: inline-block;">
              ${ayah.text}<span style="margin-left: 5px;">${index + 1}</span>
            </span>`
            )
            .join("")}
        </p>
      </div>
    `;
  document.getElementById("surahContent").innerHTML = show;

  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
