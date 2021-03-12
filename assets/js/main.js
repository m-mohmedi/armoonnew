function renderPage(data) {
  var template = document.body.innerHTML;
  var rendered = mustache.render(template, data);
  document.body.innerHTML = rendered;
}

document.addEventListener("DOMContentLoaded", () => {
  let language = "fa";
  switch (window.location.hash) {
    case "#en":
      language = "en";
      break;

    case "#ar":
      language = "ar";
      break;
  }

  fetch("./api/language.json")
    .then((res) => res.json())
    .then((data) => {
      const api = { ...data[language], social: data.social };

      fetch("./api/resume.json")
        .then((res) => res.json())
        .then((resume) => {
          renderPage({ ...api, resume });
        });
    });
});

window.addEventListener("hashchange", () => window.location.reload());
