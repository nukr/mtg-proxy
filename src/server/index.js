import koa from 'koa'
import serve from 'koa-static'
import path from 'path'

let app = koa()

app.use(serve(path.resolve(__dirname, '../../public')))

app.listen(1234)
