require('./../stylesheets/application.sass')

window.ipc.send('renderer:data_request')
window.ipc.on('renderer:data_response', data => console.log(data))
