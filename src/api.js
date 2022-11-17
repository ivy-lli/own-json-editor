export async function fetchDialogs() {
  const response = await fetch(getConfigUrl() + '/dialogIds');
  const json = await response.json();
  console.log("received "+JSON.stringify(json))
  return json
}

export async function fetchConfig() {
  const response = await fetch(getConfigUrl());
  const json = await response.json();
  return json
}

function getConfigUrl() {
  const params = new URLSearchParams(window.location.search);
  const pid = params.get("pid");
  console.log("piiiid " + pid);
  
  return 'http://localhost:8081/designer/api/config/'+pid
}