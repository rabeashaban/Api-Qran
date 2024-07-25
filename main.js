var dataAPI = new XMLHttpRequest();
dataAPI.open(
  "GET",
  "https://api.alquran.cloud/v1/surah",
  true
);
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
  surahs.forEach(function(surah) {
    show += `
      <div class="col-md-3">
        <h4>${surah.number}. ${surah.name}</h4>
        <p>عدد الآيات: ${surah.numberOfAyahs}</p>
        <p>نوع الوحي: ${surah.revelationType === 'Meccan' ? 'مكي' : 'مدني'}</p>
      </div>
    `;
  });
  show += '</div>';
  document.getElementById("posts").innerHTML = show;
}
