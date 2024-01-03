const statusEl = document.getElementById("status");
const dataEl = document.getElementById("data");
const headersEl = document.getElementById("headers");
const configEl = document.getElementById("config");


//criando axios base url
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

//criando nova instancia do axios
const newAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  }
})

//-------INTERCEPTORS (Request)
axios.interceptors.request.use((config) => {
  console.log("Passou no interceptor");
  return config
})


//------GET
const get = () => {
  const config = {
    params: {
      _limit: 5,
    },
  };

  //usando a nova instancia do axios
  newAxios 
    .get("posts", config)

    .then((response) => {
      renderOutput(response);
    });

  console.log("Rodou o get")
  console.log(localStorage)
};


//-----POST
const post = async () => {
  const data = {
    id: 1,
    title: "Sergio",
    body: "Falcetti",
  };

  const response = await axios
  .post("posts", data)
  console.log("Rodou o post")
  renderOutput(response)
  .then((response) => {
    renderOutput(response);
    });
};

const put = () => {
  const data = {
    title: "teste",
    body: "bar",
  };

  axios
    .put("posts/1", data)

    .then((response) => renderOutput(response));

  console.log("Rodou o put");
};

const patch = () => {
  const data = {
    title: "testePatch",
    body: "testePatch",
  };

  axios
    .patch("posts/1", data)

    .then((response) => renderOutput(response));

  console.log("Rodou o patch");
};

const del = () => {
  axios
    .delete("posts/2")
    .then((response) => renderOutput(response));

  console.log("Rodou o del");
};

const multiple = () => {
  Promise.all([
    axios.get("posts?limit=5"),
    axios.get("users?limit=5"),
  ]).then((response) => {
    console.table(response[0].data);
    console.table(response[1].data);
    console.log(response[0].data); //todo o array de objetos
    console.log(response[0].status); //código de resposta Ex: 200
    console.log(response[0].statusText); //texto da resposta Ex: OK
    console.log(response[0].headers);//cabecalhos Ex:
    console.log(response[0].config);//configuracoes
  });
  // console.log("multiple");
};

const transform = () => {
  console.log("transform");
};

const errorHandling = () => {
  axios.get('posts?limit=5') //adicionar erro para testar
  .then((response) => renderOutput(response))
  .catch((error) => {
    renderOutput(error.response)
    console.log(error.response);
  })
};

const cancel = () => {
  const controller = new AbortController();
  const config = {
    params: {
      _limit: 5,
    },
    signal: controller.signal
  }
  axios.get('posts?limit=5', config)
  .then((response) => renderOutput(response))
  controller.abort();
};

const clear = () => {
  statusEl.innerHTML = "";
  statusEl.className = "";
  dataEl.innerHTML = "";
  headersEl.innerHTML = "";
  configEl.innerHTML = "";
};

const renderOutput = (response) => {
  // Status
  const status = response.status;
  statusEl.removeAttribute("class");
  let statusElClass =
    "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium";
  if (status >= 500) {
    statusElClass += " bg-red-100 text-red-800";
  } else if (status >= 400) {
    statusElClass += " bg-yellow-100 text-yellow-800";
  } else if (status >= 200) {
    statusElClass += " bg-green-100 text-green-800";
  }

  statusEl.innerHTML = status;
  statusEl.className = statusElClass;

  // Data
  dataEl.innerHTML = JSON.stringify(response.data, null, 2);
  Prism.highlightElement(dataEl);

  // Headers
  headersEl.innerHTML = JSON.stringify(response.headers, null, 2);
  Prism.highlightElement(headersEl);

  // Config
  configEl.innerHTML = JSON.stringify(response.config, null, 2);
  Prism.highlightElement(configEl);
};

document.getElementById("get").addEventListener("click", get);
document.getElementById("post").addEventListener("click", post);
document.getElementById("put").addEventListener("click", put);
document.getElementById("patch").addEventListener("click", patch);
document.getElementById("delete").addEventListener("click", del);
document.getElementById("multiple").addEventListener("click", multiple);
document.getElementById("transform").addEventListener("click", transform);
document.getElementById("cancel").addEventListener("click", cancel);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("clear").addEventListener("click", clear);


