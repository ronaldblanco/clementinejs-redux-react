
export default (method, url, body) => (new Promise((resolve, reject) => {
  const xmlhttp = new XMLHttpRequest();
  // console.log(body);
  /* console.log(xmlhttp);
  if (body !== undefined) {
    Object.defineProperty(xmlhttp, 'body1', {
      writable: true
    });
    xmlhttp.body1 = body;
  } */
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status / 100 === 2) {
        resolve(JSON.parse(xmlhttp.response));
      } else {
        reject(JSON.parse(xmlhttp.response));
      }
    }
  };
  xmlhttp.open(method, url, true);
  /* if (body !== undefined) {
    body = JSON.parse(body);
    const newBody = new FormData();
    newBody.append("username", body.users[0].username);
    xmlhttp.send(newBody);
  }
  else */ xmlhttp.send();
}));
