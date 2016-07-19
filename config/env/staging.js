module.exports = {
  server:{
    port: 8000,
    host: 'dev.cherrywork.in'
  },
  database: {
    name: "cw",
    path: "mongodb://localhost:27017/",
    host: "127.0.0.1",
    port: "27017"
  },
  aws: {
    s3bucket: 'cherrywork'
  },
  web: {
    host: "http://52.39.185.168",
    adminPanelPort: 8002,
    appPort:7009
  }
}