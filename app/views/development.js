/* eslint-disable arrow-body-style */
export default (html, finalState) => {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <!--Always force latest IE rendering engine (even in intranet)
            & Chrome Frame Remove this if you use the .htaccess
          -->
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta name="description" content="Clementinejs"/>
          <meta name="author" content="Ronald"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Clementine-React-Redux</title>
          <link rel="stylesheet" href="/static/style.css" media="all">
          <link rel="stylesheet" href="/static/w3.min.css"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        </head>
        <body>
          <div id="appView">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(finalState)}
          </script>
          <br><br><center><p>Created by Ronald Blanco using clementine.js.</p></center>
          <script src="/static/vendors.js"></script>
          <script src="/static/bundle.js"></script>
          <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js"></script>
        </body>
      </html>
      `;
};
/* eslint-enable arrow-body-style */
